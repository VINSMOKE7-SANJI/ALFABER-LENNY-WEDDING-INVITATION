function enterSite(){
 document.getElementById('opening').style.display='none';
 document.getElementById('main').classList.remove('hidden');
 document.getElementById('music').play();
}

const targetDate=new Date("Dec 12, 2026 08:00:00").getTime();
setInterval(()=>{
 let now=new Date().getTime();
 let gap=targetDate-now;
 let d=Math.floor(gap/(1000*60*60*24));
 let h=Math.floor((gap%(1000*60*60*24))/(1000*60*60));
 let m=Math.floor((gap%(1000*60*60))/(1000*60));
 let s=Math.floor((gap%(1000*60))/1000);
 document.getElementById('timer').innerHTML=d+"H "+h+"J "+m+"M "+s+"D";
},1000);

let index=0;
setInterval(()=>{
 const slider=document.querySelector('.slider');
 index=(index+1)%3;
 slider.style.transform=`translateX(-${index*100}%)`;
 slider.style.transition="1s";
},3000);

document.getElementById('rsvpForm').addEventListener('submit',function(e){
 e.preventDefault();
 fetch("YOUR_GOOGLE_SCRIPT_URL",{method:"POST",body:new FormData(this)})
 .then(()=>alert("Terkirim"));
});
