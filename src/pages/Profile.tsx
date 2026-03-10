import { useState } from 'react';
import { useAuth, useAppState } from '../store';
import { formatWater } from '../nutrition';
import {
    User, Droplets, Flame, Dumbbell, Scale,
    Calendar, CheckCircle, Save, AlertCircle,
} from 'lucide-react';

const ALLERGY_LABELS: Record<string, string> = {
    gluten: '🌾 Gluten', lactosa: '🥛 Lactosa', mariscos: '🦐 Mariscos',
    nueces: '🥜 Frutos secos', huevo: '🥚 Huevo', soya: '🫘 Soya',
};

export default function Profile() {
    const { user, logout } = useAuth();
    const { appState, challengeDay, logWeight } = useAppState();
    const [weightInput, setWeightInput] = useState('');
    const [weightSaved, setWeightSaved] = useState(false);

    const o = user?.onboarding;
    const n = user?.nutrition;
    const startWeight = appState.weightLog[0]?.weight ?? 0;
    const currentWeight = appState.weightLog.at(-1)?.weight ?? startWeight;
    const lostKg = +(startWeight - currentWeight).toFixed(1);
    const completedDays = appState.mealCompletions.filter(c => c.completedMeals.length >= 3).length;
    const joinDate = appState.startDate
        ? new Date(appState.startDate).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
        : '—';

    const handleWeight = (e: React.FormEvent) => {
        e.preventDefault();
        if (!weightInput) return;
        logWeight(Number(weightInput));
        setWeightInput('');
        setWeightSaved(true);
        setTimeout(() => setWeightSaved(false), 2500);
    };

    return (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 560, margin: '0 auto' }}>

            {/* ── Header card ── */}
            <div style={{
                background: 'linear-gradient(135deg, #064e3b, #10b981)',
                borderRadius: 'var(--radius-lg)', padding: '2rem',
                color: '#fff', display: 'flex', alignItems: 'center', gap: '1.25rem',
            }}>
                <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', flexShrink: 0,
                }}>
                    {o?.gender === 'female' ? '👩' : '👨'}
                </div>
                <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.name}</div>
                    <div style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: 2 }}>{user?.email}</div>
                    <div style={{ marginTop: 8, display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '3px 12px', fontSize: '0.78rem', fontWeight: 600 }}>
                            🏅 Día {challengeDay} de 21
                        </span>
                        <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '3px 12px', fontSize: '0.78rem', fontWeight: 600 }}>
                            ✅ {completedDays} días completos
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Datos personales ── */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <User size={18} color="var(--green)" />
                    <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Datos de tu perfil</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                        { label: 'Género', value: o?.gender === 'female' ? 'Mujer' : 'Hombre' },
                        { label: 'Edad', value: o?.age ? `${o.age} años` : '—' },
                        { label: 'Peso inicial', value: startWeight ? `${startWeight} kg` : '—' },
                        { label: 'Estatura', value: o?.height ? `${o.height} cm` : '—' },
                    ].map(item => (
                        <div key={item.label} style={{
                            background: 'var(--surface2)', borderRadius: 'var(--radius)',
                            padding: '0.85rem 1rem',
                        }}>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, fontWeight: 600 }}>
                                {item.label}
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{item.value}</div>
                        </div>
                    ))}
                </div>

                {/* Alergias */}
                {o?.allergies && o.allergies.length > 0 && (
                    <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: 'var(--surface2)', borderRadius: 'var(--radius)' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <AlertCircle size={13} color="var(--warning)" /> Alergias / Intolerancias
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {o.allergies.map(a => (
                                <span key={a} style={{ background: '#fef3c7', color: '#92400e', borderRadius: 999, padding: '3px 10px', fontSize: '0.82rem', fontWeight: 600 }}>
                                    {ALLERGY_LABELS[a] ?? a}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {(!o?.allergies || o.allergies.length === 0) && (
                    <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--surface2)', borderRadius: 'var(--radius)', fontSize: '0.85rem', color: 'var(--text-3)' }}>
                        <AlertCircle size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                        Sin alergias o intolerancias registradas
                    </div>
                )}
            </div>

            {/* ── Nutrición personalizada ── */}
            {n && (
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        <Flame size={18} color="var(--green)" />
                        <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Tu nutrición personalizada</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        {[
                            { icon: <Flame size={18} color="#f59e0b" />, label: 'Meta calórica', value: `${n.dailyCalories} kcal`, sub: `TDEE ${n.tdee} − déficit 500` },
                            { icon: <Dumbbell size={18} color="var(--green)" />, label: 'Proteína diaria', value: `${n.proteinG} g`, sub: `1.8 g × ${o?.weight} kg` },
                            { icon: <Droplets size={18} color="#3b82f6" />, label: 'Agua diaria', value: formatWater(n.waterMl), sub: `35 ml × ${o?.weight} kg` },
                            { icon: <Scale size={18} color="#8b5cf6" />, label: 'Meta calórica BMR', value: `${n.bmr} kcal`, sub: 'Metabolismo basal' },
                        ].map(s => (
                            <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--radius)', padding: '0.85rem 1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>{s.icon}<span style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{s.label}</span></div>
                                <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{s.value}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 2 }}>{s.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Progreso del reto ── */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <Calendar size={18} color="var(--green)" />
                    <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Progreso del reto</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    {[
                        { label: 'Día actual', value: `${challengeDay} / 21` },
                        { label: 'Días completados', value: `${completedDays}` },
                        { label: 'Inicio del reto', value: joinDate },
                    ].map(s => (
                        <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--radius)', padding: '0.75rem', textAlign: 'center' }}>
                            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--green-dark)' }}>{s.value}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 2 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: '0.5rem', fontSize: '0.82rem', color: 'var(--text-3)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Avance general</span><span>{Math.round((completedDays / 21) * 100)}%</span>
                </div>
                <div className="progress-track" style={{ height: 10 }}>
                    <div className="progress-fill" style={{ width: `${(completedDays / 21) * 100}%` }} />
                </div>
            </div>

            {/* ── Registro de peso ── */}
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <Scale size={18} color="var(--green)" />
                    <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Peso actual</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ flex: 1, background: 'var(--green-light)', borderRadius: 'var(--radius)', padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Peso inicial</div>
                        <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--green-dark)', marginTop: 4 }}>{startWeight || '—'} <small style={{ fontSize: '0.9rem' }}>kg</small></div>
                    </div>
                    <div style={{ flex: 1, background: 'var(--green-light)', borderRadius: 'var(--radius)', padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Peso actual</div>
                        <div style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--green-dark)', marginTop: 4 }}>{currentWeight || '—'} <small style={{ fontSize: '0.9rem' }}>kg</small></div>
                    </div>
                    <div style={{ flex: 1, background: lostKg > 0 ? 'var(--green-light)' : 'var(--surface2)', borderRadius: 'var(--radius)', padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Perdido</div>
                        <div style={{ fontWeight: 800, fontSize: '1.4rem', color: lostKg > 0 ? 'var(--green)' : 'var(--text-3)', marginTop: 4 }}>{lostKg > 0 ? `−${lostKg}` : '0'} <small style={{ fontSize: '0.9rem' }}>kg</small></div>
                    </div>
                </div>
                <form onSubmit={handleWeight} style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input className="input" type="number" step="0.1" inputMode="decimal"
                            placeholder="Registrar peso de hoy (kg)"
                            value={weightInput} onChange={e => setWeightInput(e.target.value)}
                            style={{ paddingRight: 40 }} />
                        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontWeight: 600, fontSize: '0.85rem' }}>kg</span>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {weightSaved ? <><CheckCircle size={16} /> ¡Guardado!</> : <><Save size={16} /> Guardar</>}
                    </button>
                </form>
            </div>

            {/* ── Cerrar sesión ── */}
            <button onClick={logout} className="btn btn-ghost" style={{ color: 'var(--danger)', border: '1.5px solid var(--danger)', borderRadius: 'var(--radius)' }}>
                Cerrar sesión
            </button>
        </div>
    );
}
