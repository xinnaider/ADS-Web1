<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Análise sarcástica de Perfil</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
</head>
<body>
  <div class="container py-5">
    <h1 class="mb-4">Grok + Twitter: Análise sarcástica</h1>

    <form method="get" action="/analise" class="row g-2">
      <div class="col-auto flex-grow-1">
        <input
          type="text"
          name="username"
          id="username"
          class="form-control @if($errors->has('username')||$errors->has('error')) is-invalid @endif"
          value="{{ old('username') }}"
          placeholder="Digite o usuário (ex: nasa)"
          maxlength="15"
        >
        @if($errors->has('username'))
          <div class="invalid-feedback">
            {{ $errors->first('username') }}
          </div>
        @elseif($errors->has('error'))
          <div class="invalid-feedback">
            {{ $errors->first('error') }}
          </div>
        @endif
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">Analisar</button>
      </div>
    </form>

    @if(session('user'))
      <div class="card mt-5">
        <div class="card-header">
          Resultado para <strong>{{ session('user') }}</strong>
        </div>
        <div class="card-body">
          <h5 class="card-title">Análise sarcástica</h5>
          <p class="card-text">{{ session('analysis') }}</p>
          @if(session('tweets') && count(session('tweets'))>0)
            <hr>
            <h6>Últimos tweets</h6>
            <ul class="list-group list-group-flush">
              @foreach(session('tweets') as $tweet)
                <li class="list-group-item">{{ $tweet }}</li>
              @endforeach
            </ul>
          @endif
        </div>
      </div>
    @endif
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
</body>
</html>
