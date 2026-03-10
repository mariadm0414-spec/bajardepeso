import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, CheckCircle, Star,
    ChevronDown, ChevronUp, Zap, Target, Heart, Smile,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import heroImg from '../assets/diabetic-hero.png';
import dessertImg from '../assets/diabetic-dessert.png';

// ─── Data ────────────────────────────────────────────────────────────────────

const painPoints = [
    { emoji: '😩', title: 'Miedo a comer', desc: 'Te sientes limitada. Cada bocado viene con la duda de si subirá tu glucosa. Comer dejó de ser un placer.' },
    { emoji: '🍩', title: 'Antojos prohibidos', desc: 'Ves postres y dulces que extrañas, pero crees que nunca más podrás probarlos sin riesgos. Sientes que te castigas.' },
    { emoji: '📉', title: 'Picos de glucosa', desc: 'Tus niveles son una montaña rusa. Te sientes cansada después de comer y te preocupa el daño a largo plazo en tu cuerpo.' },
];

const testimonials = [
    { name: 'Ricardo S.', city: 'Ciudad de México', stars: 5, text: '"Mi glucosa en ayunas bajó de 145 a 98 en solo tres semanas. Lo mejor es que no me siento a dieta, el mousse de chocolate es increíble."' },
    { name: 'Elena G.', city: 'Guadalajara', stars: 5, text: '"Por fin un plan que mi esposo y yo podemos disfrutar juntos. Mis niveles de HbA1c han mejorado drásticamente y tengo mucha más energía."' },
    { name: 'Juan C.', city: 'Bogotá', stars: 5, text: '"Tenía miedo de los postres, pero estas recetas son seguras y deliciosas. Mi doctora está sorprendida con mis últimos exámenes."' },
    { name: 'Martha L.', city: 'Monterrey', stars: 5, text: '"Las listas de compras me ahorran horas. Cocinar sano para controlar mi azúcar ahora es algo que disfruto, no una carga."' },
    { name: 'Roberto V.', city: 'Buenos Aires', stars: 5, text: '"Bajé 4 kilos y estabilicé mis niveles en menos de un mes. El enfoque de índice glucémico bajo realmente funciona."' },
    { name: 'Carmen P.', city: 'Lima', stars: 5, text: '"Increíble variedad. 500 recetas significa que nunca me aburro. Los desayunos son lo mejor para empezar el día con energía."' },
];

const features = [
    { icon: '🥘', title: '500 Platos Fuertes', desc: 'Desayunos, almuerzos y cenas diseñados para mantener niveles estables de glucosa.' },
    { icon: '🍰', title: '50 Postres Sin Azúcar', desc: 'Mousses, galletas y pasteles deliciosos que no disparan tu insulina ni tu glucosa.' },
    { icon: '📊', title: 'Índice Glucémico Bajo', desc: 'Cada receta probada para evitar picos. Come con total tranquilidad y seguridad.' },
    { icon: '🛒', title: 'Lista de compras inteligente', desc: 'Organizada semanalmente para que sepas exactamente qué comprar sin gastar de más.' },
    { icon: '♾️', title: 'Acceso de por vida', desc: 'Todas las actualizaciones futuras y nuevas recetas incluidas para siempre en tu cuenta.' },
    { icon: '🛡️', title: 'Fórmulas Antiinflamatorias', desc: 'Ingredientes seleccionados que ayudan a desinflamar tu cuerpo y mejorar tu metabolismo.' },
];

const howItWorks = [
    { n: '1', title: 'Accede al Recetario', desc: 'Obtén tus 550 recetas al instante. Accede desde tu celular, tablet o computadora en cualquier momento.' },
    { n: '2', title: 'Elige tu Comida', desc: 'Navega entre categorías y opciones. Elige lo que más se te antoje hoy sabiendo que es 100% seguro.' },
    { n: '3', title: 'Disfruta sin Miedo', desc: 'Cocina en 20 minutos y disfruta del sabor real mientras cuidas tu salud de forma natural.' },
];

