const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
},
    {
        timestamps: true,
    }
);

const TodoModel = mongoose.model("todos", todoSchema);

module.exports = TodoModel;