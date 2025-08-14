/**
 * Digital Cookbook - Mongoose CRUD demo
 * Run: npm install && cp .env.example .env && edit .env, then: npm start
 */
const { connectDB, disconnectDB } = require('./db');
const Recipe = require('./models/recipe');

async function createRecipe() {
  const doc = new Recipe({
    title: "Classic Tomato Soup",
    description: "A simple and delicious homemade tomato soup.",
    ingredients: ["Tomatoes", "Onion", "Garlic", "Vegetable Broth", "Olive Oil"],
    instructions: "1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend.",
    prepTimeInMinutes: 30
  });
  const saved = await doc.save();
  console.log("🍅 Created recipe:", saved);
  return saved;
}

async function findAllRecipes() {
  const all = await Recipe.find({}).lean();
  console.log("📚 All recipes:", all);
  return all;
}

async function findRecipeByTitle(title) {
  const one = await Recipe.findOne({ title }).lean();
  console.log("🔎 Found by title:", one);
  return one;
}

async function updateRecipeDescription(title, newDescription) {
  const updated = await Recipe.findOneAndUpdate(
    { title },
    { $set: { description: newDescription } },
    { new: true, runValidators: true }
  ).lean();
  console.log("✏️  Updated recipe:", updated);
  return updated;
}

async function deleteRecipe(title) {
  const res = await Recipe.deleteOne({ title });
  console.log(`🗑️  Deleted "${title}"?`, res.deletedCount === 1 ? "Yes" : "No (not found)");
  return res.deletedCount === 1;
}

async function main() {
  await connectDB();
  try {
    await createRecipe();
    await findAllRecipes();
    await findRecipeByTitle("Classic Tomato Soup");
    await updateRecipeDescription("Classic Tomato Soup", "Updated soup description.");
    // Show again after update
    await findRecipeByTitle("Classic Tomato Soup");
    await deleteRecipe("Classic Tomato Soup");
    // Show counts after delete
    const afterDelete = await Recipe.countDocuments({ title: "Classic Tomato Soup" });
    console.log("🔢 Count after delete:", afterDelete);
  } catch (err) {
    console.error("🚨 Error in script:", err);
  } finally {
    await disconnectDB();
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipeByTitle,
  updateRecipeDescription,
  deleteRecipe
};