const differentiators = [
    { icon: <Target size={22} color="var(--green)" />, title: 'No es una "dieta" de hospital', desc: 'Recetas con sabor real. Condimentos, texturas y presentaciones que te harán olvidar que te estás cuidando.' },
    { icon: <Heart size={22} color="var(--green)" />, title: 'Control Glucémico Natural', desc: 'Usamos el poder de los alimentos para gestionar la glucosa sin picos. Diseñado por expertos en nutrición.' },
    { icon: <Zap size={22} color="var(--green)" />, title: 'Recetas de 20 minutos', desc: 'No necesitas pasar horas cocinando. Platos rápidos y sencillos para personas con vidas activas y ocupadas.' },
    { icon: <Smile size={22} color="var(--green)" />, title: 'Vuelve a disfrutar el dulce', desc: 'El postre ya no es un pecado. Disfruta de un dulce saludable todos los días con nuestras recetas exclusivas.' },
];

const faqs = [
    { q: '¿Son recetas difíciles de preparar?', a: 'Absolutamente no. Todas las recetas están diseñadas para cocinarse en menos de 20 minutos con ingredientes básicos que encuentras en cualquier supermercado local.' },
    { q: '¿Realmente puedo comer postres si tengo diabetes?', a: '¡Sí! Nuestras recetas usan sustitutos naturales de bajo índice glucémico y combinaciones de fibra/proteína que evitan que el azúcar en sangre suba repentinamente.' },
    { q: '¿Sirve para diabetes tipo 1 y tipo 2?', a: 'Sí. Aunque son condiciones distintas, ambas se benefician enormemente de un enfoque nutricional basado en el control de carbohidratos y el índice glucémico bajo.' },
    { q: '¿Qué recibo exactamente al comprar?', a: 'Acceso inmediato a nuestra aplicación web con las 500 recetas de platos fuertes, el bono de 50 postres, listas de compras semanales y el rastreador de niveles.' },
    { q: '¿Necesito algún equipo especial de cocina?', a: 'No, solo los utensilios básicos que ya tienes en casa: sartén, olla y una estufa normal. Sin técnicas complicadas ni licuadoras industriales.' },
    { q: '¿Hay garantía si no me gusta?', a: 'Tienes 7 días de garantía completa. Si entras y sientes que las recetas no son para ti, te devolvemos el 100% de tu dinero sin preguntas.' },
];

const successStories = [
    {
        img: heroImg,
        name: 'Ricardo S.',
        city: 'CDMX, México',
        result: 'Glucosa: 145 → 98 mg/dL',
        quote: '"Lo mejor es que no me siento a dieta. El mousse de chocolate es increíble y mis niveles están estables."',
        stars: 5,
    },
    {
        img: dessertImg,
        name: 'Elena G.',
        city: 'Guadalajara, México',
        result: 'HbA1c: 8.2% → 6.5%',
        quote: '"Por fin un plan que mi esposo y yo podemos disfrutar juntos. Tengo mucha más energía que antes."',
        stars: 5,
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div onClick={() => setOpen(o => !o)} style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>{q}</span>
                <span style={{ flexShrink: 0, color: 'var(--green)' }}>{open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span>
            </div>
            {open && <p style={{ color: 'var(--text-2)', marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.65 }}>{a}</p>}
        </div>
    );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
    return (
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.25rem', minWidth: 280, maxWidth: 320, flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 3, marginBottom: '0.75rem' }}>
                {Array(t.stars).fill(0).map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '1rem' }}>{t.text}</p>
            <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{t.city}</div>
            </div>
        </div>
    );
}

