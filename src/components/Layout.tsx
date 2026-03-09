import { Outlet, NavLink } from 'react-router-dom';
import { Home, CalendarDays, BookOpen, TrendingUp, UserCircle } from 'lucide-react';
import { useAuth } from '../store';

const links = [
    { to: '/', label: 'Inicio', icon: <Home size={20} /> },
    { to: '/plan', label: 'Mi Plan', icon: <CalendarDays size={20} /> },
    { to: '/recipes', label: 'Recetas', icon: <BookOpen size={20} /> },
    { to: '/progress', label: 'Progreso', icon: <TrendingUp size={20} /> },
    { to: '/profile', label: 'Perfil', icon: <UserCircle size={20} /> },
];

export default function Layout() {
    const { user } = useAuth();

    return (
        <div className="app">
            {/* ── Desktop Sidebar ── */}
            <div className="sidebar">
                <div className="nav-logo">🥗 Reto<br />21 Días</div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {links.map(l => (
                        <NavLink key={l.to} to={l.to} end={l.to === '/'}
                            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                            {l.icon} {l.label}
                        </NavLink>
                    ))}
                </nav>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <NavLink to="/profile" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                        style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>
                        <UserCircle size={16} /> {user?.name}
                    </NavLink>
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="main">
                <Outlet />
            </main>

            {/* ── Mobile Bottom Nav ── */}
            <nav className="bottom-nav">
                {links.map(l => (
                    <NavLink key={l.to} to={l.to} end={l.to === '/'}
                        className={({ isActive }) => `bnav-item${isActive ? ' active' : ''}`}>
                        {l.icon} {l.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
