/* Аккаунт и облачное сохранение прогресса (Supabase). Без входа сайт работает как раньше — всё хранится в браузере. */
(() => {
"use strict";
const URL_ = "https://wlwpixuiaqdpzowbbvrg.supabase.co";
const KEY_ = "sb_publishable_KQqp2q5aoKz7sMK9Xx8BaA_e8jLwEnu";

const S = {
  kk: { myCourses:"Менің курстарым", noCourses:"Әлі ешбір тақырып өтілмеді. Оқуды бастаңыз!", admin:"Сіз әкімшісіз: күнтізбеге оқиға мен хабарландыру қоса аласыз.",
    login:"Кіру", cabinet:"Кабинет", title:"Жеке кабинет",
    lead:"Тіркелсеңіз, прогресіңіз, тест нәтижелері мен жазбаларыңыз бұлтта сақталады және кез келген құрылғыда ашылады.",
    email:"Логин", loginHint:"Латын әріптері, сандар және . _ - (3–32 таңба)", changePass:"Құпиясөзді өзгерту", taken:"Бұл логин бос емес, басқасын таңдаңыз.", badFmt:"Логин тек латын әріптері, сандар және . _ - белгілерінен тұрады (3–32 таңба).", pass:"Құпиясөз (кемінде 6 таңба)", signIn:"Кіру", signUp:"Тіркелу",
    noAcc:"Аккаунтыңыз жоқ па?", haveAcc:"Аккаунтыңыз бар ма?", forgot:"Құпиясөзді ұмытсаңыз, әкімшіге хабарласыңыз.",
    sent:"Поштаңызға хат жіберілді. Сілтемені басып, тіркелуді растаңыз, содан кейін кіріңіз.",
    resetSent:"Құпиясөзді қалпына келтіру сілтемесі поштаңызға жіберілді.",
    newPass:"Жаңа құпиясөз", savePass:"Құпиясөзді сақтау", passSaved:"Құпиясөз жаңартылды.",
    you:"Сіз кірдіңіз:", synced:"Прогресс бұлтта сақталды", syncing:"Сақталуда…", syncErr:"Бұлтқа сақтау сәтсіз болды. Интернетті тексеріңіз.",
    stats:"Өтілген тақырыптар", notesN:"Жазбалар", logout:"Шығу", offline:"Бұлтқа қосылу мүмкін болмады. Сайт браузерде жұмыс істей береді.",
    err:"Қате:", badLogin:"Логин немесе құпиясөз қате.", notConfirmed:"Пошта әлі расталмаған. Хаттағы сілтемені басыңыз." },
  ru: { myCourses:"Мои курсы", noCourses:"Пока ни одна тема не пройдена. Начните обучение!", admin:"Вы администратор: можете добавлять события и объявления в календарь.",
    login:"Войти", cabinet:"Кабинет", title:"Личный кабинет",
    lead:"Зарегистрируйтесь, и ваш прогресс, результаты тестов и заметки будут храниться в облаке и открываться на любом устройстве.",
    email:"Логин", loginHint:"Латинские буквы, цифры и . _ - (3–32 символа)", changePass:"Сменить пароль", taken:"Этот логин занят, выберите другой.", badFmt:"Логин: только латинские буквы, цифры и . _ - (3–32 символа).", pass:"Пароль (не меньше 6 символов)", signIn:"Войти", signUp:"Зарегистрироваться",
    noAcc:"Нет аккаунта?", haveAcc:"Уже есть аккаунт?", forgot:"Забыли пароль? Обратитесь к администратору.",
    sent:"Мы отправили письмо. Перейдите по ссылке, чтобы подтвердить регистрацию, затем войдите.",
    resetSent:"Ссылка для восстановления пароля отправлена на почту.",
    newPass:"Новый пароль", savePass:"Сохранить пароль", passSaved:"Пароль обновлён.",
    you:"Вы вошли как:", synced:"Прогресс сохранён в облаке", syncing:"Сохраняется…", syncErr:"Не удалось сохранить в облако. Проверьте интернет.",
    stats:"Пройдено тем", notesN:"Заметок", logout:"Выйти", offline:"Не удалось подключиться к облаку. Сайт продолжает работать в браузере.",
    err:"Ошибка:", badLogin:"Неверный логин или пароль.", notConfirmed:"Почта ещё не подтверждена. Перейдите по ссылке из письма." },
  en: { myCourses:"My courses", noCourses:"No topics passed yet. Start learning!", admin:"You are an admin: you can add events and announcements to the calendar.",
    login:"Sign in", cabinet:"Account", title:"My account",
    lead:"Create an account to keep your progress, test results and notes in the cloud and open them on any device.",
    email:"Login", loginHint:"Latin letters, digits and . _ - (3–32 characters)", changePass:"Change password", taken:"This login is taken, choose another one.", badFmt:"Login may contain only Latin letters, digits and . _ - (3–32 characters).", pass:"Password (at least 6 characters)", signIn:"Sign in", signUp:"Sign up",
    noAcc:"No account yet?", haveAcc:"Already have an account?", forgot:"Forgot your password? Contact the administrator.",
    sent:"We sent you an email. Follow the link to confirm your account, then sign in.",
    resetSent:"A password reset link has been sent to your email.",
    newPass:"New password", savePass:"Save password", passSaved:"Password updated.",
    you:"Signed in as:", synced:"Progress saved to the cloud", syncing:"Saving…", syncErr:"Could not save to the cloud. Check your connection.",
    stats:"Topics passed", notesN:"Notes", logout:"Sign out", offline:"Could not reach the cloud. The site keeps working in your browser.",
    err:"Error:", badLogin:"Wrong login or password.", notConfirmed:"Email not confirmed yet. Follow the link in the email." }
};

let app = null, sb = null, user = null, loadedFor = null, saveT = null, admin = false;
let ui = { mode:"in", msg:"", bad:false, busy:false, sync:"", recovery:false };
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const L = () => S[app.lang()] || S.kk;
const DOMAIN = "login.apa-portal.local";
const toEmail = login => login.includes("@") ? login : `${login.toLowerCase()}@${DOMAIN}`;
const shown = u => (u.user_metadata && u.user_metadata.login) || String(u.email || "").replace("@" + DOMAIN, "");

function mergeProgress(a, b){
  const out = Object.assign({}, a);
  for(const k in b){
    const x = out[k], y = b[k];
    out[k] = x ? { passed: !!(x.passed || y.passed), best: Math.max(x.best || 0, y.best || 0) } : y;
  }
  return out;
}

async function load(u){
  loadedFor = u.id;
  const { data, error } = await sb.from("student_data").select("progress,notes,cert_name").eq("user_id", u.id).maybeSingle();
  if(error){ ui.sync = "err"; app.rerender(); return; }
  const local = app.get(), cloud = data || { progress:{}, notes:{}, cert_name:"" };
  const notes = Object.assign({}, local.notes);
  for(const k in cloud.notes) if(cloud.notes[k]) notes[k] = cloud.notes[k];
  app.set({ progress: mergeProgress(cloud.progress || {}, local.progress), notes, certName: cloud.cert_name || local.certName || "" });
  await save();
}

async function save(){
  if(!user || loadedFor !== user.id) return;
  clearTimeout(saveT);
  const d = app.get();
  ui.sync = "saving"; paintSync();
  const { error } = await sb.from("student_data").upsert({ user_id:user.id, progress:d.progress, notes:d.notes, cert_name:d.certName, updated_at:new Date().toISOString() });
  ui.sync = error ? "err" : "ok"; paintSync();
}

function paintSync(){
  const el = document.getElementById("cloud-sync"); if(!el) return;
  const l = L();
  el.textContent = ui.sync === "saving" ? l.syncing : ui.sync === "err" ? l.syncErr : ui.sync === "ok" ? "✓ " + l.synced : "";
  el.className = "cloud-sync " + (ui.sync === "err" ? "bad" : "");
}

function errText(e){
  const l = L(), m = (e && e.message) || String(e);
  if(/invalid login/i.test(m)) return l.badLogin;
  if(/not confirmed/i.test(m)) return l.notConfirmed;
  if(m === "taken") return l.taken;
  if(m === "bad_login") return l.badFmt;
  if(m === "bad_password") return l.pass;
  return l.err + " " + m;
}

function renderInto(view){
  const l = L();
  let body;
  if(!sb){
    body = `<p class="cloud-msg bad">${l.offline}</p>`;
  } else if(user && ui.recovery){
    body = `<form class="cloud-form" data-cloud-form="newpass">
      <label>${l.newPass}<input type="password" name="pass" minlength="6" required autocomplete="new-password"></label>
      <button class="btn primary" type="submit" ${ui.busy?"disabled":""}>${l.savePass}</button></form>`;
  } else if(user){
    const d = app.get(), passed = Object.values(d.progress).filter(p => p && p.passed).length, nn = Object.values(d.notes).filter(Boolean).length;
    body = `<p>${l.you} <b>${esc(shown(user))}</b></p>
      <div class="cloud-stats"><div><b>${passed}</b><span>${l.stats}</span></div><div><b>${nn}</b><span>${l.notesN}</span></div></div>
      <p id="cloud-sync" class="cloud-sync"></p>
      ${admin ? `<p class="cloud-msg">${l.admin}</p>` : ""}
      <h3 class="cloud-h3">${l.myCourses}</h3>${coursesHtml()}
      <p><button class="linkbtn" data-cloud="chpass">${l.changePass}</button></p>
      <button class="btn" data-cloud="logout">${l.logout}</button>`;
  } else {
    const up = ui.mode === "up";
    body = `<form class="cloud-form" data-cloud-form="${ui.mode}">
      <label>${l.email}<input type="text" name="login" required autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="64">${up ? `<small class="muted" style="font-weight:400">${l.loginHint}</small>` : ""}</label>
      <label>${l.pass}<input type="password" name="pass" minlength="6" maxlength="72" required autocomplete="${up?"new-password":"current-password"}"></label>
      <button class="btn primary" type="submit" ${ui.busy?"disabled":""}>${up ? l.signUp : l.signIn}</button>
    </form>
    <p class="cloud-alt">${up ? `${l.haveAcc} <button class="linkbtn" data-cloud="in">${l.signIn}</button>`
      : `${l.noAcc} <button class="linkbtn" data-cloud="up">${l.signUp}</button><br><small>${l.forgot}</small>`}</p>`;
  }
  view.innerHTML = `<div class="wrap section"><div class="cloud-box">
    <h2>${user && !ui.recovery ? l.cabinet : l.title}</h2>${user ? "" : `<p class="cloud-lead">${l.lead}</p>`}
    ${ui.msg ? `<p class="cloud-msg ${ui.bad?"bad":""}">${esc(ui.msg)}</p>` : ""}${body}</div></div>`;
  paintSync();
}

function coursesHtml(){
  const l = L(), list = app.courses().filter(c => c.done > 0);
  if(!list.length) return `<p class="muted">${l.noCourses}</p>`;
  return `<ul class="cloud-courses">${list.map(c => `<li><button data-course="${c.i},${c.c}"><span><b>${esc(c.title)}</b><small>${esc(c.inst)}</small></span><em>${c.done}/${c.total}</em></button><div class="meter2"><i style="width:${Math.round(c.done / c.total * 100)}%"></i></div></li>`).join("")}</ul>`;
}

function setMsg(m, bad){ ui.msg = m; ui.bad = !!bad; ui.busy = false; app.rerender(); }

document.addEventListener("click", async e => {
  const b = e.target.closest("[data-cloud]"); if(!b || !sb) return;
  const a = b.dataset.cloud;
  if(a === "logout"){
    await sb.auth.signOut();
    app.set({ progress:{}, notes:{}, certName:"" });
    return;
  }
  if(a === "chpass"){ ui.recovery = true; ui.msg = ""; app.rerender(); return; }
  ui.mode = a; ui.msg = ""; app.rerender();
});

document.addEventListener("submit", async e => {
  const f = e.target.closest("[data-cloud-form]"); if(!f || !sb) return;
  e.preventDefault();
  const kind = f.dataset.cloudForm, login = f.elements.login ? f.elements.login.value.trim() : "", pass = f.elements.pass ? f.elements.pass.value : "";
  ui.busy = true; ui.msg = ""; app.rerender();
  try {
    if(kind === "in"){
      const { error } = await sb.auth.signInWithPassword({ email:toEmail(login), password:pass });
      if(error) throw error;
      ui.busy = false;
    } else if(kind === "up"){
      if(!/^[a-zA-Z0-9][a-zA-Z0-9._-]{2,31}$/.test(login)) throw new Error("bad_login");
      const r = await fetch(URL_ + "/functions/v1/signup", { method:"POST", headers:{ "Content-Type":"application/json", apikey:KEY_ }, body:JSON.stringify({ login, password:pass }) });
      const j = await r.json().catch(() => ({}));
      if(!r.ok) throw new Error(j.error || "failed");
      const { error } = await sb.auth.signInWithPassword({ email:toEmail(login), password:pass });
      if(error) throw error;
      ui.busy = false; ui.mode = "in";
    } else if(kind === "newpass"){
      const { error } = await sb.auth.updateUser({ password:pass });
      if(error) throw error;
      ui.recovery = false; setMsg(L().passSaved);
    }
  } catch(err){ setMsg(errText(err), true); }
});

window.Cloud = {
  init(api){
    app = api;
    if(!window.supabase || !window.supabase.createClient) return;
    try { sb = window.supabase.createClient(URL_, KEY_, { auth:{ persistSession:true, autoRefreshToken:true, detectSessionInUrl:true } }); }
    catch(e){ sb = null; return; }
    sb.auth.onAuthStateChange((event, session) => {
      user = session ? session.user : null;
      if(event === "PASSWORD_RECOVERY"){ ui.recovery = true; app.go("account"); }
      if(window.Cal) window.Cal.reset();
      if(!user){ loadedFor = null; admin = false; ui.sync = ""; app.rerender(); return; }
      if(loadedFor !== user.id) setTimeout(async () => { const r = await sb.rpc("is_admin"); admin = !!(r && r.data); app.rerender(); }, 0);
      if(loadedFor !== user.id) setTimeout(() => load(user), 0);
      app.rerender();
    });
  },
  label(){ const l = L(); return user ? "👤 " + l.cabinet : l.login; },
  render: renderInto,
  client: () => sb,
  user: () => user,
  isAdmin: () => admin,
  queueSave(){ if(!user) return; clearTimeout(saveT); saveT = setTimeout(save, 800); }
};
})();
