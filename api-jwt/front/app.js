const API_URL = 'http://localhost:3000';

$(document).ready(function () {
  $('#login-form').on('submit', function (e) {
    e.preventDefault();

    const email = $('#email').val();
    const senha = $('#senha').val();

    $.ajax({
      url: `${API_URL}/login`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, senha }),
      success: function (data) {
        localStorage.setItem('token', data.token);
        alert('Login bem-sucedido!');
      },
      error: function () {
        alert('Credenciais inválidas');
      }
    });
  });

  $('#check-status').on('click', function () {
    const token = localStorage.getItem('token');

    $.ajax({
      url: `${API_URL}/status`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      success: function (data) {
        $('#status').text(data.authenticated ? 'Logado' : 'Não logado');
      },
      error: function () {
        $('#status').text('Erro na verificação');
      }
    });
  });
});
