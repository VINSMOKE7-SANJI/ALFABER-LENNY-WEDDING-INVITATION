function start(){
 document.getElementById('opening').style.display='none';
 document.getElementById('envelope').style.display='block';
}

function openEnvelope(){
 document.querySelector('.top').style.transform='rotateX(180deg)';
 setTimeout(()=>{
   document.getElementById('envelope').style.display='none';
   document.getElementById('app').classList.remove('hidden');
 },1000);
}

// SLIDE MODE (SWIPE)
let current=0;
const slides=document.querySelectorAll('.slide');

function showSlide(i){
 slides.forEach(s=>s.classList.remove('active'));
 slides[i].classList.add('active');
}

document.addEventListener('wheel',e=>{
 if(e.deltaY>0) current++;
 else current--;
 if(current<0) current=0;
 if(current>=slides.length) current=slides.length-1;
 showSlide(current);
});

// COUNTDOWN
setInterval(()=>{
 let t=new Date(\"Dec 12, 2026\").getTime()-Date.now();
 let d=Math.floor(t/(1000*60*60*24));
 document.getElementById('countdown').innerHTML=d+\" Hari\";
},1000);

// FLOWER PNG
const canvas=document.getElementById('flowers');
const ctx=canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;

let img=new Image();
img.src='assets/flower.png';

let petals=[...Array(20)].map(()=>({
 x:Math.random()*canvas.width,
 y:Math.random()*canvas.height
}));

function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 petals.forEach(p=>{
  ctx.drawImage(img,p.x,p.y,30,30);
  p.y+=1;
  if(p.y>canvas.height)p.y=0;
 });
 requestAnimationFrame(animate);
}
animate();

// RSVP
document.getElementById('form').addEventListener('submit',e=>{
 e.preventDefault();
 fetch(\"YOUR_SCRIPT_URL\",{
  method:\"POST\",
  body:new FormData(e.target)
 });
});
