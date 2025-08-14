const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  ingredients: { type: [String], required: true, validate: v => Array.isArray(v) && v.length > 0 },
  instructions: { type: String, required: true },
  prepTimeInMinutes: { type: Number, min: [1, "prepTimeInMinutes must be positive"] },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

// Optional: index to quickly find by title
recipeSchema.index({ title: 1 }, { unique: false });

module.exports = mongoose.model('Recipe', recipeSchema);