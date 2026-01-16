
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,

    },
    salary: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true // adds createdAt and updatedAt fields automatically
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
