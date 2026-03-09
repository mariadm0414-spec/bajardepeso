import { useState, useEffect } from 'react';
import {
    ArrowRight, CheckCircle, Star,
    ChevronDown, ChevronUp, Zap, Target, Heart, Smile,
    ChevronLeft, ChevronRight,
} from 'lucide-react';
import img1 from '../assets/before-and-after-weight-loss-pictures-fitbody.jpg';
import img2 from '../assets/before-after-weight-loss-indian-woman.jpg.jpeg';
import img3 from '../assets/170502coach_f45_challenge_.jpg';
import img4 from '../assets/107571426.webp';
import img5 from '../assets/images (1).jpeg';

// ─── Data ────────────────────────────────────────────────────────────────────

const painPoints = [
    { emoji: '😩', title: 'Dietas imposibles', desc: 'Empiezas con motivación pero a los 3 días ya tienes hambre y abandonas. Los planes genéricos no funcionan para ti.' },
    { emoji: '🍔', title: 'Tentaciones sin control', desc: 'Ves comida y no sabes qué es saludable. Todo parece delicioso pero culpable. El supermercado es un campo minado.' },
    { emoji: '⏰', title: 'Sin tiempo para cocinar', desc: 'Llegas cansada del trabajo y lo más fácil es pedir comida rápida. Cocinar sano parece complicado y tardado.' },
];

const testimonials = [
    { name: 'Ana García', city: 'Ciudad de México', stars: 5, text: '"Bajé 9 kilos en 21 días sin pasar hambre. Las recetas son deliciosas y fáciles. Por fin un plan que sí pude terminar."' },
    { name: 'María Rodríguez', city: 'Guadalajara', stars: 5, text: '"No pensé que era posible comer rico y bajar de peso. El plan de comidas me quitó el estrés de pensar qué cocinar cada día."' },
    { name: 'Carla Méndez', city: 'Bogotá', stars: 5, text: '"Llevo 3 semanas y ya bajé 7 kilos. Lo mejor es que nunca me quedé con hambre. Las recetas de cena son mis favoritas."' },
    { name: 'Sofía Torres', city: 'Monterrey', stars: 5, text: '"El seguimiento de peso me motivó muchísimo. Ver la gráfica bajar cada semana es increíble. Completamente recomendado."' },
    { name: 'Laura Jiménez', city: 'Buenos Aires', stars: 5, text: '"La lista de compras automática me cambió la vida. Voy al súper con todo claro y gasto menos. Genial para el bolsillo."' },
    { name: 'Valeria Cruz', city: 'Lima', stars: 5, text: '"Empecé con -2 kg la primera semana. Las opciones de desayuno son perfectas para no aburrirme. 100% lo repetiré."' },
];

const features = [
    { icon: '📅', title: 'Plan 21 días completo', desc: '3 opciones por cada comida del día para que elijas tu favorita sin aburrirte.' },
    { icon: '🧮', title: 'Nutrición personalizada', desc: 'Calculamos tus calorías, proteína y agua exactas según tu cuerpo. No estimados genéricos.' },
    { icon: '🛒', title: 'Lista de compras automática', desc: 'Generada semana a semana con exactamente lo que necesitas. Sin desperdicios.' },
    { icon: '📊', title: 'Seguimiento de peso', desc: 'Registra tu peso diario y ve tu progreso en una gráfica visual que te motiva.' },
    { icon: '♾️', title: 'Recetas infinitas post-reto', desc: '60+ recetas categorizadas para que nunca pares de comer sano después del reto.' },
    { icon: '🎯', title: 'Alta proteína = sin hambre', desc: 'Cada receta está diseñada con alta proteína y bajo índice calórico. El secreto de la saciedad.' },
];

const howItWorks = [
    { n: '1', title: 'Crea tu perfil en 2 min', desc: 'Ingresa tu género, edad, peso y estatura. Nuestro sistema calcula tu plan exacto al instante.' },
    { n: '2', title: 'Sigue tu plan diario', desc: 'Cada día tienes 3 opciones de desayuno, almuerzo y cena. Elige la que más te guste y cocínala.' },
    { n: '3', title: 'Marca y celebra', desc: 'Marca cada comida completada, ve tu progreso y despierta cada mañana más cerca de tu meta.' },
];

