import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useAppState } from '../store';
import { Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { appState } = useAppState();
    const navigate = useNavigate();

    const isDiabetes = appState.userGoal === 'diabetes';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor completa todos los campos.');
            return;
        }
        setError('');

        // Simulated auth
        login(email, email.split('@')[0]);

        // Smart redirect
        try {
            const saved = localStorage.getItem('reto21_user');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed?.onboarding?.gender) {
                    navigate('/');
                    return;
                }
            }
        } catch { /* ignore */ }
        navigate('/onboarding');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            fontFamily: "'DM Sans', sans-serif"
        }}>
            <div style={{ width: '100%', maxWidth: 460 }}>
                <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)', fontSize: '0.9rem', marginBottom: '2rem', cursor: 'pointer' }}>
                    <ArrowLeft size={16} /> Volver a la página principal
                </button>

                <div className="card fade-up" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-lg)', borderRadius: 24 }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="serif" style={{ fontSize: '1.8rem', color: 'var(--green-dark)', marginBottom: '0.5rem' }}>
                            {isDiabetes ? '🥗 Salud Glucémica' : '🥗 Reto 21 Días'}
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)' }}>¡Hola de nuevo!</h1>
                        <p style={{ color: 'var(--text-3)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Ingresa tus datos para acceder a tu plan.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label className="label">Correo electrónico</label>
                            <input
                                className="input"
                                type="email"
                                placeholder="tu@correo.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <label className="label" style={{ marginBottom: 0 }}>Contraseña</label>
                                <span style={{ fontSize: '0.75rem', color: 'var(--green-dark)', fontWeight: 600, cursor: 'pointer' }}>¿Olvidaste tu contraseña?</span>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className="input"
                                    type={show ? 'text' : 'password'}
                                    placeholder="Tu contraseña"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    style={{ paddingRight: 44 }}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}
                                >
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                color: 'var(--danger)',
                                background: '#fef2f2',
                                padding: '10px 14px',
                                borderRadius: 10,
                                fontSize: '0.85rem'
                            }}>
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary btn-block" style={{ height: 56, fontSize: '1.1rem', marginTop: '0.5rem' }}>
                            Iniciar sesión <LogIn size={20} style={{ marginLeft: 8 }} />
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
                            ¿Aún no tienes cuenta? <Link to="/signup" style={{ color: 'var(--green-dark)', fontWeight: 700, textDecoration: 'underline' }}>Regístrate gratis aquí</Link>
                        </p>
                    </div>

                    <div style={{ marginTop: '2.5rem', background: 'var(--surface2)', padding: '1.25rem', borderRadius: 16 }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', textAlign: 'center', fontStyle: 'italic' }}>
                            "La mejor decisión que tomé por mi salud este año. El plan es facilísimo de seguir."
                        </p>
                        <div style={{ textAlign: 'center', marginTop: '0.5rem', fontWeight: 700, fontSize: '0.75rem' }}>
                            — Ana García
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
