# Auth API Documentation

## POST /users/register

### Description
Create a new user account and return a JWT token for authentication.

### Request URL
`/users/register`

### Method
`POST`

### Request Headers
- `Content-Type: application/json`

### Request Body (JSON)
```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Validation rules
<!-- - `fullname.firstName`: required, minimum length 3 -->
- `fullname.lastName`: required, minimum length 3
- `email`: required, valid email format
- `password`: required, minimum length 6

### Success Response
- Status: `201 Created`
- Body:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
}
```

### Error Responses
- `400 Bad Request` when validation fails.
  - Body: `{ "errors": [ { "msg": "...", "param": "...", ... } ] }`
- Other error statuses may occur for database or server errors.

### Notes
- Password is hashed before save.
- `socketId` is optional and not required in registration.

---

## POST /users/login

### Description
Authenticate a user with email and password, returning a JWT token if credentials are valid.

### Request URL
`/users/login`

### Method
`POST`

### Request Headers
- `Content-Type: application/json`

### Request Body (JSON)
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Validation rules
- `email`: required, valid email format
- `password`: required, minimum length 6

### Success Response
- Status: `200 OK`
- Body:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
  }
}
```

### Error Responses
- `400 Bad Request` when validation fails.
  - Body: `{ "errors": [ { "msg": "...", "param": "...", ... } ] }`
- `401 Unauthorized` when email is not found or password is incorrect.
  - Body: `{ "message": "Invalid Email or Password" }`

### Notes
- Both email and password must match an existing user in the database.
- Password comparison is done securely using bcrypt.
- Upon successful login, a new JWT token is generated for the session.
