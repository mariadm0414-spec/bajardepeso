// This file re-exports from the main recipe data so it is compatible
// with any legacy import of src/data.ts. All types match src/types.ts exactly.

export { recipes as allRecipes, breakfasts, lunches, dinners } from './data/recipes';
export { getMealPlan } from './data/mealPlan';
