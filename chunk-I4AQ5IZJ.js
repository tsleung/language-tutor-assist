import{L as y,Nb as d,Ob as b,P as I,Pb as K,Q as v,Qb as x,Rb as j,Sb as N,Tb as A,Ub as O,da as p,wb as l,xb as E}from"./chunk-QHBVJM4C.js";import{a as r,b as o,c as h,h as w}from"./chunk-W5NDKLUF.js";var R=class c{storage=v(b);settingsSignal=p(this.loadSettings());settings=this.settingsSignal.asReadonly();keyboardLayout=l(()=>this.settingsSignal().keyboardLayout);showRomaji=l(()=>this.settingsSignal().showRomaji);showRomajiOnHover=l(()=>this.settingsSignal().showRomajiOnHover);theme=l(()=>this.settingsSignal().theme);enabledHiragana=l(()=>new Set(this.settingsSignal().enabledHiragana));enabledKatakana=l(()=>new Set(this.settingsSignal().enabledKatakana));soundEnabled=l(()=>this.settingsSignal().soundEnabled);hapticEnabled=l(()=>this.settingsSignal().hapticEnabled);geminiApiKey=l(()=>this.settingsSignal().geminiApiKey);enabledCharacters=l(()=>{let e=new Set;return this.settingsSignal().enabledHiragana.forEach(a=>e.add(a)),this.settingsSignal().enabledKatakana.forEach(a=>e.add(a)),e});constructor(){E(()=>{this.saveSettings()}),this.applyTheme(this.settingsSignal().theme)}loadSettings(){let e=this.storage.load(d.SETTINGS,{}),a=r(r({},N),e);return(!a.enabledHiragana||a.enabledHiragana.length===0)&&(a.enabledHiragana=[...w]),a}saveSettings(){this.storage.save(d.SETTINGS,this.settingsSignal())}applyTheme(e){let a=document.documentElement,t=window.matchMedia("(prefers-color-scheme: dark)").matches,n=!1;e==="dark"?n=!0:e==="system"&&(n=t),a.setAttribute("data-theme",n?"dark":"light")}setKeyboardLayout(e){this.settingsSignal.update(a=>o(r({},a),{keyboardLayout:e}))}setShowRomaji(e){this.settingsSignal.update(a=>o(r({},a),{showRomaji:e}))}setShowRomajiOnHover(e){this.settingsSignal.update(a=>o(r({},a),{showRomajiOnHover:e}))}setTheme(e){this.settingsSignal.update(a=>o(r({},a),{theme:e})),this.applyTheme(e)}setSoundEnabled(e){this.settingsSignal.update(a=>o(r({},a),{soundEnabled:e}))}setHapticEnabled(e){this.settingsSignal.update(a=>o(r({},a),{hapticEnabled:e}))}setGeminiApiKey(e){this.settingsSignal.update(a=>o(r({},a),{geminiApiKey:e}))}toggleHiragana(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledHiragana);return t.has(e)?t.delete(e):t.add(e),o(r({},a),{enabledHiragana:Array.from(t)})})}toggleKatakana(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledKatakana);return t.has(e)?t.delete(e):t.add(e),o(r({},a),{enabledKatakana:Array.from(t)})})}enableAllHiragana(){this.settingsSignal.update(e=>o(r({},e),{enabledHiragana:[...w]}))}disableAllHiragana(){this.settingsSignal.update(e=>o(r({},e),{enabledHiragana:[]}))}enableHiraganaRow(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledHiragana);return e.forEach(n=>t.add(n)),o(r({},a),{enabledHiragana:Array.from(t)})})}disableHiraganaRow(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledHiragana);return e.forEach(n=>t.delete(n)),o(r({},a),{enabledHiragana:Array.from(t)})})}enableAllKatakana(){import("./chunk-GEEY4GUX.js").then(({BASIC_KATAKANA:e})=>{this.settingsSignal.update(a=>o(r({},a),{enabledKatakana:[...e]}))})}disableAllKatakana(){this.settingsSignal.update(e=>o(r({},e),{enabledKatakana:[]}))}isHiraganaEnabled(e){return this.enabledHiragana().has(e)}isKatakanaEnabled(e){return this.enabledKatakana().has(e)}isCharacterEnabled(e){return this.enabledCharacters().has(e)}resetToDefaults(){this.settingsSignal.set(o(r({},N),{enabledHiragana:[...w],enabledKatakana:[]})),this.applyTheme(N.theme)}static \u0275fac=function(a){return new(a||c)};static \u0275prov=y({token:c,factory:c.\u0275fac,providedIn:"root"})};var D="https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",T=class c{constructor(e){this.storage=e;this.loadApiKey()}apiKeySignal=p(null);hasApiKey=l(()=>!!this.apiKeySignal());isConfigured=this.hasApiKey;loadApiKey(){let e=this.storage.load(d.SETTINGS,{});e.geminiApiKey&&this.apiKeySignal.set(e.geminiApiKey)}setApiKey(e){this.apiKeySignal.set(e);let a=this.storage.load(d.SETTINGS,{});a.geminiApiKey=e,this.storage.save(d.SETTINGS,a)}clearApiKey(){this.apiKeySignal.set(null);let e=this.storage.load(d.SETTINGS,{});delete e.geminiApiKey,this.storage.save(d.SETTINGS,e)}callGemini(e){return h(this,null,function*(){let a=this.apiKeySignal();if(!a)throw new Error("Gemini API key not configured");let t=yield fetch(`${D}?key=${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{temperature:.7,maxOutputTokens:2048}})});if(!t.ok){let s=yield t.json();throw new Error(s.error?.message||`API error: ${t.status}`)}let n=yield t.json();if(n.error)throw new Error(n.error.message);let i=n.candidates?.[0]?.content?.parts?.[0]?.text;if(!i)throw new Error("No response from Gemini");return i})}parseVocabulary(e){return h(this,null,function*(){let a=`Parse the following Japanese vocabulary notes into structured data.
For each word/phrase, extract:
- nativeScript (the Japanese writing in hiragana)
- romanization (the romanized pronunciation)
- translation (the English meaning)
- partOfSpeech (noun, verb, adjective, adverb, particle, phrase, or expression)

Return ONLY a valid JSON array with no additional text. Example format:
[{"nativeScript": "\u306D\u3053", "romanization": "neko", "translation": "cat", "partOfSpeech": "noun"}]

Input text:
${e}

JSON output:`;try{let n=(yield this.callGemini(a)).trim();return n.startsWith("```json")&&(n=n.slice(7)),n.startsWith("```")&&(n=n.slice(3)),n.endsWith("```")&&(n=n.slice(0,-3)),JSON.parse(n.trim()).filter(s=>s.nativeScript&&s.romanization&&s.translation)}catch(t){throw console.error("Failed to parse vocabulary:",t),t}})}generateSentences(e,a=5){return h(this,null,function*(){let t=e.map(i=>`${i.nativeScript} (${i.romanization}) = ${i.translation}`).join(`
`),n=`You are a Japanese language tutor. Create ${a} simple practice sentences using ONLY the vocabulary words provided below. The sentences should be appropriate for a beginner learner.

Available vocabulary:
${t}

For each sentence, provide:
- japanese: the sentence in hiragana (use only the vocabulary provided)
- romaji: the romanized pronunciation
- english: the English translation

Return ONLY a valid JSON array with no additional text. Example:
[{"japanese": "\u306D\u3053\u306F \u304B\u308F\u3044\u3044", "romaji": "neko wa kawaii", "english": "The cat is cute"}]

JSON output:`;try{let s=(yield this.callGemini(n)).trim();return s.startsWith("```json")&&(s=s.slice(7)),s.startsWith("```")&&(s=s.slice(3)),s.endsWith("```")&&(s=s.slice(0,-3)),JSON.parse(s.trim()).filter(m=>m.japanese&&m.romaji&&m.english)}catch(i){throw console.error("Failed to generate sentences:",i),i}})}generateDistractors(e,a=3){return h(this,null,function*(){let t=`Generate ${a} plausible but incorrect English translations for the Japanese word "${e.nativeScript}" (${e.romanization}). The correct meaning is "${e.translation}".

The distractors should:
- Be similar category/type of word
- Be plausible wrong answers
- NOT be the correct translation

Return ONLY a JSON array of strings with no additional text.
Example: ["water", "mountain", "tree"]

JSON output:`;try{let i=(yield this.callGemini(t)).trim();return i.startsWith("```json")&&(i=i.slice(7)),i.startsWith("```")&&(i=i.slice(3)),i.endsWith("```")&&(i=i.slice(0,-3)),JSON.parse(i.trim()).slice(0,a)}catch(n){throw console.error("Failed to generate distractors:",n),n}})}getWordHint(e){return h(this,null,function*(){let a=`Give a very short (1 sentence) hint or memory tip for the Japanese word:
${e.nativeScript} (${e.romanization}) = ${e.translation}

The hint should help a learner remember this word. Be creative but brief.
Return only the hint text, no additional formatting.`;try{return(yield this.callGemini(a)).trim()}catch(t){throw console.error("Failed to get hint:",t),t}})}validateApiKey(e){return h(this,null,function*(){let a=this.apiKeySignal();try{return this.apiKeySignal.set(e),yield this.callGemini('Say "ok" in one word.'),!0}catch{return!1}finally{this.apiKeySignal.set(a)}})}chat(e,a,t,n){return h(this,null,function*(){let i=K[e],s=n.length>0?n.map(g=>g.romanization?`- ${g.nativeScript} (${g.romanization}) = ${g.translation}`:`- ${g.nativeScript} = ${g.translation}`).join(`
`):"No vocabulary yet - start with basic greetings and simple words.",S=t.slice(-10).map(g=>`${g.role==="user"?"Student":"Tutor"}: ${g.content}`).join(`
`),m=i.romanizationName||"romanized form",k=`You are a friendly ${i.name} language tutor having a conversation with a student.

IMPORTANT RULES:
1. Respond using PRIMARILY words from the student's vocabulary list below
2. If the student asks "how do I say X?" or similar, teach them the word in ${i.name}
3. When introducing NEW words, include them in the "newVocabulary" array in your response
4. Keep responses conversational and encouraging
5. Use simple sentences appropriate for beginners
6. Accept input in ${m} or ${i.nativeName} script

Student's known vocabulary:
${s}

${S?`Recent conversation:
${S}
`:""}
Student's message: ${a}

Respond in this JSON format ONLY (no markdown, no code blocks):
{
  "content": "Your full response mixing explanation and target language",
  "nativeText": "Your response in ${i.nativeName} only",
  "romanizedText": "The ${m} version",
  "translationText": "English translation of your response",
  "newVocabulary": [
    {
      "nativeScript": "word in ${i.nativeName}",
      "romanization": "${m} form",
      "translation": "English meaning",
      "partOfSpeech": "noun/verb/adjective/etc",
      "context": "example usage or note"
    }
  ]
}

If not introducing new vocabulary, use an empty array: "newVocabulary": []

JSON response:`;try{let g=yield this.callGemini(k),u=g.trim();u.startsWith("```json")&&(u=u.slice(7)),u.startsWith("```")&&(u=u.slice(3)),u.endsWith("```")&&(u=u.slice(0,-3));let f=JSON.parse(u.trim());return{content:f.content||g,nativeText:f.nativeText,romanizedText:f.romanizedText,translationText:f.translationText,newVocabulary:f.newVocabulary||[]}}catch(g){return console.error("Failed to parse chat response:",g),{content:typeof g=="object"?"Sorry, I had trouble understanding. Please try again.":String(g),newVocabulary:[]}}})}static \u0275fac=function(a){return new(a||c)(I(b))};static \u0275prov=y({token:c,factory:c.\u0275fac,providedIn:"root"})};var M=class c{storage=v(b);languageService=v(x);vocabularyService=v(j);geminiService=v(T);sessionsSignal=p([]);activeSessionIdSignal=p(null);isLoadingSignal=p(!1);errorSignal=p(null);sessions=this.sessionsSignal.asReadonly();activeSessionId=this.activeSessionIdSignal.asReadonly();isLoading=this.isLoadingSignal.asReadonly();error=this.errorSignal.asReadonly();currentSession=l(()=>{let e=this.activeSessionIdSignal();return e&&this.sessionsSignal().find(a=>a.id===e)||null});currentMessages=l(()=>this.currentSession()?.messages||[]);languageSessions=l(()=>{let e=this.languageService.currentLanguage();return this.sessionsSignal().filter(a=>a.language===e)});constructor(){this.loadSessions()}loadSessions(){let e=this.storage.load(d.CHAT_SESSIONS,[]);this.sessionsSignal.set(e)}saveSessions(){this.storage.save(d.CHAT_SESSIONS,this.sessionsSignal())}createSession(e){let a={id:O(),language:this.languageService.currentLanguage(),title:e||this.generateDefaultTitle(),messages:[],vocabularyAdded:[],createdAt:Date.now(),updatedAt:Date.now()};return this.sessionsSignal.update(t=>[a,...t]),this.activeSessionIdSignal.set(a.id),this.saveSessions(),a}generateDefaultTitle(){let e=this.languageService.currentConfig(),a=new Date().toLocaleDateString();return`${e.name} Chat - ${a}`}setActiveSession(e){if(e===null){this.activeSessionIdSignal.set(null);return}this.sessionsSignal().find(t=>t.id===e)&&this.activeSessionIdSignal.set(e)}getSession(e){return this.sessionsSignal().find(a=>a.id===e)}deleteSession(e){return this.sessionsSignal().some(t=>t.id===e)?(this.sessionsSignal.update(t=>t.filter(n=>n.id!==e)),this.activeSessionIdSignal()===e&&this.activeSessionIdSignal.set(null),this.saveSessions(),!0):!1}clearLanguageSessions(){let e=this.languageService.currentLanguage();this.sessionsSignal.update(t=>t.filter(n=>n.language!==e)),this.currentSession()?.language===e&&this.activeSessionIdSignal.set(null),this.saveSessions()}sendMessage(e){return h(this,null,function*(){let a=this.currentSession();if(!a)return this.errorSignal.set("No active session"),null;this.isLoadingSignal.set(!0),this.errorSignal.set(null);try{let t={id:A(),role:"user",content:e,timestamp:Date.now()};this.addMessageToSession(a.id,t);let n=this.vocabularyService.getAll(),i=yield this.geminiService.chat(a.language,e,a.messages,n),s={id:A(),role:"assistant",content:i.content,nativeContent:i.nativeText,romanizedContent:i.romanizedText,translationContent:i.translationText,timestamp:Date.now()};return this.addMessageToSession(a.id,s),i.newVocabulary&&i.newVocabulary.length>0&&(s.vocabularyItems=i.newVocabulary.map(S=>({id:"",language:a.language,nativeScript:S.nativeScript,romanization:S.romanization,translation:S.translation,metadata:{},partOfSpeech:S.partOfSpeech,isCustom:!0,createdAt:Date.now(),addedFromChat:!0,chatSessionId:a.id}))),s}catch(t){let n=t instanceof Error?t.message:"Failed to send message";return this.errorSignal.set(n),null}finally{this.isLoadingSignal.set(!1)}})}addMessageToSession(e,a){this.sessionsSignal.update(t=>t.map(n=>n.id===e?o(r({},n),{messages:[...n.messages,a],updatedAt:Date.now()}):n)),this.saveSessions()}addVocabularyFromChat(e){let a=this.currentSession();if(!a)return;let t=[];e.forEach(n=>{let i=this.vocabularyService.add({language:a.language,nativeScript:n.nativeScript,romanization:n.romanization,translation:n.translation,metadata:{},partOfSpeech:n.partOfSpeech,addedFromChat:!0,chatSessionId:a.id});t.push(i.id)}),this.sessionsSignal.update(n=>n.map(i=>i.id===a.id?o(r({},i),{vocabularyAdded:[...i.vocabularyAdded,...t],updatedAt:Date.now()}):i)),this.saveSessions()}updateSessionTitle(e,a){this.sessionsSignal.update(t=>t.map(n=>n.id===e?o(r({},n),{title:a,updatedAt:Date.now()}):n)),this.saveSessions()}clearError(){this.errorSignal.set(null)}getOrCreateSession(){let e=this.currentSession();if(e&&e.language===this.languageService.currentLanguage())return e;let a=this.languageSessions();if(a.length>0){let t=a[0];return this.setActiveSession(t.id),t}return this.createSession()}static \u0275fac=function(a){return new(a||c)};static \u0275prov=y({token:c,factory:c.\u0275fac,providedIn:"root"})};export{R as a,T as b,M as c};
