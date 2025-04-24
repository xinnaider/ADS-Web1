// 1. Arrays:
// ----------------------------------------------------------
let arrNums = [1, 2, 3, 4, 5];

function sumArray(arr) {
  var sum = null;

  arr.forEach((num) => {
    sum += num;
  });

  return sum;
}

print('Crie um array de números e escreva uma função que calcule a soma de todos os elementos do array: ', 
  () => {
    console.log(sumArray(arrNums));
  }
);
// ----------------------------------------------------------
let arrFrutas = ["banana", "maca", "laranja", "uva"];

function addStart(arr, item) {
  arr.unshift(item);
  return arr;
}

function addEnd(arr, item) {
  arr.push(item);
  return arr;
}

print('Crie um array de frutas e escreva uma função que adicione uma nova fruta no início e outra no final do array:', 
  () => {
    console.log(addEnd(arrFrutas, "kiwi"));
    console.log(addStart(arrFrutas, "abacaxi"));
  }
);
// ----------------------------------------------------------
print('Utilize o método forEach para exibir todas as frutas do array:', 
  () => {
    arrFrutas.forEach((item) => {
      console.log(item);
    });
  }
);

// 2. Objetos:
// ----------------------------------------------------------
let pessoa = {
  nome: "João",
  idade: 25,
  profissao: "Desenvolvedor",
  cidade: "São Paulo",
  hobbies: ["programar", "jogar", "ler"],
  saudar: function () {
    return `Olá, meu nome é ${this.nome} e eu sou ${this.profissao}.`;
  },
}

print('Crie um objeto representando uma pessoa, com propriedades como nome, idade e profissão. Crie também um método que retorne uma saudação personalizada:', 
  () => {
    console.log(pessoa.saudar());
  }
)
// ----------------------------------------------------------
pessoa.altura = 1.75;
pessoa.attributes = function () {
  return `Nome: ${this.nome}, Idade: ${this.idade}, Profissão: ${this.profissao}, Cidade: ${this.cidade}, Altura: ${this.altura}`;
}

print('Adicione uma nova propriedade ao objeto pessoa para armazenar a altura, e escreva uma função que exiba todas as propriedades e seus valores:', 
  () => {
    console.log(pessoa.attributes());
  }
)

// 3. Uso de Loops:
// ----------------------------------------------------------
let livros = [
  { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", lancamento: 1954 },
  { titulo: "1984", autor: "George Orwell", lancamento: 1949 },
  { titulo: "Dom Casmurro", autor: "Machado de Assis", lancamento: 1899 },
  { titulo: "A Revolução dos Bichos", autor: "George Orwell", lancamento: 1945 },
  { titulo: "O Código Da Vinci", autor: "Dan Brown", lancamento: 2003 },
  { titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", lancamento: 2005 },
];

print('Crie um array de objetos, onde cada objeto representa um livro (com propriedades como título, autor e ano). Utilize o loop for para listar os livros publicados após o ano de 2000:', 
  () => {
    livros.forEach((livro) => {
      if (livro.lancamento > 2000) {
        console.log(`Título: ${livro.titulo}, Autor: ${livro.autor}, Lançamento: ${livro.lancamento}`);
      }
    })
  }
)
// ----------------------------------------------------------
let apenas2000 = livros
  .filter(livro => livro.lancamento > 2000)
  .map(livro => livro.titulo);

print('Utilize o método map para criar um novo array que contenha apenas os títulos dos livros:', 
  () => {
    console.log(apenas2000);
  }
)

// 4. Funções e Arrow Functions:
// ----------------------------------------------------------
function sum(a, b) {
  return a * b;
}

let sumFn = (a, b) => {
  return a * b;
}

print('Crie uma função tradicional que receba dois números e retorne a multiplicação entre eles. Em seguida, reescreva essa função usando a sintaxe de uma arrow function: ',
  () => {
    console.log(sum(2, 3));
    console.log(sumFn(2, 3));
  }
)
// ----------------------------------------------------------
let quadrado = (num) => {
  return num * num;
}

print('Crie uma arrow function que calcule o quadrado de um número e mostre o resultado para um número fornecido pelo usuário:', 
  () => {
    console.log(quadrado(5));
  }
)

// Auxiliares
function print(title, fn) {
  console.log("\n===========================================");
  console.log(`Exercício: ${title}`);
  console.log("===========================================\n");
  console.log("Resultado:");
  fn();
}

