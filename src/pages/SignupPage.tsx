import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useAppState } from '../store';
import { Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';

export default function SignupPage() {
    const [name, setName] = useState('');
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
        if (!email || !password || !name) {
            setError('Por favor completa todos los campos.');
            return;
        }
        setError('');

        // Simulated auth
        login(email, name);

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
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)' }}>Crea tu cuenta</h1>
                        <p style={{ color: 'var(--text-3)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Comienza tu transformación hoy mismo.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label className="label">Nombre completo</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="Ej: María García"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
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
                            <label className="label">Contraseña</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className="input"
                                    type={show ? 'text' : 'password'}
                                    placeholder="Mínimo 6 caracteres"
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
                            Crear mi cuenta <ArrowRight size={20} style={{ marginLeft: 8 }} />
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
                            ¿Ya tienes una cuenta? <Link to="/login" style={{ color: 'var(--green-dark)', fontWeight: 700, textDecoration: 'underline' }}>Inicia sesión aquí</Link>
                        </p>
                    </div>

                    <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Acceso inmediato al plan', 'Lista de compras semanal', 'Seguimiento de progreso'].map((text, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-2)', fontSize: '0.85rem' }}>
                                    <CheckCircle size={16} color="var(--green)" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', textAlign: 'center', marginTop: '2rem', lineHeight: 1.5 }}>
                    Al crear una cuenta aceptas nuestros <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Términos de Servicio</span> y <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Política de Privacidad</span>.
                </p>
            </div>
        </div>
    );
}

const ArrowRight = ({ size, style }: { size: number, style?: React.CSSProperties }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
