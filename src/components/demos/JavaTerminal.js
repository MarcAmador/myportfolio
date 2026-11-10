"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/context/PrefsContext";

const INITIAL_BOOKS = [
  { id: 1, title: "Clean Code", author: "R. C. Martin", loanedTo: null },
  { id: 2, title: "Effective Java", author: "J. Bloch", loanedTo: null },
  { id: 3, title: "Cien años de soledad", author: "G. García Márquez", loanedTo: "Marta" },
  { id: 4, title: "El Aleph", author: "J. L. Borges", loanedTo: null },
];

const T = {
  es: {
    banner: ["Biblioteca Central v2.3 — Java 21", "Escribe 'ayuda' para ver los comandos.", ""],
    help: [
      "Comandos disponibles:",
      "  listar                 muestra el catálogo",
      "  buscar <texto>         busca por título o autor",
      "  prestar <id> <socio>   registra un préstamo",
      "  devolver <id>          registra una devolución",
      "  agregar <título>       agrega un libro",
      "  limpiar                limpia la pantalla",
    ],
    cmds: ["listar", "buscar java", "prestar 2 Ana", "devolver 3", "agregar Rayuela", "ayuda"],
    available: "disponible",
    loaned: "prestado a",
    empty: "(sin resultados)",
    noId: "Error: no existe un libro con id",
    already: "Error: el libro ya está prestado.",
    notLoaned: "Error: ese libro no está prestado.",
    loanOk: (t, who) => `✔ "${t}" prestado a ${who}. Vence en 14 días.`,
    retOk: (t) => `✔ "${t}" devuelto. Sin multa.`,
    added: (id, t) => `✔ Libro #${id} agregado: "${t}"`,
    usage: (u) => `Uso: ${u}`,
    unknown: (c) => `Comando desconocido: ${c}. Prueba 'ayuda'.`,
    cmdMap: { listar: "list", buscar: "search", prestar: "loan", devolver: "return", agregar: "add", limpiar: "clear", ayuda: "help" },
  },
  en: {
    banner: ["Central Library v2.3 — Java 21", "Type 'help' to see the commands.", ""],
    help: [
      "Available commands:",
      "  list                   show the catalog",
      "  search <text>          search by title or author",
      "  loan <id> <member>     register a loan",
      "  return <id>            register a return",
      "  add <title>            add a book",
      "  clear                  clear the screen",
    ],
    cmds: ["list", "search java", "loan 2 Ana", "return 3", "add Hopscotch", "help"],
    available: "available",
    loaned: "loaned to",
    empty: "(no results)",
    noId: "Error: no book with id",
    already: "Error: the book is already on loan.",
    notLoaned: "Error: that book is not on loan.",
    loanOk: (t, who) => `✔ "${t}" loaned to ${who}. Due in 14 days.`,
    retOk: (t) => `✔ "${t}" returned. No fine.`,
    added: (id, t) => `✔ Book #${id} added: "${t}"`,
    usage: (u) => `Usage: ${u}`,
    unknown: (c) => `Unknown command: ${c}. Try 'help'.`,
    cmdMap: { list: "list", search: "search", loan: "loan", return: "return", add: "add", clear: "clear", help: "help" },
  },
};

const SOURCE = `public class LoanService {
    private final BookRepository books;
    private static final int LOAN_DAYS = 14;

    public LoanService(BookRepository books) {
        this.books = books;
    }

    public Loan lend(int bookId, String member) {
        Book book = books.findById(bookId)
            .orElseThrow(() -> new BookNotFoundException(bookId));

        if (book.isOnLoan()) {
            throw new IllegalStateException("Book already on loan");
        }

        Loan loan = new Loan(book, member, LocalDate.now().plusDays(LOAN_DAYS));
        book.setLoan(loan);
        books.save(book);
        return loan;
    }

    public BigDecimal calculateFine(Loan loan) {
        long late = ChronoUnit.DAYS.between(loan.getDueDate(), LocalDate.now());
        return late > 0 ? FINE_PER_DAY.multiply(BigDecimal.valueOf(late)) : BigDecimal.ZERO;
    }
}`;

