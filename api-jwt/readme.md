# Login JWT com Express e Frontend Simples

Este projeto implementa um backend em Node.js com Express que gera e valida JWTs, além de um frontend simples em HTML + jQuery para autenticação e verificação de status.

---

## 📦 Instalação

```bash
npm install
```

---

## 🚀 Execução

```bash
npm run start
```

O backend será exposto em: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Frontend

Abra o arquivo `index.html` diretamente no navegador.

---

## 🔐 Credenciais de Teste

Use os seguintes dados para login:

- **Email:** `user@exemplo.com`  
- **Senha:** `123456`

---

## 📋 Funcionalidades

- `POST /login` — Autentica com credenciais fixas e retorna um token JWT.
- `GET /status` — Verifica a validade do token JWT enviado via `Authorization: Bearer <token>`.

---

## 🧪 Teste

1. Preencha o formulário de login no `index.html` e clique em **Login**.
2. O token será salvo em `localStorage`.
3. Clique em **Verificar status** para consultar o status de autenticação via JWT.
