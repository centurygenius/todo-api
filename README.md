# Todo App - RESTful API

## Introduction
This is a RESTful API for a Todo application built using **Node.js, Express.js, and MongoDB**. The API includes authentication, email verification, password reset, and role-based access control (RBAC) for users, managers, and admins.

---

## Features
- User authentication (Signup, Signin, Signout) including JWT for token-based authentication
- Email verification
- Password reset functionality
- CRUD operations for todos
- Role-based access control (RBAC)
- Token blacklisting for logout security

---

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)
- **Email Services:** Nodemailer

---

## Installation & Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/todo-api.git
cd todo-api
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory and add the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/tododb
PORT=3000
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
BASE_URL=http://localhost:3000
```

### **4. Start the Server**
```sh
npm start
```
The API will be available at: **`http://localhost:3000`**

---

## API Documentation

### **Authentication Routes**
| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/api/users/signup`       | User Registration          |
| POST   | `/api/users/signin`       | User Login                 |
| POST   | `/api/users/signout`      | User Logout                |
| GET    | `/api/users/verify-email` | Email Verification         |
| POST   | `/api/users/request-password-reset` | Request Password Reset |
| POST   | `/api/users/reset-password` | Reset Password             |

### **Todo Routes**
| Method | Endpoint                   | Roles Allowed              | Description                  |
|--------|----------------------------|----------------------------|------------------------------|
| POST   | `/api/todos/create`         | User, Manager, Admin      | Create a new todo            |
| GET    | `/api/todos/all`            | User, Manager, Admin      | Get all todos                |
| GET    | `/api/todos/get/:id`        | User, Manager, Admin      | Get single todo by ID        |
| PUT    | `/api/todos/update/:id`     | User, Manager, Admin      | Update a todo                |
| DELETE | `/api/todos/delete/:id`     | User, Manager, Admin      | Delete a todo                |
| GET    | `/api/todos/team-todos`     | Manager, Admin           | Get all team todos           |
| GET    | `/api/todos/admin-todos`    | Admin                     | Get all todos (admin only)   |
| DELETE | `/api/todos/admin-delete/:id` | Admin                     | Delete any todo (admin only) |

---

## Database Schema

### **User Model**
```js
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "manager", "user"], default: "user" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
});
```

### **Todo Model**
```js
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
}, { timestamps: true });
```

### **Token Blacklist Model**
```js
const tokenBlacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
});
```

---

## Sample `.env` File
```env
MONGODB_URI=mongodb://localhost:27017/tododb
PORT=3000
JWT_SECRET=your_secret_key
EMAIL_USER=test@example.com
EMAIL_PASS=testpassword123
BASE_URL=http://localhost:3000
```

---

## Testing with Postman

### **1. Sign Up (User Registration)**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/users/signup`
- **Body:**
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}
```

### **2. Sign In (Get JWT Token)**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/users/signin`
- **Body:**
```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```
- **Response:**
```json
{
    "message": "Login successful",
    "token": "your-jwt-token"
}
```

### **3. Create Todo**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/todos/create`
- **Headers:**
```
Authorization: Bearer your-jwt-token
Content-Type: application/json
```
- **Body:**
```json
{
    "title": "Complete API Documentation",
    "description": "Write documentation for the todo API",
    "dueDate": "2025-02-15",
    "assignedTo": "user_id_here",
    "createdBy": "user_id_here"
}
```

### **4. Logout (Token Blacklisting)**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/users/signout`
- **Headers:**
```
Authorization: Bearer your-jwt-token
```
- **Response:**
```json
{
    "message": "Logout successful"
}
```

---

## Contributing
1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push the branch and submit a PR.

---

## Author
Abiona Samuel Olawuyi(samuelo.abiona@gmail.com)

---

## License
This project is licensed.

