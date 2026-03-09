import type { OnboardingData, NutritionProfile } from './types';

export function calculateNutrition(data: OnboardingData): NutritionProfile {
    const { gender, age, weight, height } = data;

    // Mifflin-St Jeor BMR
    let bmr: number;
    if (gender === 'male') {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
    }

    const tdee = Math.round(bmr * 1.375); // Lightly active
    const dailyCalories = Math.max(1200, tdee - 500); // 500 kcal deficit, min 1200
    const proteinG = Math.round(weight * 1.8); // 1.8g/kg for high satiety
    const waterMl = Math.round(weight * 35); // 35ml/kg

    return {
        bmr: Math.round(bmr),
        tdee,
        dailyCalories,
        proteinG,
        waterMl,
    };
}

export function formatWater(ml: number): string {
    if (ml >= 1000) return `${(ml / 1000).toFixed(1)} L`;
    return `${ml} ml`;
}
