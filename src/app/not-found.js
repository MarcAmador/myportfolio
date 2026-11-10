import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center p-8 text-center">
      <div>
        <p className="label mb-2">Error 404</p>
        <h1 className="display text-[96px]">
          Se perdió<span className="text-orange">.</span>
        </h1>
        <p className="mb-6 text-ink-soft">Esta ventana no existe en el escritorio.</p>
        <Link href="/" className="btn btn-primary">
          Volver al escritorio
        </Link>
      </div>
    </main>
  );
}
