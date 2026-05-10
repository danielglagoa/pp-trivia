import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Trophy, Eye, EyeOff, Star, Zap, RotateCcw } from "lucide-react";

// ─── BANCO DE PREGUNTAS ───────────────────────────────────────────────────────

const QUESTIONS = [
  // FÁCIL — PÁDEL
  { level: "Fácil", category: "Pádel", q: "¿Cuántos jugadores participan normalmente en un partido de pádel?", a: "4 jugadores." },
  { level: "Fácil", category: "Pádel", q: "¿En qué país nació el pádel?", a: "México." },
  { level: "Fácil", category: "Pádel", q: "¿Cuál es el color más habitual de una pista profesional?", a: "Azul." },
  { level: "Fácil", category: "Pádel", q: "¿Cuántos saques tiene un jugador por punto?", a: "Dos." },
  { level: "Fácil", category: "Pádel", q: "¿Se puede usar la pared después del bote?", a: "Sí." },
  { level: "Fácil", category: "Pádel", q: "¿Cómo se llama el golpe alto defensivo típico del pádel?", a: "Globo." },
  { level: "Fácil", category: "Pádel", q: "¿Cuál es la altura aproximada de la red en el centro?", a: "88 cm." },
  { level: "Fácil", category: "Pádel", q: "¿La pelota de pádel tiene más o menos presión que una de tenis?", a: "Menos presión." },
  { level: "Fácil", category: "Pádel", q: "¿Se puede sacar por encima de la cintura?", a: "No." },
  { level: "Fácil", category: "Pádel", q: "¿Qué superficie suelen tener las pistas profesionales?", a: "Césped artificial con arena." },
  { level: "Fácil", category: "Pádel", q: '¿Qué jugador es conocido como "Bela"?', a: "Fernando Belasteguín." },
  { level: "Fácil", category: "Pádel", q: "¿De qué país es Fernando Belasteguín?", a: "Argentina." },
  { level: "Fácil", category: "Pádel", q: "¿De qué país es Alejandro Galán?", a: "España." },
  { level: "Fácil", category: "Pádel", q: "¿Cómo se llama el circuito profesional principal actual?", a: "Premier Padel." },
  { level: "Fácil", category: "Pádel", q: "¿Qué objeto separa ambos lados de la pista?", a: "La red." },
  { level: "Fácil", category: "Pádel", q: "¿Qué forma de pala suele recomendarse a principiantes?", a: "Redonda." },
  { level: "Fácil", category: "Pádel", q: "¿Qué significa que una pala tenga balance alto?", a: "Que el peso está más hacia la cabeza." },
  { level: "Fácil", category: "Pádel", q: '¿Qué jugador español es conocido como "El Lobo"?', a: "Juan Lebrón." },
  { level: "Fácil", category: "Pádel", q: "¿Qué pareja dominó gran parte de la década de 2010?", a: "Fernando Belasteguín y Juan Martín Díaz." },
  { level: "Fácil", category: "Pádel", q: "¿Qué país es una potencia histórica del pádel junto a España?", a: "Argentina." },

  // FÁCIL — STARVIE
  { level: "Fácil", category: "StarVie", q: "¿De qué país es StarVie?", a: "España." },
  { level: "Fácil", category: "StarVie", q: "¿Qué símbolo aparece en el logo de StarVie?", a: "Una estrella." },
  { level: "Fácil", category: "StarVie", q: "¿Qué fabrica principalmente StarVie?", a: "Palas de pádel." },
  { level: "Fácil", category: "StarVie", q: "¿Qué material premium usan muchas palas StarVie?", a: "Carbono." },
  { level: "Fácil", category: "StarVie", q: "¿Qué modelo moderno de StarVie es conocido por su equilibrio?", a: "Astrum." },
  { level: "Fácil", category: "StarVie", q: "¿Qué tipo de jugador suele usar una Astrum?", a: "Jugadores versátiles y de control." },
  { level: "Fácil", category: "StarVie", q: "¿Qué tecnología rugosa famosa utiliza StarVie?", a: "Full Plane Effect." },
  { level: "Fácil", category: "StarVie", q: "¿Qué suele aportar una goma Soft?", a: "Más comodidad y salida de bola." },
  { level: "Fácil", category: "StarVie", q: "¿Qué suele aportar una goma dura?", a: "Más control y precisión." },
  { level: "Fácil", category: "StarVie", q: "¿Qué marca española es conocida por fabricar muchas palas artesanalmente?", a: "StarVie." },

  // FÁCIL — REAL O INVENTADO
  { level: "Fácil", category: "Real o inventado", q: "¿Existe Ramiro Moyano?", a: "Sí, es real." },
  { level: "Fácil", category: "Real o inventado", q: "¿Existe Javier Palacios?", a: "No, es inventado." },
  { level: "Fácil", category: "Real o inventado", q: "¿Existe Agustín Tapia?", a: "Sí, es real." },
  { level: "Fácil", category: "Real o inventado", q: "¿Existe Lucas Benavente?", a: "No, es inventado." },

  // MEDIA — PÁDEL
  { level: "Media", category: "Pádel", q: "¿Qué jugador argentino es conocido por su creatividad y talento técnico?", a: "Agustín Tapia." },
  { level: "Media", category: "Pádel", q: '¿Qué jugadora española es conocida como "La Perla del Palo"?', a: "Bea González." },
  { level: "Media", category: "Pádel", q: "¿Cuánto mide aproximadamente una pista de pádel?", a: "20 x 10 metros." },
  { level: "Media", category: "Pádel", q: "¿Qué país europeo ha crecido muchísimo en pádel además de España?", a: "Italia o Suecia." },
  { level: "Media", category: "Pádel", q: '¿Qué significa "let" en el saque?', a: "Que el saque se repite." },
  { level: "Media", category: "Pádel", q: "¿Qué jugador español fue número 1 junto a Juan Lebrón?", a: "Alejandro Galán." },
  { level: "Media", category: "Pádel", q: "¿Qué material se usa normalmente en las paredes de pistas profesionales?", a: "Cristal templado." },
  { level: "Media", category: "Pádel", q: "¿Qué circuito reemplazó al World Padel Tour como referencia principal?", a: "Premier Padel." },
  { level: "Media", category: "Pádel", q: "¿Qué significa que una pala tenga punto dulce amplio?", a: "Que tolera mejor golpes descentrados." },
  { level: "Media", category: "Pádel", q: '¿Qué jugador argentino era conocido como "El Señor de Mar del Plata"?', a: "Juan Martín Díaz." },
  { level: "Media", category: "Pádel", q: "¿Qué marca de pelota se usa mucho en torneos profesionales?", a: "Head, Wilson o Bullpadel." },
  { level: "Media", category: "Pádel", q: "¿Qué significa que una pala sea híbrida?", a: "Que mezcla control y potencia." },
  { level: "Media", category: "Pádel", q: "¿Qué suele ofrecer una pala con carbono 3K?", a: "Equilibrio entre rigidez y salida de bola." },
  { level: "Media", category: "Pádel", q: "¿En qué lado suele jugar el jugador de revés?", a: "Lado izquierdo." },
  { level: "Media", category: "Pádel", q: "¿Qué país organiza uno de los Majors más importantes del circuito Premier Padel?", a: "Qatar, Italia, Francia o México." },
  { level: "Media", category: "Pádel", q: "¿Qué jugador destaca históricamente por su defensa y consistencia?", a: "Fernando Belasteguín o Federico Chingotto." },

  // MEDIA — STARVIE
  { level: "Media", category: "StarVie", q: "¿Qué línea moderna de StarVie destaca por equilibrio y gran punto dulce?", a: "Astrum." },
  { level: "Media", category: "StarVie", q: "¿Qué tipo de balance suele buscar un jugador ofensivo?", a: "Balance alto." },
  { level: "Media", category: "StarVie", q: "¿Qué suele ofrecer una superficie rugosa?", a: "Más efecto." },
  { level: "Media", category: "StarVie", q: "¿Qué jugadora profesional estuvo asociada a StarVie?", a: "Bea González o Carolina Navarro." },
  { level: "Media", category: "StarVie", q: "¿Qué característica suele tener una pala de control?", a: "Balance bajo y punto dulce amplio." },
  { level: "Media", category: "StarVie", q: "¿Qué significa que una pala tenga tacto duro?", a: "Sensación más rígida y precisa." },
  { level: "Media", category: "StarVie", q: "¿Qué suele buscar un jugador avanzado en una pala?", a: "Precisión y estabilidad." },
  { level: "Media", category: "StarVie", q: "¿Qué diferencia principal hay entre una pala redonda y una diamante?", a: "Control vs potencia." },
  { level: "Media", category: "StarVie", q: "¿Qué línea de StarVie suele recomendarse para jugadores versátiles?", a: "Astrum." },
  { level: "Media", category: "StarVie", q: "¿Qué aporta añadir overgrips extra al mango?", a: "Más grosor y ajuste del balance." },

  // MEDIA — REAL O INVENTADO
  { level: "Media", category: "Real o inventado", q: "¿Existe Coki Nieto?", a: "Sí, es real." },
  { level: "Media", category: "Real o inventado", q: "¿Existe Martín Velasco?", a: "No, es inventado." },
  { level: "Media", category: "Real o inventado", q: "¿Existe Álex Ruiz?", a: "Sí, es real." },
  { level: "Media", category: "Real o inventado", q: "¿Existe Pablo Llorente?", a: "No, es inventado." },

  // DIFÍCIL — PÁDEL
  { level: "Difícil", category: "Pádel", q: "¿Quién es considerado por muchos el mejor jugador de pádel de la historia?", a: "Fernando Belasteguín." },
  { level: "Difícil", category: "Pádel", q: "¿Qué jugador español fue el primero en alcanzar el número 1 mundial moderno?", a: "Juan Lebrón." },
  { level: "Difícil", category: "Pádel", q: "¿Qué pareja rompió la hegemonía de Bela y Juan Martín Díaz?", a: "Maxi Sánchez / Sanyo Gutiérrez o luego Galán / Lebrón." },
  { level: "Difícil", category: "Pádel", q: '¿Qué jugador argentino es conocido como "El Mozart de Catamarca"?', a: "Agustín Tapia." },
  { level: "Difícil", category: "Pádel", q: "¿En qué década comenzó la expansión fuerte del pádel en España?", a: "Años 90." },
  { level: "Difícil", category: "Pádel", q: "¿Qué país alberga el Buenos Aires P1?", a: "Argentina." },
  { level: "Difícil", category: "Pádel", q: "¿Qué jugador destaca por uno de los estilos más agresivos de smash?", a: "Agustín Tapia o Alejandro Galán." },
  { level: "Difícil", category: "Pádel", q: "¿Qué jugador destaca especialmente por su velocidad y defensa?", a: "Federico Chingotto." },
  { level: "Difícil", category: "Pádel", q: "¿Qué jugadora argentina fue número 1 mundial?", a: "Cecilia Reiter." },
  { level: "Difícil", category: "Pádel", q: "¿Qué significa que una pala tenga forma lágrima?", a: "Equilibrio entre potencia y control." },
  { level: "Difícil", category: "Pádel", q: "¿Qué suele ocurrir con una pala de balance muy alto?", a: "Gana potencia pero pierde manejabilidad." },
  { level: "Difícil", category: "Pádel", q: "¿Qué jugador fue compañero histórico de Bela durante más años?", a: "Juan Martín Díaz." },
  { level: "Difícil", category: "Pádel", q: "¿Qué material suele dar un tacto más rígido: fibra de vidrio o carbono?", a: "Carbono." },
  { level: "Difícil", category: "Pádel", q: "¿Qué circuito existía antes de Premier Padel?", a: "World Padel Tour." },

  // DIFÍCIL — STARVIE
  { level: "Difícil", category: "StarVie", q: "¿Qué caracteriza a una pala artesanal frente a una industrial?", a: "Mayor control de calidad y acabados más precisos." },
  { level: "Difícil", category: "StarVie", q: "¿Qué ventaja tiene una superficie rugosa en condiciones húmedas?", a: "Facilita generar más efecto." },
  { level: "Difícil", category: "StarVie", q: "¿Qué línea de StarVie está orientada a jugadores técnicos y versátiles?", a: "Astrum." },
  { level: "Difícil", category: "StarVie", q: "¿Qué impacto tiene un punto dulce pequeño?", a: "Mayor exigencia técnica." },
  { level: "Difícil", category: "StarVie", q: "¿Qué suele aportar una goma más dura en remates?", a: "Más precisión y estabilidad." },
  { level: "Difícil", category: "StarVie", q: "¿Qué significa 3K en el carbono de una pala?", a: "Cantidad de filamentos por hilo de carbono." },
  { level: "Difícil", category: "StarVie", q: "¿Qué característica suele buscar un profesional en el tacto de pala?", a: "Consistencia y precisión." },
  { level: "Difícil", category: "StarVie", q: "¿Qué ventaja tiene una pala ligera?", a: "Mayor manejabilidad." },
  { level: "Difícil", category: "StarVie", q: "¿Qué inconveniente suele tener una pala demasiado dura?", a: "Menor comodidad y más exigencia física." },
  { level: "Difícil", category: "StarVie", q: "¿Qué modelo de StarVie es reconocido por su equilibrio moderno?", a: "Astrum." },
  { level: "Difícil", category: "StarVie", q: "¿Qué material suele dar más salida de bola: goma blanda o dura?", a: "Goma blanda." },
  { level: "Difícil", category: "StarVie", q: "¿Qué suele ofrecer una pala con balance bajo?", a: "Más control y maniobrabilidad." },
  { level: "Difícil", category: "StarVie", q: "¿Qué ventaja tiene un punto dulce amplio?", a: "Más tolerancia al error." },
  { level: "Difícil", category: "StarVie", q: "¿Qué característica suele tener una pala orientada a potencia?", a: "Balance alto y forma diamante." },

  // DIFÍCIL — REAL O INVENTADO
  { level: "Difícil", category: "Real o inventado", q: "¿Existe Tino Libaak?", a: "Sí, es real." },
  { level: "Difícil", category: "Real o inventado", q: "¿Existe Sergio Lamperti?", a: "No. Trampa: el real es Miguel Lamperti." },
  { level: "Difícil", category: "Real o inventado", q: "¿Existe Juan Tello?", a: "Sí, es real." },
  { level: "Difícil", category: "Real o inventado", q: "¿Existe Matías Sarmiento?", a: "No, es inventado." },
  { level: "Difícil", category: "Real o inventado", q: "¿Existe Gonza Alfonso?", a: "Sí, es real." },
];

