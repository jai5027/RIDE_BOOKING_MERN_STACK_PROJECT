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

---

## GET /users/profile

### Description
Retrieve the authenticated user's profile information.

### Request URL
`/users/profile`

### Method
`GET`

### Authentication
- **Required**: Yes (Bearer token or cookie)
- Token can be passed via:
  - Cookie: `token=<jwt-token>`
  - Header: `Authorization: Bearer <jwt-token>`

### Request Headers
- `Authorization: Bearer <jwt-token>` (optional if using cookies)
- `Cookie: token=<jwt-token>` (optional if using Authorization header)

### Request Body
No body required.

### Success Response
- Status: `200 OK`
- Body:
```json
{
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
```

### Error Responses
- `401 Unauthorized` when token is missing or invalid.
  - Body: `{ "message": "Unauthorized" }`
- `401 Unauthorized` when token is blacklisted (logged out).
  - Body: `{ "message": "Unauthorized" }`

### Notes
- This endpoint requires a valid JWT token.
- User information is retrieved from the authenticated session.

---

## GET /users/logout

### Description
Logout the authenticated user by invalidating their JWT token and clearing the session.

### Request URL
`/users/logout`

### Method
`GET`

### Authentication
- **Required**: Yes (Bearer token or cookie)
- Token can be passed via:
  - Cookie: `token=<jwt-token>`
  - Header: `Authorization: Bearer <jwt-token>`

### Request Headers
- `Authorization: Bearer <jwt-token>` (optional if using cookies)
- `Cookie: token=<jwt-token>` (optional if using Authorization header)

### Request Body
No body required.

### Success Response
- Status: `200 OK`
- Body:
```json
{
  "message": "Logged out"
}
```

### Error Responses
- `401 Unauthorized` when token is missing or invalid.
  - Body: `{ "message": "Unauthorized" }`

### Notes
- The token is added to a blacklist to prevent further use.
- The token cookie is cleared on the client side.
- After logout, the token is no longer valid for subsequent requests.


# Captain Routes Documentation

## Overview
The Captain Routes handles registration and authentication for captains (drivers) in the Uber Clone application. These routes manage captain account creation with vehicle information and authentication token generation.

---

## Endpoints

### 1. Register Captain

**Endpoint:** `POST /captains/register`

**Description:**
Registers a new captain with their personal and vehicle information. Creates a captain account, hashes the password, and returns an authentication token.

#### Request Body

```json
{
  "fullname": {
    "firstName": "string (required, min 3 characters)",
    "lastName": "string (optional, min 3 characters if provided)"
  },
  "email": "string (required, valid email format)",
  "password": "string (required, min 6 characters)",
  "vehicle": {
    "color": "string (required, min 3 characters)",
    "plate": "string (required, min 3 characters)",
    "capacity": "number (required, min 1)",
    "vehicleType": "string (required, must be: 'car', 'motorcycle', or 'auto')"
  }
}
```

#### Validation Rules

| Field | Rules | Error Message |
|-------|-------|---------------|
| `email` | Required, valid email format | "Email is required" / "Invalid Email" |
| `fullname.firstName` | Required, min 3 characters | "First name is required" / "First name must be at least 3 characters long" |
| `fullname.lastName` | Optional, min 3 characters if provided | "Last name must be at least 3 characters long" |
| `password` | Required, min 6 characters | "Password is required" / "Password must be at least 6 characters long" |
| `vehicle.color` | Required, min 3 characters | "Vehicle color must be at least 3 characters long" |
| `vehicle.plate` | Required, min 3 characters | "Vehicle plate must be at least 3 characters long" |
| `vehicle.capacity` | Required, positive integer (min 1) | "Vehicle capacity must be a positive integer" |
| `vehicle.vehicleType` | Required, enum: ['car', 'motorcycle', 'auto'] | "Vehicle type must be either car, motorcycle, or auto" |
| `email` | Must be unique (not already registered) | "Email is already registered" |

