export interface OnboardingData {
  gender: 'male' | 'female';
  age: number;
  weight: number; // kg
  height: number; // cm
  allergies: string[]; // e.g. ['gluten', 'lactosa']
  userGoal: 'perder-peso' | 'diabetes';
}

export interface NutritionProfile {
  bmr: number;
  tdee: number;
  proteinG: number;
  waterMl: number;
  dailyCalories: number; // TDEE - 500 deficit
}

export interface User {
  id: string;
  name: string;
  email: string;
  onboarding: OnboardingData | null;
  nutrition: NutritionProfile | null;
  isPremium: boolean;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  color: string; // gradient bg color
  mealType: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack';
  category: 'Proteína' | 'Vegano' | 'Bajo en calorías' | 'Mediterránea' | 'Rápido' | 'diabetes' | 'postre-diabetico' | 'quemagrasa' | 'proteina';
  calories: number;
  protein: number; // g
  carbs: number;   // g
  fat: number;     // g
  prepMin: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  satietyScore: number; // 1-10
}

export interface MealOption {
  breakfast: Recipe[];
  lunch: Recipe[];
  dinner: Recipe[];
}

export interface DayPlan {
  day: number;
  options: MealOption;
}

export interface MealCompletion {
  day: number;
  date: string;
  completedMeals: ('breakfast' | 'lunch' | 'dinner')[];
  selectedOptions: { breakfast: number; lunch: number; dinner: number };
}

export interface WeightLog {
  date: string;
  weight: number;
}

export interface AppState {
  currentDay: number;
  isPremiumUnlocked: boolean;
  startDate: string | null;
  mealCompletions: MealCompletion[];
  weightLog: WeightLog[];
  streakDays: number;
  userGoal: 'perder-peso' | 'diabetes' | null;
}

// Alias for backwards-compatibility with any legacy imports
export type DailyMealPlan = DayPlan;
