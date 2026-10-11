/* Nihongo Daily by Till Janssen — kanji course + scheduled reviews */
(function () {
  const deck = [
    ["日","sun; day","ひ / hi","今日","きょう · kyou","Kyou wa ii tenki desu.","The weather is nice today."],
    ["月","moon; month","つき / tsuki","月曜日","げつようび · getsuyoubi","Getsuyoubi ni daigaku e ikimasu.","I go to university on Monday."],
    ["火","fire","ひ / hi","火曜日","かようび · kayoubi","Kayoubi wa isogashii desu.","Tuesday is busy."],
    ["水","water","みず / mizu","水曜日","すいようび · suiyoubi","Mizu o nomimasu.","I drink water."],
    ["木","tree; wood","き / ki","木曜日","もくようび · mokuyoubi","Ki no shita ni neko ga imasu.","There is a cat under the tree."],
    ["金","gold; money","かね / kane","お金","おかね · okane","Okane ga arimasen.","I don't have money."],
    ["土","earth; soil","つち / tsuchi","土曜日","どようび · doyoubi","Doyoubi ni tomodachi ni aimasu.","I meet a friend on Saturday."],
    ["人","person","ひと / hito","日本人","にほんじん · nihonjin","Ano hito wa nihonjin desu.","That person is Japanese."],
    ["本","book; origin","ほん / hon","日本","にほん · nihon","Nihon ni ikitai desu.","I want to go to Japan."],
    ["学","study; learning","がく / gaku","学生","がくせい · gakusei","Watashi wa gakusei desu.","I am a student."],
    ["生","life; birth","せい / sei","先生","せんせい · sensei","Sensei ni shitsumon shimasu.","I ask the teacher a question."],
    ["大","big; large","おお / oo","大学","だいがく · daigaku","Daigaku de nihongo o benkyou shimasu.","I study Japanese at university."],
    ["小","small","ちい / chii","小さい","ちいさい · chiisai","Chiisai inu ga imasu.","There is a small dog."],
    ["山","mountain","やま / yama","山道","やまみち · yamamichi","Yama o arukimasu.","I walk in the mountains."],
    ["川","river","かわ / kawa","川","かわ · kawa","Kawa no mizu wa kirei desu.","The river water is clean."],
    ["田","rice field","た / ta","田んぼ","たんぼ · tanbo","Tanbo ni mizu ga arimasu.","There is water in the rice paddy."],
    ["口","mouth; opening","くち / kuchi","入口","いりぐち · iriguchi","Iriguchi wa asoko desu.","The entrance is over there."],
    ["目","eye","め / me","目","め · me","Me o tojite kudasai.","Please close your eyes."],
    ["耳","ear","みみ / mimi","耳","みみ · mimi","Mimi de yoku kiite kudasai.","Please listen carefully."],
    ["手","hand","て / te","手紙","てがみ · tegami","Tomodachi ni tegami o kakimasu.","I write a letter to my friend."],
    ["足","foot; leg","あし / ashi","足","あし · ashi","Ashi ga tsukaremashita.","My legs are tired."],
    ["力","power; strength","ちから / chikara","力","ちから · chikara","Mou sukoshi chikara ga hitsuyou desu.","I need a little more strength."],
    ["女","woman; female","おんな / onna","女の人","おんなのひと · onna no hito","Ano onna no hito wa sensei desu.","That woman is a teacher."],
    ["男","man; male","おとこ / otoko","男の子","おとこのこ · otoko no ko","Otoko no ko ga hashitte imasu.","A boy is running."],
    ["子","child","こ / ko","子ども","こども · kodomo","Kodomo ga asonde imasu.","A child is playing."],
    ["年","year","とし / toshi","今年","ことし · kotoshi","Kotoshi, Nihon ni ikimasu.","I will go to Japan this year."],
    ["時","time; hour","とき / toki","時間","じかん · jikan","Jikan ga arimasen.","I don't have time."],
    ["分","minute; part","ふん / fun","十分","じゅっぷん · juppun","Juppun matte kudasai.","Please wait ten minutes."],
    ["半","half","はん / han","半分","はんぶん · hanbun","Hanbun tabemashita.","I ate half."],
    ["今","now","いま / ima","今日","きょう · kyou","Ima, benkyou shite imasu.","I am studying now."],
    ["週","week","しゅう / shuu","今週","こんしゅう · konshuu","Konshuu wa isogashii desu.","I am busy this week."],
    ["先","previous; ahead","さき / saki","先生","せんせい · sensei","Sensei wa yasashii desu.","The teacher is kind."],
    ["来","come; next","く / ku(ru)","来週","らいしゅう · raishuu","Raishuu, tomodachi ga kimasu.","A friend is coming next week."],
    ["行","go","い / i(ku)","行く","いく · iku","Eki ni ikimasu.","I go to the station."],
    ["見","see; look","み / mi(ru)","見る","みる · miru","Anime o mimasu.","I watch anime."],
    ["聞","hear; listen; ask","き / ki(ku)","聞く","きく · kiku","Ongaku o kikimasu.","I listen to music."],
    ["話","talk; story","はな / hana(su)","話す","はなす · hanasu","Nihongo o hanashimasu.","I speak Japanese."],
    ["読","read","よ / yo(mu)","読む","よむ · yomu","Hon o yomimasu.","I read a book."],
    ["書","write","か / ka(ku)","書く","かく · kaku","Namae o kaite kudasai.","Please write your name."],
    ["食","eat; food","た / ta(beru)","食べる","たべる · taberu","Pan o tabemasu.","I eat bread."],
    ["飲","drink","の / no(mu)","飲む","のむ · nomu","Mizu o nomimasu.","I drink water."],
    ["買","buy","か / ka(u)","買う","かう · kau","Suupaa de pan o kaimasu.","I buy bread at the supermarket."],
    ["友","friend","とも / tomo","友だち","ともだち · tomodachi","Tomodachi to hanashimasu.","I talk with a friend."],
    ["名","name; reputation","な / na","名前","なまえ · namae","Namae wa nan desu ka?","What is your name?"],
    ["気","spirit; feeling; energy","き / ki","元気","げんき · genki","Genki desu ka?","How are you?"],
    ["天","heaven; sky","てん / ten","天気","てんき · tenki","Kyou wa tenki ga ii desu.","The weather is nice today."],
    ["雨","rain","あめ / ame","雨","あめ · ame","Ame ga futte imasu.","It is raining."],
    ["電","electricity","でん / den","電車","でんしゃ · densha","Densha de gakkou ni ikimasu.","I go to school by train."],
    ["車","vehicle; car","くるま / kuruma","車","くるま · kuruma","Kuruma de ikimasu.","I go by car."],
    ["駅","station","えき / eki","駅前","えきまえ · ekimae","Ekimae de aimashou.","Let's meet in front of the station."],
    ["道","road; way","みち / michi","道","みち · michi","Kono michi o massugu ikimasu.","Go straight along this road."],
    ["語","language; word","ご / go","日本語","にほんご · nihongo","Nihongo o mainichi renshuu shimasu.","I practise Japanese every day."],
    ["国","country","くに / kuni","外国","がいこく · gaikoku","Gaikoku ni sunde imasu.","I live in a foreign country."],
    ["社","company; shrine","しゃ / sha","会社","かいしゃ · kaisha","Chichi wa kaisha de hatarakimasu.","My father works at a company."],
    ["会","meet; gathering","あ / a(u)","会う","あう · au","Ashita, tomodachi ni aimasu.","I will meet a friend tomorrow."],
    ["店","shop; store","みせ / mise","店員","てんいん · tenin","Tenin-san ni kikimasu.","I ask the shop assistant."],
    ["安","cheap; peaceful","やす / yasu(i)","安い","やすい · yasui","Kono hon wa yasui desu.","This book is cheap."],
    ["高","high; tall; expensive","たか / taka(i)","高い","たかい · takai","Kono mise wa chotto takai desu.","This shop is a little expensive."],
    ["新","new","あたら / atara(shii)","新しい","あたらしい · atarashii","Atarashii hon o kaimashita.","I bought a new book."],
    ["古","old (things)","ふる / furu(i)","古い","ふるい · furui","Furui eiga ga suki desu.","I like old movies."],
    ["多","many; much","おお / oo(i)","多い","おおい · ooi","Kono machi wa hito ga ooi desu.","There are many people in this town."],
    ["少","few; little","すく / suku(nai)","少し","すこし · sukoshi","Nihongo ga sukoshi wakarimasu.","I understand a little Japanese."]
  ].map(([k,meaning,reading,word,wordReading,sentenceRom,translation])=>({k,meaning,reading,word,wordReading,sentenceRom,translation,sentence:word}));
  const scheduleKey="nihongoKanjiCourseSchedule";
  const getMap=()=>{try{return JSON.parse(localStorage.getItem(scheduleKey)||"{}")}catch(e){return {}}};
  const putMap=m=>{try{localStorage.setItem(scheduleKey,JSON.stringify(m))}catch(e){}};
  const day=()=>new Date().toISOString().slice(0,10);
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function view(){
    const map=getMap(),today=day(),due=deck.filter(c=>!map[c.k]||new Date(map[c.k].dueAt||map[c.k].due||0)<=new Date()),learned=deck.filter(c=>map[c.k]&&map[c.k].interval>0),fresh=deck.filter(c=>!map[c.k]||map[c.k].interval===0),mode=state.kanjiCourseMode||"due";
    let pool=mode==="all"?deck:mode==="new"?fresh:due;if(!pool.length)pool=mode==="due"?fresh:deck;
    const c=pool[(state.kanjiCourseIndex||0)%pool.length],rev=!!state.kanjiCourseRevealed,record=map[c.k]||{};
    return `<div class="eyebrow">Structured course · kanji in real words</div><h1>Kanji course & scheduled reviews</h1><p class="muted">Study each character through useful vocabulary and a full sentence. Try to recall the meaning and reading first, then reveal the answer and rate how well you remembered. Reviews are saved in this browser.</p><div class="stats"><div class="stat"><div class="num">${learned.length}/${deck.length}</div><div class="label">Kanji reviewed</div></div><div class="stat"><div class="num">${due.length}</div><div class="label">Due or overdue</div></div><div class="stat"><div class="num">${deck.length}</div><div class="label">Course cards</div></div></div><div class="panel"><div class="study-controls"><label for="kanjiCourseMode">Study mode</label><select id="kanjiCourseMode"><option value="due" ${mode==="due"?"selected":""}>Due reviews first</option><option value="new" ${mode==="new"?"selected":""}>New / not mastered</option><option value="all" ${mode==="all"?"selected":""}>All course cards</option></select><span class="pill">${(state.kanjiCourseIndex||0)%pool.length+1} of ${pool.length}</span></div><div class="hero-art" style="min-height:170px;margin:14px 0"><div class="reading-text" style="font-size:76px">${c.k}</div><div class="hero-romaji">Recall the meaning and a reading before revealing.</div></div><form id="kanjiTypedAnswerForm" class="example"><label for="kanjiTypedAnswer"><strong>Type your answer</strong> — meaning or reading</label><div class="study-controls"><input id="kanjiTypedAnswer" class="search" style="flex:1;min-width:180px;margin:8px 0" placeholder="Enter your answer" autocomplete="off" autocapitalize="none" required><button class="btn primary" type="submit">Check answer</button></div><div id="kanjiTypedFeedback" class="feedback" aria-live="polite">Try from memory. The answer will not be shown automatically.</div></form>${rev?`<div class="example"><h2>${c.meaning}</h2><p><strong>Common reading:</strong> ${c.reading}</p><p><strong>Vocabulary:</strong> <span class="jp-big" style="font-size:27px">${c.word}</span></p><p><strong>Kana reading:</strong> ${c.wordReading}</p><p><strong>Romaji:</strong> ${c.wordReading.split("·").pop().trim()}</p><p><strong>Sentence:</strong> ${c.sentence}</p><p class="romaji">${c.sentenceRom}</p><p class="muted">${c.translation}</p><button class="btn small" data-course-listen="${escapeHtml(c.sentence)}">🔊 Listen to sentence</button></div><p><strong>How well did you remember?</strong></p><div class="hero-actions"><button class="btn" data-course-grade="again">Again · 10 min</button><button class="btn" data-course-grade="hard">Hard · 1 day</button><button class="btn" data-course-grade="good">Good · 3 days</button><button class="btn primary" data-course-grade="easy">Easy · 7 days</button></div>`:`<div class="example"><p><strong>Meaning?</strong> Can you recall it?</p><p><strong>Reading?</strong> Say the example word aloud.</p><p><strong>Challenge:</strong> Recall the meaning and reading from memory.</p></div><button class="btn primary" data-course-reveal>Reveal meaning, reading & example</button>`}<p class="footer-note">${record.dueAt?"Next scheduled review: "+new Date(record.dueAt).toLocaleString():"New card · not scheduled yet."} Romaji is included as pronunciation support; try to recognise kana directly over time.</p></div><div class="section-head"><h2>Your review schedule</h2></div><div class="panel"><p><strong>Again:</strong> 10 minutes. <strong>Hard:</strong> tomorrow. <strong>Good:</strong> 3 days. <strong>Easy:</strong> 7 days. Successful reviews gradually increase the interval.</p><p>These are practical study intervals, not a copy of another app's proprietary algorithm.</p><button class="btn" data-course-reset>Reset kanji course progress</button></div>`;
  }
  const previousKanjiView=kanjiSrsView, previousBind=bindView, previousRender=render;
  kanjiSrsView=function(){return view()};
  bindView=function(){
    previousBind();
    const mode=document.getElementById("kanjiCourseMode");if(mode)mode.onchange=()=>{state.kanjiCourseMode=mode.value;state.kanjiCourseIndex=0;state.kanjiCourseRevealed=false;save();render()};
    const answerForm=document.getElementById("kanjiTypedAnswerForm");
    if(answerForm)answerForm.onsubmit=e=>{e.preventDefault();const c=deck.find(x=>x.k===document.querySelector(".reading-text")?.textContent.trim());if(!c)return;const norm=s=>String(s||"").toLowerCase().normalize("NFKC").replace(/[\\s・·,;:!?。、「」]/g,"");const answer=norm(document.getElementById("kanjiTypedAnswer").value);const rom=c.wordReading.split("·").pop().trim();const accepted=[c.meaning,c.reading.split("/")[0],c.reading.split("/").pop(),rom,c.wordReading,c.k].map(norm);const ok=accepted.some(x=>x&&x.split(";").map(norm).includes(answer));const fb=document.getElementById("kanjiTypedFeedback");state.kanjiTypedAttempts=(state.kanjiTypedAttempts||0)+1;if(ok){state.kanjiTypedCorrect=(state.kanjiTypedCorrect||0)+1;fb.textContent="Correct!";fb.style.color="#278257";}else{fb.textContent="Not quite. The answer stays hidden.";fb.style.color="var(--text)";}save();};
    document.querySelectorAll("[data-course-reveal]").forEach(b=>b.onclick=()=>{state.kanjiCourseRevealed=true;save();render()});
    document.querySelectorAll("[data-course-listen]").forEach(b=>b.onclick=()=>speakJapanese(b.dataset.courseListen));
    document.querySelectorAll("[data-course-grade]").forEach(b=>b.onclick=()=>{
      const map=getMap(),mode=state.kanjiCourseMode||"due",today=new Date(),duePool=deck.filter(c=>!map[c.k]||new Date(map[c.k].dueAt||map[c.k].due||0)<=today),fresh=deck.filter(c=>!map[c.k]||map[c.k].interval===0),pool=(mode==="all"?deck:mode==="new"?fresh:duePool),cards=pool.length?pool:deck,c=cards[(state.kanjiCourseIndex||0)%cards.length],old=map[c.k]||{},grade=b.dataset.courseGrade;
      let interval=grade==="hard"?1:grade==="good"?Math.max(3,(old.interval||0)+2):Math.max(7,Math.ceil((old.interval||0)*2.2));
      if(grade==="again"){const dueAt=new Date(Date.now()+10*60*1000);map[c.k]={interval:0,due:dueAt.toISOString().slice(0,10),dueAt:dueAt.toISOString()}}
      else{const dueAt=new Date(today);dueAt.setDate(dueAt.getDate()+interval);map[c.k]={interval,due:dueAt.toISOString().slice(0,10),dueAt:dueAt.toISOString()}}
      putMap(map);state.kanjiCourseIndex=((state.kanjiCourseIndex||0)+1)%cards.length;state.kanjiCourseRevealed=false;save();render();
    });
    document.querySelectorAll("[data-course-reset]").forEach(b=>b.onclick=()=>{if(confirm("Reset all scheduled kanji course reviews in this browser?")){putMap({});state.kanjiCourseIndex=0;state.kanjiCourseRevealed=false;save();render()}});
  };
  render=function(){previousRender();const main=document.getElementById("main");if(main&&!main.querySelector(".romaji-global-note"))main.insertAdjacentHTML("afterbegin",'<div class="speech-status romaji-global-note" style="margin-bottom:14px"><strong>Pronunciation support:</strong> Romaji (Latin-letter pronunciation) is included in the kanji course and examples. Doubled vowels such as <strong>ou</strong> and <strong>uu</strong> usually indicate a long vowel.</div>')};
  render();
})();