#### Responses

**Success (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "password": "$2b$10$hashed_password_here",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "lat": null,
      "lng": null
    },
    "socketId": null,
    "createdAt": "2026-03-22T10:30:00.000Z",
    "updatedAt": "2026-03-22T10:30:00.000Z",
    "__v": 0
  }
}
```
**Token Details:**
- **Duration:** 24 hours
- **Storage:** Set as HTTP-only cookie
- **Secret:** Uses `process.env.JWT_SECRET`

**Validation Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "location": "body",
      "param": "email",
      "msg": "Invalid Email",
      "value": ""
    },
    {
      "location": "body",
      "param": "fullname.firstName",
      "msg": "First name must be at least 3 characters long",
      "value": "Jo"
    }
  ]
}
```

**Duplicate Email Error (400 Bad Request):**
```json
{
  "error": "Email is already registered"
}
```

#### Example cURL Request

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

#### Example JavaScript Request (Axios)

```javascript
const axios = require('axios');

const captainData = {
  fullname: {
    firstName: "John",
    lastName: "Doe"
  },
  email: "john.doe@example.com",
  password: "password123",
  vehicle: {
    color: "black",
    plate: "ABC123",
    capacity: 4,
    vehicleType: "car"
  }
};

axios.post('http://localhost:3000/captains/register', captainData)
  .then(response => {
    console.log('Registration successful:', response.data);
    // Token is automatically stored in cookies
  })
  .catch(error => {
    console.error('Registration failed:', error.response.data);
  });
```

---

## Database Schema - Captain Model

```
{
  fullname: {
    firstName: String (required, min 3)
    lastName: String (min 3)
  },
  email: String (required, unique, valid email)
  password: String (required, min 6, bcrypt hashed)
  socketId: String (optional, for real-time tracking)
  status: String (enum: ['active', 'inactive'], default: 'inactive')
  vehicle: {
    color: String (required, min 3)
    plate: String (required, min 3)
    capacity: Number (required, min 1)
    vehicleType: String (required, enum: ['car', 'motorcycle', 'auto'])
  },
  location: {
    lat: Number (optional, for GPS tracking)
    lng: Number (optional, for GPS tracking)
  },
  timestamps: true (createdAt, updatedAt)
}
```

---

## Key Features

1. **Password Hashing:** Passwords are hashed using bcrypt with a salt round of 10
2. **Email Uniqueness:** Prevents duplicate email registrations
3. **JWT Authentication:** Generates secure tokens valid for 24 hours
4. **Input Validation:** Uses express-validator for comprehensive request validation
5. **HTTP Cookie Storage:** Token is stored as an HTTP-only cookie for security
6. **Status Tracking:** Captains start with 'inactive' status, can be updated later
7. **Location Ready:** Includes lat/lng fields for future GPS tracking features

---

## Error Handling

The endpoint handles the following error scenarios:

- **Validation Errors:** Returns 400 with detailed validation error messages
- **Duplicate Email:** Returns 400 when email already exists
- **Server Errors:** Returns 500 for unexpected server errors

---

## Security Considerations

- ✅ Passwords are hashed using bcrypt before storage
- ✅ JWT tokens expire after 24 hours
- ✅ Email uniqueness enforced at database level
- ✅ Input validation on all required fields
- ✅ Token stored in HTTP-only cookie (helps prevent XSS attacks)
- ⚠️ Ensure `JWT_SECRET` environment variable is set to a strong, unique value
- ⚠️ Use HTTPS in production to protect credentials in transit

---

## Related Files

- **Route Handler:** [src/routes/captain.route.js](../src/routes/captain.route.js)
- **Controller:** [src/controllers/captain.controller.js](../src/controllers/captain.controller.js)
- **Service:** [src/services/captain.service.js](../src/services/captain.service.js)
- **Model:** [src/models/captain.model.js](../src/models/captain.model.js)

