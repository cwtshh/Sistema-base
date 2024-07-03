# Sistema-base

Este repositório é um projeto pessoal, onde estou desenvolvendo um sistema web para gerenciamento de empresas.

OBS: O repositório tem várias branches, a mais avançada é a frontend-backend, lá já estão diversas funcionalidades completas e outras muito próximas de sua conclusão.

- Login de Funcionário e Admin
  - Protegidos por token de acesso (JWT)
    - Token de Admin não autenticam usuário e vice-versa.
  - Todos os usuários são cadastrados no banco de dados, que neste caso é o mongoDB.
- Rotas protegidas
  - Tanto no front quanto no backend existem rotas protegidas que só podem ser acessadas quando logado, e com presença de token de autenticação.
- Arquitetura MVC
  - Este projeto foi desenvolvido usando model, view e controller. Assim fazendo com que sua organização seja muito boa.

Já é possível

- [x] Cadastrar usuários (Funcionários), importante cadastrar um ADM pela API, ainda não foi implementada esta função no frontend.
- [x] Logar Usuários
- [x] Cadastrar Notas, Estoques
- [x] Exportar Histórico de Notas e Saídas em uma planilha excel.

## Para rodar o projeto

Na pasta /frontend execute:

`npm install`

Para instalar as dependencias do projeto.

`npm run dev`

Para rodar o frontend


Na pasta /backend execute:

`docker compose up`

Para subir os containers da API e banco de dados.

Se necessário, renomeie o container, visto que o nome pode conflitar com outros.

`docker-compose -p <novo_nome> up -d`