const differentiators = [
    { icon: <Target size={22} color="var(--green)" />, title: 'No es otro app de dieta genérica', desc: 'Cada plan se adapta a TU metabolismo, TU peso y TU talla. Los macros son únicos para ti.' },
    { icon: <Heart size={22} color="var(--green)" />, title: 'Saciedad garantizada', desc: 'No recortamos calorías a lo salvaje. Usamos proteína alta + volúmen alto para que nunca pases hambre.' },
    { icon: <Zap size={22} color="var(--green)" />, title: 'Recetas de 10-30 minutos', desc: 'Todo fue diseñado para personas ocupadas. Sin técnicas raras ni ingredientes imposibles de encontrar.' },
    { icon: <Smile size={22} color="var(--green)" />, title: 'Gamificación que engancha', desc: 'La barra de progreso diaria y el calendario de 21 días te mantienen motivada. Funciona como un juego.' },
];

const faqs = [
    { q: '¿Realmente puedo bajar 7 kilos en 21 días?', a: 'Los resultados varían según cada persona. El promedio en nuestra comunidad es de 4-8 kilos en 21 días siguiendo el plan completo. Los primeros días verás más caída rápida (retención de líquidos) y los últimos días será grasa real.' },
    { q: '¿Necesito equipos especiales o ingredientes raros?', a: 'Absolutamente no. Todas las recetas usan ingredientes que encuentras en cualquier supermercado y se preparan en una estufa normal. Sin licuadoras industriales ni utensilios especiales.' },
    { q: '¿Qué pasa después de los 21 días?', a: 'Generas acceso permanente a nuestra sección de Recetas Infinitas: más de 60 recetas saludables organizadas por objetivo (mantener peso, seguir bajando, masas musculares). También puedes repetir el reto cuantas veces quieras.' },
    { q: '¿Puedo seguir el plan si trabajo todo el día?', a: 'El plan fue diseñado específicamente para personas ocupadas. Las recetas son de 5-30 minutos. Puedes preparar las comidas del día en la mañana o dejarlas listas la noche anterior sin problema.' },
    { q: '¿Funciona en iPhone y Android?', a: 'Sí. Es una aplicación web progresiva (PWA) que funciona perfectamente en cualquier navegador de móvil o computadora. También puedes instalarla en tu teléfono como si fuera una app normal.' },
    { q: '¿Hay garantía si no me funciona?', a: 'Tienes 7 días de garantía total sin preguntas. Si entras, pruebas el plan y sientes que no es para ti, te devolvemos el 100% de tu dinero. Sin burocracia.' },
];