---

## Future Endpoints (To be implemented)

- `POST /captains/login` - Captain login
- `GET /captains/profile` - Get captain profile
- `PUT /captains/profile` - Update captain profile
- `POST /captains/logout` - Captain logout
- `GET /captains/active-rides` - Get active rides for captain
- `PUT /captains/location` - Update captain's real-time location

---

**Last Updated:** March 22, 2026


# Captain Routes Documentation

## Overview
The Captain Routes handles authentication and profile management for captains (drivers) in the Uber Clone application. These routes manage captain account creation, login, profile access, and logout functionality.

---

## Endpoints

### 1. Register Captain

**Endpoint:** `POST /captains/register`

**Description:**
Registers a new captain with their personal and vehicle information. Creates a captain account, hashes the password, and returns an authentication token.

**Authentication:** Not required

#### Request Body

```json
{
  "fullname": {
    "firstName": "John", // (required) Must be at least 3 characters
    "lastName": "Doe"    // (optional) Must be at least 3 characters if provided
  },
  "email": "john.doe@example.com",        // (required) Valid email format, must be unique
  "password": "password123",              // (required) Must be at least 6 characters
  "vehicle": {
    "color": "black",                     // (required) Must be at least 3 characters
    "plate": "ABC123",                    // (required) Must be at least 3 characters
    "capacity": 4,                        // (required) Must be a positive integer (min: 1)
    "vehicleType": "car"                  // (required) Enum: 'car' | 'motorcycle' | 'auto'
  }
}
```

#### Response - Success (201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTEyMzQzcXX...", // JWT token; expires in 24h; stored in HTTP-only cookie
  "captain": {
    "_id": "507f1f77bcf86cd799439011",       // MongoDB ObjectId
    "fullname": {
      "firstName": "John",                   // String: min 3 characters
      "lastName": "Doe"                      // String (optional): min 3 characters
    },
    "email": "john.doe@example.com",         // String: unique, valid email format
    "password": "$2b$10$hashed...",          // String: bcrypt hashed with salt round 10
    "vehicle": {
      "color": "black",                      // String: min 3 characters
      "plate": "ABC123",                     // String: min 3 characters
      "capacity": 4,                         // Number: min 1
      "vehicleType": "car"                   // Enum: 'car' | 'motorcycle' | 'auto'
    },
    "status": "inactive",                    // Enum: 'active' | 'inactive'; defaults to 'inactive'
    "location": {
      "lat": null,                           // Number (optional): for GPS tracking
      "lng": null                            // Number (optional): for GPS tracking
    },
    "socketId": null,                        // String (optional): for real-time tracking
    "createdAt": "2026-03-22T10:30:00.000Z", // ISO timestamp
    "updatedAt": "2026-03-22T10:30:00.000Z", // ISO timestamp
    "__v": 0                                 // MongoDB version field
  }
}
```

#### Response - Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "location": "body",                    // Where the error occurred
      "param": "email",                      // Name of the field with error
      "msg": "Invalid Email",                 // Error message
      "value": ""
    },
    {
      "location": "body",
      "param": "fullname.firstName",
      "msg": "First name must be at least 3 characters long",
      "value": "Jo"
    }
  ]
}
```

#### Response - Duplicate Email Error (400 Bad Request)

```json
{
  "error": "Email is already registered" // Email already exists in database
}
```

---

### 2. Login Captain

**Endpoint:** `POST /captains/login`

**Description:**
Authenticates a captain with their email and password. Returns a JWT token if credentials are valid.

**Authentication:** Not required

#### Request Body

```json
{
  "email": "john.doe@example.com",    // (required) Must be a valid email format
  "password": "password123"           // (required) Password to verify against hashed password
}
```

