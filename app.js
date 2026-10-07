(() => {
"use strict";
const LANGS = ["kk","ru","en"];
const KEY = "academy-progress-v1", POS = "academy-pos-v2", LANGKEY = "academy-lang", NOTES = "academy-notes-v1", CERTN = "academy-cert-name";

const store = {
  get(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} if((k === KEY || k === NOTES || k === CERTN) && window.Cloud) window.Cloud.queueSave(); }
};

let progress = store.get(KEY, {}) || {};
let notes = store.get(NOTES, {}) || {};
const state = Object.assign({ lang:"kk", view:"home", inst:0, course:0, topic:0, page:0, app:null }, store.get(POS, {}), { lang: store.get(LANGKEY, "kk") });
if(!LANGS.includes(state.lang)) state.lang = "kk";
let quiz = { answers:{}, checked:false };
let exam = null, examTimer = null, confirmReset = false;

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const T = () => window.I18N[state.lang];
const D = () => (window.COURSES && window.COURSES[state.lang]) || window.COURSES.ru;
const passNeed = n => Math.ceil(n * 2 / 3);
const tKey = (i,c,t) => { const I = D()[i], C = I.courses[c]; return `${I.id}/${C.id}/${C.topics[t].id}`; };
const status = k => progress[k] ? (progress[k].passed ? "done" : "fail") : "none";
const NEW_COURSES = ["aiethics","govtech"];

function counts(filter){
  let d = 0, n = 0;
  D().forEach((I,i) => I.courses.forEach((C,c) => C.topics.forEach((t,ti) => {
    if(filter && !filter(i,c)) return;
    n++; if(progress[tKey(i,c,ti)]?.passed) d++;
  })));
  return [d, n];
}
function savePos(){ store.set(POS, { view:state.view, inst:state.inst, course:state.course, topic:state.topic, page:state.page, app:state.app }); }
function valid(){
  const I = D()[state.inst], C = I && I.courses[state.course];
  if(!C || !C.topics[state.topic]){ state.inst = 0; state.course = 0; state.topic = 0; state.page = 0; }
}

function ring(d, n, size = 46){
  const r = (size - 6) / 2, c = 2 * Math.PI * r, f = n ? d / n : 0;
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="5"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"
      stroke-dasharray="${c*f} ${c}" transform="rotate(-90 ${size/2} ${size/2})"/>
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="12" font-weight="700" font-family="Montserrat, Arial">${Math.round(f*100)}%</text></svg>`;
}

/* ---------- Верхняя панель ---------- */
function renderBar(){
  const t = T();
  document.documentElement.lang = state.lang === "kk" ? "kk" : state.lang;
  document.title = `${t.portal} · APA`;
  $("#brand-text").textContent = t.academy;
  $("#nav").innerHTML = [
    ["home", t.home], ["apps", t.apps]
  ].map(([v,l]) => `<button class="navbtn" data-nav="${v}" aria-current="${(state.view===v)||(v==="apps"&&state.view==="app")}">${l}</button>`).join("");
  if(window.Cloud){
    let ac = $("#acct");
    if(!ac){ ac = document.createElement("button"); ac.id = "acct"; ac.className = "navbtn acct"; ac.dataset.nav = "account"; $("#langs").before(ac); }
    ac.textContent = window.Cloud.label(); ac.setAttribute("aria-current", state.view === "account");
  }
  $("#langs").innerHTML = LANGS.map(l => `<button data-lang="${l}" aria-pressed="${l===state.lang}" title="${window.I18N[l].langName}">${l==="kk"?"ҚАЗ":l==="ru"?"РУС":"ENG"}</button>`).join("");
  $("#langs").setAttribute("aria-label", t.lang);
}

/* ---------- Главная ---------- */
function renderHome(){
  const t = T(), data = D();
  const [d, n] = counts();
  const started = Object.keys(progress).length > 0;
  let h = `<section class="hero">
    <span class="cross" style="left:44%;top:16%">× ×<br>&nbsp;×</span><span class="cross" style="right:5%;bottom:14%">× ×<br>×</span>
    <div class="hero-in">
      <div>
        <img class="hero-logo" src="assets/logo-white.png" alt="${esc(t.academy)}">
        <p class="eyebrow">APA.KZ</p>
        <h1>${t.portal}</h1>
        <p class="lead">${t.heroLead}</p>
        <button class="btn white" data-go="continue">${started ? t.continue : t.start} →</button>
      </div>
      <div class="panel">
        <div class="big">${d}<span style="font-size:1.4rem;opacity:.7"> / ${n}</span></div>
        <div class="lbl">${t.topicsDone}</div>
        <div class="meter"><i style="width:${n ? d/n*100 : 0}%"></i></div>
        <div class="lbl">${t.overall}</div>
      </div>
    </div></section>`;

  h += `<div class="wrap"><section class="section"><div class="sec-head"><div><h2>${t.institutes}</h2></div>
    <div class="searchbox"><input id="search" type="search" placeholder="${t.search}" autocomplete="off" aria-label="${t.search}"><div class="results" id="results" hidden></div></div></div>
    <div class="inst-grid">`;
  data.forEach((I, i) => {
    const [id, inn] = counts(ii => ii === i);
    h += `<article class="inst"><div class="inst-top">${ring(id, inn)}<h3 style="padding-right:56px">${esc(I.name)}</h3><p>${esc(I.about)}</p></div><ul>`;
    I.courses.forEach((C, c) => {
      const [cd, cn] = counts((ii,cc) => ii === i && cc === c);
      h += `<li><button data-course="${i},${c}"><b>${esc(C.title)}${NEW_COURSES.includes(C.id) ? `<span class="new">new</span>` : ""}</b><small>${cd}/${cn}</small></button></li>`;
    });
    h += `</ul></article>`;
  });
  h += `</div></section>`;

  h += `<section class="section"><div class="sec-head"><div><h2>${t.apps}</h2><p>${t.appsLead}</p></div></div>${appGrid()}</section></div>`;
  $("#view").innerHTML = h;
}

const APPS = [
  ["cards","Aa","cardsTitle","cardsLead"],
  ["risk","5×5","riskTitle","riskLead"],
  ["cycle","↻","cycleTitle","cycleLead"],
  ["ai","AI","aiTitle","aiLead"],
  ["gov","Gov","gtTitle","gtLead"]
];
function appGrid(){
  const t = T();
  return `<div class="app-grid">${APPS.map(([id,ico,ti,le]) => `<button class="app-card" data-app="${id}"><span class="ico">${ico}</span><b>${t[ti]}</b><span>${t[le]}</span></button>`).join("")}</div>`;
}

function search(q){
  const box = $("#results"); if(!box) return;
  q = q.trim().toLowerCase();
  if(q.length < 2){ box.hidden = true; return; }
  const strip = s => s.replace(/<[^>]+>/g, " ");
  const hits = [];
  D().forEach((I,i) => I.courses.forEach((C,c) => C.topics.forEach((tp,ti) => {
    const hay = (tp.title + " " + tp.pages.map(strip).join(" ")).toLowerCase();
    if(hay.includes(q)) hits.push(`<button data-topic="${i},${c},${ti}">${esc(tp.title)}<small>${esc(I.name)} · ${esc(C.title)}</small></button>`);
  })));
  box.innerHTML = hits.slice(0, 12).join("") || `<div class="none">${T().searchNone}</div>`;
  box.hidden = false;
}

/* ---------- Курс ---------- */
function renderCourse(){
  valid();
  const t = T(), I = D()[state.inst], C = I.courses[state.course];
  const [cd, cn] = counts((ii,cc) => ii === state.inst && cc === state.course);
  let side = `<aside class="side" id="side"><div><h4>${esc(I.name)}</h4><div class="ctitle">${esc(C.title)}</div>
    <div class="pbar"><i style="width:${cd/cn*100}%"></i></div></div>
    <button class="btn sm side-toggle" data-toggle-side>☰ ${t.topics}: ${cd}/${cn}</button>
    <div class="collapsible"><ul class="topics">`;
  C.topics.forEach((tp, ti) => {
    const s = status(tKey(state.inst,state.course,ti));
    const cur = state.view === "course" && ti === state.topic;
    side += `<li><button class="tbtn" data-t="${ti}" aria-current="${cur}"><span class="mark ${s}">${s==="done"?"✓":s==="fail"?"✕":""}</span><span>${esc(tp.title)}</span></button></li>`;
  });
  side += `</ul></div><div class="side-links collapsible">
    <button class="btn sm" data-go="exam" ${state.view==="exam"?'aria-current="true"':""}>⏱ ${t.exam}</button>
    <button class="btn sm" data-go="cert">🎓 ${t.cert}</button></div>
    <div class="side-foot collapsible"><div>${t.legend}</div>${confirmReset
      ? `<div class="confirm"><span>${t.resetQ}</span><button class="btn sm" data-reset="yes" style="color:var(--bad);border-color:var(--bad)">${t.resetYes}</button><button class="btn sm" data-reset="no">${t.cancel}</button></div>`
      : `<button class="linkbtn" data-reset="ask">${t.reset}</button>`}</div></aside>`;

  let main = "";
  if(state.view === "exam") main = examHtml(I, C);
  else if(state.view === "cert") main = certHtml(I, C, cd === cn);
  else main = topicHtml(I, C);
  $("#view").innerHTML = `<div class="course-wrap">${side}<main class="main" id="main">${main}</main></div>`;
  if(window.innerWidth <= 900) $("#side").classList.add("collapsed");
}

function topicHtml(I, C){
  const t = T(), tp = C.topics[state.topic], k = tKey(state.inst,state.course,state.topic);
  const total = tp.pages.length, isTest = state.page >= total, passed = progress[k]?.passed;
  let steps = tp.pages.map((_,i) => `<button class="step" data-p="${i}" aria-current="${i===state.page}">${t.page} ${i+1}</button>`).join("");
  steps += `<button class="step test ${passed?"done":""}" data-p="${total}" aria-current="${isTest}">${passed ? "✓ "+t.testPassed : t.test}</button>`;
  let h = `<div class="main-head"><div class="crumbs">${esc(I.name)} · ${esc(C.title)}</div><h2>${esc(tp.title)}</h2><div class="steps">${steps}</div></div>`;
  if(!isTest){
    h += `<article class="text">${tp.pages[state.page]}</article>
      <div class="pager"><button class="btn" data-go="prev" ${state.page===0?"disabled":""}>← ${t.back}</button>
      <button class="btn primary" data-go="next">${state.page===total-1 ? t.toTest : t.next} →</button></div>
      <div class="notes"><label for="note">${t.notes}<span id="note-saved"></span></label><textarea id="note" placeholder="${t.notesPh}">${esc(notes[k]||"")}</textarea></div>`;
  } else {
    h += `<form class="quiz" id="quiz"><p class="quiz-note">${t.quizNote(tp.quiz.length, passNeed(tp.quiz.length))}${progress[k] ? ` ${t.best}: ${progress[k].best}/${tp.quiz.length}.` : ""}</p>`;
    h += questionsHtml(tp.quiz, quiz, "q");
    if(quiz.checked){
      const sc = score(tp.quiz, quiz.answers), ok = sc >= passNeed(tp.quiz.length);
      h += `<div class="result ${ok?"pass":"failr"}"><span class="score">${sc}/${tp.quiz.length}</span><div><b>${ok ? t.passMsg : t.failMsg}</b></div></div>`;
    }
    h += `</form><div class="pager"><button class="btn" data-go="text">← ${t.backToText}</button>`;
    if(!quiz.checked) h += `<button class="btn primary" data-go="check" ${Object.keys(quiz.answers).length < tp.quiz.length ? "disabled" : ""}>${t.check}</button>`;
    else h += `<span style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-go="retry">${t.retry}</button>${nextTopic() ? `<button class="btn primary" data-go="nexttopic">${t.nextTopic} →</button>` : ""}</span>`;
    h += `</div>`;
  }
  return h;
}

function questionsHtml(list, st, prefix){
  const t = T();
  return list.map((q, qi) => {
    const ans = st.answers[qi];
    let h = `<fieldset class="q"><legend>${qi+1}. ${esc(q.q)}</legend><div class="opts">`;
    q.o.forEach((o, oi) => {
      let cls = "";
      if(st.checked){ if(oi === q.a && ans === oi) cls = "right"; else if(ans === oi) cls = "wrong"; }
      h += `<label class="opt ${cls}"><input type="radio" id="${prefix}${qi}o${oi}" name="${prefix}${qi}" value="${oi}" ${ans===oi?"checked":""} ${st.checked?"disabled":""}><span>${esc(o)}</span></label>`;
    });
    h += `</div>`;
    if(st.checked){
      const ok = ans === q.a;
      h += `<div class="verdict ${ok?"ok":"no"}"><span class="tag">${ok ? t.correct : t.wrong}</span><span>${ok ? "" : `${t.rightAnswer}: «${esc(q.o[q.a])}». `}${esc(q.e)}</span></div>`;
    }
    return h + `</fieldset>`;
  }).join("");
}
const score = (list, answers) => list.filter((q,qi) => answers[qi] === q.a).length;

function nextTopic(){
  const I = D()[state.inst];
  if(state.topic < I.courses[state.course].topics.length - 1) return [state.course, state.topic + 1];
  if(state.course < I.courses.length - 1) return [state.course + 1, 0];
  return null;
}

/* ---------- Итоговый экзамен ---------- */
function buildExam(C){
  const qs = [];
  C.topics.forEach((tp, ti) => tp.quiz.forEach((q, qi) => qs.push({ ti, qi })));
  for(let i = qs.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [qs[i], qs[j]] = [qs[j], qs[i]]; }
  return { inst:state.inst, course:state.course, refs:qs, answers:{}, checked:false, started:Date.now(), elapsed:0 };
}
function examQs(C){ return exam.refs.map(r => C.topics[r.ti].quiz[r.qi]); }
function examHtml(I, C){
  const t = T();
  let h = `<div class="main-head"><div class="crumbs">${esc(I.name)} · ${esc(C.title)}</div><h2>${t.exam}</h2>
    <p style="margin:8px 0 0;color:var(--muted)">${t.examLead}</p></div>`;
  if(!exam || exam.inst !== state.inst || exam.course !== state.course){
    h += `<div class="pager"><button class="btn primary" data-go="examstart">${t.examStart} →</button></div>`;
    return h;
  }
  const qs = examQs(C);
  h += `<div class="quiz"><p class="quiz-note">${t.time}: <span class="timer" id="timer">${fmt(exam.checked ? exam.elapsed : Date.now() - exam.started)}</span></p>`;
  h += questionsHtml(qs, exam, "x");
  if(exam.checked){
    const sc = score(qs, exam.answers), pct = Math.round(sc / qs.length * 100);
    h += `<div class="result ${pct >= 67 ? "pass" : "failr"}"><span class="score">${pct}%</span><div><b>${t.examResult}: ${sc}/${qs.length}</b> · ${t.time} ${fmt(exam.elapsed)}</div></div>`;
  }
  h += `</div><div class="pager">`;
  h += exam.checked ? `<button class="btn" data-go="examstart">${t.retry}</button>`
    : `<button class="btn primary" data-go="examcheck" ${Object.keys(exam.answers).length < qs.length ? "disabled" : ""}>${t.examFinish}</button>`;
  return h + `</div>`;
}
const fmt = ms => { const s = Math.floor(ms / 1000); return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; };
function tick(){
  clearInterval(examTimer);
  examTimer = setInterval(() => {
    const el = $("#timer");
    if(!el || !exam || exam.checked){ clearInterval(examTimer); return; }
    el.textContent = fmt(Date.now() - exam.started);
  }, 1000);
}

/* ---------- Сертификат ---------- */
function certHtml(I, C, unlocked){
  const t = T();
  let h = `<div class="main-head"><div class="crumbs">${esc(I.name)} · ${esc(C.title)}</div><h2>${t.cert}</h2></div>`;
  if(!unlocked) return h + `<div class="locked">🔒 ${t.certLocked}</div>`;
  const name = store.get(CERTN, "");
  const date = new Date().toLocaleDateString(state.lang === "kk" ? "kk-KZ" : state.lang === "ru" ? "ru-RU" : "en-GB", { day:"numeric", month:"long", year:"numeric" });
  h += `<div class="cert-form" style="margin-top:20px"><label for="certname" style="font-weight:700">${t.certName}</label><input id="certname" value="${esc(name)}" autocomplete="name"></div>
    <div class="cert"><div class="cert-in">
      <img src="assets/logo.png" alt="">
      <div class="ct">${t.certTitle}</div>
      <div class="nm" id="certout">${esc(name) || "&nbsp;"}</div>
      <div>${t.certText}</div>
      <div class="cn">«${esc(C.title)}»</div>
      <div style="color:var(--muted)">${esc(I.name)} · ${date}</div>
      <small>${t.certNote}</small>
    </div></div>`;
  return h;
}

/* ---------- Интерактивные модули ---------- */
let cards = null, cycleSt = null, aiSt = {}, gtSt = [3,3,3,3], riskSt = [3,3];
function glossary(){
  const out = [];
  D().forEach(I => I.courses.forEach(C => C.topics.forEach(tp => tp.pages.forEach(p => {
    const m = p.match(/<div class="term"><b>[^<]*<\/b>([\s\S]*?)<\/div>/);
    if(!m) return;
    const txt = m[1].replace(/<[^>]+>/g, "").trim();
    const parts = txt.split(/\s[—–-]\s/);
    if(parts.length > 1) out.push({ term: parts[0].trim(), def: parts.slice(1).join(" — ").trim(), src: C.title });
    else {
      const en = txt.match(/^(.+?)\s(?:is|are|refers to)\s(.+)$/);
      if(en && en[1].length < 60){
        const def = en[2].trim();
        out.push({ term: en[1].replace(/^(A|An|The)\s/, ""), def: def[0].toUpperCase() + def.slice(1), src: C.title });
      }
    }
  }))));
  return out;
}
function renderApp(){
  const t = T(); let body = "";
  const id = state.app;
  if(id === "cards"){
    if(!cards || cards.lang !== state.lang){ cards = { lang:state.lang, deck: glossary(), i:0, flipped:false, known:0 }; }
    const c = cards.deck[cards.i];
    body = `<h2>${t.cardsTitle}</h2><p>${t.cardsLead}</p>`;
    if(!c) body += `<div class="result pass"><span class="score">✓</span><div><b>${t.cardsDone}</b></div></div><div class="flash-ctl"><button class="btn" data-card="restart">${t.cardsShuffle}</button></div>`;
    else body += `<div class="flash"><button class="flash-card ${cards.flipped?"flipped":""}" data-card="flip" aria-label="flip">
        <div class="face front"><b>${esc(c.term)}</b><small>${esc(c.src)}</small></div>
        <div class="face back">${esc(c.def)}</div></button></div>
      <div class="flash-ctl"><button class="btn" data-card="again">↺ ${t.cardsAgain}</button><span class="count">${cards.deck.length - cards.i} ${t.cardsLeft}</span><button class="btn primary" data-card="know">✓ ${t.cardsKnow}</button></div>
      <div class="flash-ctl"><button class="linkbtn" data-card="shuffle">${t.cardsShuffle}</button></div>`;
  }
  else if(id === "risk"){
    const [p, im] = riskSt, s = p * im, lvl = s >= 15 ? 3 : s >= 10 ? 2 : s >= 5 ? 1 : 0;
    const colors = ["var(--ok)","var(--warn)","#c4622d","var(--bad)"];
    let grid = `<div class="ax"></div>${[1,2,3,4,5].map(x => `<div class="ax">${x}</div>`).join("")}`;
    for(let y = 5; y >= 1; y--){
      grid += `<div class="ax">${y}</div>`;
      for(let x = 1; x <= 5; x++){ const v = x*y, l = v >= 15 ? 3 : v >= 10 ? 2 : v >= 5 ? 1 : 0;
        grid += `<button class="cell l${l}" data-risk="${y},${x}" aria-pressed="${y===p && x===im}" aria-label="${t.prob} ${y}, ${t.impact} ${x}">${v}</button>`; }
    }
    body = `<h2>${t.riskTitle}</h2><p>${t.riskLead}</p><div class="matrix-layout">
      <div><div class="matrix">${grid}</div><p style="font-size:.82rem;color:var(--muted);margin:8px 0 0">↑ ${t.prob} · → ${t.impact}</p></div>
      <div class="risk-out">
        <div class="sel"><label for="rp">${t.prob}</label><select id="rp">${t.scale.map((s,i) => `<option value="${i+1}" ${i+1===p?"selected":""}>${i+1} — ${s}</option>`).join("")}</select></div>
        <div class="sel"><label for="ri">${t.impact}</label><select id="ri">${t.scale.map((s,i) => `<option value="${i+1}" ${i+1===im?"selected":""}>${i+1} — ${s}</option>`).join("")}</select></div>
        <div>${t.score}: <b style="font-variant-numeric:tabular-nums">${p} × ${im} = ${s}</b></div>
        <div class="lvl" style="color:${colors[lvl]}">${t.riskLevels[lvl]}</div>
        <div>${t.riskAdvice[lvl]}</div></div></div>`;
  }
  else if(id === "cycle"){
    if(!cycleSt || cycleSt.lang !== state.lang){
      const idx = t.cycleSteps.map((_,i) => i);
      for(let i = idx.length - 1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
      cycleSt = { lang:state.lang, order:idx, done:0, msg:"", bad:-1 };
    }
    const fin = cycleSt.done === t.cycleSteps.length;
    body = `<h2>${t.cycleTitle}</h2><p>${t.cycleLead}</p>
      <div class="cycle">${cycleSt.order.map(i => `<button class="cyc ${i < cycleSt.done ? "done" : ""} ${i === cycleSt.bad ? "shake" : ""}" data-cyc="${i}" ${i < cycleSt.done ? "disabled" : ""}>${i < cycleSt.done ? (i+1)+". " : ""}${esc(t.cycleSteps[i])}</button>`).join("")}</div>
      <div class="order">${t.cycleSteps.slice(0, cycleSt.done).map((s,i) => `<span>${i+1}. ${esc(s)}</span>`).join("")}</div>
      <div class="msg ${fin ? "ok" : cycleSt.msg ? "no" : ""}">${fin ? t.cycleOk : cycleSt.msg}</div>
      ${fin ? `<button class="btn" data-cyc="reset" style="margin-top:12px">${t.cycleReset}</button>` : ""}`;
  }
  else if(id === "ai"){
    const right = t.aiCases.filter((c,i) => aiSt[i] === c[1]).length, answered = Object.keys(aiSt).length;
    body = `<h2>${t.aiTitle}</h2><p>${t.aiLead}</p><div class="cases">${t.aiCases.map((c, i) => {
      const a = aiSt[i];
      return `<div class="case"><p>${i+1}. ${esc(c[0])}</p><div class="chips">${t.aiLevels.map((l, li) => {
        let cls = ""; if(a !== undefined){ if(li === c[1]) cls = "right"; else if(li === a) cls = "wrong"; }
        return `<button class="chip ${cls}" data-ai="${i},${li}" ${a !== undefined ? "disabled" : ""}>${esc(l)}</button>`; }).join("")}</div>
        ${a !== undefined ? `<div class="why">${a === c[1] ? "✓" : "✕"} ${esc(c[2])}</div>` : ""}</div>`; }).join("")}</div>
      <div class="result ${right >= 4 ? "pass" : "failr"}" style="margin-top:16px" ${answered < t.aiCases.length ? "hidden" : ""}><span class="score">${right}/${t.aiCases.length}</span><div><b>${t.aiScore}</b></div></div>
      ${answered ? `<button class="btn" data-ai="reset" style="margin-top:12px">${t.cycleReset}</button>` : ""}`;
  }
  else if(id === "gov"){
    const avg = gtSt.reduce((a,b) => a+b, 0) / gtSt.length, weak = gtSt.indexOf(Math.min(...gtSt));
    const lvl = avg < 2 ? 0 : avg < 3 ? 1 : avg < 4 ? 2 : 3;
    body = `<h2>${t.gtTitle}</h2><p>${t.gtLead}</p><div class="gt"><div>${t.gtAreas.map((a, i) => `<div class="gt-row"><label for="gt${i}">${esc(a)}<span>${gtSt[i]}</span></label><input type="range" id="gt${i}" min="1" max="5" step="1" value="${gtSt[i]}" data-gt="${i}"></div>`).join("")}</div>
      <div class="risk-out"><div>${t.gtAvg}: <b>${avg.toFixed(1)} / 5</b></div><div class="lvl" style="color:var(--accent)">${t.gtLevelNames[lvl]}</div>
      <div class="bars">${t.gtAreas.map((a, i) => `<div class="b ${i===weak?"weak":""}"><span>${esc(a)}</span><div class="track"><i style="width:${gtSt[i]*20}%"></i></div></div>`).join("")}</div>
      <div><b>${t.gtWeak}:</b> ${esc(t.gtAreas[weak])}. ${t.gtAdvice[weak]}</div></div></div>`;
  }
  $("#view").innerHTML = `<div class="app-wrap"><p style="margin:0 0 12px"><button class="linkbtn" data-nav="apps">← ${t.apps}</button></p><div class="app-box">${body}</div></div>`;
}
function renderApps(){
  const t = T();
  $("#view").innerHTML = `<div class="wrap section"><div class="sec-head"><div><h2>${t.apps}</h2><p>${t.appsLead}</p></div></div>${appGrid()}</div>`;
}

/* ---------- Отрисовка ---------- */
function render(scrollTop){
  renderBar();
  if(state.view === "home") renderHome();
  else if(state.view === "apps") renderApps();
  else if(state.view === "app") renderApp();
  else if(state.view === "account"){ if(window.Cloud) window.Cloud.render($("#view")); else { state.view = "home"; renderHome(); } }
  else renderCourse();
  $("#foot-text").textContent = T().academy;
  savePos();
  if(scrollTop) window.scrollTo({ top:0 });
  if(state.view === "exam" && exam && !exam.checked) tick();
}
function openTopic(i, c, ti){
  Object.assign(state, { view:"course", inst:i, course:c, topic:ti, page:0 });
  quiz = { answers:{}, checked:false }; confirmReset = false;
  render(true);
}

document.addEventListener("click", e => {
  const b = e.target.closest("button"); if(!b) return;
  const ds = b.dataset;
  if(ds.lang){ state.lang = ds.lang; store.set(LANGKEY, ds.lang); render(); return; }
  if(ds.nav){ state.view = ds.nav; render(true); return; }
  if(ds.course){ const [i,c] = ds.course.split(",").map(Number); openTopic(i, c, 0); return; }
  if(ds.topic){ const [i,c,t] = ds.topic.split(",").map(Number); openTopic(i, c, t); return; }
  if(ds.app){ state.view = "app"; state.app = ds.app; render(true); return; }
  if(ds.t !== undefined){ openTopic(state.inst, state.course, +ds.t); return; }
  if(ds.p !== undefined){ state.page = +ds.p; quiz = { answers:{}, checked:false }; render(); return; }
  if(ds.toggleSide !== undefined){ $("#side").classList.toggle("collapsed"); return; }
  if(ds.reset){
    if(ds.reset === "ask") confirmReset = true;
    else if(ds.reset === "no") confirmReset = false;
    else { progress = {}; store.set(KEY, progress); confirmReset = false; quiz = { answers:{}, checked:false }; }
    render(); if(ds.reset !== "yes") $("#side")?.classList.remove("collapsed"); return;
  }
  if(ds.card){
    const c = cards;
    if(ds.card === "flip") c.flipped = !c.flipped;
    else if(ds.card === "know"){ c.i++; c.flipped = false; }
    else if(ds.card === "again"){ c.deck.push(c.deck.splice(c.i, 1)[0]); c.flipped = false; }
    else { const d = glossary(); for(let i = d.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [d[i], d[j]] = [d[j], d[i]]; } cards = { lang:state.lang, deck:d, i:0, flipped:false }; }
    renderApp(); return;
  }
  if(ds.risk){ riskSt = ds.risk.split(",").map(Number); renderApp(); return; }
  if(ds.cyc){
    if(ds.cyc === "reset"){ cycleSt = null; renderApp(); return; }
    const i = +ds.cyc;
    if(i === cycleSt.done){ cycleSt.done++; cycleSt.msg = ""; cycleSt.bad = -1; } else { cycleSt.msg = T().cycleBad; cycleSt.bad = i; }
    renderApp(); return;
  }
  if(ds.ai){ if(ds.ai === "reset") aiSt = {}; else { const [i, l] = ds.ai.split(",").map(Number); aiSt[i] = l; } renderApp(); return; }
  if(ds.go){
    const g = ds.go, C = D()[state.inst].courses[state.course];
    if(g === "continue"){
      const p = store.get(POS, null);
      if(p && p.view === "course") openTopic(p.inst || 0, p.course || 0, p.topic || 0); else openTopic(0, 0, 0);
      return;
    }
    if(g === "next"){ state.page++; render(true); }
    else if(g === "prev"){ state.page--; render(); }
    else if(g === "text"){ state.page = 0; quiz = { answers:{}, checked:false }; render(); }
    else if(g === "check"){
      const tp = C.topics[state.topic], k = tKey(state.inst,state.course,state.topic), sc = score(tp.quiz, quiz.answers);
      const prev = progress[k] || { passed:false, best:0 };
      progress[k] = { passed: prev.passed || sc >= passNeed(tp.quiz.length), best: Math.max(prev.best, sc) };
      store.set(KEY, progress); quiz.checked = true; render();
    }
    else if(g === "retry"){ quiz = { answers:{}, checked:false }; render(); }
    else if(g === "nexttopic"){ const n = nextTopic(); if(n) openTopic(state.inst, n[0], n[1]); }
    else if(g === "exam"){ state.view = "exam"; render(true); }
    else if(g === "cert"){ state.view = "cert"; render(true); }
    else if(g === "examstart"){ exam = buildExam(C); state.view = "exam"; render(true); }
    else if(g === "examcheck"){ exam.elapsed = Date.now() - exam.started; exam.checked = true; render(); }
  }
});

document.addEventListener("change", e => {
  const el = e.target;
  let m = el.name && el.name.match(/^([qx])(\d+)$/);
  if(m){
    const st = m[1] === "q" ? quiz : exam;
    st.answers[+m[2]] = +el.value;
    const btn = document.querySelector(m[1] === "q" ? '[data-go="check"]' : '[data-go="examcheck"]');
    if(btn){
      const n = m[1] === "q" ? D()[state.inst].courses[state.course].topics[state.topic].quiz.length : exam.refs.length;
      btn.disabled = Object.keys(st.answers).length < n;
    }
    return;
  }
  if(el.id === "rp" || el.id === "ri"){ riskSt = [+$("#rp").value, +$("#ri").value]; renderApp(); }
});
document.addEventListener("input", e => {
  const el = e.target;
  if(el.id === "search") search(el.value);
  else if(el.id === "note"){
    const k = tKey(state.inst,state.course,state.topic);
    notes[k] = el.value; store.set(NOTES, notes);
    const s = $("#note-saved"); if(s){ s.textContent = "✓ " + T().saved; clearTimeout(s._t); s._t = setTimeout(() => s.textContent = "", 1500); }
  }
  else if(el.id === "certname"){ store.set(CERTN, el.value); $("#certout").textContent = el.value || " "; }
  else if(el.dataset.gt !== undefined){ gtSt[+el.dataset.gt] = +el.value; const y = window.scrollY; renderApp(); window.scrollTo(0, y); const r = document.getElementById(el.id); r && r.focus(); }
});
document.addEventListener("submit", e => e.preventDefault());
document.addEventListener("click", e => { if(!e.target.closest(".searchbox")){ const r = $("#results"); if(r) r.hidden = true; } }, true);

if(window.Cloud) window.Cloud.init({
  lang: () => state.lang,
  get: () => ({ progress, notes, certName: store.get(CERTN, "") }),
  set(d){ progress = d.progress || {}; notes = d.notes || {}; store.set(KEY, progress); store.set(NOTES, notes); store.set(CERTN, d.certName || ""); render(); },
  rerender: () => render(),
  go(v){ state.view = v; render(true); }
});
render();
})();
