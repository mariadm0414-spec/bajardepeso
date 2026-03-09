import { useState } from 'react';
import { useAppState } from '../store';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingDown, Target, Droplets } from 'lucide-react';
import { useAuth } from '../store';

export default function WeightTracker() {
    const { user } = useAuth();
    const { appState, logWeight } = useAppState();
    const [input, setInput] = useState('');
    const [inputDate] = useState(new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit' }));

    const n = user?.nutrition;
    const log = appState.weightLog;
    const startWeight = log[0]?.weight ?? 0;
    const currentWeight = log.at(-1)?.weight ?? startWeight;
    const lost = startWeight - currentWeight;

    const data = log.map((entry, i) => ({
        name: `#${i + 1}`,
        peso: entry.weight,
        fecha: new Date(entry.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
    }));

    const handleLog = (e: React.FormEvent) => {
        e.preventDefault();
        if (input) { logWeight(Number(input)); setInput(''); }
    };

    return (
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Mi Progreso 📊</h1>
                <p style={{ color: 'var(--text-2)', marginTop: 2 }}>Registra tu peso diariamente para seguir tu evolución.</p>
            </div>

            {/* Stats */}
            <div className="grid-3">
                <div className="stat-box" style={{ borderTop: '3px solid var(--green)' }}>
                    <Target size={20} color="var(--text-3)" style={{ marginBottom: 6 }} />
                    <span className="stat-label">Peso inicial</span>
                    <span className="stat-value">{startWeight}<small style={{ fontSize: '0.9rem', color: 'var(--text-3)' }}> kg</small></span>
                </div>
                <div className="stat-box" style={{ borderTop: '3px solid #3b82f6' }}>
                    <TrendingDown size={20} color="var(--text-3)" style={{ marginBottom: 6 }} />
                    <span className="stat-label">Peso actual</span>
                    <span className="stat-value green">{currentWeight}<small style={{ fontSize: '0.9rem', color: 'var(--text-3)' }}> kg</small></span>
                </div>
                <div className="stat-box" style={{ background: 'var(--green)', borderTop: '3px solid var(--green-dark)' }}>
                    <TrendingDown size={20} color="rgba(255,255,255,0.7)" style={{ marginBottom: 6 }} />
                    <span className="stat-label" style={{ color: '#a7f3d0' }}>Total perdido</span>
                    <span className="stat-value" style={{ color: '#fff' }}>{lost.toFixed(1)}<small style={{ fontSize: '0.9rem', color: '#a7f3d0' }}> kg</small></span>
                </div>
            </div>

            {/* Chart */}
            <div className="card">
                <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>Gráfica de peso</h3>
                {data.length < 2 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-3)' }}>
                        Registra al menos 2 pesos para ver tu gráfica de progreso.
                    </div>
                ) : (
                    <div style={{ height: 260 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                                <XAxis dataKey="fecha" stroke="var(--text-3)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-3)" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: 'var(--shadow)', fontFamily: 'DM Sans, sans-serif' }} formatter={(val) => [`${val} kg`, 'Peso']} />
                                <Line type="monotone" dataKey="peso" stroke="var(--green)" strokeWidth={3}
                                    dot={{ stroke: 'var(--green-dark)', strokeWidth: 2, r: 5, fill: '#fff' }}
                                    activeDot={{ r: 7, fill: 'var(--green)' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Log form */}
            <div className="card">
                <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Registrar peso de hoy ({inputDate})</h3>
                <form onSubmit={handleLog} style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input className="input" type="number" step="0.1" inputMode="decimal" placeholder="Ej: 73.2"
                            value={input} onChange={e => setInput(e.target.value)} style={{ paddingRight: 44 }} />
                        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontWeight: 600 }}>kg</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>

            {/* Weight history */}
            {log.length > 0 && (
                <div className="card">
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Historial</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {[...log].reverse().map((entry, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--surface2)', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-2)', fontSize: '0.88rem' }}>
                                    {new Date(entry.date).toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' })}
                                </span>
                                <span style={{ fontWeight: 700, color: i === 0 ? 'var(--green-dark)' : 'var(--text)' }}>
                                    {entry.weight} kg
                                    {i === 0 && <span className="chip chip-green" style={{ marginLeft: 8, fontSize: '0.7rem' }}>Hoy</span>}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Nutrition reminders */}
            {n && (
                <div className="card" style={{ background: 'var(--green-light)', border: 'none' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', color: 'var(--green-dark)' }}>Recordatorios diarios</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem' }}>
                            <Droplets size={18} color="#3b82f6" /> <span>Bebe <strong>{(n.waterMl / 1000).toFixed(1)}L</strong> de agua hoy</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem' }}>
                            💪 <span>Meta de proteína: <strong>{n.proteinG}g</strong> al día</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem' }}>
                            🔥 <span>Objetivo calórico: <strong>{n.dailyCalories} kcal</strong></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