function SuccessCarousel({ cta }: { cta: () => void }) {
    const [idx, setIdx] = useState(0);
    const total = successStories.length;
    const prev = () => setIdx(i => (i - 1 + total) % total);
    const next = () => setIdx(i => (i + 1) % total);
    const s = successStories[idx];

    useEffect(() => {
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [idx]);

    return (
        <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)', overflow: 'hidden' }}>
            <div style={{ maxWidth: 960, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Resultados Reales</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>Casos de Éxito: Glucosa Bajo Control</h2>
                    <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>Testimonios de personas que recuperaron su salud y el placer de comer.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <div style={{
                        background: '#fff', borderRadius: 24, overflow: 'hidden',
                        boxShadow: '0 8px 40px rgba(37,99,235,0.12)',
                        border: '1px solid var(--border)',
                        maxWidth: 720, width: '100%',
                        display: 'flex', flexDirection: 'column',
                    }}>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <img
                                src={s.img}
                                alt={`Caso de éxito - ${s.name}`}
                                style={{ width: '100%', display: 'block', maxHeight: 400, objectFit: 'cover', objectPosition: 'center' }}
                            />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', top: 16, left: 16 }}>
                                <span style={{ background: 'rgba(30,58,138,0.85)', backdropFilter: 'blur(6px)', color: '#93c5fd', padding: '5px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(147,197,253,0.3)' }}>📉 Control</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
                                <span style={{ background: 'var(--green)', color: '#fff', padding: '7px 20px', borderRadius: 999, fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(37,99,235,0.4)' }}>✨ {s.result}</span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
                            <div style={{ display: 'flex', gap: 3, marginBottom: '0.75rem' }}>
                                {Array(s.stars).fill(0).map((_, i) => <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />)}
                            </div>
                            <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1rem' }}>{s.quote}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>👤</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.name}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{s.city}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <button onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <ChevronLeft size={20} color="var(--text-2)" />
                        </button>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {successStories.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 10, height: 10, borderRadius: 999, background: i === idx ? 'var(--green)' : 'var(--border)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
                            ))}
                        </div>
                        <button onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <ChevronRight size={20} color="var(--text-2)" />
                        </button>
                    </div>

                    <button onClick={cta} className="btn btn-primary" style={{ fontSize: '1rem', padding: '16px 40px' }}>
                        Quiero controlar mi glucosa hoy <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function useCountdown(initialSeconds: number) {
    const [secs, setSecs] = useState(initialSeconds);
    useEffect(() => {
        const id = setInterval(() => setSecs(s => (s <= 1 ? initialSeconds : s - 1)), 1000);
        return () => clearInterval(id);
    }, [initialSeconds]);
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return { m, s, secs };
}

export default function LandingDiabeticos() {
    const cta = () => window.location.href = 'https://pay.hotmart.com/B104822312F?off=5xe96upq';
    const { m, s } = useCountdown(19 * 60 + 59);

    return (
        <div data-theme="diabetes" style={{ background: '#fff', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── Urgency top bar ── */}
            <div style={{ background: '#ef4444', color: '#fff', textAlign: 'center', padding: '9px 1rem', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fca5a5', display: 'inline-block', animation: 'blink 1s infinite' }} />
                    24 personas comprando este recetario ahora
                </span>
                <span style={{ opacity: 0.6 }}>·</span>
                <span>⏰ Oferta por tiempo limitado: <strong style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace', fontSize: '0.9rem' }}>{m}:{s}</strong></span>
            </div>

            {/* ── Sticky Nav ── */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--green-dark)' }}>🥗 Salud Glucémica</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <Link to="/login" style={{ color: 'var(--text-2)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>Iniciar Sesión</Link>
                        <button onClick={cta} className="btn btn-primary btn-sm">ACCEDER AHORA</button>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section style={{ background: 'linear-gradient(160deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,197,253,0.18) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,192,34,0.12) 0%, transparent 70%)', bottom: '50px', left: '5%', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '6px 18px', marginBottom: '1.5rem', color: '#bfdbfe', fontSize: '0.82rem', fontWeight: 600 }}>
                        ⭐ Nuevo Método 2025: 550 Recetas Probadas
                    </div>

                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem', fontWeight: 900 }}>
                        Recupera el placer de comer:<br />
                        <span style={{ color: '#93c5fd' }}>Sin miedo al azúcar ni picos</span> de<br />
                        glucosa con 550 recetas
                    </h1>

                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: 640, margin: '0 auto 2rem', lineHeight: 1.7 }}>
                        El recetario definitivo para controlar tu azúcar, desinflamar tu cuerpo y disfrutar de postres deliciosos.
                        <strong style={{ color: '#93c5fd' }}> Sin dietas aburridas. Sin pasar hambre.</strong>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={cta} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '18px 48px', boxShadow: '0 8px 32px rgba(37,99,235,0.5)', animation: 'pulse-blue 2s infinite' }}>
                            ¡QUIERO MIS 550 RECETAS AHORA! <ArrowRight size={20} />
                        </button>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                            Acceso inmediato · Pago único · Garantía de satisfacción
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                        {[['⚡', 'Acceso inmediato'], ['🛡️', 'Garantía 7 días'], ['✅', 'Sin mensualidades'], ['🔒', 'Pago seguro']].map(([ico, lbl]) => (
                            <div key={String(lbl)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontWeight: 500 }}>
                                <span>{ico}</span>{lbl}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ── */}
            <section style={{ background: 'var(--green-dark)', padding: '1.5rem 1.5rem' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem' }}>
                    {[['500', 'Recetas fuertes'], ['50', 'Postres sin azúcar'], ['20 min', 'Tiempo máximo'], ['4.9', 'Calificación']].map(([val, lbl]) => (
                        <div key={String(lbl)} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, color: '#93c5fd' }}>{val}</div>
                            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', marginTop: 2 }}>{lbl}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PAIN POINTS ── */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>¿Te suena familiar?</span>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>Si tienes diabetes, probablemente te pasa esto...</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>Vivir con restricciones constantes es agotador. Millones de personas pasan por lo mismo cada día.</p>
                    </div>

                    <div className="grid-3" style={{ gap: '1.25rem' }}>
                        {painPoints.map((p, i) => (
                            <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem', borderTop: '4px solid #ef4444' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{p.emoji}</div>
                                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#ef4444' }}>{p.title}</h3>
                                <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.65 }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS CAROUSEL ── */}
            <section style={{ padding: '5rem 0', overflow: 'hidden', background: '#fff' }}>
                <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', marginBottom: '2.5rem' }}>
                    <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vidas cambiadas</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginTop: '1rem' }}>Ellos ya recuperaron su tranquilidad</h2>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', padding: '0.5rem 2rem', overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} style={{ scrollSnapAlign: 'start' }}>
                            <TestimonialCard t={t} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CASOS DE ÉXITO ── */}
            <SuccessCarousel cta={cta} />

            {/* ── HOW IT WORKS ── */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>La Solución</span>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>Controla tu azúcar sin dejar de comer rico</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>3 pasos hacia una vida más saludable y deliciosa.</p>
                    </div>
                    <div className="grid-3" style={{ gap: '1.5rem' }}>
                        {howItWorks.map((s, i) => (
                            <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '2rem', textAlign: 'center', position: 'relative' }}>
                                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 900, color: 'var(--green-light)', position: 'absolute', top: '1rem', right: '1.25rem', lineHeight: 1, userSelect: 'none', opacity: 0.6 }}>{s.n}</div>
                                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: '1.3rem', color: '#fff' }}>{s.n}</div>
                                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                                <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.65 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── THE OFFER IMAGE BREAK ── */}
            <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
                <div className="grid-2" style={{ maxWidth: 1000, margin: '0 auto', alignItems: 'center', gap: '3rem' }}>
                    <div style={{ width: '100%' }}>
                        <img src={dessertImg} alt="Postres saludables" style={{ width: '100%', borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                    </div>
                    <div>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Mucho más que un simple recetario</h2>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                '500 Platos Fuertes equilibrados (Cero picos)',
                                'Bono Exclusivo: 50 Postres Sin Azúcar Reales',
                                'Basado en índices glucémicos bajos certificados',
                                'Lista de compras semanal inteligente',
                                'Acceso de por vida a futuras recetas'
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '1.1rem', color: 'var(--text-2)' }}>
                                    <CheckCircle size={22} color="var(--green)" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── DIFFERENTIATORS ── */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '0.5rem' }}>¿Por qué este método sí funciona?</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>No prohibimos, balanceamos. Ese es el secreto del control duradero.</p>
                    </div>
                    <div className="grid-2" style={{ gap: '1.25rem' }}>
                        {differentiators.map((d, i) => (
                            <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ background: 'var(--green-light)', padding: '0.75rem', borderRadius: 12, flexShrink: 0 }}>{d.icon}</div>
                                <div>
                                    <h3 style={{ fontWeight: 700, marginBottom: '0.35rem', fontSize: '1rem' }}>{d.title}</h3>
                                    <p style={{ color: 'var(--text-2)', fontSize: '0.88rem', lineHeight: 1.6 }}>{d.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Todo lo que obtienes</span>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>El arsenal completo para tu salud</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>Todo organizado en un solo lugar. Sin complicaciones digitales.</p>
                    </div>
                    <div className="grid-3" style={{ gap: '1.25rem' }}>
                        {features.map((f, i) => (
                            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
                                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                                <h3 style={{ fontWeight: 700, marginBottom: '0.35rem', fontSize: '0.98rem' }}>{f.title}</h3>
                                <p style={{ color: 'var(--text-2)', fontSize: '0.86rem', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section id="precio" style={{ padding: '5rem 1.5rem', background: 'linear-gradient(160deg,#1e3a8a,#2563eb)' }}>
                <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', color: '#bfdbfe', padding: '4px 16px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Oferta de lanzamiento</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', marginTop: '1rem', marginBottom: '0.5rem' }}>
                        Toma el control hoy mismo
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem' }}>Acceso permanente por menos de lo que cuesta un café.</p>

                    <div style={{ background: '#fff', borderRadius: 24, padding: '2.5rem', boxShadow: '0 24px 64px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '8px 14px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block', flexShrink: 0, animation: 'blink 1s infinite' }} />
                            <span style={{ fontSize: '0.82rem', color: '#ef4444', fontWeight: 700 }}>Oferta expira pronto para tu zona</span>
                        </div>

                        {/* Countdown */}
                        <div style={{ background: 'linear-gradient(135deg,#1e3a8a,#2563eb)', borderRadius: 12, padding: '12px 16px', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <div style={{ color: '#bfdbfe', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>⏰ Tiempo restante</div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {[m, s].map((unit, i) => (
                                    <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '2.4rem', fontWeight: 900, color: '#fff', lineHeight: 1, minWidth: 60 }}>{unit}</span>
                                        <span style={{ color: '#93c5fd', fontSize: '0.62rem' }}>{i === 0 ? 'MIN' : 'SEG'}</span>
                                    </span>
                                )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`sep-${i}`} style={{ color: '#93c5fd', fontSize: '2rem', fontWeight: 900 }}>:</span>, el], [] as React.ReactNode[])}
                            </div>
                        </div>

                        <div style={{ marginBottom: '0.5rem', color: 'var(--text-3)', fontSize: '0.85rem', textDecoration: 'line-through' }}>Valor real: $49.30 USD</div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 4, marginBottom: '0.25rem' }}>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--green-dark)', marginTop: 8 }}>$</span>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', fontWeight: 900, color: 'var(--green-dark)', lineHeight: 1 }}>9</span>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--green-dark)', marginTop: 12 }}>.99</span>
                        </div>
                        <div style={{ color: 'var(--text-3)', fontSize: '0.82rem', marginBottom: '2rem' }}>USD · Pago único para siempre</div>

                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                            {['500 Recetas de Platos Fuertes', 'Bono: 50 Postres Sin Azúcar', 'Listas de Compras Inteligentes', 'Basado en Bajo Índice Glucémico', 'Acceso Total de por vida', 'Garantía 7 días sin preguntas'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <CheckCircle size={18} color="var(--green)" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        <button onClick={cta} className="btn btn-primary btn-block" style={{ fontSize: '1rem', padding: '18px', marginBottom: '1rem' }}>
                            ¡QUIERO EMPEZAR AHORA! <ArrowRight size={18} />
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-3)' }}>
                            <span>🔒 Pago seguro</span>
                            <span>⚡ Acceso inmediato</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginBottom: '0.5rem' }}>Preguntas frecuentes</h2>
                        <p style={{ color: 'var(--text-2)' }}>Resolvemos tus dudas antes de empezar.</p>
                    </div>
                    {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
                </div>
            </section>

            {/* ── GUARANTEE ── */}
            <section style={{ padding: '4rem 1.5rem', background: 'var(--green-light)' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛡️</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--green-dark)' }}>Garantía 100% de 7 Días</h2>
                    <p style={{ color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2rem' }}>
                        Prueba las recetas, cocina los postres y mira cómo te sientes. Si no estás feliz, te devolvemos tu dinero al instante. Sin preguntas.
                    </p>
                    <p style={{ fontWeight: 700, color: 'var(--green-dark)', fontSize: '1rem' }}>🔒 TU SALUD ES NUESTRA PRIORIDAD</p>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: '#0f172a', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', color: '#93c5fd', fontSize: '1.1rem', marginBottom: '1rem' }}>🥗 Salud Glucémica: Vive con Sabor</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                    {['Términos', 'Privacidad', 'Contacto'].map(l => (
                        <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>© 2025 Salud Glucémica. Los resultados pueden variar. Consulte a su médico.</p>
            </footer>

            {/* Global style for pulse-blue since it's not in index.css maybe */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse-blue {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
                    50% { box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
                }
            `}} />
        </div>
    );
}
