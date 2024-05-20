# AuthenticationService API Documentation

## Overview

The AuthenticationService API allows clients to manage user authentication, including login, registration, and deletion of users.

### Base URL

```
/api/Authentication
```

## Endpoints

### 1. User Login

#### POST `/api/Authentication/Login`

Authenticates a user and returns a success response if the login is successful.

##### Request Body

- `UserModel` (application/json, text/json, application/*+json): A JSON object containing the username and password.

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

##### Responses

- `200 OK`: Login was successful.

##### Example Request

```
POST /api/Authentication/Login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

### 2. User Registration

#### POST `/api/Authentication/Register`

Registers a new user and returns a success response if the registration is successful.

##### Request Body

- `UserModel` (application/json, text/json, application/*+json): A JSON object containing the username and password.

```json
{
  "username": "johndoe",
  "password": "password123"
}
```

##### Responses

- `200 OK`: Registration was successful.

##### Example Request

```
POST /api/Authentication/Register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

### 3. Delete User

#### DELETE `/api/Authentication/{id}`

Deletes a user by their ID.

##### Parameters

- `id` (path, integer, required): The ID of the user to be deleted.

##### Responses

- `200 OK`: User deletion was successful.

##### Example Request

```
DELETE /api/Authentication/123
```

### 4. Get Authentication Status

#### GET `/api/Authentication`

Retrieves the authentication status.

##### Responses

- `200 OK`: Returns the authentication status.

```json
{
  "status": 1
}
```

##### Example Request

```
GET /api/Authentication
```

## Models

### UserModel

- `username` (string, nullable): The username of the user.
- `password` (string, nullable): The password of the user.

```json
{
  "username": "string",
  "password": "string"
}
```
