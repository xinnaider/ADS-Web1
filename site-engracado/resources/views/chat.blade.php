<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Vizinho mal-humorado</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
    crossorigin="anonymous"
  >
  <style>
    .chat-window {
      height: 60vh;
      overflow-y: auto;
      background: #f1f1f1;
      border: 1px solid #ccc;
      border-radius: .25rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .chat-message {
      display: flex;
      margin-bottom: .75rem;
    }
    .chat-message.user { justify-content: flex-end; }
    .chat-message.bot  { justify-content: flex-start; }
    .bubble {
      max-width: 70%;
      padding: .75rem 1rem;
      border-radius: 1rem;
      white-space: pre-wrap;
      line-height: 1.4;
    }
    .chat-message.user .bubble {
      background: #0d6efd;
      color: #fff;
      border-bottom-right-radius: 0;
    }
    .chat-message.bot .bubble {
      background: #e9ecef;
      color: #000;
      border-bottom-left-radius: 0;
    }
  </style>
</head>
<body>
  <div class="container py-5">
    <h1 class="mb-4 text-center">Vizinho mal-humorado 🤬</h1>

    <div class="chat-window">
      @forelse ($history as $msg)
        <div class="chat-message {{ $msg['role']==='user' ? 'user' : 'bot' }}">
          <div class="bubble">{!! nl2br(e($msg['content'])) !!}</div>
        </div>
      @empty
        <p class="text-center text-muted">Diga algo, mas não espere educação.</p>
      @endforelse
    </div>

    <form action="/chat" method="post" class="input-group">
      @csrf
      <input
        type="text"
        name="message"
        class="form-control @error('message') is-invalid @enderror"
        placeholder="Escreva sua mensagem..."
        autofocus
      >
      <button class="btn btn-danger" type="submit">Enviar 😠</button>
      @error('message')
        <div class="invalid-feedback">{{ $message }}</div>
      @enderror
    </form>
  </div>

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq"
    crossorigin="anonymous"
  ></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const chat = document.querySelector('.chat-window');
      if (chat) {
        chat.scrollTop = chat.scrollHeight;
      }
    });
  </script>
</body>
</html>