#### Response - Success (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTEyMzQzcXX...", // JWT token; expires in 24h; stored in HTTP-only cookie
  "captain": {
    "_id": "507f1f77bcf86cd799439011",       // MongoDB ObjectId
    "fullname": {
      "firstName": "John",                   // String: min 3 characters
      "lastName": "Doe"                      // String (optional): min 3 characters
    },
    "email": "john.doe@example.com",         // String: unique, valid email format
    "vehicle": {
      "color": "black",                      // String: min 3 characters
      "plate": "ABC123",                     // String: min 3 characters
      "capacity": 4,                         // Number: min 1
      "vehicleType": "car"                   // Enum: 'car' | 'motorcycle' | 'auto'
    },
    "status": "inactive",                    // Enum: 'active' | 'inactive'
    "location": {
      "lat": null,                           // Number (optional): for GPS tracking
      "lng": null                            // Number (optional): for GPS tracking
    },
    "socketId": null,                        // String (optional): for real-time tracking
    "createdAt": "2026-03-22T10:30:00.000Z", // ISO timestamp
    "updatedAt": "2026-03-22T10:30:00.000Z"  // ISO timestamp
  }
}
```

#### Response - Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "location": "body",
      "param": "email",
      "msg": "Email is required",
      "value": ""
    }
  ]
}
```

#### Response - Invalid Credentials (401 Unauthorized)

```json
{
  "message": "Invalid Email or Password" // Email not found OR password doesn't match
}
```

---

### 3. Get Captain Profile

**Endpoint:** `GET /captains/profile`

**Description:**
Retrieves the authenticated captain's profile information. Requires valid JWT token.

**Authentication:** Required (middleware: `authCaptain`)

#### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... // JWT token in Authorization header
OR
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...         // JWT token in HTTP-only cookie
```

#### Response - Success (200 OK)

```json
{
  "captain": {
    "_id": "507f1f77bcf86cd799439011",       // MongoDB ObjectId
    "fullname": {
      "firstName": "John",                   // String: min 3 characters
      "lastName": "Doe"                      // String (optional): min 3 characters
    },
    "email": "john.doe@example.com",         // String: unique, valid email format
    "vehicle": {
      "color": "black",                      // String: min 3 characters
      "plate": "ABC123",                     // String: min 3 characters
      "capacity": 4,                         // Number: min 1
      "vehicleType": "car"                   // Enum: 'car' | 'motorcycle' | 'auto'
    },
    "status": "inactive",                    // Enum: 'active' | 'inactive'
    "location": {
      "lat": null,                           // Number (optional): for GPS tracking
      "lng": null                            // Number (optional): for GPS tracking
    },
    "socketId": null,                        // String (optional): for real-time tracking
    "createdAt": "2026-03-22T10:30:00.000Z", // ISO timestamp
    "updatedAt": "2026-03-22T10:30:00.000Z"  // ISO timestamp
  }
}
```

#### Response - No Token (401 Unauthorized)

```json
{
  "message": "Unauthorized" // Token is missing or invalid
}
```

#### Response - Blacklisted Token (401 Unauthorized)

```json
{
  "message": "Unauthorized" // Token has been blacklisted (after logout)
}
```

#### Response - Invalid Token (401 Unauthorized)

```json
{
  "message": "Unauthorized" // Token is expired or malformed
}
```

#### Response - Captain Not Found (404 Not Found)

```json
{
  "message": "User not found" // Captain associated with token no longer exists
}
```

---

### 4. Logout Captain

**Endpoint:** `GET /captains/logout`

**Description:**
Logs out a captain by clearing their token and adding it to the blacklist. Prevents token reuse.

**Authentication:** Required (middleware: `authCaptain`)

#### Request Headers

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... // JWT token in Authorization header
OR
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...         // JWT token in HTTP-only cookie
```

#### Response - Success (200 OK)

```json
{
  "message": "logout successfully" // Token cleared and blacklisted
}
```

#### Response - No Token (401 Unauthorized)

```json
{
  "message": "Unauthorized" // Token is missing from request
}
```

#### Response - Blacklisted Token (401 Unauthorized)

