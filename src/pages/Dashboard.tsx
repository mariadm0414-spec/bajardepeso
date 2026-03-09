import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useAppState } from '../store';
import { formatWater } from '../nutrition';
import { Droplets, Flame, Dumbbell } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuth();
    const { appState, challengeDay, todayProgress, logWeight, getDayCompletion } = useAppState();
    const navigate = useNavigate();
    const [weightInput, setWeightInput] = useState('');

    const n = user?.nutrition;
    const isChallengeDone = challengeDay > 21;
    const currentDay = Math.min(challengeDay, 21);
    const startWeight = appState.weightLog[0]?.weight ?? 0;
    const currentWeight = appState.weightLog.at(-1)?.weight ?? startWeight;
    const lostKg = (startWeight - currentWeight).toFixed(1);

    const handleLogWeight = (e: React.FormEvent) => {
        e.preventDefault();
        if (weightInput) { logWeight(Number(weightInput)); setWeightInput(''); navigate('/progress'); }
    };

    if (isChallengeDone) {
        return (
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'linear-gradient(135deg,#064e3b,#10b981)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', color: '#fff', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🏆</div>
                    <h1 className="serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>¡Reto completado!</h1>
                    <p style={{ opacity: 0.85, maxWidth: 400, margin: '0 auto 1.5rem' }}>
                        Completaste los 21 días. Ahora accede a recetas infinitas para mantener tu progreso.
                    </p>
                    <Link to="/recipes" className="btn" style={{ background: '#fff', color: 'var(--green-dark)' }}>
                        Ver Recetas Infinitas ∞
                    </Link>
                </div>
                <div className="grid-2">
                    <div className="stat-box"><span className="stat-label">Peso perdido</span><span className="stat-value green">{lostKg} kg</span></div>
                    <div className="stat-box"><span className="stat-label">Días completados</span><span className="stat-value">21 / 21</span></div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Hola, {user?.name?.split(' ')[0]} 👋</h1>
                <h2 className="serif" style={{ fontSize: '1.8rem', color: 'var(--green-dark)', marginTop: 4 }}>
                    {appState.userGoal === 'diabetes' ? 'Mi Plan de Salud Glucémica' : 'Mi Reto 21 Días'}
                </h2>
                <p style={{ color: 'var(--text-2)', marginTop: 4 }}>Día {currentDay} de 21 · ¡Sigue así!</p>
            </div>

            {/* Today's progress */}
            <div className="card" style={{ background: 'linear-gradient(135deg,#064e3b,#065f46)', color: '#fff', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Progreso de hoy</div>
                        <div className="serif" style={{ fontSize: '2.5rem', fontWeight: 900 }}>{todayProgress}%</div>
                    </div>
                    <Link to={`/plan/${currentDay}`} className="btn btn-outline-white btn-sm">Ver plan →</Link>
                </div>
                <div className="progress-track" style={{ background: 'rgba(255,255,255,0.2)', height: 10 }}>
                    <div className="progress-fill" style={{ width: `${todayProgress}%`, background: 'rgba(255,255,255,0.9)' }} />
                </div>
                <p style={{ fontSize: '0.8rem', opacity: 0.65, marginTop: 8 }}>Marca tus comidas del día para completar</p>
            </div>

            {/* Main stats */}
            <div className="grid-4">
                <div className="stat-box">
                    <span className="stat-label">Día</span>
                    <span className="stat-value">{currentDay}<small style={{ fontSize: '1rem', color: 'var(--text-3)' }}>/21</small></span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Peso actual</span>
                    <span className="stat-value green">{currentWeight}<small style={{ fontSize: '1rem', color: 'var(--text-3)' }}> kg</small></span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Perdido</span>
                    <span className="stat-value">{lostKg}<small style={{ fontSize: '1rem', color: 'var(--text-3)' }}> kg</small></span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Completados</span>
                    <span className="stat-value">{appState.mealCompletions.filter(c => c.completedMeals.length >= 3).length}<small style={{ fontSize: '1rem', color: 'var(--text-3)' }}> días</small></span>
                </div>
            </div>

            {/* Nutrition stats */}
            {n && (
                <div className="card">
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Tu nutrición personalizada</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {[
                            { icon: <Flame size={20} color="var(--warning)" />, val: `${n.dailyCalories} kcal`, lbl: 'Meta diaria' },
                            { icon: <Dumbbell size={20} color="var(--green)" />, val: `${n.proteinG}g`, lbl: 'Proteína' },
                            { icon: <Droplets size={20} color="#3b82f6" />, val: formatWater(n.waterMl), lbl: 'Agua' },
                        ].map(s => (
                            <div key={s.lbl} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 140 }}>
                                <div style={{ background: 'var(--surface2)', padding: '0.6rem', borderRadius: 10 }}>{s.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{s.val}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{s.lbl}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 21-day calendar mini */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontWeight: 700 }}>Progreso del reto</h3>
                    <Link to="/plan" style={{ fontSize: '0.85rem', color: 'var(--green)', fontWeight: 600 }}>Ver todos →</Link>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {Array.from({ length: 21 }, (_, i) => {
                        const d = i + 1;
                        const done = (getDayCompletion(d)?.completedMeals.length ?? 0) >= 3;
                        const isCurrent = d === currentDay;
                        return (
                            <div key={d} onClick={() => navigate(`/plan/${d}`)}
                                className={`day-dot ${done ? 'done' : isCurrent ? 'current' : 'free'}`}
                                title={`Día ${d}`}
                                style={{ cursor: 'pointer' }}>
                                {d}
                            </div>
                        );
                    })}
                </div>
            </div>



            {/* Log weight */}
            <div className="card">
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Registrar peso de hoy</h3>
                <form onSubmit={handleLogWeight} style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input className="input" type="number" step="0.1" inputMode="decimal" placeholder="Ej: 73.5"
                            value={weightInput} onChange={e => setWeightInput(e.target.value)} style={{ paddingRight: 40 }} />
                        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontWeight: 600, fontSize: '0.85rem' }}>kg</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    );
}
