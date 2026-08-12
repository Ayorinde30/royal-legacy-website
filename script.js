const SERVER_IP="51.68.107.75:10826";
const DISCORD_URL="https://discord.gg/tNK87R5c";
const PLAYER_COUNT=0;
const MAX_PLAYERS=500;

document.querySelector("#ip").textContent=SERVER_IP;
document.querySelector("#heroIp").textContent=SERVER_IP;
document.querySelector("#players").textContent=`${PLAYER_COUNT} / ${MAX_PLAYERS}`;

["topDiscord","discord","footerDiscord","storeDiscord"].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.href=DISCORD_URL;
});

document.getElementById("copy").addEventListener("click",async()=>{
  const btn=document.getElementById("copy");
  try{
    await navigator.clipboard.writeText(SERVER_IP);
    btn.textContent="COPIED!";
    setTimeout(()=>btn.textContent="COPY IP",1400);
  }catch{
    alert("Server IP: "+SERVER_IP);
  }
});

const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
