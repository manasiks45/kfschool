
(function(){
  const LS_KEY='kfs_lang',DEFAULT_LANG='en';
  const routeMap={
    "index.html":"index-ar.html",
    "vision-mission.html":"vision-mission-ar.html",
    "principals-message.html":"principals-message-ar.html",
    "curriculum-overview.html":"curriculum-overview-ar.html",
    "admissions-process.html":"admissions-process-ar.html",
    "fees.html":"fees-ar.html",
    "why-choose-us.html":"why-choose-us-ar.html",
    "student-life.html":"student-life-ar.html",
    "parent-corner.html":"parent-corner-ar.html",
    "news.html":"news-ar.html",
    "contact.html":"contact-ar.html"
  ,
    "co-curricular.html":"co-curricular-ar.html",
    "policies.html":"policies-ar.html",
    "student-council.html":"student-council-ar.html",
    "student-experience.html":"student-experience-ar.html",
    "timings.html":"timings-ar.html",
    "uniform-supplies.html":"uniform-supplies-ar.html",
    "uniform.html":"uniform-ar.html"
};
  function getLang(){const s=localStorage.getItem(LS_KEY);return (s==='en'||s==='ar')?s:DEFAULT_LANG;}
  function setLang(l){localStorage.setItem(LS_KEY,l);}
  function fileName(url){const p=url.split('?')[0].split('#')[0];const a=p.split('/');return a[a.length-1]||'index.html';}
  function englishBase(f){return f.endsWith('-ar.html')?f.replace('-ar.html','.html'):f;}
  function twin(f,l){const b=englishBase(f);const t=routeMap[b];if(!t)return f;return l==='ar'?t:b;}
  function redirectIfMismatch(l){const cur=fileName(window.location.pathname);const want=twin(cur,l);if(cur!==want){window.location.replace(want);return true;}return false;}
  function rewriteLinks(l){
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(!href||href.startsWith('http')||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;
      const f=fileName(href);const b=englishBase(f);if(routeMap[b])a.setAttribute('href',twin(f,l));
    });
  }
  function applyDir(l){
    const html=document.documentElement;html.setAttribute('lang',l);html.setAttribute('dir',l==='ar'?'rtl':'ltr');
    const en=document.getElementById('lang-en'),ar=document.getElementById('lang-ar');
    if(en)en.setAttribute('aria-pressed',l==='en'?'true':'false');
    if(ar)ar.setAttribute('aria-pressed',l==='ar'?'true':'false');
  }
  function init(){
    const l=getLang();
    if(redirectIfMismatch(l))return;
    applyDir(l);rewriteLinks(l);
    const en=document.getElementById('lang-en'),ar=document.getElementById('lang-ar');
    if(en)en.addEventListener('click',e=>{e.preventDefault();setLang('en');redirectIfMismatch('en')||(applyDir('en'),rewriteLinks('en'));});
    if(ar)ar.addEventListener('click',e=>{e.preventDefault();setLang('ar');redirectIfMismatch('ar')||(applyDir('ar'),rewriteLinks('ar'));});
  }
  document.addEventListener('DOMContentLoaded',init);
})();
