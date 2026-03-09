import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppState } from '../store';
import { mealPlan } from '../data/mealPlan';
import type { Recipe } from '../types';
import { Check, ChevronLeft, ChevronRight, Clock, Zap } from 'lucide-react';

function RecipeCard({ recipe, selected, onSelect, completed }: {
    recipe: Recipe; selected: boolean; onSelect: () => void; completed: boolean;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div
            onClick={() => setOpen(o => !o)}
            style={{
                borderRadius: 'var(--radius)', border: `2px solid ${selected ? 'var(--green)' : 'var(--border)'}`,
                background: selected ? 'var(--green-light)' : '#fff', cursor: 'pointer', overflow: 'hidden',
                transition: 'var(--transition)', marginBottom: '0.75rem',
            }}
        >
            <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: recipe.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                    {recipe.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{recipe.name}</div>
                    <div className="recipe-meta">
                        <span><Clock size={12} /> {recipe.prepMin} min</span>
                        <span><Zap size={12} /> {recipe.calories} kcal</span>
                        <span style={{ color: 'var(--green-dark)' }}>💪 {recipe.protein}g prot</span>
                    </div>
                </div>
                {completed && selected && <Check size={20} color="var(--green)" />}
                {!selected && <button onClick={e => { e.stopPropagation(); onSelect(); }}
                    className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>Elegir</button>}
            </div>

            {open && (
                <div style={{ padding: '0 1rem 1rem', borderTop: '1px solid var(--border)' }}>
                    <div className="grid-2" style={{ marginTop: '1rem', gap: '1.25rem' }}>
                        <div>
                            <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: '0.5rem' }}>Ingredientes</p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {recipe.ingredients.map((ing, i) => (
                                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-2)', display: 'flex', gap: 6 }}>
                                        <span style={{ color: 'var(--green)', fontWeight: 700 }}>·</span>
                                        {ing.amount} {ing.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: '0.5rem' }}>Preparación</p>
                            <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {recipe.steps.map((step, i) => (
                                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-2)', display: 'flex', gap: 8 }}>
                                        <span style={{ color: 'var(--green-dark)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>{step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', padding: '0.75rem', background: 'var(--surface2)', borderRadius: 10 }}>
                        {[['🔥', recipe.calories, 'kcal'], ['💪', recipe.protein + 'g', 'prot'], ['🌾', recipe.carbs + 'g', 'carbs'], ['🥑', recipe.fat + 'g', 'grasa']].map(([ico, val, lbl]) => (
                            <div key={String(lbl)} className="macro" style={{ flex: 1 }}>
                                <span style={{ fontSize: '1.2rem' }}>{ico}</span>
                                <span className="macro-val">{val}</span>
                                <span className="macro-lbl">{lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function DailyPlan() {
    const { day: dayParam } = useParams();
    const navigate = useNavigate();
    const { appState, completeMeal, getDayCompletion } = useAppState();
    const [mealTab, setMealTab] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
    const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

    const day = Number(dayParam) || appState.currentDay;
    const plan = mealPlan.find(p => p.day === day);
    const completion = getDayCompletion(day);

    const mealTabs = [
        { key: 'breakfast' as const, label: '🌅 Desayuno', options: plan?.options.breakfast ?? [] },
        { key: 'lunch' as const, label: '☀️ Almuerzo', options: plan?.options.lunch ?? [] },
        { key: 'dinner' as const, label: '🌙 Cena', options: plan?.options.dinner ?? [] },
    ];

    const handleSelect = (meal: typeof mealTab, idx: number) => {
        setSelectedOptions(prev => ({ ...prev, [meal]: idx }));
        completeMeal(day, meal, idx);
    };


    return (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Día {day} de 21</h1>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', marginTop: 2 }}>
                        Elige una opción por comida y márcala como completada.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => navigate(`/plan/${Math.max(1, day - 1)}`)} className="btn btn-ghost btn-sm" disabled={day <= 1}>
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => navigate(`/plan/${Math.min(21, day + 1)}`)} className="btn btn-ghost btn-sm" disabled={day >= 21}>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Calendar strip */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
                {Array.from({ length: 21 }, (_, i) => {
                    const d = i + 1;
                    const done = (getDayCompletion(d)?.completedMeals.length ?? 0) >= 3;
                    const isCurrent = d === day;
                    return (
                        <div key={d} onClick={() => navigate(`/plan/${d}`)}
                            className={`day-dot ${done ? 'done' : isCurrent ? 'current' : 'free'}`}
                            style={{ cursor: 'pointer', flexShrink: 0 }}>
                            {d}
                        </div>
                    );
                })}
            </div>

            {/* Progress */}
            <div style={{ background: 'var(--green-light)', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green-dark)', marginBottom: 6 }}>
                        Comidas del día: {completion?.completedMeals.length ?? 0}/3
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${((completion?.completedMeals.length ?? 0) / 3) * 100}%` }} />
                    </div>
                </div>
                {(completion?.completedMeals.length ?? 0) >= 3 && (
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
                )}
            </div>

            {/* Meal tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: 4 }}>
                {mealTabs.map(t => {
                    const isDone = completion?.completedMeals.includes(t.key);
                    return (
                        <button key={t.key} onClick={() => setMealTab(t.key)}
                            className={`option-tab${mealTab === t.key ? ' active' : ''}`}
                            style={{ position: 'relative', flexShrink: 0 }}>
                            {t.label}
                            {isDone && <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--green)', color: '#fff', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</span>}
                        </button>
                    );
                })}
            </div>

            {/* Options */}
            {mealTabs.find(t => t.key === mealTab)?.options.map((recipe, idx) => {
                const selIdx = selectedOptions[mealTab] ?? completion?.selectedOptions[mealTab] ?? -1;
                const isDone = completion?.completedMeals.includes(mealTab) ?? false;
                return (
                    <RecipeCard key={recipe.id} recipe={recipe}
                        selected={selIdx === idx || (idx === 0 && selIdx === -1 && isDone)}
                        completed={isDone}
                        onSelect={() => handleSelect(mealTab, idx)} />
                );
            })}
        </div>
    );
}
