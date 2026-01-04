import{L as p,Mb as g,Nb as u,P as c,Pb as y,da as m,vb as l,wb as v}from"./chunk-RJYY74QR.js";import{a as r,b as s,c as h,h as b}from"./chunk-JX5TXO57.js";var f=class d{constructor(e){this.storage=e;v(()=>{this.saveSettings()}),this.applyTheme(this.settingsSignal().theme)}settingsSignal=m(this.loadSettings());settings=this.settingsSignal.asReadonly();keyboardLayout=l(()=>this.settingsSignal().keyboardLayout);showRomaji=l(()=>this.settingsSignal().showRomaji);showRomajiOnHover=l(()=>this.settingsSignal().showRomajiOnHover);theme=l(()=>this.settingsSignal().theme);dailyGoal=l(()=>this.settingsSignal().dailyGoal);enabledHiragana=l(()=>new Set(this.settingsSignal().enabledHiragana));enabledKatakana=l(()=>new Set(this.settingsSignal().enabledKatakana));soundEnabled=l(()=>this.settingsSignal().soundEnabled);hapticEnabled=l(()=>this.settingsSignal().hapticEnabled);geminiApiKey=l(()=>this.settingsSignal().geminiApiKey);enabledCharacters=l(()=>{let e=new Set;return this.settingsSignal().enabledHiragana.forEach(a=>e.add(a)),this.settingsSignal().enabledKatakana.forEach(a=>e.add(a)),e});loadSettings(){let e=this.storage.load(g.SETTINGS,{}),a=r(r({},y),e);return(!a.enabledHiragana||a.enabledHiragana.length===0)&&(a.enabledHiragana=[...b]),a}saveSettings(){this.storage.save(g.SETTINGS,this.settingsSignal())}applyTheme(e){let a=document.documentElement,t=window.matchMedia("(prefers-color-scheme: dark)").matches,n=!1;e==="dark"?n=!0:e==="system"&&(n=t),a.setAttribute("data-theme",n?"dark":"light")}setKeyboardLayout(e){this.settingsSignal.update(a=>s(r({},a),{keyboardLayout:e}))}setShowRomaji(e){this.settingsSignal.update(a=>s(r({},a),{showRomaji:e}))}setShowRomajiOnHover(e){this.settingsSignal.update(a=>s(r({},a),{showRomajiOnHover:e}))}setTheme(e){this.settingsSignal.update(a=>s(r({},a),{theme:e})),this.applyTheme(e)}setDailyGoal(e){this.settingsSignal.update(a=>s(r({},a),{dailyGoal:Math.max(1,Math.min(100,e))}))}setSoundEnabled(e){this.settingsSignal.update(a=>s(r({},a),{soundEnabled:e}))}setHapticEnabled(e){this.settingsSignal.update(a=>s(r({},a),{hapticEnabled:e}))}setGeminiApiKey(e){this.settingsSignal.update(a=>s(r({},a),{geminiApiKey:e}))}toggleHiragana(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledHiragana);return t.has(e)?t.delete(e):t.add(e),s(r({},a),{enabledHiragana:Array.from(t)})})}toggleKatakana(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledKatakana);return t.has(e)?t.delete(e):t.add(e),s(r({},a),{enabledKatakana:Array.from(t)})})}enableAllHiragana(){this.settingsSignal.update(e=>s(r({},e),{enabledHiragana:[...b]}))}disableAllHiragana(){this.settingsSignal.update(e=>s(r({},e),{enabledHiragana:[]}))}enableHiraganaRow(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledHiragana);return e.forEach(n=>t.add(n)),s(r({},a),{enabledHiragana:Array.from(t)})})}disableHiraganaRow(e){this.settingsSignal.update(a=>{let t=new Set(a.enabledHiragana);return e.forEach(n=>t.delete(n)),s(r({},a),{enabledHiragana:Array.from(t)})})}enableAllKatakana(){import("./chunk-HVSOYXJS.js").then(({BASIC_KATAKANA:e})=>{this.settingsSignal.update(a=>s(r({},a),{enabledKatakana:[...e]}))})}disableAllKatakana(){this.settingsSignal.update(e=>s(r({},e),{enabledKatakana:[]}))}isHiraganaEnabled(e){return this.enabledHiragana().has(e)}isKatakanaEnabled(e){return this.enabledKatakana().has(e)}isCharacterEnabled(e){return this.enabledCharacters().has(e)}resetToDefaults(){this.settingsSignal.set(s(r({},y),{enabledHiragana:[...b],enabledKatakana:[]})),this.applyTheme(y.theme)}static \u0275fac=function(a){return new(a||d)(c(u))};static \u0275prov=p({token:d,factory:d.\u0275fac,providedIn:"root"})};var E="https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",w=class d{constructor(e){this.storage=e;this.loadApiKey()}apiKeySignal=m(null);hasApiKey=l(()=>!!this.apiKeySignal());isConfigured=this.hasApiKey;loadApiKey(){let e=this.storage.load(g.SETTINGS,{});e.geminiApiKey&&this.apiKeySignal.set(e.geminiApiKey)}setApiKey(e){this.apiKeySignal.set(e);let a=this.storage.load(g.SETTINGS,{});a.geminiApiKey=e,this.storage.save(g.SETTINGS,a)}clearApiKey(){this.apiKeySignal.set(null);let e=this.storage.load(g.SETTINGS,{});delete e.geminiApiKey,this.storage.save(g.SETTINGS,e)}callGemini(e){return h(this,null,function*(){let a=this.apiKeySignal();if(!a)throw new Error("Gemini API key not configured");let t=yield fetch(`${E}?key=${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{temperature:.7,maxOutputTokens:2048}})});if(!t.ok){let o=yield t.json();throw new Error(o.error?.message||`API error: ${t.status}`)}let n=yield t.json();if(n.error)throw new Error(n.error.message);let i=n.candidates?.[0]?.content?.parts?.[0]?.text;if(!i)throw new Error("No response from Gemini");return i})}parseVocabulary(e){return h(this,null,function*(){let a=`Parse the following Japanese vocabulary notes into structured data.
For each word/phrase, extract:
- hiragana (the Japanese writing in hiragana)
- romaji (the romanized pronunciation)
- english (the English meaning)
- partOfSpeech (noun, verb, adjective, adverb, particle, phrase, or expression)

Return ONLY a valid JSON array with no additional text. Example format:
[{"hiragana": "\u306D\u3053", "romaji": "neko", "english": "cat", "partOfSpeech": "noun"}]

Input text:
${e}

JSON output:`;try{let n=(yield this.callGemini(a)).trim();return n.startsWith("```json")&&(n=n.slice(7)),n.startsWith("```")&&(n=n.slice(3)),n.endsWith("```")&&(n=n.slice(0,-3)),JSON.parse(n.trim()).filter(o=>o.hiragana&&o.romaji&&o.english)}catch(t){throw console.error("Failed to parse vocabulary:",t),t}})}generateSentences(e,a=5){return h(this,null,function*(){let t=e.map(i=>`${i.hiragana} (${i.romaji}) = ${i.english}`).join(`
`),n=`You are a Japanese language tutor. Create ${a} simple practice sentences using ONLY the vocabulary words provided below. The sentences should be appropriate for a beginner learner.

Available vocabulary:
${t}

For each sentence, provide:
- japanese: the sentence in hiragana (use only the vocabulary provided)
- romaji: the romanized pronunciation
- english: the English translation

Return ONLY a valid JSON array with no additional text. Example:
[{"japanese": "\u306D\u3053\u306F \u304B\u308F\u3044\u3044", "romaji": "neko wa kawaii", "english": "The cat is cute"}]

JSON output:`;try{let o=(yield this.callGemini(n)).trim();return o.startsWith("```json")&&(o=o.slice(7)),o.startsWith("```")&&(o=o.slice(3)),o.endsWith("```")&&(o=o.slice(0,-3)),JSON.parse(o.trim()).filter(S=>S.japanese&&S.romaji&&S.english)}catch(i){throw console.error("Failed to generate sentences:",i),i}})}generateDistractors(e,a=3){return h(this,null,function*(){let t=`Generate ${a} plausible but incorrect English translations for the Japanese word "${e.hiragana}" (${e.romaji}). The correct meaning is "${e.english}".

The distractors should:
- Be similar category/type of word
- Be plausible wrong answers
- NOT be the correct translation

Return ONLY a JSON array of strings with no additional text.
Example: ["water", "mountain", "tree"]

JSON output:`;try{let i=(yield this.callGemini(t)).trim();return i.startsWith("```json")&&(i=i.slice(7)),i.startsWith("```")&&(i=i.slice(3)),i.endsWith("```")&&(i=i.slice(0,-3)),JSON.parse(i.trim()).slice(0,a)}catch(n){throw console.error("Failed to generate distractors:",n),n}})}getWordHint(e){return h(this,null,function*(){let a=`Give a very short (1 sentence) hint or memory tip for the Japanese word:
${e.hiragana} (${e.romaji}) = ${e.english}

The hint should help a learner remember this word. Be creative but brief.
Return only the hint text, no additional formatting.`;try{return(yield this.callGemini(a)).trim()}catch(t){throw console.error("Failed to get hint:",t),t}})}validateApiKey(e){return h(this,null,function*(){let a=this.apiKeySignal();try{return this.apiKeySignal.set(e),yield this.callGemini('Say "ok" in one word.'),!0}catch{return!1}finally{this.apiKeySignal.set(a)}})}static \u0275fac=function(a){return new(a||d)(c(u))};static \u0275prov=p({token:d,factory:d.\u0275fac,providedIn:"root"})};export{f as a,w as b};
