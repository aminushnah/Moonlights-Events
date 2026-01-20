const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "food",
        "transport",
        "miscellaneous",
        "internet",
        "electricity",
        "rent",
        "employee",
      ],
      required: true,
    },

    expenseType: {
      type: String,
      enum: ["daily", "monthly", "employee"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Employee-related expense
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    deductFromSalary: {
      type: Boolean,
      default: false,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },

    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
