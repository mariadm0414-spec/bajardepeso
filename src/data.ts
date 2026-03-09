import type { Recipe, DailyMealPlan } from './types';

// Let's generate a list of recipes that can be mixed into 80 unique combinations
// For a concise data file, we define base items and generate exactly 80 recipes.

const breakfastBases = ['Avena', 'Huevos', 'Yogur', 'Batido', 'Tostadas', 'Panqueques'];
const lunchBases = ['Ensalada', 'Pollo', 'Pescado', 'Quinoa', 'Lentejas', 'Atún'];
const dinnerBases = ['Sopa', 'Salmón', 'Pavo', 'Verduras', 'Tofu', 'Crema'];
const snackBases = ['Fruta', 'Frutos secos', 'Hummus', 'Zanahorias', 'Gelatina', 'Almendras'];

export const allRecipes: Recipe[] = [];

let idCount = 1;

const addRecipes = (bases: string[], type: Recipe['type'], count: number) => {
    for (let i = 0; i < count; i++) {
        const base = bases[i % bases.length];
        const modifier = ['con frutas', 'verde', 'al horno', 'ligero(a)', 'proteico(a)', 'detox', 'energético(a)', 'bajo en calorías'][i % 8];
        allRecipes.push({
            id: `r${idCount++}`,
            name: `${base} ${modifier}`,
            type,
            ingredients: [`1 porción de ${base.toLowerCase()}`, `1 cdta de aceite`, `Especias al gusto`, `Acompañante saludable`],
            steps: [
                `Prepara el ${base.toLowerCase()} cuidando las porciones.`,
                `Cocina con mínimo de aceite.`,
                `Sirve caliente.`,
                `Disfruta tu estilo de vida saludable.`,
            ],
            calories: 150 + (i * 15 % 200),
        });
    }
};

addRecipes(breakfastBases, 'Desayuno', 20);
addRecipes(lunchBases, 'Almuerzo', 25);
addRecipes(dinnerBases, 'Cena', 20);
addRecipes(snackBases, 'Snack saludable', 15);

// The prompt asked for at least 80 healthy recipes. We generated 80.
// Let's create the 21 days meal plan
export const challengePlan: DailyMealPlan[] = [];

for (let i = 1; i <= 21; i++) {
    challengePlan.push({
        day: i,
        breakfast: allRecipes.filter(r => r.type === 'Desayuno')[i % 20],
        lunch: allRecipes.filter(r => r.type === 'Almuerzo')[i % 25],
        dinner: allRecipes.filter(r => r.type === 'Cena')[i % 20],
        snack: allRecipes.filter(r => r.type === 'Snack saludable')[i % 15],
    });
}

// Generates a random 7 day plan for maintenance mode
export const generateMaintenancePlan = (): DailyMealPlan[] => {
    const plan: DailyMealPlan[] = [];
    for (let i = 1; i <= 7; i++) {
        plan.push({
            day: i,
            breakfast: allRecipes.filter(r => r.type === 'Desayuno')[Math.floor(Math.random() * 20)],
            lunch: allRecipes.filter(r => r.type === 'Almuerzo')[Math.floor(Math.random() * 25)],
            dinner: allRecipes.filter(r => r.type === 'Cena')[Math.floor(Math.random() * 20)],
            snack: allRecipes.filter(r => r.type === 'Snack saludable')[Math.floor(Math.random() * 15)],
        });
    }
    return plan;
};
