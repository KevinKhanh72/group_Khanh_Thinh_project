# 🧑‍💻 Auth Fullstack (Frontend + Backend)

Hệ thống **Đăng ký / Đăng nhập / Đăng xuất** cho môn User Management.

## 🧱 Tech stack
- **Frontend:** React + Vite + React Router DOM + Axios  
- **Backend:** Node.js + Express + MongoDB (Mongoose)  
- **Auth:** JSON Web Token (JWT)

---

## ⚙️ Cài đặt & chạy

### 1) Backend (`auth-backend`)
```bash
cd auth-backend
npm install
# .env
# MONGO_URI=mongodb://127.0.0.1:27017/mern_auth_activity1
# JWT_SECRET=supersecret_jwt_key_change_me
# PORT=4000
npm run dev
# -> http://localhost:4000
