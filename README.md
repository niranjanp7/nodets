# NodeJs Training

## Project Setup

-   Clone Git repo

```bash
git clone https://github.com/niranjanp7/nodets.git
```

-   Install packages

```bash
npm install
```

-   Setup `.env` file

```bash
HOST=127.0.0.1
PORT=8000

JWT_SECRET=jwt_secret_key
```

- Start Express server with `dev` command
```bash
npm run dev
```

## Auth Routes

### `PUG Welcome Form` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/auth'
```

### `Login Request` ![POST](https://img.shields.io/badge/-POST-yellow)

```bash
curl --location 'http://127.0.0.1:8000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user1",
    "password": "admin@123"
}'
```

### `Register Request` ![POST](https://img.shields.io/badge/-POST-yellow)

```bash
curl --location 'http://127.0.0.1:8000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user1",
    "email": "email@email2.com"
}'
```

### `Private Route Test with Token` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/auth/private' \
--header 'Authorization: <token>'
```

> **Note:** Replace `<token>` with your actual authentication token.

### `Login PUG Form` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/auth/login'
```

### `Register PUG Form` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/auth/register'
```

## File System

### `Read File` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/fileread' \
--header 'Authorization: Bearer mytoken'
```

### `Write To File Timestamp` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/fileread/wf'
```

### `Backup File` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/fileread/bf'
```

### `Delete Backup File` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/fileread/df'
```

### `Write Content to File` ![POST](https://img.shields.io/badge/-POST-yellow)

```bash
curl --location 'http://127.0.0.1:8000/fileread/wf' \
--header 'Authorization: Bearer mytoken' \
--header 'Content-Type: application/json' \
--data '{
    "data": "\nWrite This to File"
}'
```

## Product CRUD Operations

### `Product List` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/product'
```

### `Product Backup Async` ![GET](https://img.shields.io/badge/-GET-green)

```bash
curl --location 'http://127.0.0.1:8000/product/backup'
```

### `Add Product` ![POST](https://img.shields.io/badge/-POST-yellow)

```bash
curl --location 'http://127.0.0.1:8000/product' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Washing Machine",
    "description": "Multi function to wash and dry cloths"
}'
```

### `Update Product` ![PUT](https://img.shields.io/badge/-PUT-blue)

```bash
curl --location --request PUT 'http://127.0.0.1:8000/product/:productId' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Washing Machine"
}'
```

> **Note:** Replace `:productId` with product ID to manupulate.
