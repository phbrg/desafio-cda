# desafio-cda
Desafio feito para o processo seletivo de desenvolvedor back end JR no Cidade Alta RP

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