const successStories = [
    {
        img: img1,
        name: 'Laura M.',
        city: 'Medellín, Colombia',
        result: '−6.5 kg en 21 días',
        quote: '"Nunca pensé que bajar de peso pudiese ser tan llevadero. ¡Las recetas son deliciosas!"',
        stars: 5,
    },
    {
        img: img2,
        name: 'Daniela R.',
        city: 'Bogotá, Colombia',
        result: '−8 kg en 21 días',
        quote: '"El plan es sencillo y las comidas me dejaban satisfecha todo el día. Lo repetiré."',
        stars: 5,
    },
    {
        img: img3,
        name: 'Valentina C.',
        city: 'Cali, Colombia',
        result: '−7 kg en 21 días',
        quote: '"Empecé sin creerlo y al día 10 ya notaba la diferencia. 100% recomendado."',
        stars: 5,
    },
    {
        img: img4,
        name: 'Camila P.',
        city: 'Barranquilla, Colombia',
        result: '−5 kg en 21 días',
        quote: '"Las opciones de comida son riquísimas. Nunca sentí que estaba a dieta."',
        stars: 5,
    },
    {
        img: img5,
        name: 'Sara L.',
        city: 'Manizales, Colombia',
        result: '−4.5 kg en 21 días',
        quote: '"La app me ayudó a organizarme. El seguimiento de peso me motivó día a día."',
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

// ─── Success Carousel ────────────────────────────────────────────────────────

function SuccessCarousel({ cta }: { cta: () => void }) {
    const [idx, setIdx] = useState(0);
    const total = successStories.length;
    const prev = () => setIdx(i => (i - 1 + total) % total);
    const next = () => setIdx(i => (i + 1) % total);
    const s = successStories[idx];

    // Auto-advance
    useEffect(() => {
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [idx]);

    return (
        <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)', overflow: 'hidden' }}>
            <div style={{ maxWidth: 960, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Casos de Éxito</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>Antes y Después: Resultados reales</h2>
                    <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>Personas reales, resultados reales. Sin filtros, sin Photoshop.</p>
                </div>

                {/* Card */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <div style={{
                        background: '#fff', borderRadius: 24, overflow: 'hidden',
                        boxShadow: '0 8px 40px rgba(6,78,59,0.12)',
                        border: '1px solid var(--border)',
                        maxWidth: 720, width: '100%',
                        display: 'flex', flexDirection: 'column',
                    }}>
                        {/* Image with week labels */}
                        <div style={{ position: 'relative', width: '100%' }}>
                            <img
                                src={s.img}
                                alt={`Antes y después - ${s.name}`}
                                style={{ width: '100%', display: 'block', maxHeight: 400, objectFit: 'cover', objectPosition: 'top' }}
                            />
                            {/* Gradient overlay bottom */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)', pointerEvents: 'none' }} />
                            {/* Week labels */}
                            <div style={{ position: 'absolute', top: 16, left: 16 }}>
                                <span style={{ background: 'rgba(6,78,59,0.85)', backdropFilter: 'blur(6px)', color: '#6ee7b7', padding: '5px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(110,231,183,0.3)' }}>📅 Semana 1</span>
                            </div>
                            <div style={{ position: 'absolute', top: 16, right: 16 }}>
                                <span style={{ background: 'rgba(6,78,59,0.85)', backdropFilter: 'blur(6px)', color: '#6ee7b7', padding: '5px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(110,231,183,0.3)' }}>🏆 Semana 3</span>
                            </div>
                            {/* Result badge bottom */}
                            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
                                <span style={{ background: 'var(--green)', color: '#fff', padding: '7px 20px', borderRadius: 999, fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(16,185,129,0.4)' }}>✨ {s.result}</span>
                            </div>
                        </div>

                        {/* Quote & info */}
                        <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
                            <div style={{ display: 'flex', gap: 3, marginBottom: '0.75rem' }}>
                                {Array(s.stars).fill(0).map((_, i) => <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />)}
                            </div>
                            <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1rem' }}>{s.quote}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>👩</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.name}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{s.city}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <button onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition)' }}>
                            <ChevronLeft size={20} color="var(--text-2)" />
                        </button>
                        {/* Dots */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            {successStories.map((_, i) => (
                                <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 10, height: 10, borderRadius: 999, background: i === idx ? 'var(--green)' : 'var(--border)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
                            ))}
                        </div>
                        <button onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--border)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition)' }}>
                            <ChevronRight size={20} color="var(--text-2)" />
                        </button>
                    </div>

                    {/* CTA */}
                    <button onClick={cta} className="btn btn-primary" style={{ fontSize: '1rem', padding: '16px 40px' }}>
                        Quiero mis resultados también <ArrowRight size={18} />
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

export default function LandingPage() {
    const cta = () => window.open('https://pay.hotmart.com/B104822312F?off=5xe96upq', '_blank');
    const { m, s } = useCountdown(13 * 60 + 27); // 13 min 27 sec initial

    return (
        <div style={{ background: '#fff', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>

            {/* ── Urgency top bar ── */}
            <div style={{ background: '#ef4444', color: '#fff', textAlign: 'center', padding: '9px 1rem', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fca5a5', display: 'inline-block', animation: 'blink 1s infinite' }} />
                    33 personas comprando en este momento
                </span>
                <span style={{ opacity: 0.6 }}>·</span>
                <span>⏰ Oferta termina en: <strong style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace', fontSize: '0.9rem' }}>{m}:{s}</strong></span>
            </div>

            {/* ── Sticky Nav ── */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 1.5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--green-dark)' }}>🥗 Reto 21 Días</div>
                    <button onClick={cta} className="btn btn-primary btn-sm">ACCEDER A LA APP</button>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section style={{ background: 'linear-gradient(160deg, #064e3b 0%, #065f46 50%, #047857 100%)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative blobs */}
                <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,192,34,0.12) 0%, transparent 70%)', bottom: '50px', left: '5%', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 780, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    {/* Badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '6px 18px', marginBottom: '1.5rem', color: '#a7f3d0', fontSize: '0.82rem', fontWeight: 600 }}>
                        ⭐ +3,000 personas ya completaron el reto
                    </div>

                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem', fontWeight: 900 }}>
                        Baja de peso sin<br />
                        <span style={{ color: '#6ee7b7' }}>pasar hambre</span> en<br />
                        21 días con un plan exacto
                    </h1>

                    <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: 560, margin: '0 auto 2rem', lineHeight: 1.7 }}>
                        Un plan de comidas personalizado con alta proteína, recetas saciantes y seguimiento inteligente.
                        <strong style={{ color: '#6ee7b7' }}> Sin dietas imposibles. Sin pasar hambre.</strong>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={cta} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '18px 48px', boxShadow: '0 8px 32px rgba(16,185,129,0.5)', animation: 'pulse-green 2s infinite' }}>
                            COMENZAR MI RETO GRATIS <ArrowRight size={20} />
                        </button>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                            3 días gratis · Sin tarjeta de crédito · Acceso inmediato
                        </p>
                    </div>

                    {/* Social proof strip */}
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
                    {[['21', 'Días de plan'], ['3×', 'Opciones por comida'], ['60+', 'Recetas saludables'], ['7 kg', 'Meta promedio']].map(([val, lbl]) => (
                        <div key={String(lbl)} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 900, color: '#6ee7b7' }}>{val}</div>
                            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', marginTop: 2 }}>{lbl}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PAIN POINTS "¿Te pasa esto?" ── */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>¿Te suena familiar?</span>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>Si haces dieta, probablemente te pasa esto...</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>Antes de conocer el Reto 21 Días, miles de usuarias vivían exactamente con estos problemas.</p>
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
                    <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Resultados reales</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginTop: '1rem' }}>Mira cómo otras ya lograron su meta</h2>
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
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>El sistema que te hace bajar de peso sin sufrirla</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>3 pasos simples. Sin complicaciones. Solo resultados.</p>
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

            {/* ── DIFFERENTIATORS ── */}
            <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '0.5rem' }}>Ok, pero… ¿qué hace a esto diferente?</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>No es otra app de calorías. El mecanismo es completamente distinto.</p>
                    </div>
                    <div className="grid-2" style={{ gap: '1.25rem' }}>
                        {differentiators.map((d, i) => (
                            <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
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
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Todo lo que obtienes</span>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginTop: '1rem', marginBottom: '0.5rem' }}>Todo lo que necesitas para los 21 días</h2>
                        <p style={{ color: 'var(--text-2)', maxWidth: 500, margin: '0 auto' }}>Sin saltar entre apps, sin hojas de Excel, sin calculadoras de calorías online.</p>
                    </div>
                    <div className="grid-3" style={{ gap: '1.25rem' }}>
                        {features.map((f, i) => (
                            <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
                                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                                <h3 style={{ fontWeight: 700, marginBottom: '0.35rem', fontSize: '0.98rem' }}>{f.title}</h3>
                                <p style={{ color: 'var(--text-2)', fontSize: '0.86rem', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECOND TESTIMONIALS WALL ── */}
            <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>Lo que dicen nuestras usuarias</h2>
                        <p style={{ color: 'var(--text-2)', marginTop: '0.5rem' }}>Miles de personas ya cambiaron su cuerpo con el Reto 21 Días.</p>
                    </div>
                    <div style={{ columns: 2, gap: '1.25rem' }}>
                        {testimonials.map((t, i) => (
                            <div key={i} style={{ breakInside: 'avoid', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '1.25rem', marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: 3, marginBottom: '0.6rem' }}>
                                    {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />)}
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{t.text}</p>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{t.name} <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>· {t.city}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section id="precio" style={{ padding: '5rem 1.5rem', background: 'linear-gradient(160deg,#064e3b,#065f46)' }}>
                <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ background: 'rgba(255,255,255,0.1)', color: '#a7f3d0', padding: '4px 16px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Inversión única · Sin sorpresas</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', marginTop: '1rem', marginBottom: '0.5rem' }}>
                        Accede hoy al precio de lanzamiento
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem' }}>Antes de que suba de precio.</p>

                    <div style={{ background: '#fff', borderRadius: 24, padding: '2.5rem', boxShadow: '0 24px 64px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
                        {/* Live buyers badge */}
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '8px 14px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block', flexShrink: 0, animation: 'blink 1s infinite' }} />
                            <span style={{ fontSize: '0.82rem', color: '#ef4444', fontWeight: 700 }}>33 personas están comprando ahora mismo</span>
                        </div>

                        {/* Countdown */}
                        <div style={{ background: 'linear-gradient(135deg,#064e3b,#065f46)', borderRadius: 12, padding: '12px 16px', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                            <div style={{ color: '#a7f3d0', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>⏰ Esta oferta expira en</div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {[m, s].map((unit, i) => (
                                    <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '2.4rem', fontWeight: 900, color: '#fff', lineHeight: 1, background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: 8, minWidth: 60, textAlign: 'center' }}>{unit}</span>
                                        <span style={{ color: '#6ee7b7', fontSize: '0.62rem', marginTop: 3 }}>{i === 0 ? 'MIN' : 'SEG'}</span>
                                    </span>
                                )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`sep-${i}`} style={{ color: '#6ee7b7', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>:</span>, el], [] as React.ReactNode[])}
                            </div>
                        </div>

                        <div style={{ marginBottom: '0.5rem', color: 'var(--text-3)', fontSize: '0.85rem', textDecoration: 'line-through' }}>Valor real: $49.99 USD</div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 4, marginBottom: '0.25rem' }}>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--green-dark)', marginTop: 8 }}>$</span>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', fontWeight: 900, color: 'var(--green-dark)', lineHeight: 1 }}>4</span>
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--green-dark)', marginTop: 12 }}>.99</span>
                        </div>
                        <div style={{ color: 'var(--text-3)', fontSize: '0.82rem', marginBottom: '2rem' }}>USD · Pago único · Acceso de por vida · Incluye recetas infinitas</div>

                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                            {['Plan completo de 21 días', '3 opciones por cada comida', 'Nutrición personalizada (BMR + proteína + agua)', 'Lista de compras automática', '60+ recetas infinitas post-reto', 'Seguimiento de peso con gráfica', 'Acceso inmediato · Sin mensualidades'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <CheckCircle size={18} color="var(--green)" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        <button onClick={cta} className="btn btn-primary btn-block" style={{ fontSize: '1rem', padding: '18px', marginBottom: '1rem' }}>
                            QUIERO ACCEDER AHORA <ArrowRight size={18} />
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-3)' }}>
                            <span>🔒 Pago seguro</span>
                            <span>⚡ Acceso inmediato</span>
                            <span>🛡️ Garantía 7 días</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL URGENCY CTA ── */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)', textAlign: 'center' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '1rem' }}>
                        Tu versión más saludable te está esperando.
                        <br /><span style={{ color: 'var(--green-dark)' }}>¿Vas a empezar o vas a seguir esperando?</span>
                    </h2>
                    <p style={{ color: 'var(--text-2)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.65 }}>
                        La pregunta no es si puedes bajar de peso. La pregunta es si vas a tomar acción hoy o dejarás pasar otro mes sin cambios.
                    </p>
                    <button onClick={cta} className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '18px 44px', marginBottom: '1rem' }}>
                        EMPEZAR EL RETO AHORA 🚀
                    </button>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>⏱ Acceso inmediato · 🛡️ Garantía 7 días · 🔒 Pago seguro</p>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section style={{ padding: '5rem 1.5rem', background: '#fff' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', marginBottom: '0.5rem' }}>Preguntas frecuentes</h2>
                        <p style={{ color: 'var(--text-2)' }}>Todo lo que necesitas saber antes de empezar.</p>
                    </div>
                    {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
                </div>
            </section>

            {/* ── GUARANTEE ── */}
            <section style={{ padding: '4rem 1.5rem', background: 'var(--green-light)' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛡️</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--green-dark)' }}>Garantía Total de 7 Días</h2>
                    <p style={{ color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2rem' }}>
                        Prueba el Reto 21 Días durante 7 días. Si no te convence por cualquier razón, escríbenos y te devolvemos el <strong>100% de tu dinero</strong>. Sin preguntas, sin excusas, sin letra chica.
                    </p>
                    <p style={{ fontWeight: 700, color: 'var(--green-dark)', fontSize: '1rem' }}>🔒 CERO RIESGO PARA TI</p>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: '#0f172a', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', color: '#6ee7b7', fontSize: '1.1rem', marginBottom: '1rem' }}>🥗 Reto 21 Días: Sin Hambre</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                    {['Términos', 'Privacidad', 'Contacto'].map(l => (
                        <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>© 2025 Reto 21 Días. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
