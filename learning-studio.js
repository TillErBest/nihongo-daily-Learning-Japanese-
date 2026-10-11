/* Nihongo Daily — Learning Studio add-on
   Adds a visible learning hub without replacing the existing app. */
(() => {
  const main = document.getElementById("main");
  const sidebar = document.querySelector(".sidebar");
  if (!main || !sidebar) return;

  const style = document.createElement("style");
  style.textContent = `
    .studio-banner{margin:0 0 16px;padding:18px 20px;border-radius:18px;background:linear-gradient(120deg,var(--surface2),var(--surface));border:1px solid var(--line)}
    .studio-banner h2{margin:4px 0 6px;font-size:19px}
    .studio-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:16px}
    .studio-tile{padding:17px;border:1px solid var(--line);border-radius:16px;background:var(--surface)}
    .studio-tile .big{font-size:29px;font-weight:800;margin:5px 0}
    .studio-chip{display:inline-block;border-radius:99px;padding:4px 9px;background:var(--surface2);font-size:11px;font-weight:750;color:var(--muted)}
    .studio-answer{margin-top:10px;padding:12px;border-radius:12px;background:var(--surface2)}
    @media(max-width:600px){.studio-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const nav = document.createElement("button");
  nav.className = "navbtn";
  nav.type = "button";
  nav.dataset.learningStudio = "true";
  nav.innerHTML = '<span class="navicon">✦</span> Learning studio';
  sidebar.insertBefore(nav, sidebar.firstChild);

  const phrases = [
    {jp:"きょうは なにを しますか？",rom:"Kyou wa nani o shimasu ka?",en:"What are you doing today?",answer:"きょうは にほんごを べんきょうします。",translation:"Today, I will study Japanese."},
    {jp:"にほんごが すきですか？",rom:"Nihongo ga suki desu ka?",en:"Do you like Japanese?",answer:"はい、にほんごが すきです。",translation:"Yes, I like Japanese."},
    {jp:"コーヒーを おねがいします。",rom:"Koohii o onegaishimasu.",en:"A coffee, please.",answer:"ありがとうございます。",translation:"Thank you very much."},
    {jp:"どこに すんでいますか？",rom:"Doko ni sunde imasu ka?",en:"Where do you live?",answer:"ノルウェーに すんでいます。",translation:"I live in Norway."}
  ];
  const kana = [
    ["が","ga","か + dakuten"],["ぎ","gi","き + dakuten"],["ぐ","gu","く + dakuten"],["げ","ge","け + dakuten"],["ご","go","こ + dakuten"],
    ["きゃ","kya","き + small ゃ"],["しゅ","shu","し + small ゅ"],["ちょ","cho","ち + small ょ"],["っ","small tsu","A short pause / doubled consonant"],["ー","long vowel","Common in katakana"]
  ];
  const grammar = [
    {p:"〜たいです",m:"want to do something",e:"にほんに いきたいです。",r:"Nihon ni ikitai desu.",t:"I want to go to Japan."},
    {p:"〜たことがあります",m:"have done something before",e:"すしを たべたことがあります。",r:"Sushi o tabeta koto ga arimasu.",t:"I have eaten sushi before."},
    {p:"〜てもいいですか",m:"is it okay if I…?",e:"ここに すわってもいいですか。",r:"Koko ni suwatte mo ii desu ka.",t:"May I sit here?"},
    {p:"〜たほうがいい",m:"you should / it would be better to",e:"もっと れんしゅうしたほうがいいです。",r:"Motto renshuu shita hou ga ii desu.",t:"You should practise more."}
  ];
  let phraseIndex = 0;
  let kanaIndex = 0;
  let grammarIndex = 0;
  let revealed = false;

  function say(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.82;
    window.speechSynthesis.speak(u);
  }
  function banner() {
    const existing = main.querySelector(".studio-banner");
    if (existing) return;
    const el = document.createElement("section");
    el.className = "studio-banner";
    el.innerHTML = '<div class="eyebrow">New · a bigger way to practise</div><h2>Your Learning Studio is ready</h2><p class="muted">Try extra speaking prompts, kana sound patterns, and grammar beyond the first lessons.</p><button class="btn primary" type="button" data-open-studio>Open Learning Studio →</button>';
    main.insertBefore(el, main.firstChild);
    el.querySelector("[data-open-studio]").addEventListener("click", openStudio);
  }
  function openStudio() {
    sidebar.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("active", b === nav));
    main.innerHTML = `
      <div class="eyebrow">Nihongo Daily · by Till Janssen</div>
      <h1>Learning studio</h1>
      <p class="muted">Extra practice for learners from first steps through intermediate Japanese. Read kana first and use romaji as a support.</p>
      <div class="panel">
        <div class="lesson-top"><span class="studio-chip">Speaking challenge</span><span class="muted" id="studioPhraseCount"></span></div>
        <h2 id="studioPhraseJp" style="font-size:26px"></h2><p class="muted" id="studioPhraseRom"></p><p id="studioPhraseEn"></p>
        <div class="hero-actions"><button class="btn" id="studioHear">🔊 Hear phrase</button><button class="btn" id="studioReveal">Reveal sample answer</button><button class="btn primary" id="studioNext">Next challenge →</button></div>
        <div class="studio-answer hidden" id="studioAnswer"></div>
      </div>
      <div class="studio-grid">
        <section class="studio-tile"><span class="studio-chip">Kana beyond the basics</span><div class="big" id="studioKana"></div><strong id="studioKanaRom"></strong><p class="muted" id="studioKanaTip"></p><button class="btn small" id="studioKanaHear">🔊 Listen</button><button class="btn small" id="studioKanaNext" style="margin-left:6px">Next sound →</button></section>
        <section class="studio-tile"><span class="studio-chip">Grammar step-up</span><h2 id="studioGrammarPattern" style="margin-top:10px"></h2><p id="studioGrammarMeaning"></p><div class="example"><div class="jp" id="studioGrammarExample"></div><div class="romaji" id="studioGrammarRom"></div><div class="en" id="studioGrammarTranslation"></div></div><button class="btn small" id="studioGrammarHear">🔊 Listen</button><button class="btn small" id="studioGrammarNext" style="margin-left:6px">Next pattern →</button></section>
      </div>
      <div class="section-head"><h2>How to use this session</h2></div>
      <div class="panel"><ol><li>Listen to the speaking prompt and answer aloud before revealing the sample.</li><li>Practise the kana combination, then read it without looking at romaji.</li><li>Say the grammar example aloud and make one new sentence of your own.</li></ol><p class="muted">Speech playback uses the Japanese voice available on your device. The site does not grade your pronunciation automatically.</p></div>`;
    paintPhrase(); paintKana(); paintGrammar();
    document.getElementById("studioHear").onclick = () => say(phrases[phraseIndex].jp);
    document.getElementById("studioReveal").onclick = () => { revealed = !revealed; const a=document.getElementById("studioAnswer"); a.classList.toggle("hidden",!revealed); a.innerHTML='<strong>'+phrases[phraseIndex].answer+'</strong><div class="muted">'+phrases[phraseIndex].translation+'</div>'; document.getElementById("studioReveal").textContent=revealed?"Hide sample answer":"Reveal sample answer"; };
    document.getElementById("studioNext").onclick = () => { phraseIndex=(phraseIndex+1)%phrases.length;revealed=false;paintPhrase(); };
    document.getElementById("studioKanaHear").onclick = () => say(kana[kanaIndex][0]);
    document.getElementById("studioKanaNext").onclick = () => { kanaIndex=(kanaIndex+1)%kana.length;paintKana(); };
    document.getElementById("studioGrammarHear").onclick = () => say(grammar[grammarIndex].e);
    document.getElementById("studioGrammarNext").onclick = () => { grammarIndex=(grammarIndex+1)%grammar.length;paintGrammar(); };
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function paintPhrase() {
    const p=phrases[phraseIndex];
    document.getElementById("studioPhraseCount").textContent="Prompt "+(phraseIndex+1)+" of "+phrases.length;
    document.getElementById("studioPhraseJp").textContent=p.jp;
    document.getElementById("studioPhraseRom").textContent=p.rom;
    document.getElementById("studioPhraseEn").textContent=p.en;
    const a=document.getElementById("studioAnswer");a.classList.toggle("hidden",!revealed);a.innerHTML='<strong>'+p.answer+'</strong><div class="muted">'+p.translation+'</div>';
    document.getElementById("studioReveal").textContent=revealed?"Hide sample answer":"Reveal sample answer";
  }
  function paintKana(){const k=kana[kanaIndex];document.getElementById("studioKana").textContent=k[0];document.getElementById("studioKanaRom").textContent=k[1];document.getElementById("studioKanaTip").textContent=k[2];}
  function paintGrammar(){const g=grammar[grammarIndex];document.getElementById("studioGrammarPattern").textContent=g.p;document.getElementById("studioGrammarMeaning").textContent=g.m;document.getElementById("studioGrammarExample").textContent=g.e;document.getElementById("studioGrammarRom").textContent=g.r;document.getElementById("studioGrammarTranslation").textContent=g.t;}
  nav.addEventListener("click", openStudio);
  const observer = new MutationObserver(() => {
    if (sidebar.querySelector('.navbtn.active[data-view="home"]')) banner();
  });
  observer.observe(main, {childList:true});
  banner();
})();