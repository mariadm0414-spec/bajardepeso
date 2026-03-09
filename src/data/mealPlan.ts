import { breakfasts, lunches, dinners } from './recipes';
import type { DayPlan } from '../types';

function pick3<T>(arr: T[], offset: number): T[] {
    const len = arr.length;
    return [
        arr[offset % len],
        arr[(offset + 1) % len],
        arr[(offset + 2) % len],
    ];
}

export const mealPlan: DayPlan[] = Array.from({ length: 21 }, (_, i) => ({
    day: i + 1,
    options: {
        breakfast: pick3(breakfasts, i * 2),
        lunch: pick3(lunches, i * 2),
        dinner: pick3(dinners, i * 2),
    },
}));
