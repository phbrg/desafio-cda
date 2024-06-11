# desafio-cda
Desafio feito para o processo seletivo de desenvolvedor back end JR no Cidade Alta RP

## API Tutorial 

Para rodar a API é nescessario:
- Node.js
- PostgreSQL
- Git or Yarn

Primeiro clone o projeto usando:

<code>git clone https://github.com/phbrg/desafio-cda.git</code>

Então use:

<code>npm i</code>

para instalar as dependencias do projeto

Então crie um arquivo <code>.env</code> na pasta raiz do projeto com a seguinte variavel:
```JSON
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```
> Você tem que criar a data base no PostgreSQL para funcionar!

Então rode o projeto com:

<code>npm run dev</code>

Após isto, o projeto deve funcionar normalmente, caso contrario me contate.

## API Endpoints

### Create Badge
- Route: `/badge/create`
- Method: `POST`
- Body:
  ```JSON
    {
        "slug": "badge slug",
        "name": "badge name",
        "image": "badge image"
    }
  ```

### Get Badge
- Route: `/badge/:method?/:data?`
- Method: `GET`
- Route Methods:
  - `id`
  - `slug`
  - `name`

### Reedem Badge
- Route: `/badge/reedem/:slug`
- Method: `POST`
- Body:
  ```JSON
    {
        "discordId": "123456789012345678",
        "inGameId": "1"
    }
  ```

### Get User
- Route: `/user/:method?/:data?`
- Method: `GET`

## License
This project is under [Creative Commons Zero v1.0 Universal](LICENSE). See [LICENSE](LICENSE)   
for more details.
