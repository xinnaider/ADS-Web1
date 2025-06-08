<?php

use Illuminate\Http\Request;

Route::get('/analise', function (Request $request) {
    if (!$request->has('username')) {
        return view('analise');
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

        $res = Http::withToken(env('GROK_API_KEY'))
            ->asJson()
            ->post('https://api.x.ai/v1/chat/completions', [
                'model'       => 'grok-3-latest',
                'messages'    => [
                    [
                        'role'    => 'system',
                        'content' => "Você é um comediante de stand-up observando o perfil @{$user}."
                    ],
                    [
                        'role'    => 'user',
                        'content' => $textToAnalyze
                    ],
                ],
                'max_tokens'  => 200,
                'temperature' => 0,
                'stream'      => false,
            ]);

        if (!$res->ok()) {
            throw new \Exception('Erro ao buscar análise: ' . $res->body());
        }

        $analysis = $res->json('choices.0.message.content', 'Sem resposta do Grok.');

        return back()
            ->withInput()
            ->with([
                'user'     => $user,
                'bio'      => $data['description'] ?? '[sem bio]',
                'analysis' => $analysis,
                'tweets'   => collect($tweets)->pluck('text')->all(),
            ]);
    } catch (\Exception $e) {
        return back()
            ->withInput()
            ->withErrors(['username' => $e->getMessage()]);
    }
});

Route::get('/chat', function () {
    session()->forget('history');
    return view('chat', ['history' => []]);
});

Route::post('/chat', function (Request $request) {
    $request->validate([
        'message' => 'required|string',
    ]);

    $message = $request->input('message');

    $history = session('history', []);

    $history[] = [
        'role'    => 'user',
        'content' => $message,
    ];

    $messages = array_merge([
        [
            'role'    => 'system',
            'content' => 'Você é um vizinho mal-humorado. Responda sempre com grosseria e mau humor.',
        ],
    ], $history);

    $res = Http::withToken(env('GROK_API_KEY'))
        ->asJson()
        ->post('https://api.x.ai/v1/chat/completions', [
            'model'       => 'grok-3-latest',
            'messages'    => $messages,
            'temperature' => 0,
            'stream'      => false,
        ]);

    if (! $res->ok()) {
        throw new \Exception('Erro ao chamar Grok: '.$res->body());
    }

    $reply = $res->json('choices.0.message.content', '[sem resposta]');

    $history[] = [
        'role'    => 'assistant',
        'content' => $reply,
    ];

    session(['history' => $history]);

    return view('chat', ['history' => $history]);
});
