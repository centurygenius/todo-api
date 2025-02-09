const TodoModel = require("../models/todoModel");

// Create a new Todo
async function createTodoController(req, res) {
  try {
    const { title, description, status, dueDate, assignedTo } = req.body;

    if (!title || !description || !status || !dueDate || !assignedTo || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTodo = new TodoModel({
      title,
      description,
      status,
      dueDate,
      assignedTo,
      createdBy: req.user.id, // User from JWT
    });

    const savedTodo = await newTodo.save();
    if(!savedTodo){
        return res.status(400).json({ message: "Todo not saved" });
    }
    res.status(201).json({ message: "Todo created successfully", todo: savedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
}

// Get all Todos
async function getAllTodosController(req, res) {
  try {
    const todos = await TodoModel.find()
      .populate("createdBy", "name  email")
      .populate("assignedTo", "name  email");

    if (todos.length === 0) {
        return res.status(404).json({ message: "Todo not found" });
      }
    res.status(200).json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ message: "Error fetching todos", error });
  }
}

// Get a single Todo by ID
async function getSingleTodoController(req, res) {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id)
      .populate("createdBy", "name  email")
      .populate("assignedTo", "name  email");

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ todo });
  } catch (error) {
    console.error("Error fetching todo:", error.message);
    res.status(500).json({ message: "Error fetching todo", error });
  }
}

// Update a Todo
async function updateTodoController(req, res) {
  try {
    const { id } = req.params;
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ message: "Error updating todo", error });
  }
}

// Delete a Todo
async function deleteTodoController(req, res) {
  try {
    const { id } = req.params;
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ message: "Error deleting todo", error });
  }
}

module.exports = {
  createTodoController,
  getAllTodosController,
  getSingleTodoController,
  updateTodoController,
  deleteTodoController,
};
