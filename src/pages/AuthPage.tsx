import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
    const [tab, setTab] = useState<'login' | 'register'>('register');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) { setError('Por favor completa todos los campos.'); return; }
        if (tab === 'register' && !name) { setError('Ingresa tu nombre.'); return; }
        setError('');
        // Simulated auth — in production connect to Supabase/Firebase
        login(email, tab === 'register' ? name : email.split('@')[0]);

        // Smart redirect: if the saved user already completed onboarding → dashboard
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
        <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <div style={{ width: '100%', maxWidth: 420 }}>
                <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)', fontSize: '0.9rem', marginBottom: '2rem', cursor: 'pointer' }}>
                    <ArrowLeft size={16} /> Volver
                </button>

                <div className="card fade-up" style={{ padding: '2rem' }}>
                    {/* Logo */}
                    <div className="serif" style={{ fontSize: '1.5rem', color: 'var(--green-dark)', marginBottom: '1.5rem', textAlign: 'center' }}>🥗 Reto 21 Días</div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', background: 'var(--surface2)', borderRadius: 10, padding: 4, marginBottom: '1.5rem' }}>
                        {(['register', 'login'] as const).map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                flex: 1, padding: '9px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 600,
                                background: tab === t ? '#fff' : 'transparent',
                                color: tab === t ? 'var(--text)' : 'var(--text-3)',
                                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
                                transition: 'var(--transition)',
                            }}>
                                {t === 'register' ? 'Crear cuenta' : 'Iniciar sesión'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {tab === 'register' && (
                            <div>
                                <label className="label">Nombre completo</label>
                                <input className="input" type="text" placeholder="Ej: María García" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        )}
                        <div>
                            <label className="label">Correo electrónico</label>
                            <input className="input" type="email" placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Contraseña</label>
                            <div style={{ position: 'relative' }}>
                                <input className="input" type={show ? 'text' : 'password'} placeholder="Mínimo 6 caracteres" value={password}
                                    onChange={e => setPassword(e.target.value)} style={{ paddingRight: 44 }} />
                                <button type="button" onClick={() => setShow(!show)}
                                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }}>
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <p style={{ color: 'var(--danger)', fontSize: '0.85rem' }}>{error}</p>}

                        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
                            {tab === 'register' ? 'Crear mi cuenta' : 'Ingresar'}
                        </button>
                    </form>

                    {tab === 'register' && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.5 }}>
                            Al crear una cuenta aceptas nuestros Términos de Servicio y Política de Privacidad.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
