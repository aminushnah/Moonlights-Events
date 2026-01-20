const Expense = require("../models/expenseModel");
const Employee = require("../models/salleryModel");

/**
 * @route POST /api/expenses
 * @desc Create Expense (Daily / Monthly / Employee)
 */
exports.createExpense = async (req, res) => {
  try {
    const {
      title,
      expenseType,
      category,
      amount,
      description,
      employeeId,
      deductFromSalary,
      expenseDate,
    } = req.body;

    // Employee expense validation
    if (expenseType === "employee") {
      if (!employeeId) {
        return res
          .status(400)
          .json({ message: "Employee ID is required for employee expense" });
      }

      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // 🔻 Deduct from salary
      if (deductFromSalary) {
        employee.salary -= amount;
        await employee.save();
      }
    }

    const expense = await Expense.create({
      title,
      expenseType,
      category,
      amount,
      description,
      employeeId: employeeId || null,
      deductFromSalary: deductFromSalary || false,
      expenseDate,
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route GET /api/expenses
 * @desc Get all expenses (filters supported)
 */
exports.getAllExpenses = async (req, res) => {
  try {
    const { expenseType, category, employeeId } = req.query;

    const filter = {};
    if (expenseType) filter.expenseType = expenseType;
    if (category) filter.category = category;
    if (employeeId) filter.employeeId = employeeId;

    const expenses = await Expense.find(filter)
      .populate("employeeId", "name role salary")
      .sort({ expenseDate: -1 });

    res.json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route GET /api/expenses/summary
 * @desc Expense summary (daily / monthly / employee)
 */
exports.getExpenseSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: "$expenseType",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route DELETE /api/expenses/:id
 * @desc Delete expense
 */
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Restore salary if deducted
    if (expense.expenseType === "employee" && expense.deductFromSalary) {
      const employee = await Employee.findById(expense.employeeId);
      if (employee) {
        employee.salary += expense.amount;
        await employee.save();
      }
    }

    await expense.deleteOne();

    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
