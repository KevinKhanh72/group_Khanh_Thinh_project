# Group Khanh Thinh Project

Dự án full-stack quản lý người dùng với React (frontend) và Node.js/Express (backend).

## Cấu trúc dự án
- `backend/`: Server Node.js với Express, MongoDB (tùy chọn), JWT auth.
- `src/`: Frontend React app.

## Setup và Chạy

### 1. Clone repo
```bash
git clone <repo-url>
cd group_Khanh_Thinh_project
```

### 2. Cài dependencies
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Cấu hình environment (tùy chọn)
- Copy `backend/.env.example` thành `backend/.env`
- Điền thông tin MongoDB và JWT_SECRET nếu cần.

*Lưu ý: Dự án demo dùng in-memory storage, không cần MongoDB.*

### 4. Chạy ứng dụng
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem app.

## API Endpoints
- `GET /api/users`: Lấy danh sách user
- `POST /api/users`: Thêm user (body: {name, email})
- `DELETE /api/users/:id`: Xóa user
- `PUT /api/users/:id/role`: Cập nhật role

## Công nghệ sử dụng
- Frontend: React, Axios
- Backend: Node.js, Express, JWT, MongoDB (optional)(https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
