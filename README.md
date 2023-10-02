# VIVO API

> API RESTful com Node.js e MySQL.

## Bibliotecas utilizadas 
1. **cors:** Uma biblioteca que permite a configuração de políticas de segurança de compartilhamento de recursos (CORS) para uma aplicação Node.js.
2. **dotenv:** Uma biblioteca que permite a leitura de variáveis de ambiente a partir de um arquivo .env para configurar uma aplicação.
3. **express:** Um framework web popular para Node.js que facilita a criação de aplicativos web e APIs.
4. **fs:** Um módulo integrado do Node.js que permite operações de sistema de arquivos.
6. **path:** Um módulo integrado do Node.js que facilita a manipulação de caminhos de arquivos e diretórios.
7. **sequelize:** Uma biblioteca de ORM (Object-Relational Mapping) que simplifica a interação com bancos de dados relacionais, como o MySQL, a partir de uma aplicação Node.js.
8. **swagger-jsdoc:** Uma biblioteca que ajuda a documentar APIs Express.js usando a sintaxe do Swagger/OpenAPI diretamente nos comentários do código.
9. **swagger-ui-express:** Uma biblioteca que fornece uma interface de usuário interativa para visualizar e testar APIs documentadas usando o Swagger/OpenAPI.
10. **winston:** Uma biblioteca de registro (logging) flexível e configurável para Node.js, útil para registrar informações e depuração em uma aplicação.

## Running

```sh
# Clone o repositório 
git clone 

# Entre na pasta 
cd vivo-api

# Copie o arquivo .env.example e coloque as variáveis ​​de ambiente corretas no .env baixando da url abaixo
cp .env.example .env

# Instale as dependências user a versão 18 do Node.js
npm install

# Inicie  
npm start
```
### .env
[.env](https://drive.google.com/file/d/1nQlRJ77W9xe5tq1R-rINv_e2FuSH8KY4/view?usp=sharing)
### Local
```sh
http://localhost:3000
```
### Document
```sh
http://localhost:3000/api-docs
```
## Populando
- Caso queira popular o banco de dados, você pode usar o Postman ou o Insomnia para importar as Collections abaixo e realizar um POST na coleção POST/ list, ou pode importar o banco de dados local do Vivo usando o arquivo database Vivo fornecido:

### Collections
[endpoints](https://drive.google.com/file/d/1SZ6Wl-Rj0Yw253_aJrzY_Kecvmv8UW2V/view?usp=sharing)

### Import database
[vivo](https://drive.google.com/file/d/1UlUU2QYQhBmPkfNz2vw1CwYy7q4ujaI8/view?usp=sharing)

### Interface desenvolvida para ser exibida nesta API
[Interface](https://github.com/andersoncgiusti/vivo-front)
