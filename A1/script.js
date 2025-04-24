const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const somaButton = document.getElementById('soma');
const limparButton = document.getElementById('limpar');
const resultadoSpan = document.getElementById('resultado');
const historicoLista = document.getElementById('historicoLista');

somaButton.addEventListener('click', calcularSoma);
limparButton.addEventListener('click', limparCampos);

function calcularSoma() {
  const valor1 = parseFloat(num1Input.value);
  const valor2 = parseFloat(num2Input.value);

  if (isNaN(valor1) || isNaN(valor2)) {
    alert('Por favor, digite números válidos');
    return;
  }

  const soma = valor1 + valor2;

  alert(`A soma de ${valor1} e ${valor2} é ${soma}`);

  adicionarAoHistorico(valor1, valor2, soma);
}

function adicionarAoHistorico(valor1, valor2, resultado) {
  const novoItem = document.createElement('li');
  novoItem.textContent = `${valor1} + ${valor2} = ${resultado}`;
  historicoLista.appendChild(novoItem);
}

function limparCampos() {
  num1Input.value = '';
  num2Input.value = '';
  resultadoSpan.textContent = '';
}