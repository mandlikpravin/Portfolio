
/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
(function () {
    const bootEl = document.getElementById('boot');
    const logEl = document.getElementById('boot-log');
    const fillEl = document.getElementById('boot-fill');
    const pctEl = document.getElementById('boot-pct');
    const skipBtn = document.getElementById('boot-skip');

    const lines = [
        ["[  0.000000] ", "dim", "Booting PORTFOLIO-OS v1.1.4 (Kali-derived, hardened)..."],
        ["[  5.132841] ", "tag", "Initializing kernel modules: overlay, nft_core, aufs"],
        ["[  10.451092] ", "ok", "Mounting /dev/sda1 -> / [encrypted, LUKS2] .......... OK"],
        ["[  20.783310] ", "ok", "Starting network-manager.service .................... OK"],
        ["[  50.104472] ", "ok", "Starting ssh.service (key-based auth only) .......... OK"],
        ["[  60.402981] ", "warn", "Checking firewall rules (nftables) ................... 214 rules loaded"],
        ["[  70.788302] ", "ok", "Mounting /opt/tools: burpsuite, nmap, metasploit ..... OK"],
        ["[  80.114552] ", "ok", "Mounting /opt/tools: postman, durb, wireshark ...... OK"],
        ["[  90.501120] ", "tag", "Verifying integrity of portfolio.bin ................. checksum OK"],
        ["[  95.903341] ", "ok", "Establishing secure session for guest@portfolio"],
        ["[  100.000000] ", "ok", "Access granted."],
        ["", "", ""],
        ["", "ok", "Welcome to My Portfolio. Loading portfolio interface..."]
    ];

    let li = 0;
    function nextLine() {
        if (li >= lines.length) { return; }
        const [prefix, cls, text] = lines[li];
        const span = document.createElement('div');
        span.innerHTML = (prefix ? `<span class="dim">${prefix}</span>` : '') + `<span class="${cls}">${text}</span>`;
        logEl.appendChild(span);
        li++;
        if (li < lines.length) { setTimeout(nextLine, 90 + Math.random() * 160); }
    }
    nextLine();

    let pct = 0;
    const pctTimer = setInterval(() => {
        pct += Math.random() * 9 + 3;
        if (pct >= 100) { pct = 100; clearInterval(pctTimer); }
        fillEl.style.width = pct + '%';
        pctEl.textContent = Math.floor(pct) + '%';
        if (pct >= 100) { setTimeout(finishBoot, 350); }
    }, 140);

    let done = false;
    function finishBoot() {
        if (done) return;
        done = true;
        bootEl.classList.add('hidden');
        document.body.style.overflow = '';
        startHeroTyping();
    }
    skipBtn.addEventListener('click', finishBoot);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') finishBoot(); });
    document.body.style.overflow = 'hidden';
    // safety net in case something stalls
    setTimeout(finishBoot, 6500);
})();


/* ============ MOBILE NAV ============ */
const navToggle = document.getElementById('navToggle');
const navPills = document.getElementById('navPills');
navToggle.addEventListener('click', () => navPills.classList.toggle('open'));
navPills.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navPills.classList.remove('open')));

