/**
 * Endpoint del formulario de contacto.
 * Valida los datos en el servidor y (por ahora) los imprime en la consola.
 * Para recibir correos reales, conecta un servicio al final (ver comentario "ENVÍO").
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Campo trampa: los bots lo rellenan, las personas no. Respondemos "ok" sin hacer nada.
  if (body.website) return Response.json({ ok: true });

  if (name.length < 2 || name.length > 80 || !EMAIL_RE.test(email) || message.length < 10 || message.length > 3000) {
    return Response.json({ ok: false }, { status: 400 });
  }

  // ENVÍO ─ ejemplo con Resend (npm i resend, y define RESEND_API_KEY en .env.local):
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Portafolio <onboarding@resend.dev>",
  //     to: "tu-correo@ejemplo.com",
  //     replyTo: email,
  //     subject: `Nuevo mensaje de ${name}`,
  //     text: message,
  //   });

  console.log("[contacto]", { name, email, message });
  return Response.json({ ok: true });
}
