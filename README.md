
# Teste estágio back-end Precato




## Stack utilizada

**API Rest:** Node, Express, Docker, Nodemon, typeORM, TypeScript

**Banco de Dados:** PostgresSQL


## Instalação

Antes de iniciar a API você precisa ter o Docker instalado em sua máquina, pois ele será resposavel por baixar todas as dependências do projeto.

https://docs.docker.com/get-docker/


Para baixar as dependências e rodar a API

```bash
  cd precato_teste
  docker-compose up
```
    
Você pode verificar o funcionamento da API usando

http://localhost:3000

```bash
  message: serve running
```

Para acessar o dashboard do postgres use endereço abaixo usando o username e password abaixo. Essas constante podem ser alteradas no arquivo docker-compose.yml


http://localhost:16543/

```bash
   username: pgadmin4@precato.com.br
   password: precato
```

Para conectar o dashboard ao banco, use as seguintes configurações no pgadmin4. Essa variáveis estão definidas no arquivo docker-compose.yml:


```bash
   General:
    Name: postgres

   Connection:
    Host name/addres: postgres
    Port: 5432
    Maintenance database: precato
    Username: postgres
    Password: postgres
```
## Documentação da API

#### Retorna todas as subscriptions

```http
  GET /subscriptions
```

#### Retorna toda o messageFlow

```http
  GET /messageFlow
```

#### Cria um subscription

```http
  POST /subscriptions
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Primary key do subscription. Ex: "precato@email.com"|


#### Cria uma messageFlow

```http
  POST /messageFlow
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `position` | `string` | **Obrigatório**. Data que será enviada formato "dd-MM-yyyy"|
| `template_email` | `number` | **Obrigatório**. subscriptionId referencia o subscription|