```json
{
  "message": "Unauthrized" // Token is already blacklisted (typo in middleware response)
}
```

#### Response - Invalid Token (401 Unauthorized)

```json
{
  "message": "Unauthorized" // Token is expired or malformed
}
```

---

## Database Schema - Captain Model

```
{
  fullname: {
    firstName: String (required, min 3)
    lastName: String (min 3)
  },
  email: String (required, unique, valid email)
  password: String (required, min 6, bcrypt hashed)
  socketId: String (optional, for real-time tracking)
  status: String (enum: ['active', 'inactive'], default: 'inactive')
  vehicle: {
    color: String (required, min 3)
    plate: String (required, min 3)
    capacity: Number (required, min 1)
    vehicleType: String (required, enum: ['car', 'motorcycle', 'auto'])
  },
  location: {
    lat: Number (optional, for GPS tracking)
    lng: Number (optional, for GPS tracking)
  },
  timestamps: true (createdAt, updatedAt)
}
```

---

## Key Features

1. **Password Hashing:** Passwords are hashed using bcrypt with a salt round of 10
2. **Email Uniqueness:** Prevents duplicate email registrations
3. **JWT Authentication:** Generates secure tokens valid for 24 hours
4. **Input Validation:** Uses express-validator for comprehensive request validation
5. **HTTP Cookie Storage:** Token is stored as an HTTP-only cookie for security
6. **Token Blacklisting:** Logout adds token to blacklist to prevent reuse
7. **Status Tracking:** Captains start with 'inactive' status, can be updated later
8. **Location Ready:** Includes lat/lng fields for future GPS tracking features

---

## Security Considerations

- ✅ Passwords are hashed using bcrypt before storage
- ✅ JWT tokens expire after 24 hours
- ✅ Email uniqueness enforced at database level
- ✅ Input validation on all required fields
- ✅ Token stored in HTTP-only cookie (helps prevent XSS attacks)
- ✅ Token blacklisting on logout prevents reuse
- ✅ Bearer token and cookie-based authentication supported
- ⚠️ Ensure `JWT_SECRET` environment variable is set to a strong, unique value
- ⚠️ Use HTTPS in production to protect credentials in transit

---

## Related Files

- **Route Handler:** [src/routes/captain.route.js](../src/routes/captain.route.js)
- **Controller:** [src/controllers/captain.controller.js](../src/controllers/captain.controller.js)
- **Service:** [src/services/captain.service.js](../src/services/captain.service.js)
- **Model:** [src/models/captain.model.js](../src/models/captain.model.js)
- **Middleware:** [src/middleware/auth.middleware.js](../src/middleware/auth.middleware.js)

---

## cURL Examples

### Register Captain
```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

### Login Captain
```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Get Captain Profile
```bash
curl -X GET http://localhost:3000/captains/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Logout Captain
```bash
curl -X GET http://localhost:3000/captains/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## JavaScript/Axios Examples

```javascript
const axios = require('axios');

// Register
axios.post('http://localhost:3000/captains/register', {
  fullname: {
    firstName: "John",
    lastName: "Doe"
  },
  email: "john.doe@example.com",
  password: "password123",
  vehicle: {
    color: "black",
    plate: "ABC123",
    capacity: 4,
    vehicleType: "car"
  }
}).then(res => console.log('Registered:', res.data));

// Login
axios.post('http://localhost:3000/captains/login', {
  email: "john.doe@example.com",
  password: "password123"
}).then(res => {
  const token = res.data.token;
  console.log('Logged in:', res.data);
  
  // Get Profile
  return axios.get('http://localhost:3000/captains/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
}).then(res => console.log('Profile:', res.data));

// Logout
axios.get('http://localhost:3000/captains/logout', {
  headers: { Authorization: `Bearer ${token}` }
}).then(res => console.log('Logged out:', res.data));
```

---

**Last Updated:** March 22, 2026


