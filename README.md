# 📝 Mini LinkedIn-like Community Platform API

A Node.js + Express RESTful API for a professional community platform inspired by LinkedIn — featuring user authentication, profile management, public post feeds, and secure media uploads. Built using MongoDB with full Swagger/OpenAPI documentation.

---

## 🚀 Features

### 👤 User & Authentication

- **Signup with Email Verification**  
  Register with secure email confirmation via Brevo SMTP.

- **JWT-based Login**  
  Stateless authentication using JSON Web Tokens.

- **Forgot/Reset Password**  
  Reset password via secure email link.

- **Profile Management**  
  View and update profile (name, bio, and profile picture).

- **Roles**  
  Role-based logic for `user` and `admin`.

---

### 📝 Public Feed & Posts

- **Create Posts**  
  Authenticated users can create text-only posts.

- **Home Feed**  
  Publicly viewable feed of all posts with author's name & timestamp.

- **User Profiles**  
  View any user’s public profile and their posts.

- **Profile Picture Uploads**  
  (Optional) Upload profile pictures using Multer + Cloudinary.

---

### 📘 API Documentation

- Swagger UI available at [`/api-docs`](http://localhost:6969/api-docs)
- Fully described using OpenAPI 3.0 (`swagger.yaml`)

---

## 🧰 Tech Stack

| Layer         | Tech                         |
| ------------- | ---------------------------- |
| Backend       | Node.js, Express.js          |
| Database      | MongoDB + Mongoose           |
| Authentication| JWT, Bcrypt                  |
| Email         | Brevo SMTP (Verify & Reset)  |
| File Upload   | Multer, Cloudinary           |
| Docs          | Swagger / OpenAPI 3.0        |

---

## 📁 Project Structure

mini-linkedin-api/
├── app/
│ ├── config/
│ │ ├── db.js
│ │ ├── email.js
│ │ ├── cloudinary.js
│ │ └── swagger.js
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── userController.js
│ │ └── postController.js
│ ├── middleware/
│ │ ├── auth.js
│ │ ├── upload.js
│ ├── models/
│ │ ├── User.js
│ │ └── Post.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── userRoutes.js
│ │ ├── postRoutes.js
├── uploads/ # Temp folder for uploads
├── docs/
│ └── swagger.yaml
├── .env
├── app.js

---

## 📦 Installation & Setup (Local)

```bash
# Clone the repo
git clone https://github.com/your-username/mini-linkedin-api
cd mini-linkedin-api

# Install dependencies
npm install

# Copy and edit environment variables
cp .env.example .env

# Start server (dev mode)
npm run dev

Server runs at: http://localhost:6969
Frontend can connect via: http://localhost:6969/api/

# Environment Variables 

MONGO_URI=your_mongodb_connection_string
PORT=6969
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=30d

BASE_URL=http://localhost:6969
CLIENT_URL=http://localhost:5173

EMAIL_SERVICE=brevo
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_pass
EMAIL_FROM=your@email.com

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

DEFAULT_ROLE=user

