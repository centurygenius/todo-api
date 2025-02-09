const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRolesMiddleware = require("../middlewares/roleMiddleware");

const {
  createTodoController,
  getAllTodosController,
  getSingleTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controllers/todoController");

// =================== TODO ROUTES ===================
// User - Personal Todo Management

router.post("/create", authMiddleware, authorizeRolesMiddleware("user", "manager", "admin"), createTodoController);
router.get("/all", authMiddleware, authorizeRolesMiddleware("admin", "manager", "user"), getAllTodosController);
router.get("/get/:id", authMiddleware, authorizeRolesMiddleware("admin", "manager", "user"), getSingleTodoController);
router.put("/update/:id", authMiddleware, authorizeRolesMiddleware("admin", "manager", "user"), updateTodoController);
router.delete("/delete/:id", authMiddleware, authorizeRolesMiddleware("admin", "manager", "user"), deleteTodoController);

// Manager - Can manage all users' todos

router.get("/team-todos", authMiddleware, authorizeRolesMiddleware("admin", "manager"), getAllTodosController);  

// Admin - Full system access

router.get("/admin-todos", authMiddleware, authorizeRolesMiddleware("admin"), getAllTodosController); 
router.delete("/admin-delete/:id", authMiddleware, authorizeRolesMiddleware("admin"), deleteTodoController); 


module.exports = router;
