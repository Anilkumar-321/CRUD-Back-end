const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todos", error });
  }
});

// Add a new todo
router.post("/", async (req, res) => {
  const todoData = req.body;

  try {
    const newTodo = await Todo.create(todoData);
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    await Todo.findByIdAndDelete(todoId);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    // Find the todo by ID
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the 'completed' status
    todo.completed = completed;
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

module.exports = router;
