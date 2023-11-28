# Projeto Web - Notes List

Faremos uma note-list padrão, em que os diferentes usuários poderão interagir uns com os outros através do compartilhamento de listas de anotações.

- Giovane Pimentel de Sousa
- Isabela Vill de Aquino
- Higor Freiberger Abreu
- Guilherme Henriques do Carmo

## Build básica de desenvolvimento client-side:
1. git clone https://github.com/GiovanePS/todo-list-trabalho-web.git
2. Vá para o diretório _/client_.
3. Execute `npm install` para instalar todas as dependências.
4. Execute `npm run dev`.

Dessa forma, se tudo der certo, o client já estará rodando no http://localhost:3000.
  
## Build básica de desenvolvimento server-side:
1. git clone https://github.com/GiovanePS/todo-list-trabalho-web.git
2. Vá para o diretório _./server_
3. Execute `npm install` para instalar todas as dependências.
4. Vá para o diretório _./src_.
5. Crie um arquivo chamado _.env_, contendo nele POSTGRES_PASSWORD='sua_senha_do_posgres'. Se seu usário não for 'postgres', coloque também POSTGRES_USER='seu_usuario_do_postgres'.
6. Vá para o diretório _./database_.
7. Execute `npx sequelize-cli db:create` para criar a database _notes_list_ no postgres.
8. Execute `npx ts-node ./scripts/sync.ts` para criar as tabelas do projeto no postgres.
9. Execute `npx sequelize-cli db:seed:all` para gerar todas as seeds da pasta _seeders_ no postgres.
10. Volte para _./server_
11. Execute `npx nodemon ./src/server.ts` para iniciar o servidor.

Dessa forma, se tudo der certo, o servidor já estará rodando no http://localhost:5000.
