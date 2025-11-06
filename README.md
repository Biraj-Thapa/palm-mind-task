## PalmMind Chat Application

A real-time chat application built with **Node.js, Express, MongoDB, Socket.IO, React, Redux, and TailwindCSS**. Users can register, login, chat in real-time, and see the online user count..

## Features

- User authentication (JWT-based)
- CRUD operations for users
- Real-time messaging with Socket.IO
- Persist chat history in MongoDB
- Show total users and online count
- Live UI updates for messages and users
- Form validation with Formik & Yup
-  Toast notifications
---

## Tech Stack

###  Frontend

- **React**
- **Redux Toolkit**
- **Axios**
- **Formik + Yup**
- **Tailwind CSS**
- **Socket.IO Client**

###  Backend

- **Express.js**
- **MongoDB + Mongoose**
- **Socket.IO**
- **bcrypt**
- **jsonwebtoken**

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Biraj-Thapa/palm-mind-task.git
cd palm-mind-task
```

---

2. **Setup Backend**

```bash
cd backend
npm i
```

2. **Setup Frontend**

```bash
cd frontend
npm i
```

3. **Setup dotenv inside backend**

```bash
PORT=your_port_here
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ORIGIN=your_client_origin_here
```

4. **Setup dotenv inside frontend**

```bash
VITE_API_URL=your_vite_api_url_here
VITE_SOCKET_URL=your_vite_socket_url_here
```

5. **Starting Project**

```bash
Frontend= npm run dev
Backend= npm run dev
```

---


