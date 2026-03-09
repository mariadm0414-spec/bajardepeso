import { useState, useMemo } from 'react';
import { challengePlan } from '../data';
import { useAppContext } from '../store';
import { ShoppingCart, CheckCircle2, Circle } from 'lucide-react';

export default function ShoppingList() {
    const { state } = useAppContext();
    const [checked, setChecked] = useState<string[]>([]);

    const currentWeek = Math.ceil(Math.max(1, state.currentDay) / 7);

    const ingredients = useMemo(() => {
        const map: Record<string, number> = {};
        const start = (currentWeek - 1) * 7 + 1;
        const end = Math.min(start + 6, 21);
        for (let i = start; i <= end; i++) {
            const plan = challengePlan.find(p => p.day === i);
            if (plan) {
                [plan.breakfast, plan.lunch, plan.dinner, plan.snack].forEach(meal =>
                    meal.ingredients.forEach(ing => {
                        const key = ing.replace(/^[\d\s]+/, '').trim();
                        map[key] = (map[key] || 0) + 1;
                    })
                );
            }
        }
        return Object.keys(map).sort();
    }, [currentWeek]);

    const toggle = (item: string) =>
        setChecked(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

    return (
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--green)', padding: '0.75rem', borderRadius: '50%' }}>
                    <ShoppingCart size={24} color="#fff" />
                </div>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}>Lista de Compras</h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.88rem' }}>Semana {currentWeek} del reto</p>
                </div>
                <span style={{ marginLeft: 'auto', background: 'var(--green-light)', color: 'var(--green-dark)', fontSize: '0.8rem', fontWeight: 700, padding: '4px 12px', borderRadius: 50 }}>
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
                                background: isChecked ? '#fafafa' : '#fff',
                                transition: 'background 0.2s',
                                borderBottom: i < ingredients.length - 1 ? '1px solid #f0f0f0' : 'none'
                            }}>
                            {isChecked
                                ? <CheckCircle2 size={22} color="var(--green)" />
                                : <Circle size={22} color="#ccc" />}
                            <span style={{ flex: 1, fontSize: '0.95rem', color: isChecked ? '#bbb' : 'var(--text-dark)', textDecoration: isChecked ? 'line-through' : 'none' }}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