// ─── LÓGICA DE GENERACIÓN ─────────────────────────────────────────────────────

const RECENT_MEMORY = 25;
const usedIndices = new Set();

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getAvailable(level) {
  return QUESTIONS.reduce((acc, q, i) => {
    if (q.level === level && !usedIndices.has(i)) acc.push({ q, i });
    return acc;
  }, []);
}

function pickAndMark(pool, count) {
  return shuffle(pool)
    .slice(0, count)
    .map(({ q, i }) => {
      usedIndices.add(i);
      return q;
    });
}

function generateRound() {
  let easy = getAvailable("Fácil");
  let medium = getAvailable("Media");
  let hard = getAvailable("Difícil");

  // Reset memory si el pool es insuficiente
  if (easy.length < 2 || medium.length < 1 || hard.length < 1) {
    usedIndices.clear();
    easy = getAvailable("Fácil");
    medium = getAvailable("Media");
    hard = getAvailable("Difícil");
  }

  const patternA = { m: 2, h: 1 };
  const patternB = { m: 1, h: 2 };
  let pattern = Math.random() < 0.5 ? patternA : patternB;

  if (medium.length < pattern.m || hard.length < pattern.h) {
    pattern = pattern === patternA ? patternB : patternA;
  }

  const picked = [
    ...pickAndMark(easy, 2),
    ...pickAndMark(medium, pattern.m),
    ...pickAndMark(hard, pattern.h),
  ];

  // Mantener memoria acotada (FIFO)
  if (usedIndices.size > RECENT_MEMORY) {
    const overflow = [...usedIndices].slice(0, usedIndices.size - RECENT_MEMORY);
    overflow.forEach((i) => usedIndices.delete(i));
  }

  return shuffle(picked);
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const LEVEL_STYLE = {
  Fácil: { pill: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-400" },
  Media: { pill: "bg-amber-100 text-amber-700 border border-amber-200", dot: "bg-amber-400" },
  Difícil: { pill: "bg-rose-100 text-rose-700 border border-rose-200", dot: "bg-rose-400" },
};

const CATEGORY_STYLE = {
  Pádel: { badge: "bg-sky-100 text-sky-700", icon: "🎾" },
  StarVie: { badge: "bg-violet-100 text-violet-700", icon: "⭐" },
  "Real o inventado": { badge: "bg-orange-100 text-orange-700", icon: "🤔" },
};

// ─── COMPONENTE TARJETA ───────────────────────────────────────────────────────

function QuestionCard({ item, index, showAnswer }) {
  const [revealed, setRevealed] = useState(false);
  const isVisible = showAnswer || revealed;
  const lvl = LEVEL_STYLE[item.level];
  const cat = CATEGORY_STYLE[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 28 }}
    >
      <div className="rounded-3xl bg-white shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-4 space-y-3">
          {/* Cabecera */}
          <div className="flex items-center justify-between gap-2">
            <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${lvl.pill}`}>
              <span className={`h-2 w-2 rounded-full ${lvl.dot}`} />
              {item.level}
            </div>
            <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${cat.badge}`}>
              <span>{cat.icon}</span> {item.category}
            </div>
          </div>

          {/* Pregunta */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Pregunta {index + 1}
            </p>
            <p className="text-lg font-black leading-snug text-slate-900">{item.q}</p>
          </div>

          {/* Respuesta */}
          <AnimatePresence>
            {isVisible ? (
              <motion.div
                key="answer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl bg-lime-50 border border-lime-200 p-3"
              >
                <p className="text-[11px] font-black uppercase tracking-widest text-lime-600 mb-0.5">Respuesta</p>
                <p className="text-base font-bold text-slate-900">{item.a}</p>
              </motion.div>
            ) : (
              <motion.button
                key="reveal-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setRevealed(true)}
                className="w-full rounded-2xl border-2 border-dashed border-slate-200 py-2.5 text-sm font-bold text-slate-400 hover:border-lime-300 hover:text-lime-500 transition-colors active:scale-95"
              >
                <Eye className="inline h-4 w-4 mr-1.5" />
                Ver respuesta
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function App() {
  const [questions, setQuestions] = useState(() => generateRound());
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [roundCount, setRoundCount] = useState(1);
  const [cardKey, setCardKey] = useState(0);

  const stats = useMemo(
    () =>
      questions.reduce((acc, q) => {
        acc[q.level] = (acc[q.level] || 0) + 1;
        return acc;
      }, {}),
    [questions]
  );

  function handleNewRound() {
    setQuestions(generateRound());
    setShowAllAnswers(false);
    setRoundCount((n) => n + 1);
    setCardKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    usedIndices.clear();
    setQuestions(generateRound());
    setShowAllAnswers(false);
    setRoundCount(1);
    setCardKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07111f] via-[#0d1e33] to-[#112240] pb-10">
      <div className="mx-auto max-w-md px-4">

        {/* ── CABECERA ── */}
        <div className="pt-8 pb-5 text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="h-7 w-7 text-lime-400" />
              <h1 className="text-2xl font-black tracking-tight text-white">
                Partner Project <span className="text-lime-400">Trivia</span>
              </h1>
            </div>
            <p className="text-sm text-slate-400">Torneo de pádel · Entrevistas en directo</p>
          </motion.div>
        </div>

        {/* ── PANEL DE CONTROL ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 mb-5 space-y-3"
        >
          {/* Botón principal */}
          <button
            onClick={handleNewRound}
            className="w-full h-16 rounded-2xl bg-lime-400 text-black font-black text-lg shadow-lg shadow-lime-400/20 hover:bg-lime-300 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Nueva ronda · Lote {roundCount}
          </button>

          {/* Mostrar / Ocultar todas */}
          <button
            onClick={() => setShowAllAnswers((v) => !v)}
            className="w-full h-12 rounded-2xl border border-white/20 bg-white/10 text-white font-bold text-sm hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {showAllAnswers ? (
              <><EyeOff className="h-4 w-4" /> Ocultar todas las respuestas</>
            ) : (
              <><Eye className="h-4 w-4" /> Mostrar todas las respuestas</>
            )}
          </button>

          {/* Estadísticas del lote */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-emerald-900/40 border border-emerald-700/30 p-2.5 text-center">
              <p className="text-xs font-black text-emerald-400">Fáciles</p>
              <p className="text-xl font-black text-white">{stats["Fácil"] || 0}</p>
            </div>
            <div className="rounded-2xl bg-amber-900/40 border border-amber-700/30 p-2.5 text-center">
              <p className="text-xs font-black text-amber-400">Medias</p>
              <p className="text-xl font-black text-white">{stats["Media"] || 0}</p>
            </div>
            <div className="rounded-2xl bg-rose-900/40 border border-rose-700/30 p-2.5 text-center">
              <p className="text-xs font-black text-rose-400">Difíciles</p>
              <p className="text-xl font-black text-white">{stats["Difícil"] || 0}</p>
            </div>
          </div>

          {/* Reset sesión */}
          <button
            onClick={handleReset}
            className="w-full h-10 rounded-2xl text-slate-500 text-xs font-bold hover:text-slate-300 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="h-3 w-3" />
            Reiniciar sesión (resetear preguntas usadas)
          </button>
        </motion.div>

        {/* ── TARJETAS ── */}
        <div className="space-y-3" key={cardKey}>
          {questions.map((item, index) => (
            <QuestionCard
              key={`${item.q}-${roundCount}`}
              item={item}
              index={index}
              showAnswer={showAllAnswers}
            />
          ))}
        </div>

        {/* ── PIE ── */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs">
            <Zap className="h-3 w-3" />
            <span>{QUESTIONS.length} preguntas en el banco · {usedIndices.size} usadas esta sesión</span>
          </div>
        </div>

      </div>
    </div>
  );
}
