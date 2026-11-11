export default function Cover({ slug, className = "" }) {
  if (slug === "mercadito") {
    // E-commerce Web Showcase Mockup
    return (
      <svg viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Mercadito preview">
        <rect width="480" height="240" fill="#0d1322" />
        {/* Dot pattern */}
        <pattern id="dot-cover-1" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#38bdf8" fillOpacity="0.2" />
        </pattern>
        <rect width="480" height="240" fill="url(#dot-cover-1)" />

        {/* Browser Frame */}
        <g transform="translate(30, 24)">
          <rect width="420" height="200" rx="14" fill="#131b2e" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Header Bar */}
          <rect width="420" height="34" rx="14" fill="#0b1120" />
          <path d="M0 24h420v10H0z" fill="#0b1120" />
          <circle cx="18" cy="17" r="4.5" fill="#f87171" />
          <circle cx="32" cy="17" r="4.5" fill="#fbbf24" />
          <circle cx="46" cy="17" r="4.5" fill="#34d399" />
          <rect x="70" y="10" width="180" height="14" rx="7" fill="#1e293b" />
          <text x="80" y="21" fill="#94a3b8" fontSize="9" fontFamily="monospace">mercadito.dev/tienda</text>
          <rect x="350" y="8" width="54" height="18" rx="9" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
          <text x="362" y="20" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">🛒 (3)</text>

          {/* Catalog Grid */}
          <g transform="translate(16, 46)">
            {/* Item 1 */}
            <rect width="118" height="136" rx="10" fill="#0b1120" stroke="#334155" strokeWidth="1" />
            <rect x="10" y="10" width="98" height="60" rx="6" fill="#1e293b" />
            <rect x="24" y="24" width="70" height="32" rx="4" fill="#38bdf8" fillOpacity="0.15" />
            <circle cx="59" cy="40" r="12" fill="#38bdf8" fillOpacity="0.6" />
            <rect x="10" y="80" width="60" height="8" rx="4" fill="#f1f5f9" />
            <rect x="10" y="93" width="80" height="6" rx="3" fill="#64748b" />
            <rect x="10" y="108" width="45" height="16" rx="8" fill="#fbbf24" />
            <text x="18" y="120" fill="#090d16" fontSize="9" fontFamily="monospace" fontWeight="bold">$34.00</text>

            {/* Item 2 (Featured) */}
            <g transform="translate(132, 0)">
              <rect width="118" height="136" rx="10" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
              <rect x="10" y="10" width="98" height="60" rx="6" fill="#1e293b" />
              <rect x="24" y="24" width="70" height="32" rx="4" fill="#fbbf24" fillOpacity="0.15" />
              <circle cx="59" cy="40" r="12" fill="#fbbf24" fillOpacity="0.7" />
              <rect x="10" y="80" width="75" height="8" rx="4" fill="#f1f5f9" />
              <rect x="10" y="93" width="90" height="6" rx="3" fill="#64748b" />
              <rect x="10" y="108" width="45" height="16" rx="8" fill="#38bdf8" />
              <text x="18" y="120" fill="#090d16" fontSize="9" fontFamily="monospace" fontWeight="bold">$89.00</text>
              <rect x="62" y="108" width="46" height="16" rx="8" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="1" />
              <text x="68" y="120" fill="#34d399" fontSize="8" fontFamily="monospace">✓ Stripe</text>
            </g>

            {/* Item 3 */}
            <g transform="translate(264, 0)">
              <rect width="118" height="136" rx="10" fill="#0b1120" stroke="#334155" strokeWidth="1" />
              <rect x="10" y="10" width="98" height="60" rx="6" fill="#1e293b" />
              <circle cx="59" cy="40" r="12" fill="#a78bfa" fillOpacity="0.6" />
              <rect x="10" y="80" width="65" height="8" rx="4" fill="#f1f5f9" />
              <rect x="10" y="93" width="75" height="6" rx="3" fill="#64748b" />
              <rect x="10" y="108" width="45" height="16" rx="8" fill="#fbbf24" />
              <text x="18" y="120" fill="#090d16" fontSize="9" fontFamily="monospace" fontWeight="bold">$18.50</text>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  if (slug === "biblioteca-central") {
    // Java Console & Layered Architecture Mockup
    return (
      <svg viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Biblioteca Central preview">
        <rect width="480" height="240" fill="#0b0f19" />
        <pattern id="dot-cover-2" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#fbbf24" fillOpacity="0.2" />
        </pattern>
        <rect width="480" height="240" fill="url(#dot-cover-2)" />

        <g transform="translate(30, 24)">
          <rect width="420" height="200" rx="14" fill="#090d14" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Header */}
          <rect width="420" height="34" rx="14" fill="#141a29" />
          <path d="M0 24h420v10H0z" fill="#141a29" />
          <circle cx="18" cy="17" r="4.5" fill="#f87171" />
          <circle cx="32" cy="17" r="4.5" fill="#fbbf24" />
          <circle cx="46" cy="17" r="4.5" fill="#34d399" />
          <text x="70" y="21" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">LoanService.java · Java 21</text>
          <rect x="330" y="8" width="76" height="18" rx="9" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeWidth="1" />
          <text x="340" y="20" fill="#34d399" fontSize="9" fontFamily="monospace">TESTS: PASS</text>

          {/* Terminal Code Lines */}
          <g transform="translate(20, 50)" fontFamily="monospace" fontSize="9.5">
            <text y="14" fill="#64748b">1  <tspan fill="#38bdf8">public class</tspan> <tspan fill="#fbbf24">LoanService</tspan> &#123;</text>
            <text y="30" fill="#64748b">2    <tspan fill="#38bdf8">private final</tspan> BookRepository books;</text>
            <text y="46" fill="#64748b">3    <tspan fill="#38bdf8">public</tspan> Loan <tspan fill="#34d399">lendBook</tspan>(<tspan fill="#38bdf8">int</tspan> id, String member) &#123;</text>
            <text y="62" fill="#64748b">4      Book b = books.findById(id).orElseThrow();</text>
            <text y="78" fill="#64748b">5      <tspan fill="#38bdf8">return</tspan> books.recordLoan(b, member, 14);</text>
            <text y="94" fill="#64748b">6    &#125;</text>
            <text y="110" fill="#64748b">7  &#125;</text>

            <rect x="0" y="120" width="380" height="24" rx="6" fill="#141a29" stroke="#334155" strokeWidth="1" />
            <text x="10" y="136" fill="#34d399">$ java -jar biblioteca.jar --test (0 errors, 14 passed)</text>
          </g>
        </g>
      </svg>
    );
  }

  // HabitNest (Android Native & Kotlin)
  return (
    <svg viewBox="0 0 480 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="HabitNest preview">
      <rect width="480" height="240" fill="#0d111d" />
      <pattern id="dot-cover-3" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="#a78bfa" fillOpacity="0.2" />
      </pattern>
      <rect width="480" height="240" fill="url(#dot-cover-3)" />

      {/* Android Device Mockup Centered */}
      <g transform="translate(120, 18)">
        <rect width="240" height="206" rx="20" fill="#111827" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
        {/* Notch */}
        <rect x="80" y="6" width="80" height="8" rx="4" fill="#030712" />
        <circle cx="120" cy="10" r="2.5" fill="#374151" />

        {/* Screen Content */}
        <g transform="translate(16, 26)">
          <text x="0" y="16" fill="#ffffff" fontSize="13" fontFamily="sans-serif" fontWeight="bold">HabitNest</text>
          <text x="145" y="16" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">🔥 12 DÍAS</text>

          {/* Streak Progress Circle */}
          <g transform="translate(0, 26)">
            <rect width="208" height="46" rx="10" fill="#1f2937" stroke="#374151" strokeWidth="1" />
            <circle cx="30" cy="23" r="14" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
            <text x="24" y="27" fill="#38bdf8" fontSize="11" fontFamily="sans-serif" fontWeight="bold">85%</text>
            <text x="56" y="20" fill="#f3f4f6" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Meta diaria completada</text>
            <text x="56" y="32" fill="#9ca3af" fontSize="8" fontFamily="sans-serif">5 de 6 hábitos realizados hoy</text>
          </g>

          {/* Habit Item 1 */}
          <g transform="translate(0, 80)">
            <rect width="208" height="30" rx="8" fill="#1f2937" />
            <circle cx="16" cy="15" r="7" fill="#34d399" />
            <path d="M13 15l2 2 4-4" stroke="#090d16" strokeWidth="1.5" strokeLinecap="round" />
            <text x="32" y="18" fill="#f3f4f6" fontSize="9" fontFamily="sans-serif">Lectura técnica · 30 min</text>
            <text x="175" y="18" fill="#34d399" fontSize="8" fontFamily="monospace">✓ Room</text>
          </g>

          {/* Habit Item 2 */}
          <g transform="translate(0, 116)">
            <rect width="208" height="30" rx="8" fill="#1f2937" />
            <circle cx="16" cy="15" r="7" fill="#38bdf8" />
            <path d="M13 15l2 2 4-4" stroke="#090d16" strokeWidth="1.5" strokeLinecap="round" />
            <text x="32" y="18" fill="#f3f4f6" fontSize="9" fontFamily="sans-serif">Entrenamiento físico</text>
            <text x="175" y="18" fill="#38bdf8" fontSize="8" fontFamily="monospace">✓ Compose</text>
          </g>
        </g>
      </g>
    </svg>
  );
}
