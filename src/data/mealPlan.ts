import { recipes } from './recipes';
import type { DayPlan, Recipe } from '../types';

function pick3(arr: Recipe[], offset: number): Recipe[] {
    const len = arr.length;
    if (len === 0) return [];
    return [
        arr[offset % len],
        arr[(offset + 1) % len],
        arr[(offset + 2) % len],
    ];
}

export const getMealPlan = (goal: 'perder-peso' | 'diabetes' | null): DayPlan[] => {
    const isDiabetes = goal === 'diabetes';

    // Filter recipes based on goal
    const filtered = recipes.filter(r => {
        if (isDiabetes) {
            return r.category === 'diabetes' || r.category === 'postre-diabetico';
        }
        // Weight loss includes quemagrasa, proteina, and the legacy 'Proteína' category
        return r.category === 'quemagrasa' || r.category === 'proteina' || r.category === 'Proteína' || r.category === 'Bajo en calorías';
    });

    const breakfasts = filtered.filter(r => r.mealType === 'Desayuno');
    const lunches = filtered.filter(r => r.mealType === 'Almuerzo');
    const dinners = filtered.filter(r => r.mealType === 'Cena');

    return Array.from({ length: 21 }, (_, i) => ({
        day: i + 1,
        options: {
            breakfast: pick3(breakfasts, i * 2),
            lunch: pick3(lunches, i * 2),
            dinner: pick3(dinners, i * 2),
        },
    }));
};
