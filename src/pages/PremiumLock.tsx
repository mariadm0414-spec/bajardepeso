import { useNavigate } from 'react-router-dom';
import { useAppState, useAuth } from '../store';
import { CheckCircle, Key, Lock } from 'lucide-react';

const perks = [
    'Acceso completo a los 21 días del reto',
    'Modo Mantenimiento con plan de 7 días',
    'Acceso a todas las +80 recetas saludables',
];

export default function PremiumLock() {
    const { appState } = useAppState();
    const { upgradePremium } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'var(--green-light)', padding: '1.25rem', borderRadius: '50%' }}>
                <Lock size={48} color="var(--green-dark)" />
            </div>

            <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {appState.userGoal === 'diabetes' ? 'Desbloquea las 550 Recetas' : 'Desbloquea el Reto Completo'}
                </h1>
                <p style={{ color: 'var(--text-mid)', maxWidth: 380, margin: '0 auto' }}>
                    {appState.userGoal === 'diabetes'
                        ? 'Accede a las 550 recetas y postres por solo $4.99 y toma el control de tu salud.'
                        : 'Pago único de $4.99 para acceder a todo el plan de 21 días y bajar 7kg sin gimnasio.'}
                </p>
            </div>

            <div className="card" style={{ width: '100%', maxWidth: 420, textAlign: 'left' }}>
                {perks.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.75rem 0', borderBottom: i < perks.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <CheckCircle size={22} color="var(--green)" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.95rem', color: 'var(--text-mid)' }}>{p}</span>
                    </div>
                ))}
            </div>

            <button onClick={() => { upgradePremium(); navigate('/'); }}
                className="btn btn-primary" style={{ width: '100%', maxWidth: 420, padding: '1rem', fontSize: '1rem' }}>
                Desbloquear por $4.99 <Key size={18} />
            </button>

            <button onClick={() => navigate('/')} style={{ color: 'var(--text-light)', fontSize: '0.88rem', textDecoration: 'underline', cursor: 'pointer' }}>
                Volver al dashboard
            </button>
        </div>
    );
}
