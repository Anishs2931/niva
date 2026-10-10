// Fit the fixed-size hero stage (1600x850) to the viewport on desktop
const stage=document.querySelector('.stage'),page=document.querySelector('.page');
const H=850;
function fit(){
  const root=document.documentElement.style;
  if(innerWidth<=1100){
    stage.style.transform='';page.style.height='';
    root.setProperty('--ms',Math.min(1,(innerWidth-32)/1200));
    return;
  }
  const hh=document.querySelector('header').offsetHeight;
  const s=Math.min(innerWidth/1600,(innerHeight-hh)/H);
  stage.style.transform='translateX(-50%) scale('+s+')';
  page.style.height=(H*s)+'px';
}
addEventListener('resize',fit);fit();

// scroll reveal (also starts the scene animations while visible)
const io=new IntersectionObserver(es=>es.forEach(e=>{e.target.classList.toggle('in',e.isIntersecting)}),{threshold:.18});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// hero treatment icons / chevron scroll to their sections
const ids=['hair','laser','facial','rhino'];
['f1','f2','f3','f4'].forEach((f,i)=>document.querySelectorAll('.'+f).forEach(el=>el.addEventListener('click',()=>document.getElementById(ids[i]).scrollIntoView({behavior:'smooth',block:'center'}))));
const chev=document.getElementById('chev');
const goTreat=()=>document.getElementById('treatments').scrollIntoView({behavior:'smooth'});
chev.addEventListener('click',goTreat);
chev.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();goTreat()}});
document.getElementById('totop').addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})});

// scale each 590x415 hero-style scene to its panel width
function artScale(){document.querySelectorAll('.art').forEach(a=>{a.style.setProperty('--s',a.clientWidth/590)})}
addEventListener('resize',artScale);artScale();

// mobile menu
const btn=document.getElementById('menu-btn'),menu=document.getElementById('mobile-menu');
if(btn&&menu){
  btn.addEventListener('click',()=>{const open=menu.classList.toggle('hidden')===false;btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu')});
  menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.add('hidden');btn.setAttribute('aria-expanded','false')}});
}

