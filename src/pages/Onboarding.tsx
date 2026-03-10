import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, useAppState } from '../store';
import type { OnboardingData } from '../types';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';

type Step = 'goal' | 'gender' | 'body' | 'allergies' | 'done';
const steps: Step[] = ['goal', 'gender', 'body', 'allergies', 'done'];

const ALLERGY_OPTIONS = [
    { val: 'gluten', label: 'Gluten', emoji: '🌾' },
    { val: 'lactosa', label: 'Lactosa', emoji: '🥛' },
    { val: 'mariscos', label: 'Mariscos', emoji: '🦐' },
    { val: 'nueces', label: 'Frutos secos', emoji: '🥜' },
    { val: 'huevo', label: 'Huevo', emoji: '🥚' },
    { val: 'soya', label: 'Soya', emoji: '🫘' },
];

export default function Onboarding() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { completeOnboarding } = useAuth();
    const { setUserGoal } = useAppState();

    const [step, setStep] = useState(() => {
        // If goal is pre-selected via URL, skip the goal selection step
        return searchParams.get('goal') ? 1 : 0;
    });
    const [data, setData] = useState<Partial<OnboardingData>>(() => {
        const goal = searchParams.get('goal') as 'perder-peso' | 'diabetes' | null;
        if (goal) {
            // We can't call setUserGoal here directly in useState initializer during SSR or if it causes side effects
            // but in React client side it might be okay. Better to use useEffect.
        }
        return { allergies: [], userGoal: goal || undefined };
    });

    useEffect(() => {
        const goal = searchParams.get('goal') as 'perder-peso' | 'diabetes' | null;
        if (goal) {
            setUserGoal(goal);
        }
    }, [searchParams, setUserGoal]);

    const currentStep = steps[step];

    const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
    const prev = () => setStep(s => Math.max(s - 1, 0));

    const toggleAllergy = (val: string) => {
        setData(d => {
            const current = d.allergies ?? [];
            const updated = current.includes(val)
                ? current.filter(a => a !== val)
                : [...current, val];
            return { ...d, allergies: updated };
        });
    };

    const finish = () => {
        if (data.userGoal && data.gender && data.age && data.weight && data.height) {
            completeOnboarding({
                ...data,
                allergies: data.allergies ?? [],
            } as OnboardingData);
            navigate('/');
        }
    };

    const pct = Math.round(((step + 1) / steps.length) * 100);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <div style={{ width: '100%', maxWidth: 480 }}>
                {/* Progress */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.82rem', color: 'var(--text-3)' }}>
                        <span>Paso {step + 1} de {steps.length}</span>
                        <span>{pct}%</span>
                    </div>
                    <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                </div>

                <div className="card fade-up" style={{ padding: '2rem' }}>

                    {/* ── Step 0: Goal ── */}
                    {currentStep === 'goal' && (
                        <div>
                            <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>¡Hola! 👋</h2>
                            <p style={{ color: 'var(--text-2)', marginBottom: '2rem' }}>¿Cuál es tu objetivo principal hoy?</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                {[
                                    { val: 'perder-peso', label: 'Perder 7 kilos en 21 días (Sin gimnasio)', emoji: '🔥' },
                                    { val: 'diabetes', label: 'Alimentación para Diabéticos (550 Recetas y Postres)', emoji: '🩺' },
                                ].map(g => (
                                    <button key={g.val}
                                        onClick={() => {
                                            const val = g.val as 'perder-peso' | 'diabetes';
                                            setData(d => ({ ...d, userGoal: val }));
                                            setUserGoal(val);
                                        }}
                                        style={{
                                            padding: '1.5rem', borderRadius: 'var(--radius)',
                                            border: `2px solid ${data.userGoal === g.val ? 'var(--green)' : 'var(--border)'}`,
                                            background: data.userGoal === g.val ? 'var(--green-light)' : '#fff',
                                            cursor: 'pointer', transition: 'var(--transition)',
                                            display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left'
                                        }}>
                                        <span style={{ fontSize: '2rem' }}>{g.emoji}</span>
                                        <span style={{ fontWeight: 600, color: data.userGoal === g.val ? 'var(--green-dark)' : 'var(--text)' }}>{g.label}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={next} disabled={!data.userGoal} className="btn btn-primary btn-block">
                                Continuar <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* ── Step 1: Gender ── */}
                    {currentStep === 'gender' && (
                        <div>
                            <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Tu género</h2>
                            <p style={{ color: 'var(--text-2)', marginBottom: '2rem' }}>¿Con qué género te identificas?</p>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                {[
                                    { val: 'male', label: 'Hombre', emoji: '👨' },
                                    { val: 'female', label: 'Mujer', emoji: '👩' },
                                ].map(g => (
                                    <button key={g.val}
                                        onClick={() => setData(d => ({ ...d, gender: g.val as 'male' | 'female' }))}
                                        style={{
                                            flex: 1, padding: '1.5rem', borderRadius: 'var(--radius)',
                                            border: `2px solid ${data.gender === g.val ? 'var(--green)' : 'var(--border)'}`,
                                            background: data.gender === g.val ? 'var(--green-light)' : '#fff',
                                            cursor: 'pointer', transition: 'var(--transition)',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                                        }}>
                                        <span style={{ fontSize: '2.5rem' }}>{g.emoji}</span>
                                        <span style={{ fontWeight: 700, color: data.gender === g.val ? 'var(--green-dark)' : 'var(--text)' }}>{g.label}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={next} disabled={!data.gender} className="btn btn-primary btn-block">
                                Continuar <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* ── Step 2: Body data ── */}
                    {currentStep === 'body' && (
                        <div>
                            <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Tus medidas</h2>
                            <p style={{ color: 'var(--text-2)', marginBottom: '2rem' }}>Calculamos tu plan personalizado con estos datos.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                                {[
                                    { label: 'Edad (años)', key: 'age', placeholder: '28', unit: 'años', min: 14, max: 80 },
                                    { label: 'Peso actual (kg)', key: 'weight', placeholder: '72', unit: 'kg', min: 30, max: 300 },
                                    { label: 'Estatura (cm)', key: 'height', placeholder: '165', unit: 'cm', min: 120, max: 230 },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="label">{f.label}</label>
                                        <div style={{ position: 'relative' }}>
                                            <input className="input" type="number" inputMode="decimal" placeholder={f.placeholder}
                                                min={f.min} max={f.max}
                                                value={data[f.key as keyof OnboardingData] ?? ''}
                                                onChange={e => setData(d => ({ ...d, [f.key]: Number(e.target.value) }))}
                                                style={{ paddingRight: 52 }}
                                            />
                                            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', fontSize: '0.85rem', fontWeight: 600 }}>
                                                {f.unit}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button onClick={prev} className="btn btn-ghost" style={{ flex: '0 0 auto' }}>
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={next} disabled={!data.age || !data.weight || !data.height}
                                    className="btn btn-primary" style={{ flex: 1 }}>
                                    Continuar <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Step 3: Allergies ── */}
                    {currentStep === 'allergies' && (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                <AlertCircle size={22} color="var(--green)" />
                                <h2 className="serif" style={{ fontSize: '1.8rem' }}>Alergias e intolerancias</h2>
                            </div>
                            <p style={{ color: 'var(--text-2)', marginBottom: '1.5rem' }}>
                                Selecciona los alimentos que debes evitar. Tu plan los excluirá automáticamente.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                                {ALLERGY_OPTIONS.map(a => {
                                    const selected = (data.allergies ?? []).includes(a.val);
                                    return (
                                        <button key={a.val}
                                            onClick={() => toggleAllergy(a.val)}
                                            style={{
                                                padding: '1rem', borderRadius: 'var(--radius)',
                                                border: `2px solid ${selected ? 'var(--green)' : 'var(--border)'}`,
                                                background: selected ? 'var(--green-light)' : '#fff',
                                                cursor: 'pointer', transition: 'var(--transition)',
                                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                                textAlign: 'left',
                                            }}>
                                            <span style={{ fontSize: '1.5rem' }}>{a.emoji}</span>
                                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: selected ? 'var(--green-dark)' : 'var(--text)' }}>
                                                {a.label}
                                            </span>
                                            {selected && <CheckCircle size={14} color="var(--green)" style={{ marginLeft: 'auto' }} />}
                                        </button>
                                    );
                                })}
                            </div>

                            <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginBottom: '1.5rem', textAlign: 'center' }}>
                                Si no tienes ninguna, deja todo sin seleccionar ✅
                            </p>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button onClick={prev} className="btn btn-ghost" style={{ flex: '0 0 auto' }}>
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={next} className="btn btn-primary" style={{ flex: 1 }}>
                                    Continuar <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Step 4: Done ── */}
                    {currentStep === 'done' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                            <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>¡Tu plan está listo!</h2>
                            <p style={{ color: 'var(--text-2)', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Hemos personalizado tu reto de 21 días basado en tu perfil. Comienza hoy mismo a transformar tu cuerpo.
                            </p>
                            <div className="card" style={{ textAlign: 'left', marginBottom: '1.5rem', background: 'var(--green-light)', border: 'none' }}>
                                {[
                                    { label: `Género`, value: data.gender === 'male' ? 'Hombre' : 'Mujer' },
                                    { label: `Edad`, value: `${data.age} años` },
                                    { label: `Peso`, value: `${data.weight} kg` },
                                    { label: `Talla`, value: `${data.height} cm` },
                                    {
                                        label: `Alergias`,
                                        value: (data.allergies ?? []).length === 0
                                            ? 'Ninguna'
                                            : (data.allergies ?? [])
                                                .map(a => ALLERGY_OPTIONS.find(o => o.val === a)?.label ?? a)
                                                .join(', ')
                                    },
                                ].map((item, i, arr) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                                        <CheckCircle size={16} color="var(--green)" />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>
                                            <strong>{item.label}:</strong> {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={finish} className="btn btn-primary btn-block" style={{ fontSize: '1.05rem' }}>
                                ¡Comenzar el Reto! 🚀
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
