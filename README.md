# 🌐 ProConnect — Mini LinkedIn-like Community Platform

A fullstack professional networking platform inspired by LinkedIn. Built using **Node.js**, **Express**, **MongoDB**, and **React** — it enables user authentication, public posts, profile editing, and secure media uploads.

Live Demo:
- 🔗 Frontend: [proconnect.vercel.app](https://pro-connect-cdbh9vtbl-souravs-projects-8b5fe9f7.vercel.app)
- 🔗 Backend: [proconnect-backend.onrender.com](https://proconnect-backend-7dxu.onrender.com)

---

## ✨ Features

### 👤 Authentication & Users
- ✅ Email signup with **verification via Brevo**
- 🔐 Secure **JWT-based login**
- 🔁 **Forgot & Reset password** via email
- 📝 Profile management (bio, name, profile picture)
- 🛡️ Role-based structure (user/admin)

### 📝 Posts & Feed
- 📢 Create and view public posts
- 🧾 View user profiles with all their posts
- 📸 Upload profile pictures via **Cloudinary**

### 🧪 Developer Tools
- 📄 Fully documented with **Swagger UI**
- ✅ Cookie-based auth for secure frontend/backend integration
- 📁 MVC structured backend

---

## 📸 Demo Credentials

```bash
Email: toheni2145@foboxs.com
Password: 12341234

🛠️ Tech Stack
| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Frontend    | React, TailwindCSS, Vite            |
| Backend     | Node.js, Express.js                 |
| Database    | MongoDB + Mongoose                  |
| Auth        | JWT, Bcrypt, Cookies                |
| Email       | Brevo SMTP                          |
| Uploads     | Multer + Cloudinary                 |
| Docs        | Swagger / OpenAPI 3.0               |
| Deployments | Render (backend), Vercel (frontend) |

🚀 Getting Started Locally
# 1. Clone Repo
git clone https://github.com/souravxyz/proConnect
cd proConnect

# 2. Install Dependencies
npm install

# 3. Set Environment Variables
cp .env.example .env

# 4. Run the server
npm run dev

Backend: http://localhost:6969
Frontend: http://localhost:5173

🧪 API Documentation
Swagger UI:
{backend-url}/api-docs

🙌 Acknowledgements

Inspired by LinkedIn UX

Mail service powered by Brevo SMTP

Image upload handled by Cloudinary

Hosting: Render & Vercel

📬 Contact
Made with ❤️ by Sourav Srivastava (https://github.com/souravxyz)
Got feedback? Drop it in an : https://github.com/souravxyz/proConnect/issues!