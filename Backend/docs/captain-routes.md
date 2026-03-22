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
