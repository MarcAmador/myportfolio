import { TINTS } from "@/data/apps";

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

const PALETTE = ["orange", "blue", "green", "yellow", "pink"];

/**
 * Portada generativa: composición de formas planas sobre un color de tinta.
 * Cada proyecto produce siempre la misma composición (depende de su slug).
 * Para usar una captura real: pon la imagen en /public y úsala en vez de <Cover/>.
 */
export default function Cover({ slug, color = "orange", className = "" }) {
  const r = rng(hash(slug));
  const bg = TINTS[color].bg;
  const others = PALETTE.filter((c) => c !== color);
  const pick = () => TINTS[others[Math.floor(r() * others.length)]].bg;

  const shapes = [];
  const n = 5;
  for (let i = 0; i < n; i++) {
    const type = Math.floor(r() * 4);
    const x = r() * 360;
    const y = r() * 200;
    const s = 50 + r() * 110;
    const fill = i === 0 ? "var(--paper-2)" : i === 1 ? "var(--ink)" : pick();
    const key = `${slug}-${i}`;
    if (type === 0) shapes.push(<circle key={key} cx={x + s / 2} cy={y + s / 2} r={s / 2} fill={fill} />);
    else if (type === 1) shapes.push(<rect key={key} x={x} y={y} width={s} height={s} fill={fill} transform={`rotate(${Math.round((r() - 0.5) * 50)} ${x + s / 2} ${y + s / 2})`} />);
    else if (type === 2) shapes.push(<path key={key} d={`M${x} ${y + s} A${s / 2} ${s / 2} 0 0 1 ${x + s} ${y + s} Z`} fill={fill} />);
    else shapes.push(<path key={key} d={`M${x} ${y + s} L${x + s / 2} ${y} L${x + s} ${y + s} Z`} fill={fill} />);
  }
  // rayas de tinta
  const stripes = Array.from({ length: 6 }, (_, i) => (
    <rect key={`s${i}`} x={0} y={14 + i * 7} width={90} height={2.5} fill="var(--ink)" opacity="0.9" />
  ));

  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-hidden="true">
      <rect width="400" height="240" fill={bg} />
      <g style={{ mixBlendMode: "multiply" }}>{shapes}</g>
      <g transform="translate(286 150)">{stripes}</g>
    </svg>
  );
}
