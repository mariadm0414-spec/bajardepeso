import { useState } from 'react';
import { recipes } from '../data/recipes';
import { Search, Clock, Zap } from 'lucide-react';
import type { Recipe } from '../types';
import { useAppState } from '../store';

const MEALS = ['Todas', 'Desayuno', 'Almuerzo', 'Cena', 'Snack'] as const;

function RecipeModal({ r, onClose }: { r: Recipe; onClose: () => void }) {
    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '1rem' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 'var(--radius-lg) var(--radius-lg) var(--radius) var(--radius)', maxWidth: 540, width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
                <div style={{ height: 200, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
                    {r.emoji}
                </div>
                <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1.3rem', flex: 1 }}>{r.name}</h2>
                        <span className="chip chip-green">{r.category}</span>
                    </div>
                    <div className="recipe-meta" style={{ marginBottom: '1.25rem' }}>
                        <span><Clock size={14} /> {r.prepMin} min</span>
                        <span><Zap size={14} /> {r.calories} kcal</span>
                        <span>💪 {r.protein}g prot</span>
                        <span>⭐ Saciedad {r.satietyScore}/10</span>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', background: 'var(--surface2)', padding: '1rem', borderRadius: 12, marginBottom: '1.25rem' }}>
                        {[['🔥', r.calories, 'kcal'], ['💪', r.protein + 'g', 'prot'], ['🌾', r.carbs + 'g', 'carbs'], ['🥑', r.fat + 'g', 'grasa']].map(([ico, val, lbl]) => (
                            <div key={String(lbl)} className="macro" style={{ flex: 1 }}>
                                <span style={{ fontSize: '1.25rem' }}>{ico}</span>
                                <span className="macro-val">{val}</span>
                                <span className="macro-lbl">{lbl}</span>
                            </div>
                        ))}
                    </div>

                    <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Ingredientes</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.25rem' }}>
                        {r.ingredients.map((ing, i) => (
                            <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.9rem', color: 'var(--text-2)', alignItems: 'center' }}>
                                <span style={{ color: 'var(--green)', fontWeight: 700 }}>·</span>
                                <span style={{ fontWeight: 600 }}>{ing.amount}</span> {ing.name}
                            </li>
                        ))}
                    </ul>

                    <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Preparación</h4>
                    <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {r.steps.map((step, i) => (
                            <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-2)' }}>
                                <span style={{ background: 'var(--green)', color: '#fff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                {step}
                            </li>
                        ))}
                    </ol>

                    <button onClick={onClose} className="btn btn-ghost btn-block" style={{ marginTop: '1.5rem' }}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default function Recipes() {
    const { appState } = useAppState();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<string>('Todas');
    const [mealType, setMealType] = useState<string>('Todas');
    const [selected, setSelected] = useState<Recipe | null>(null);

    const isDiabetes = appState.userGoal === 'diabetes';
    const goalCategories = isDiabetes
        ? ['Todas', 'diabetes', 'postre-diabetico']
        : ['Todas', 'quemagrasa', 'proteina'];

    const filtered = recipes.filter(r => {
        // Filter out recipes that don't belong to the user's goal
        if (isDiabetes && r.category !== 'diabetes' && r.category !== 'postre-diabetico') return false;
        if (!isDiabetes && r.category !== 'quemagrasa' && r.category !== 'proteina') return false;

        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'Todas' || r.category === category;
        const matchMeal = mealType === 'Todas' || r.mealType === mealType;
        return matchSearch && matchCat && matchMeal;
    });

    return (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Recetas 🍽️</h1>
                <p style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>{recipes.length} recetas saludables · Bajo en calorías y alto en proteína</p>
            </div>

            {/* Search */}
            <div style={{ position: 'relative' }}>
                <Search size={18} color="var(--text-3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="input" placeholder="Buscar recetas..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
            </div>

            {/* Filters */}
            <div>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tipo de comida</p>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: 4 }}>
                    {MEALS.map(m => (
                        <button key={m} onClick={() => setMealType(m)}
                            className={`chip ${mealType === m ? 'chip-active' : 'chip-gray'}`}
                            style={{ cursor: 'pointer', flexShrink: 0, padding: '6px 14px', fontSize: '0.8rem' }}>
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Categoría</p>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: 4 }}>
                    {goalCategories.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                            className={`chip ${category === c ? 'chip-active' : 'chip-gray'}`}
                            style={{ cursor: 'pointer', flexShrink: 0, padding: '6px 14px', fontSize: '0.8rem', textTransform: 'capitalize' }}>
                            {c.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {isDiabetes && (
                <div style={{ padding: '1.25rem', background: 'var(--green-light)', borderRadius: 'var(--radius)', border: '1px solid var(--green)', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 4 }}>
                        <span style={{ fontSize: '1.5rem' }}>🍰</span>
                        <h3 style={{ fontWeight: 700, color: 'var(--green-dark)' }}>50 Postres para Diabéticos</h3>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-2)' }}>Disfruta sin culpas con nuestras recetas especialmente diseñadas para mantener tu glucosa bajo control.</p>
                </div>
            )}

            {/* Grid */}
            <div className="grid-auto">
                {filtered.map(r => (
                    <div key={r.id} className="card-hover" onClick={() => setSelected(r)}
                        style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden', background: '#fff', cursor: 'pointer' }}>
                        <div style={{ height: 140, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                            {r.emoji}
                        </div>
                        <div className="recipe-body">
                            <span className="chip chip-green" style={{ marginBottom: 6 }}>{r.mealType}</span>
                            <p className="recipe-name">{r.name}</p>
                            <div className="recipe-meta">
                                <span><Clock size={12} /> {r.prepMin} min</span>
                                <span><Zap size={12} /> {r.calories} kcal</span>
                                <span style={{ color: 'var(--green-dark)', fontWeight: 600 }}>💪 {r.protein}g</span>
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <p style={{ color: 'var(--text-3)', padding: '2rem 0' }}>No se encontraron recetas.</p>}
            </div>

            {selected && <RecipeModal r={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}
