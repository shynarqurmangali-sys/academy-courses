/* Күнтізбе және хабарландырулар (Supabase). Академия оқиғалары мен хабарландыруларды бәрі көреді, әкімші қосады; жеке оқиғалар тек өз иесіне көрінеді. */
(() => {
"use strict";
const S = {
  kk: { nav:"Күнтізбе", title:"Оқу күнтізбесі", lead:"Академия оқиғалары, дедлайндар және сіздің жеке жоспарыңыз.",
    months:["Қаңтар","Ақпан","Наурыз","Сәуір","Мамыр","Маусым","Шілде","Тамыз","Қыркүйек","Қазан","Қараша","Желтоқсан"],
    wd:["Дс","Сс","Ср","Бс","Жм","Сб","Жс"], today:"Бүгін", upcoming:"Жақын оқиғалар", none:"Оқиға жоқ.", dayNone:"Бұл күні оқиға жоқ.",
    kinds:{ lecture:"Дәріс", deadline:"Дедлайн", exam:"Емтихан", event:"Іс-шара", mine:"Менің жоспарым" },
    addMine:"Жеке оқиға қосу", addAcademy:"Академия оқиғасын қосу (әкімші)", what:"Не істеймін?", when:"Күні мен уақыты", place:"Орны", kind:"Түрі", add:"Қосу",
    loginHint:"Жеке жоспар құру үшін кабинетке кіріңіз.", login:"Кіру", del:"Өшіру", gcal:"Google Calendar", ics:"Outlook / .ics",
    news:"Хабарландырулар", newsNone:"Әзірге хабарландыру жоқ.", addNews:"Хабарландыру жариялау (әкімші)", newsTitle:"Тақырыбы", newsBody:"Мәтіні", publish:"Жариялау",
    all:"Барлық күнтізбе", err:"Қате:", offline:"Күнтізбе жүктелмеді. Интернетті тексеріңіз." },
  ru: { nav:"Календарь", title:"Учебный календарь", lead:"События Академии, дедлайны и ваш личный план.",
    months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
    monthsG:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],
    wd:["Пн","Вт","Ср","Чт","Пт","Сб","Вс"], today:"Сегодня", upcoming:"Ближайшие события", none:"Событий нет.", dayNone:"В этот день событий нет.",
    kinds:{ lecture:"Лекция", deadline:"Дедлайн", exam:"Экзамен", event:"Мероприятие", mine:"Мой план" },
    addMine:"Добавить личное событие", addAcademy:"Добавить событие Академии (админ)", what:"Что сделать?", when:"Дата и время", place:"Место", kind:"Тип", add:"Добавить",
    loginHint:"Чтобы вести личный план, войдите в кабинет.", login:"Войти", del:"Удалить", gcal:"Google Calendar", ics:"Outlook / .ics",
    news:"Объявления", newsNone:"Пока объявлений нет.", addNews:"Опубликовать объявление (админ)", newsTitle:"Заголовок", newsBody:"Текст", publish:"Опубликовать",
    all:"Весь календарь", err:"Ошибка:", offline:"Не удалось загрузить календарь. Проверьте интернет." },
  en: { nav:"Calendar", title:"Study calendar", lead:"Academy events, deadlines and your personal plan.",
    months:["January","February","March","April","May","June","July","August","September","October","November","December"],
    wd:["Mo","Tu","We","Th","Fr","Sa","Su"], today:"Today", upcoming:"Upcoming", none:"No events.", dayNone:"No events on this day.",
    kinds:{ lecture:"Lecture", deadline:"Deadline", exam:"Exam", event:"Event", mine:"My plan" },
    addMine:"Add a personal event", addAcademy:"Add an Academy event (admin)", what:"What to do?", when:"Date and time", place:"Place", kind:"Type", add:"Add",
    loginHint:"Sign in to keep a personal plan.", login:"Sign in", del:"Delete", gcal:"Google Calendar", ics:"Outlook / .ics",
    news:"Announcements", newsNone:"No announcements yet.", addNews:"Post an announcement (admin)", newsTitle:"Title", newsBody:"Text", publish:"Publish",
    all:"Full calendar", err:"Error:", offline:"Could not load the calendar. Check your connection." }
};
const KINDS = ["lecture","deadline","exam","event"];
let app = null, academy = [], mine = [], news = [], loaded = false, loading = false, failed = false, msg = "";
const now0 = new Date();
let cur = { y: now0.getFullYear(), m: now0.getMonth() }, sel = dayKey(now0);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const L = () => S[app.lang()] || S.kk;
const C = () => window.Cloud;
function dayKey(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
const fmtTime = d => `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
const fmtDay = d => { const l = L(), m = (l.monthsG || l.months)[d.getMonth()]; return app.lang() === "en" ? `${d.getDate()} ${m}` : `${d.getDate()} ${m.toLowerCase()}`; };
const fmtDate = d => `${fmtDay(d)}, ${L().wd[(d.getDay() + 6) % 7]}`;

function all(){
  return academy.map(e => ({ ...e, src:"a", d:new Date(e.starts_at) }))
    .concat(mine.map(e => ({ ...e, src:"m", kind:"mine", d:new Date(e.starts_at) })))
    .sort((a, b) => a.d - b.d);
}

async function load(){
  const sb = C() && C().client(); if(!sb || loading) return;
  loading = true;
  try {
    const [a, n, m] = await Promise.all([
      sb.from("academy_events").select("*").order("starts_at"),
      sb.from("announcements").select("*").order("created_at", { ascending:false }).limit(20),
      C().user() ? sb.from("user_events").select("*").order("starts_at") : Promise.resolve({ data:[] })
    ]);
    if(a.error || n.error || m.error) throw (a.error || n.error || m.error);
    academy = a.data || []; news = n.data || []; mine = m.data || []; failed = false;
  } catch(e){ failed = true; }
  loaded = true; loading = false; app.rerender();
}

function evRow(e, withDate){
  const l = L(), canDel = (e.src === "m") || (e.src === "a" && C().isAdmin());
  return `<li class="ev k-${e.kind}"><div class="ev-main">
      <span class="ev-tag">${l.kinds[e.kind]}</span>
      <b>${esc(e.title)}</b>
      <small>${withDate ? fmtDate(e.d) + " · " : ""}${fmtTime(e.d)}${e.place ? " · " + esc(e.place) : ""}</small></div>
    <div class="ev-act">
      <a class="linkbtn" target="_blank" rel="noopener" href="${gcalUrl(e)}">${l.gcal}</a>
      <button class="linkbtn" data-cal-ics="${e.src}:${e.id}">${l.ics}</button>
      ${canDel ? `<button class="linkbtn" data-cal-del="${e.src}:${e.id}">${l.del}</button>` : ""}
    </div></li>`;
}

const icsDate = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
function gcalUrl(e){
  const end = new Date(e.d.getTime() + 3600e3);
  const p = new URLSearchParams({ action:"TEMPLATE", text:e.title, dates:`${icsDate(e.d)}/${icsDate(end)}`, details:"APA · " + location.origin + location.pathname, location:e.place || "" });
  return "https://calendar.google.com/calendar/render?" + p.toString();
}
function downloadIcs(e){
  const end = new Date(e.d.getTime() + 3600e3), q = s => String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const txt = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//APA//Learning portal//KK","BEGIN:VEVENT",
    `UID:${e.src}-${e.id}@academy-courses`, `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(e.d)}`, `DTEND:${icsDate(end)}`,
    `SUMMARY:${q(e.title)}`, e.place ? `LOCATION:${q(e.place)}` : "", "END:VEVENT","END:VCALENDAR"].filter(Boolean).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([txt], { type:"text/calendar" }));
  a.download = "event.ics"; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function grid(evs){
  const l = L(), first = new Date(cur.y, cur.m, 1), shift = (first.getDay() + 6) % 7, days = new Date(cur.y, cur.m + 1, 0).getDate();
  const byDay = {}; evs.forEach(e => (byDay[dayKey(e.d)] = byDay[dayKey(e.d)] || []).push(e));
  const today = dayKey(new Date());
  let h = `<div class="cal-head"><button class="btn" data-cal-m="-1" aria-label="‹">‹</button><b>${l.months[cur.m]} ${cur.y}</b><button class="btn" data-cal-m="1" aria-label="›">›</button><button class="btn" data-cal-m="0">${l.today}</button></div>
    <div class="cal-grid">${l.wd.map(w => `<div class="wd">${w}</div>`).join("")}`;
  for(let i = 0; i < shift; i++) h += `<div class="cell empty"></div>`;
  for(let d = 1; d <= days; d++){
    const k = dayKey(new Date(cur.y, cur.m, d)), list = byDay[k] || [];
    h += `<button class="cell${k === today ? " today" : ""}${k === sel ? " sel" : ""}" data-cal-day="${k}"><span>${d}</span><i>${list.slice(0, 4).map(e => `<em class="dot k-${e.kind}"></em>`).join("")}</i></button>`;
  }
  return h + `</div>`;
}

function render(view){
  const l = L(), cl = C(), sb = cl && cl.client();
  if(!sb){ view.innerHTML = `<div class="wrap section"><p class="cloud-msg bad">${l.offline}</p></div>`; return; }
  if(!loaded) load();
  const evs = all(), dayList = evs.filter(e => dayKey(e.d) === sel), up = evs.filter(e => e.d >= new Date(new Date().setHours(0,0,0,0))).slice(0, 6);
  const admin = cl.isAdmin(), user = cl.user();
  const d0 = new Date(sel + "T09:00");
  const defWhen = `${sel}T09:00`;
  let h = `<div class="wrap section"><div class="sec-head"><div><h2>${l.title}</h2><p>${l.lead}</p></div></div>
    ${failed ? `<p class="cloud-msg bad">${l.offline}</p>` : ""}${msg ? `<p class="cloud-msg bad">${esc(msg)}</p>` : ""}
    <div class="cal-layout"><div class="cal-box">${grid(evs)}
      <div class="cal-legend">${KINDS.concat("mine").map(k => `<span><em class="dot k-${k}"></em>${l.kinds[k]}</span>`).join("")}</div>
      <h3 class="cal-day">${fmtDate(d0)}</h3>
      ${dayList.length ? `<ul class="ev-list">${dayList.map(e => evRow(e)).join("")}</ul>` : `<p class="muted">${l.dayNone}</p>`}
      ${user ? `<details class="cal-form"><summary>+ ${l.addMine}</summary><form data-cal-form="mine">
          <label>${l.what}<input name="title" required maxlength="300"></label>
          <label>${l.when}<input name="when" type="datetime-local" required value="${defWhen}"></label>
          <button class="btn primary" type="submit">${l.add}</button></form></details>`
        : `<p class="muted">${l.loginHint} <button class="linkbtn" data-nav="account">${l.login}</button></p>`}
      ${admin ? `<details class="cal-form"><summary>+ ${l.addAcademy}</summary><form data-cal-form="academy">
          <label>${l.what}<input name="title" required maxlength="300"></label>
          <label>${l.when}<input name="when" type="datetime-local" required value="${defWhen}"></label>
          <label>${l.place}<input name="place" maxlength="200"></label>
          <label>${l.kind}<select name="kind">${KINDS.map(k => `<option value="${k}">${l.kinds[k]}</option>`).join("")}</select></label>
          <button class="btn primary" type="submit">${l.add}</button></form></details>` : ""}
    </div>
    <aside class="cal-side">
      <div class="cal-box"><h3>${l.upcoming}</h3>${up.length ? `<ul class="ev-list">${up.map(e => evRow(e, true)).join("")}</ul>` : `<p class="muted">${l.none}</p>`}</div>
      <div class="cal-box"><h3>${l.news}</h3>${newsHtml(admin)}</div>
    </aside></div></div>`;
  view.innerHTML = h;
}

function newsHtml(admin){
  const l = L();
  let h = news.length ? `<ul class="news">${news.map(n => `<li><small>${(d => `${fmtDay(d)} ${d.getFullYear()}`)(new Date(n.created_at))}</small><b>${esc(n.title)}</b>${n.body ? `<p>${esc(n.body)}</p>` : ""}${admin ? `<button class="linkbtn" data-cal-del="n:${n.id}">${l.del}</button>` : ""}</li>`).join("")}</ul>` : `<p class="muted">${l.newsNone}</p>`;
  if(admin) h += `<details class="cal-form"><summary>+ ${l.addNews}</summary><form data-cal-form="news">
    <label>${l.newsTitle}<input name="title" required maxlength="300"></label>
    <label>${l.newsBody}<textarea name="body" rows="4" maxlength="5000"></textarea></label>
    <button class="btn primary" type="submit">${l.publish}</button></form></details>`;
  return h;
}

/* Басты беттегі шағын блок: жақын оқиғалар мен соңғы хабарландыру */
function homeWidget(){
  const host = document.querySelector(".hero"); if(!host || !C() || !C().client()) return;
  if(!loaded){ load(); return; }
  const l = L(), up = all().filter(e => e.d >= new Date()).slice(0, 3), n = news[0];
  if(!up.length && !n) return;
  const el = document.createElement("div");
  el.className = "wrap"; el.innerHTML = `<section class="section home-cal"><div class="sec-head"><div><h2>${l.upcoming}</h2></div><button class="btn" data-nav="calendar">${l.all} →</button></div>
    <div class="home-cal-grid">${n ? `<div class="cal-box news-one"><span class="ev-tag">${l.news}</span><b>${esc(n.title)}</b>${n.body ? `<p>${esc(n.body.slice(0, 220))}${n.body.length > 220 ? "…" : ""}</p>` : ""}</div>` : ""}
    ${up.length ? `<div class="cal-box"><ul class="ev-list">${up.map(e => evRow(e, true)).join("")}</ul></div>` : ""}</div></section>`;
  host.after(el);
}

document.addEventListener("click", async e => {
  const b = e.target.closest("[data-cal-m],[data-cal-day],[data-cal-del],[data-cal-ics]"); if(!b) return;
  const ds = b.dataset;
  if(ds.calM !== undefined){
    const n = +ds.calM;
    if(n === 0){ const t = new Date(); cur = { y:t.getFullYear(), m:t.getMonth() }; sel = dayKey(t); }
    else { const d = new Date(cur.y, cur.m + n, 1); cur = { y:d.getFullYear(), m:d.getMonth() }; }
    app.rerender(); return;
  }
  if(ds.calDay){ sel = ds.calDay; app.rerender(); return; }
  const [src, id] = (ds.calDel || ds.calIcs).split(":");
  if(ds.calIcs){ const ev = all().find(x => x.src === src && String(x.id) === id); if(ev) downloadIcs(ev); return; }
  const table = src === "m" ? "user_events" : src === "a" ? "academy_events" : "announcements";
  const { error } = await C().client().from(table).delete().eq("id", +id);
  msg = error ? L().err + " " + error.message : "";
  loaded = false; load();
});

document.addEventListener("submit", async e => {
  const f = e.target.closest("[data-cal-form]"); if(!f) return;
  e.preventDefault();
  const kind = f.dataset.calForm, sb = C().client(), F = n => f.elements[n].value.trim();
  let res;
  if(kind === "news") res = await sb.from("announcements").insert({ title:F("title"), body:F("body") });
  else {
    const row = { title:F("title"), starts_at:new Date(F("when")).toISOString() };
    if(kind === "academy"){ row.place = F("place"); row.kind = F("kind"); }
    res = await sb.from(kind === "mine" ? "user_events" : "academy_events").insert(row);
    sel = F("when").slice(0, 10);
  }
  msg = res.error ? L().err + " " + res.error.message : "";
  loaded = false; load();
});

window.Cal = {
  init(api){ app = api; },
  label(){ return L().nav; },
  render, homeWidget,
  reset(){ loaded = false; mine = []; }
};
})();