const KW = /\b(public|private|static|final|class|return|new|if|throw|this|long|int|String|void|null)\b/g;
function Highlight({ code }) {
  return code.split("\n").map((line, i) => {
    const [body, comment] = line.split("//");
    const parts = body.split(/(".*?")/g);
    return (
      <div key={i} className="whitespace-pre">
        <span className="mr-4 inline-block w-5 select-none text-right opacity-35">{i + 1}</span>
        {parts.map((p, j) =>
          p.startsWith('"') ? (
            <span key={j} style={{ color: "#9bd0b4" }}>{p}</span>
          ) : (
            p.split(KW).map((chunk, k) =>
              k % 2 ? (
                <span key={k} style={{ color: "#ff8a57" }}>{chunk}</span>
              ) : (
                <span key={k}>{chunk}</span>
              )
            )
          )
        )}
        {comment !== undefined && <span style={{ color: "#8a8270" }}>//{comment}</span>}
      </div>
    );
  });
}

export default function JavaTerminal() {
  const { lang, ui } = usePrefs();
  const L = T[lang];
  const [tab, setTab] = useState("term");
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [lines, setLines] = useState(() => T[lang].banner.map((text) => ({ text })));
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines, tab]);

  // Si cambia el idioma, reinicia el banner
  useEffect(() => {
    setLines(T[lang].banner.map((text) => ({ text })));
  }, [lang]);

  const out = (...texts) => texts.flat().map((text) => ({ text }));

  function run(raw) {
    const cmdLine = raw.trim();
    if (!cmdLine) return;
    const [word, ...args] = cmdLine.split(/\s+/);
    const cmd = L.cmdMap[word.toLowerCase()];
    const echo = [{ text: `$ ${cmdLine}`, you: true }];
    let res = [];

    switch (cmd) {
      case "help":
        res = out(L.help);
        break;
      case "list":
        res = out(
          books.map(
            (b) => `  #${b.id}  ${b.title.padEnd(24)} ${b.author.padEnd(20)} ${b.loanedTo ? `[x] ${L.loaned} ${b.loanedTo}` : `[ ] ${L.available}`}`
          )
        );
        break;
      case "search": {
        const q = args.join(" ").toLowerCase();
        if (!q) return setLines((l) => [...l, ...echo, ...out(L.usage(word + " <text>"))]);
        const found = books.filter((b) => (b.title + b.author).toLowerCase().includes(q));
        res = found.length ? out(found.map((b) => `  #${b.id}  ${b.title} — ${b.author}`)) : out(L.empty);
        break;
      }
      case "loan": {
        const id = Number(args[0]);
        const who = args.slice(1).join(" ");
        if (!id || !who) return setLines((l) => [...l, ...echo, ...out(L.usage(`${word} <id> <member>`))]);
        const b = books.find((x) => x.id === id);
        if (!b) res = out(`${L.noId} ${id}.`);
        else if (b.loanedTo) res = out(L.already);
        else {
          setBooks((bs) => bs.map((x) => (x.id === id ? { ...x, loanedTo: who } : x)));
          res = out(L.loanOk(b.title, who));
        }
        break;
      }
      case "return": {
        const id = Number(args[0]);
        if (!id) return setLines((l) => [...l, ...echo, ...out(L.usage(`${word} <id>`))]);
        const b = books.find((x) => x.id === id);
        if (!b) res = out(`${L.noId} ${id}.`);
        else if (!b.loanedTo) res = out(L.notLoaned);
        else {
          setBooks((bs) => bs.map((x) => (x.id === id ? { ...x, loanedTo: null } : x)));
          res = out(L.retOk(b.title));
        }
        break;
      }
      case "add": {
        const title = args.join(" ");
        if (!title) return setLines((l) => [...l, ...echo, ...out(L.usage(`${word} <title>`))]);
        const id = Math.max(...books.map((b) => b.id)) + 1;
        setBooks((bs) => [...bs, { id, title, author: "—", loanedTo: null }]);
        res = out(L.added(id, title));
        break;
      }
      case "clear":
        setLines([]);
        setCmdHistory((h) => [...h, cmdLine]);
        return;
      default:
        res = out(L.unknown(word));
    }
    setLines((l) => [...l, ...echo, ...res, { text: "" }]);
    setCmdHistory((h) => [...h, cmdLine]);
    setHIdx(-1);
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp" && cmdHistory.length) {
      e.preventDefault();
      const i = hIdx < 0 ? cmdHistory.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setInput(cmdHistory[i]);
    } else if (e.key === "ArrowDown" && hIdx >= 0) {
      e.preventDefault();
      const i = hIdx + 1;
      if (i >= cmdHistory.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(i);
        setInput(cmdHistory[i]);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-[720px] border-2 border-ink shadow-[6px_6px_0_var(--shadow)]">
      <div className="flex border-b-2 border-ink bg-[#2a261b] font-mono text-[11.5px] text-[#f1e8d2]">
        {[
          ["term", "bash — biblioteca.jar"],
          ["src", "LoanService.java"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            aria-pressed={tab === id}
            className={`border-r-2 border-ink px-4 py-2 ${tab === id ? "bg-[#14120d]" : "opacity-70 hover:opacity-100"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "term" ? (
        <div className="term h-[360px] overflow-auto p-4" onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap break-words" style={l.you ? { color: "#ffc93d" } : undefined}>
              {l.text || "\u00a0"}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span style={{ color: "#ff8a57" }}>$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal"
              className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[#f1e8d2]"
              style={{ outline: "none" }}
            />
          </div>
          <div ref={endRef} />
        </div>
      ) : (
        <div className="term h-[360px] overflow-auto p-4 text-[12px]">
          <Highlight code={SOURCE} />
        </div>
      )}

      {tab === "term" && (
        <div className="flex flex-wrap items-center gap-1.5 border-t-2 border-ink bg-paper-3 px-3 py-2">
          <span className="label mr-1">{ui("demos.java.hint")}</span>
          {L.cmds.map((c) => (
            <button key={c} className="chip bg-paper-2" onClick={() => run(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
