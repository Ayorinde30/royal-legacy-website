const SERVER_IP = "51.68.107.75:10826";
const DISCORD_URL = "https://discord.gg/tNK87R5c";
const STATUS_API = `https://samp-api.tk/server/${SERVER_IP}`;

const ipEl = document.querySelector("#ip");
const heroIpEl = document.querySelector("#heroIp");
const playersEl = document.querySelector("#players");
const statusEl = document.querySelector("#status");

if (ipEl) ipEl.textContent = SERVER_IP;
if (heroIpEl) heroIpEl.textContent = SERVER_IP;

["topDiscord", "discord", "footerDiscord", "storeDiscord"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = DISCORD_URL;
});

async function updateServerStatus() {
  if (!statusEl || !playersEl) return;

  try {
    const response = await fetch(STATUS_API, { cache: "no-store" });
    if (!response.ok) throw new Error("Status request failed");

    const data = await response.json();

    if (data.online === true) {
      const players = Number(data.players ?? 0);
      const maxPlayers = Number(data.maxplayers ?? 1000);

      playersEl.textContent = `${players} / ${maxPlayers}`;
      statusEl.textContent = "ONLINE ●";
      statusEl.className = "online";
    } else {
      playersEl.textContent = `0 / ${Number(data.maxplayers ?? 1000)}`;
      statusEl.textContent = "ONLINE";
      statusEl.className = "online";
    }
  } catch (error) {
    // If the public status service is temporarily unavailable,
    // don't falsely claim that the game server is offline.
    statusEl.textContent = "CHECKING...";
    statusEl.className = "checking";
  }
}

const copyBtn = document.getElementById("copy");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      copyBtn.textContent = "COPIED!";
      setTimeout(() => copyBtn.textContent = "COPY IP", 1400);
    } catch {
      alert("Server IP: " + SERVER_IP);
    }
  });
}

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

updateServerStatus();
setInterval(updateServerStatus, 60000);
