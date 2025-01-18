# Flipkart Clone

This project demonstrates how to implement Google OAuth authentication using JWT (JSON Web Tokens) for stateless, secure user authentication.

---

## Features

- Google OAuth 2.0 Authentication
- Stateless authentication using JWT
- Protect routes with JWT middleware
- MongoDB integration for user data storage

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---

## Getting Started

Follow these steps to run the project locally:

### 1. Clone this repository

```bash
git clone <repository-url>
```

### 2. Navigate to the backend directory

```bash
cd backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Set up your `.env` file

Create a `.env` file in the root of the `backend` directory and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/oauth-jwt
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=3000
```

- Replace `your-google-client-id` and `your-google-client-secret` with your Google API credentials.
- Replace `your-jwt-secret` with a secure secret key for signing JWTs.

### 6. Access the application

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

### Authentication Endpoints

#### 1. **Google OAuth Login**
   - **Endpoint:** `/auth/google`
   - **Method:** GET
   - **Description:** Initiates Google OAuth flow.

#### 2. **Google OAuth Callback**
   - **Endpoint:** `/auth/google/callback`
   - **Method:** GET
   - **Description:** Handles OAuth callback, generates JWT token, and returns it as JSON.

#### Example Response:
```json
{
  "message": "Login successful",
  "token": "<jwt-token>"
}
```

---

### Protected Endpoints

#### 1. **Protected Route**
   - **Endpoint:** `/protected`
   - **Method:** GET
   - **Headers:**
     - `Authorization: Bearer <jwt-token>`
   - **Description:** Access protected resource using a valid JWT token.

#### Example Response:
```json
{
  "message": "Access granted",
  "user": {
    "_id": "user-id",
    "googleId": "google-id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

---

## Folder Structure

```
backend/
├── config/
│   └── passport-setup.js   # Google OAuth configuration
├── models/
│   └── userModel.js        # Mongoose schema for user data
├── routes/
│   ├── authRoutes.js       # Routes for Google OAuth
│   └── userRoutes.js       # Routes for user-related actions
├── .env                    # Environment variables
├── server.js               # Main server file
└── package.json            # Project dependencies and scripts
```

---

## Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for building APIs
- **Passport.js**: Authentication middleware
- **JSON Web Tokens (JWT)**: Stateless authentication
- **MongoDB**: NoSQL database for storing user data

---

## License

This project is licensed under the MIT License. Feel free to use it as a starting point for your own projects!

---

## Contributions

Contributions are welcome! Feel free to submit a pull request or open an issue if you encounter any bugs or have feature suggestions.

---

## Acknowledgments

- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)

