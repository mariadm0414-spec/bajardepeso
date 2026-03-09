import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, AppState, OnboardingData, MealCompletion } from './types';
import { calculateNutrition } from './nutrition';

// ── Auth Context ──────────────────────────────────────────────────────────
interface AuthContextType {
    user: User | null;
    login: (email: string, name: string) => void;
    logout: () => void;
    completeOnboarding: (data: OnboardingData) => void;
    upgradePremium: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── App Context ───────────────────────────────────────────────────────────
interface AppContextType {
    appState: AppState;
    challengeDay: number;   // real calendar day (1-21), based on startDate
    startChallenge: (startWeight: number) => void;
    completeMeal: (day: number, meal: 'breakfast' | 'lunch' | 'dinner', optionIdx: number) => void;
    uncompleteDay: (day: number) => void;
    logWeight: (weight: number) => void;
    getDayCompletion: (day: number) => MealCompletion | undefined;
    todayProgress: number; // 0-100
    setUserGoal: (goal: 'perder-peso' | 'diabetes') => void;
}

const AppContext = createContext<AppContextType | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────
const defaultAppState: AppState = {
    currentDay: 1,
    isPremiumUnlocked: false,
    startDate: null,
    mealCompletions: [],
    weightLog: [],
    streakDays: 0,
    userGoal: null,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try { return JSON.parse(localStorage.getItem('reto21_user') || 'null'); } catch { return null; }
    });
    const [appState, setAppState] = useState<AppState>(() => {
        try { return JSON.parse(localStorage.getItem('reto21_state') || 'null') ?? defaultAppState; } catch { return defaultAppState; }
    });

    useEffect(() => {
        if (user) localStorage.setItem('reto21_user', JSON.stringify(user));
        else localStorage.removeItem('reto21_user');
    }, [user]);

    useEffect(() => {
        localStorage.setItem('reto21_state', JSON.stringify(appState));
    }, [appState]);

    const login = (email: string, name: string) => {
        try {
            const raw = localStorage.getItem('reto21_user');
            if (raw) {
                const existing: User = JSON.parse(raw);
                // Restore the saved user (keeps onboarding + nutrition intact)
                setUser(existing);
                return;
            }
        } catch { /* ignore parse errors */ }
        // First-time user — no saved data
        const newUser: User = { id: Date.now().toString(), name, email, onboarding: null, nutrition: null, isPremium: false };
        setUser(newUser);
    };

    const logout = () => { setUser(null); setAppState(defaultAppState); };

    const completeOnboarding = (data: OnboardingData) => {
        const nutrition = calculateNutrition(data);
        const now = new Date().toISOString();
        setUser(prev => prev ? { ...prev, onboarding: data, nutrition } : prev);
        // Auto-start the 21-day challenge on the day onboarding is completed
        setAppState(prev => {
            const newState = { ...prev, userGoal: data.userGoal };
            if (prev.startDate) return newState; // already started — don't reset
            return {
                ...newState,
                startDate: now,
                weightLog: data.weight ? [{ date: now, weight: data.weight }] : prev.weightLog,
            };
        });
    };

    const upgradePremium = () => {
        setUser(prev => prev ? { ...prev, isPremium: true } : prev);
        setAppState(prev => ({ ...prev, isPremiumUnlocked: true }));
    };

    const startChallenge = (startWeight: number) => {
        setAppState(prev => ({
            ...prev,
            startDate: prev.startDate ?? new Date().toISOString(),
            weightLog: [{ date: new Date().toISOString(), weight: startWeight }],
        }));
    };

    const completeMeal = (day: number, meal: 'breakfast' | 'lunch' | 'dinner', optionIdx: number) => {
        setAppState(prev => {
            const existing = prev.mealCompletions.find(c => c.day === day);
            if (existing) {
                const updatedCompletions = prev.mealCompletions.map(c =>
                    c.day === day
                        ? {
                            ...c,
                            completedMeals: c.completedMeals.includes(meal)
                                ? c.completedMeals
                                : [...c.completedMeals, meal],
                            selectedOptions: { ...c.selectedOptions, [meal]: optionIdx },
                        }
                        : c
                );
                // Update current day if all 3 meals done
                const updated = updatedCompletions.find(c => c.day === day)!;
                const newCurrentDay = updated.completedMeals.length >= 3 && day >= prev.currentDay
                    ? Math.min(day + 1, 22)
                    : prev.currentDay;
                return { ...prev, mealCompletions: updatedCompletions, currentDay: newCurrentDay };
            } else {
                const newCompletion: MealCompletion = {
                    day,
                    date: new Date().toISOString(),
                    completedMeals: [meal],
                    selectedOptions: { breakfast: 0, lunch: 0, dinner: 0, [meal]: optionIdx },
                };
                return { ...prev, mealCompletions: [...prev.mealCompletions, newCompletion] };
            }
        });
    };

    const uncompleteDay = (day: number) => {
        setAppState(prev => ({
            ...prev,
            mealCompletions: prev.mealCompletions.filter(c => c.day !== day),
        }));
    };

    const logWeight = (weight: number) => {
        setAppState(prev => ({
            ...prev,
            weightLog: [...prev.weightLog, { date: new Date().toISOString(), weight }],
        }));
    };

    const setUserGoal = (goal: 'perder-peso' | 'diabetes') => {
        setAppState(prev => ({ ...prev, userGoal: goal }));
    };

    const getDayCompletion = (day: number) =>
        appState.mealCompletions.find(c => c.day === day);

    // Real calendar day: how many full days have elapsed since startDate
    const challengeDay = appState.startDate
        ? Math.min(21, Math.max(1, Math.floor(
            (Date.now() - new Date(appState.startDate).getTime()) / (1000 * 60 * 60 * 24)
        ) + 1))
        : 1;

    const todayCompletion = getDayCompletion(challengeDay);
    const todayProgress = todayCompletion ? Math.round((todayCompletion.completedMeals.length / 3) * 100) : 0;

    return (
        <AuthContext.Provider value={{ user, login, logout, completeOnboarding, upgradePremium }}>
            <AppContext.Provider value={{ appState, challengeDay, startChallenge, completeMeal, uncompleteDay, logWeight, getDayCompletion, todayProgress, setUserGoal }}>
                {children}
            </AppContext.Provider>
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be inside AppProvider');
    return ctx;
};

export const useAppState = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppState must be inside AppProvider');
    return ctx;
};

// Alias for backwards compatibility if some files still use useAppContext
export const useAppContext = useAppState;
