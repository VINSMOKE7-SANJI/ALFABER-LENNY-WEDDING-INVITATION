function openEnvelope(){
 document.querySelector('.flap').style.transform='rotateX(180deg)';
 document.getElementById('openSound').play();
 setTimeout(()=>{
   document.getElementById('envelope').style.display='none';
   document.getElementById('main').classList.remove('hidden');
   document.getElementById('music').play();
 },1000);
}

const targetDate=new Date("Dec 12, 2026 08:00:00").getTime();
setInterval(()=>{
 let now=new Date().getTime();
 let gap=targetDate-now;
 let d=Math.floor(gap/(1000*60*60*24));
 document.getElementById('timer').innerHTML=d+" Hari";
},1000);

let i=0;
setInterval(()=>{
 let s=document.querySelector('.slider');
 i=(i+1)%3;
 s.style.transform=`translateX(-${i*100}%)`;
 s.style.transition="1s";
},3000);

const canvas=document.getElementById('flowers');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let petals=[];
for(let i=0;i<30;i++){petals.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:5});}
function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 petals.forEach(p=>{
  ctx.beginPath();
  ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
  ctx.fillStyle='pink';
  ctx.fill();
  p.y+=1;
  if(p.y>canvas.height)p.y=0;
 });
 requestAnimationFrame(draw);
}
draw();

document.getElementById('rsvpForm').addEventListener('submit',function(e){
 e.preventDefault();
 fetch("YOUR_GOOGLE_SCRIPT_URL",{method:"POST",body:new FormData(this)})
 .then(()=>alert("Terkirim"));
});

