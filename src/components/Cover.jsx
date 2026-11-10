/**
 * Portada generativa, sobria: unas pocas formas suaves y de bajo contraste.
 * Cada proyecto produce siempre la misma composición (depende de su slug).
 * Para usar una captura real: pon la imagen en /public y úsala en vez de <Cover/>.
 */
function hash(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FILLS = [
  "color-mix(in srgb, var(--accent) 38%, transparent)",
  "color-mix(in srgb, var(--fg) 12%, transparent)",
  "color-mix(in srgb, var(--fg) 22%, transparent)",
];

export default function Cover({ slug, className = "" }) {
  const r = rng(hash(slug));
  const shapes = Array.from({ length: 3 }, (_, i) => {
    const type = Math.floor(r() * 3);
    const s = 70 + r() * 90;
    const x = 20 + r() * (360 - s);
    const y = 15 + r() * (210 - s);
    const fill = FILLS[i];
    const key = `${slug}-${i}`;
    if (type === 0) return <circle key={key} cx={x + s / 2} cy={y + s / 2} r={s / 2} fill={fill} />;
    if (type === 1) return <rect key={key} x={x} y={y} width={s} height={s} rx={14} fill={fill} />;
    return <path key={key} d={`M${x} ${y + s} A${s / 2} ${s / 2} 0 0 1 ${x + s} ${y + s} Z`} fill={fill} />;
  });

  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-hidden="true">
      <rect width="400" height="240" fill="var(--surface-2)" />
      {shapes}
    </svg>
  );
}
