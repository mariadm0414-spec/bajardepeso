import { useState, useMemo } from 'react';
import { getMealPlan } from '../data/mealPlan';
import { useAppState } from '../store';
import { ShoppingCart, CheckCircle2, Circle } from 'lucide-react';

export default function ShoppingList() {
    const { appState } = useAppState();
    const [checked, setChecked] = useState<string[]>([]);

    const currentWeek = Math.ceil(Math.max(1, appState.currentDay) / 7);

    const ingredients = useMemo(() => {
        const map: Record<string, number> = {};
        const start = (currentWeek - 1) * 7 + 1;
        const end = Math.min(start + 6, 21);
        const challengePlan = getMealPlan(appState.userGoal);

        for (let i = start; i <= end; i++) {
            const plan = challengePlan.find(p => p.day === i);
            if (plan) {
                const dayCompletion = appState.mealCompletions.find(c => c.day === i);
                const selections = dayCompletion?.selectedOptions ?? { breakfast: 0, lunch: 0, dinner: 0 };

                const meals = [
                    plan.options.breakfast[selections.breakfast],
                    plan.options.lunch[selections.lunch],
                    plan.options.dinner[selections.dinner],
                ].filter(Boolean);

                meals.forEach(recipe => {
                    recipe.ingredients.forEach(ing => {
                        const key = ing.name.trim();
                        map[key] = (map[key] || 0) + 1;
                    });
                });
            }
        }
        return Object.keys(map).sort();
    }, [currentWeek, appState.userGoal, appState.mealCompletions]);

    const toggle = (item: string) =>
        setChecked(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

    return (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--green)', padding: '0.75rem', borderRadius: '50%' }}>
                    <ShoppingCart size={24} color="#fff" />
                </div>
                <div>
                    <h1 className="serif" style={{ fontSize: '1.8rem' }}>Lista de Compras</h1>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.88rem' }}>Semana {currentWeek} del reto</p>
                </div>
                <span className="chip chip-green" style={{ marginLeft: 'auto' }}>
                    {checked.length}/{ingredients.length}
                </span>
            </div>

            <div className="card" style={{ padding: '0.5rem' }}>
                {ingredients.map((item, i) => {
                    const isChecked = checked.includes(item);
                    return (
                        <div key={i} onClick={() => toggle(item)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '0.85rem 1rem', borderRadius: 10, cursor: 'pointer',
                                background: isChecked ? 'var(--surface2)' : '#fff',
                                transition: 'background 0.2s',
                                borderBottom: i < ingredients.length - 1 ? '1px solid var(--border)' : 'none'
                            }}>
                            {isChecked
                                ? <CheckCircle2 size={22} color="var(--green)" />
                                : <Circle size={22} color="var(--border)" />}
                            <span style={{ flex: 1, fontSize: '0.95rem', color: isChecked ? 'var(--text-3)' : 'var(--text-1)', textDecoration: isChecked ? 'line-through' : 'none' }}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </span>
                        </div>
                    );
                })}
                {ingredients.length === 0 && <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-3)' }}>No hay ingredientes para esta semana.</p>}
            </div>
        </div>
    );
}
