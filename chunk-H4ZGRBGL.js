import{L as f,Nb as c,Ob as b,P as I,Pb as T,Q as m,Qb as x,Rb as A,Tb as N,Ub as $,da as p,wb as h}from"./chunk-B57RY4GM.js";import{a as v,b as y,c as l}from"./chunk-W5NDKLUF.js";var E="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",w=class d{constructor(e){this.storage=e;this.loadApiKey()}apiKeySignal=p(null);hasApiKey=h(()=>!!this.apiKeySignal());isConfigured=this.hasApiKey;loadApiKey(){let e=this.storage.load(c.SETTINGS,{});e.geminiApiKey&&this.apiKeySignal.set(e.geminiApiKey)}setApiKey(e){this.apiKeySignal.set(e);let t=this.storage.load(c.SETTINGS,{});t.geminiApiKey=e,this.storage.save(c.SETTINGS,t)}clearApiKey(){this.apiKeySignal.set(null);let e=this.storage.load(c.SETTINGS,{});delete e.geminiApiKey,this.storage.save(c.SETTINGS,e)}callGemini(e){return l(this,null,function*(){let t=this.apiKeySignal();if(!t)throw new Error("Gemini API key not configured");let s=yield fetch(`${E}?key=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}],generationConfig:{temperature:.7,maxOutputTokens:2048}})});if(!s.ok){let i=yield s.json();throw new Error(i.error?.message||`API error: ${s.status}`)}let a=yield s.json();if(a.error)throw new Error(a.error.message);let n=a.candidates?.[0]?.content?.parts?.[0]?.text;if(!n)throw new Error("No response from Gemini");return n})}parseVocabulary(e){return l(this,null,function*(){let t=`Parse the following Japanese vocabulary notes into structured data.
For each word/phrase, extract:
- nativeScript (the Japanese writing in hiragana)
- romanization (the romanized pronunciation)
- translation (the English meaning)
- partOfSpeech (noun, verb, adjective, adverb, particle, phrase, or expression)

Return ONLY a valid JSON array with no additional text. Example format:
[{"nativeScript": "\u306D\u3053", "romanization": "neko", "translation": "cat", "partOfSpeech": "noun"}]

Input text:
${e}

JSON output:`;try{let a=(yield this.callGemini(t)).trim();return a.startsWith("```json")&&(a=a.slice(7)),a.startsWith("```")&&(a=a.slice(3)),a.endsWith("```")&&(a=a.slice(0,-3)),JSON.parse(a.trim()).filter(i=>i.nativeScript&&i.romanization&&i.translation)}catch(s){throw console.error("Failed to parse vocabulary:",s),s}})}generateSentences(e,t=5){return l(this,null,function*(){let s=e.map(n=>`${n.nativeScript} (${n.romanization}) = ${n.translation}`).join(`
`),a=`You are a Japanese language tutor. Create ${t} simple practice sentences using ONLY the vocabulary words provided below. The sentences should be appropriate for a beginner learner.

Available vocabulary:
${s}

For each sentence, provide:
- japanese: the sentence in hiragana (use only the vocabulary provided)
- romaji: the romanized pronunciation
- english: the English translation

Return ONLY a valid JSON array with no additional text. Example:
[{"japanese": "\u306D\u3053\u306F \u304B\u308F\u3044\u3044", "romaji": "neko wa kawaii", "english": "The cat is cute"}]

JSON output:`;try{let i=(yield this.callGemini(a)).trim();return i.startsWith("```json")&&(i=i.slice(7)),i.startsWith("```")&&(i=i.slice(3)),i.endsWith("```")&&(i=i.slice(0,-3)),JSON.parse(i.trim()).filter(u=>u.japanese&&u.romaji&&u.english)}catch(n){throw console.error("Failed to generate sentences:",n),n}})}generateDistractors(e,t=3){return l(this,null,function*(){let s=`Generate ${t} plausible but incorrect English translations for the Japanese word "${e.nativeScript}" (${e.romanization}). The correct meaning is "${e.translation}".

The distractors should:
- Be similar category/type of word
- Be plausible wrong answers
- NOT be the correct translation

Return ONLY a JSON array of strings with no additional text.
Example: ["water", "mountain", "tree"]

JSON output:`;try{let n=(yield this.callGemini(s)).trim();return n.startsWith("```json")&&(n=n.slice(7)),n.startsWith("```")&&(n=n.slice(3)),n.endsWith("```")&&(n=n.slice(0,-3)),JSON.parse(n.trim()).slice(0,t)}catch(a){throw console.error("Failed to generate distractors:",a),a}})}getWordHint(e){return l(this,null,function*(){let t=`Give a very short (1 sentence) hint or memory tip for the Japanese word:
${e.nativeScript} (${e.romanization}) = ${e.translation}

The hint should help a learner remember this word. Be creative but brief.
Return only the hint text, no additional formatting.`;try{return(yield this.callGemini(t)).trim()}catch(s){throw console.error("Failed to get hint:",s),s}})}validateApiKey(e){return l(this,null,function*(){let t=this.apiKeySignal();try{return this.apiKeySignal.set(e),yield this.callGemini('Say "ok" in one word.'),!0}catch{return!1}finally{this.apiKeySignal.set(t)}})}chat(e,t,s,a){return l(this,null,function*(){let n=T[e],i=a.length>0?a.map(r=>r.romanization?`- ${r.nativeScript} (${r.romanization}) = ${r.translation}`:`- ${r.nativeScript} = ${r.translation}`).join(`
`):"No vocabulary yet - start with basic greetings and simple words.",g=s.slice(-10).map(r=>`${r.role==="user"?"Student":"Tutor"}: ${r.content}`).join(`
`),u=n.romanizationName||"romanized form",O=`You are a friendly ${n.name} language tutor having a conversation with a student.

IMPORTANT RULES:
1. Respond using PRIMARILY words from the student's vocabulary list below
2. If the student asks "how do I say X?" or similar, teach them the word in ${n.name}
3. When introducing NEW words, include them in the "newVocabulary" array in your response
4. Keep responses conversational and encouraging
5. Use simple sentences appropriate for beginners
6. Accept input in ${u} or ${n.nativeName} script

Student's known vocabulary:
${i}

${g?`Recent conversation:
${g}
`:""}
Student's message: ${t}

Respond in this JSON format ONLY (no markdown, no code blocks):
{
  "content": "Your full response mixing explanation and target language",
  "nativeText": "Your response in ${n.nativeName} only",
  "romanizedText": "The ${u} version",
  "translationText": "English translation of your response",
  "newVocabulary": [
    {
      "nativeScript": "word in ${n.nativeName}",
      "romanization": "${u} form",
      "translation": "English meaning",
      "partOfSpeech": "noun/verb/adjective/etc",
      "context": "example usage or note"
    }
  ]
}

If not introducing new vocabulary, use an empty array: "newVocabulary": []

JSON response:`;try{let r=yield this.callGemini(O),o=r.trim();o.startsWith("```json")&&(o=o.slice(7)),o.startsWith("```")&&(o=o.slice(3)),o.endsWith("```")&&(o=o.slice(0,-3));let S=JSON.parse(o.trim());return{content:S.content||r,nativeText:S.nativeText,romanizedText:S.romanizedText,translationText:S.translationText,newVocabulary:S.newVocabulary||[]}}catch(r){return console.error("Failed to parse chat response:",r),{content:typeof r=="object"?"Sorry, I had trouble understanding. Please try again.":String(r),newVocabulary:[]}}})}static \u0275fac=function(t){return new(t||d)(I(b))};static \u0275prov=f({token:d,factory:d.\u0275fac,providedIn:"root"})};var C=class d{storage=m(b);languageService=m(x);vocabularyService=m(A);geminiService=m(w);sessionsSignal=p([]);activeSessionIdSignal=p(null);isLoadingSignal=p(!1);errorSignal=p(null);sessions=this.sessionsSignal.asReadonly();activeSessionId=this.activeSessionIdSignal.asReadonly();isLoading=this.isLoadingSignal.asReadonly();error=this.errorSignal.asReadonly();currentSession=h(()=>{let e=this.activeSessionIdSignal();return e&&this.sessionsSignal().find(t=>t.id===e)||null});currentMessages=h(()=>this.currentSession()?.messages||[]);languageSessions=h(()=>{let e=this.languageService.currentLanguage();return this.sessionsSignal().filter(t=>t.language===e)});constructor(){this.loadSessions()}loadSessions(){let e=this.storage.load(c.CHAT_SESSIONS,[]);this.sessionsSignal.set(e)}saveSessions(){this.storage.save(c.CHAT_SESSIONS,this.sessionsSignal())}createSession(e){let t={id:$(),language:this.languageService.currentLanguage(),title:e||this.generateDefaultTitle(),messages:[],vocabularyAdded:[],createdAt:Date.now(),updatedAt:Date.now()};return this.sessionsSignal.update(s=>[t,...s]),this.activeSessionIdSignal.set(t.id),this.saveSessions(),t}generateDefaultTitle(){let e=this.languageService.currentConfig(),t=new Date().toLocaleDateString();return`${e.name} Chat - ${t}`}setActiveSession(e){if(e===null){this.activeSessionIdSignal.set(null);return}this.sessionsSignal().find(s=>s.id===e)&&this.activeSessionIdSignal.set(e)}getSession(e){return this.sessionsSignal().find(t=>t.id===e)}deleteSession(e){return this.sessionsSignal().some(s=>s.id===e)?(this.sessionsSignal.update(s=>s.filter(a=>a.id!==e)),this.activeSessionIdSignal()===e&&this.activeSessionIdSignal.set(null),this.saveSessions(),!0):!1}clearLanguageSessions(){let e=this.languageService.currentLanguage();this.sessionsSignal.update(s=>s.filter(a=>a.language!==e)),this.currentSession()?.language===e&&this.activeSessionIdSignal.set(null),this.saveSessions()}sendMessage(e){return l(this,null,function*(){let t=this.currentSession();if(!t)return this.errorSignal.set("No active session"),null;this.isLoadingSignal.set(!0),this.errorSignal.set(null);try{let s={id:N(),role:"user",content:e,timestamp:Date.now()};this.addMessageToSession(t.id,s);let a=this.vocabularyService.getAll(),n=yield this.geminiService.chat(t.language,e,t.messages,a),i={id:N(),role:"assistant",content:n.content,nativeContent:n.nativeText,romanizedContent:n.romanizedText,translationContent:n.translationText,timestamp:Date.now()};return this.addMessageToSession(t.id,i),n.newVocabulary&&n.newVocabulary.length>0&&(i.vocabularyItems=n.newVocabulary.map(g=>({id:"",language:t.language,nativeScript:g.nativeScript,romanization:g.romanization,translation:g.translation,metadata:{},partOfSpeech:g.partOfSpeech,isCustom:!0,createdAt:Date.now(),addedFromChat:!0,chatSessionId:t.id}))),i}catch(s){let a=s instanceof Error?s.message:"Failed to send message";return this.errorSignal.set(a),null}finally{this.isLoadingSignal.set(!1)}})}addMessageToSession(e,t){this.sessionsSignal.update(s=>s.map(a=>a.id===e?y(v({},a),{messages:[...a.messages,t],updatedAt:Date.now()}):a)),this.saveSessions()}addVocabularyFromChat(e){let t=this.currentSession();if(!t)return;let s=[];e.forEach(a=>{let n=this.vocabularyService.add({language:t.language,nativeScript:a.nativeScript,romanization:a.romanization,translation:a.translation,metadata:{},partOfSpeech:a.partOfSpeech,addedFromChat:!0,chatSessionId:t.id});s.push(n.id)}),this.sessionsSignal.update(a=>a.map(n=>n.id===t.id?y(v({},n),{vocabularyAdded:[...n.vocabularyAdded,...s],updatedAt:Date.now()}):n)),this.saveSessions()}updateSessionTitle(e,t){this.sessionsSignal.update(s=>s.map(a=>a.id===e?y(v({},a),{title:t,updatedAt:Date.now()}):a)),this.saveSessions()}clearError(){this.errorSignal.set(null)}getOrCreateSession(){let e=this.currentSession();if(e&&e.language===this.languageService.currentLanguage())return e;let t=this.languageSessions();if(t.length>0){let s=t[0];return this.setActiveSession(s.id),s}return this.createSession()}static \u0275fac=function(t){return new(t||d)};static \u0275prov=f({token:d,factory:d.\u0275fac,providedIn:"root"})};export{w as a,C as b};
