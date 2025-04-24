<?php

use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    if (!$request->has('username')) {
        return view('home');
    }

    try {
        $user = $request->get('username');

        if (empty($user)) {
            throw new \Exception('Usuário não pode ser vazio.');
        }

        if (preg_match('/[^a-zA-Z0-9_]/', $user)) {
            throw new \Exception('Usuário só pode conter letras, números e underline.');
        }

        if (strlen($user) > 15) {
            throw new \Exception('Usuário não pode ter mais de 15 caracteres.');
        }


        $res =  Http::withToken(env('TWITTER_BEARER_TOKEN'))
            ->get("https://api.twitter.com/2/users/by/username/{$user}", [
                'user.fields' => 'description'
            ]);

        if (!$res->ok()) {
            throw new \Exception('Erro ao buscar usuário: ' . $res->body());
        }

        $data = $res->json('data', []);

        if (empty($data)) {
            throw new \Exception('Usuário não encontrado.');
        }

        sleep(5);

        $res = Http::withToken(env('TWITTER_BEARER_TOKEN'))
            ->get("https://api.twitter.com/2/users/{$data['id']}/tweets", [
                'max_results' => 5
            ]);

        if (!$res->ok()) {
            throw new \Exception('Erro ao buscar tweets: ' . $res->body());
        }

        $tweets = $res->json('data', []);

        $textToAnalyze = "Bio: " . ($userData['description'] ?? '[sem bio]') . "\nTweets:\n"
            . collect($tweets)->map(fn($t) => '- '.$t['text'])->implode("\n");

        $grokRes = Http::withToken(env('GROK_API_KEY'))
            ->post('https://api.x.ai/v1/chat/completions', [
                'model'      => 'grok-medium',
                'prompt'     => "Você é um comediante de stand-up observando o perfil @{$user}.\n{$textToAnalyze}",
                'max_tokens' => 200
            ]);

        if (!$grokRes->ok()) {
            throw new \Exception('Erro ao buscar análise: ' . $grokRes->body());
        }

        $analysis = $grokRes->json('choices.0.text', 'Sem resposta do Grok.');

        return back()
            ->withInput()
            ->with([
                'user'     => $user,
                'bio'      => $data['description'] ?? '[sem bio]',
                'analysis' => $analysis,
                'tweets'   => collect($tweets)->map(fn($t) => $t['text'])->all(),
            ]);
    } catch (\Exception $e) {
        return back()
            ->withInput()
            ->withErrors(['username' => $e->getMessage()]);
    }
});