/* ============ HEADER SCROLL STATE ============ */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============ REVEAL ON SCROLL ============ */
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============ TYPING TERMINAL ============ */
const lines = [
    'whoami\n> security_engineer',
    'nmap -sV target.io\n> 50+ critical vulns found',
    'git commit -m "patch: auth bypass fixed"'
];
const typeEl = document.getElementById('typeTarget');
let li = 0, ci = 0, deleting = false;
function typeLoop() {
    const full = lines[li];
    if (!deleting) {
        ci++;
        typeEl.textContent = full.slice(0, ci);
        if (ci === full.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
        ci--;
        typeEl.textContent = full.slice(0, ci);
        if (ci === 0) { deleting = false; li = (li + 1) % lines.length; }
    }
    setTimeout(typeLoop, deleting ? 18 : 32);
}
typeLoop();

/* ============ TECH STRIP ICONS (duplicated for seamless loop) ============ */
const techs = [
    // Web & API Security
    { name: 'Burp Suite', path: 'M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z' },
    { name: 'Postman', path: 'M12 2a10 10 0 1 0 0.01 0zM12 6l4 6h-3v6h-2v-6H8z' },
    { name: 'SQLMap', path: 'M4 5a8 3 0 0 1 16 0v14a8 3 0 0 1-16 0zM4 5a8 3 0 0 0 16 0M15 13l4 4m0-4l-4 4' },
    { name: 'FFUF', path: 'M4 4h16v4H4zM4 10h10v4H4zM4 16h6v4H4zM16 14l4 4m0-4l-4 4' },
    { name: 'DirB', path: 'M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M16 12l3 3m0-3l-3 3' },
    { name: 'DirBuster', path: 'M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M12 10v6M9 13h6' },
    { name: 'SSLScan', path: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z M9 12l2 2 4-4' },
    { name: 'Nikto', path: 'M12 2C7 2 3 6 3 11c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9zM8 11h8M8 15h5' },
    { name: 'OWASP ZAP', path: 'M12 2l9 4-9 4-9-4z M3 6v6l9 4 9-4V6 M3 12v6l9 4 9-4v-6' },
    // Network Security
    { name: 'Nmap', path: 'M12 2a10 10 0 1 0 0.01 0zM12 6v6l4 2' },
    { name: 'Wireshark', path: 'M2 12c3-6 7-9 10-9s7 3 10 9c-3 6-7 9-10 9s-7-3-10-9z M12 8a4 4 0 1 0 0.01 0z' },
    { name: 'Nessus', path: 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6zM9 12l2 2 4-4' },
    // Mobile Security
    { name: 'ADB', path: 'M6 8h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM8 8V6a4 4 0 0 1 8 0v2M4 3l2 2M20 3l-2 2' },
    { name: 'Frida', path: 'M12 2l8 5v10l-8 5-8-5V7z M12 7v10' },
    { name: 'Objection', path: 'M12 2L4 6v3c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V6zM9 12h6M12 9v6' },
    { name: 'Genymotion', path: 'M7 2h10l2 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6zM12 18h.01' },
    { name: 'APKTool', path: 'M12 2l9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v9' },
    // Cloud Security
    { name: 'AWS', path: 'M7 15a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4.5 4.5 0 0 1 17 15z M4 19h16' },
    { name: 'TruffleHog', path: 'M12 2c4 0 7 3 7 7 0 5-3 9-7 13-4-4-7-8-7-13 0-4 3-7 7-7zM12 9v5M10 12h4' },
    { name: 'CloudFox', path: 'M7 15a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A4.5 4.5 0 0 1 17 15zM10 18l2-3 2 3' },
    { name: 'Prowler', path: 'M12 2C8 5 5 6 4 6c0 8 3 13 8 16 5-3 8-8 8-16-1 0-4-1-8-4zM9 12l2 2 4-4' },
    { name: 'ScoutSuite', path: 'M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z M12 16v6' },
    // Programming
    { name: 'HTML5', path: 'M4 2l1.5 17L12 21l6.5-2L20 2zM7 6h10l-.5 5H8l.2 2h9l-.6 6-4.6 1.3-4.6-1.3-.3-3h2l.15 1.5L12 18l2.7-.7.3-3H7.7z' },
    { name: 'CSS3', path: 'M4 2l1.5 17L12 21l6.5-2L20 2zM7 6h10l-.5 5H8l.2 2h9l-.6 6-4.6 1.3-4.6-1.3-.3-3h2l.15 1.5L12 18l2.7-.7.5-5H8.2L7.9 9H16l.2-2z' },
    { name: 'JavaScript', path: 'M3 3h18v18H3zM8 16.5c.4.8 1 1.3 2 1.3 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.6-.7-2.7-1.6-2.7-3.4 0-1.7 1.3-3 3.3-3 1.4 0 2.5.5 3.2 1.8l-1.7 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.4 1.4l.6.2c1.9.8 3 1.7 3 3.5 0 2-1.6 3.1-3.7 3.1-2.1 0-3.4-1-4-2.3z' },
    { name: 'PHP', path: 'M12 8c-5.5 0-10 1.8-10 4s4.5 4 10 4 10-1.8 10-4-4.5-4-10-4zM6 10h1.5l-.5 4H8l.5-2h1c1 0 1.5-.5 1.5-1.3S10 9 9 9H6.5zM7.3 10.5h1c.4 0 .6.2.6.5s-.3.6-.7.6h-1z' },
    { name: 'Python', path: 'M12 2c-4 0-4 2-4 2v2h4v1H6s-3 0-3 5 3 5 3 5h2v-2s0-2 2-2h4s2 0 2-2V4s0-2-4-2zM9 4a1 1 0 1 1 0 .01z M12 22c4 0 4-2 4-2v-2h-4v-1h6s3 0 3-5-3-5-3-5h-2v2s0 2-2 2H10s-2 0-2 2v6s0 2 4 2zM15 20a1 1 0 1 1 0-.01z' },
    { name: 'MySQL', path: 'M4 18c2-6 3-10 8-14 5 4 6 8 8 14-3-1-6-1-8-3-2 2-5 2-8 3zM12 6v8' },
    // Operating Systems
    { name: 'Kali Linux', path: 'M4 4c6 0 10 3 16 16-6-3-10-3-16 0 4-6 4-10 0-16z' },
    { name: 'Windows', path: 'M3 5.5L11 4v7H3zM12 4l9-1.3v8.6h-9zM3 12h8v7L3 17.5zM12 12h9v8.3L12 19z' },
    // Version Control
    { name: 'Git', path: 'M21.6 11l-8.6-8.6a1.4 1.4 0 0 0-2 0l-2 2 2.5 2.5a1.7 1.7 0 0 1 2.1 2.1l2.4 2.4a1.7 1.7 0 1 1-1 1L12.4 8v6.1a1.7 1.7 0 1 1-1.4 0V7.9a1.7 1.7 0 0 1-.9-2.2L7.5 3.1l-5.1 5.1a1.4 1.4 0 0 0 0 2l8.6 8.6a1.4 1.4 0 0 0 2 0l8.6-8.6a1.4 1.4 0 0 0 0-2z' },
    { name: 'GitHub', path: 'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.3-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2z' },
];
const track = document.getElementById('techTrack');
function buildTrack() {
    const set = [...techs, ...techs];
    track.innerHTML = set.map(t => `
    <div class="tech-item">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${t.path}"/></svg>
      ${t.name}
    </div>`).join('');
}
buildTrack();

/* ============ PROJECTS GRID ============ */

const projects = [
    {
        code: '01',
        title: 'E-Commerce Web & API Security Assessment',
        tag: 'Burp Suite Pro · Postman · SQLMap · Nmap · FFUF',
        color: '#39ff9d'
    },
    {
        code: '02',
        title: 'Healthcare Mobile Application Security',
        tag: 'Frida · Objection · ADB · APKTool',
        color: '#5eead4'
    },
    {
        code: '03',
        title: 'Web Application Penetration Testing',
        tag: 'OWASP Top 10 · VAPT',
        color: '#ffb454'
    },
    {
        code: '04',
        title: 'REST API Security Assessment',
        tag: 'OWASP API Top 10 · JWT Testing',
        color: '#39ff9d'
    },
    {
        code: '05',
        title: 'AWS Cloud Security Assessment',
        tag: 'IAM · EC2 · S3 · Prowler · CloudFox',
        color: '#5eead4'
    },
    {
        code: '06',
        title: 'AI / LLM Security Testing',
        tag: 'Prompt Injection · OWASP LLM Top 10',
        color: '#ffb454'
    }
];

const grid = document.getElementById('projGrid');

grid.innerHTML = projects.map(p => `
  <div class="proj-card reveal">
    <div class="proj-thumb" style="background:${p.color};">${p.code}</div>

    <div class="proj-info">
      <h4>${p.title}</h4>
      <span>${p.tag}</span>
    </div>

    <div class="proj-arrow">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round">
        <path d="M7 17L17 7M7 7h10v10"/>
      </svg>
    </div>
  </div>
`).join('');

document.querySelectorAll('#projGrid .reveal').forEach(el => io.observe(el));

/* ============ SOCIAL ROW ============ */
const socials = [
  {
    name: 'Gmail',
    link: 'mailto:pravinmandlik8@gmail.com',
    path: 'M3 6h18v12H3z M3 6l9 7 9-7'
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/pravin-mandlik/',
    path: 'M4 4h4v16H4z M6 2a2 2 0 100 4 2 2 0 000-4z M11 9h4v11h-4z M11 13c0-2 1.5-4 4-4s4 2 4 4v7h-4v-6c0-.8-.5-1.5-1.5-1.5S12 13.2 12 14v6h-1z'
  },
  {
    name: 'GitHub',
    link: 'https://github.com/mandlikpravin',
    path: 'M12 2a10 10 0 00-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z'
  }
];

document.getElementById('socialRow').innerHTML = socials.map(s => `
  <a
    class="social-btn"
    href="${s.link}"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div class="social-circle">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="${s.path}"/>
      </svg>
    </div>
    <span>${s.name}</span>
  </a>
`).join('');

/* ============ MATRIX RAIN CANVAS ============ */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w, h, cols, drops;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = Math.min(window.innerHeight * 1.1, 900);
    cols = Math.floor(w / 18);
    drops = new Array(cols).fill(0).map(() => Math.random() * -50);
}
resize();
window.addEventListener('resize', resize);
const glyphs = '01{}<>/;#$%&*ABCDEF';
function drawMatrix() {
    ctx.fillStyle = 'rgba(7,11,10,0.12)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#39ff9d';
    ctx.font = '14px monospace';
    drops.forEach((y, i) => {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(text, i * 18, y * 18);
        if (y * 18 > h && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 0.6;
    });
    requestAnimationFrame(drawMatrix);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(drawMatrix);
}
