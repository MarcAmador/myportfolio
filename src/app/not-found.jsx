import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center p-8 text-center">
      <div>
        <p className="mb-2 text-sm text-muted">404</p>
        <h1 className="display mb-3 text-[72px]">Página no encontrada</h1>
        <p className="mb-7 text-muted">Esta ventana no existe en el escritorio.</p>
        <Link href="/" className="btn btn-primary">
          Volver al escritorio
        </Link>
      </div>
    </main>
  );
}
