const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    referenceId: mongoose.Schema.Types.ObjectId,
    referenceType: {
      type: String,
      enum: ["invoice", "payment", "refund"],
    },
 
    description: String,

    debit: {
      type: Number,
      default: 0,
    },

    credit: {
      type: Number,
      default: 0,
    },

    balance: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ledger", ledgerSchema);
