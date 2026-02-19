// ==UserScript==
// @name         Pontomais auto bater ponto (agendado)
// @description  Automatically punches in/out on Pontomais at scheduled times, with manual trigger support
// @version      1.0.0
// @match        https://app2.pontomais.com.br/registrar-ponto
// @run-at       document-end
// @grant        GM_notification
// @grant        GM_log
// @grant        GM_registerMenuCommand
// ==/UserScript==
(function() {
  'use strict';

  const SCRIPT_NAME = '[PontoAuto]';

  function log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const prefix = `${SCRIPT_NAME} [${timestamp}] [${level.toUpperCase()}]`;
    const fullMessage = `${prefix} ${message}`;
    if (data) {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](fullMessage, data);
    } else {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](fullMessage);
    }
    if (typeof GM_log !== 'undefined') GM_log(fullMessage);
  }

  function notify(text, isError = false) {
    const options = {
      text,
      title: 'Pontomais Auto Punch',
      timeout: 8000,
    };
    if (typeof GM_notification === 'function') {
      try {
        GM_notification(options, () => {});
      } catch (e) {
        log('warn', 'GM_notification failed, falling back to toast', e);
        injectToast(text, isError);
      }
    } else {
      log('warn', 'GM_notification unavailable, using in-page toast');
      injectToast(text, isError);
    }
  }

  function injectToast(message, isError = false) {
    const existing = document.getElementById('pontoauto-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'pontoauto-toast';
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: '999999',
      background: isError ? '#c0392b' : '#2ecc71',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transition: 'opacity 0.5s ease',
      opacity: '1',
      maxWidth: '320px',
    });

    document.body.appendChild(toast);
    log('info', `Toast shown: "${message}"`);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 7500);
  }

  function clickButtonContainingText(text) {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b =>
      b.textContent.trim().toLowerCase() === text.toLowerCase()
    );
    if (btn) {
      btn.click();
      log('info', `Button clicked: "${text}"`);
      return true;
    } else {
      log('warn', `Button not found: "${text}"`);
      notify(`Button "${text}" not found`, true);
      return false;
    }
  }

  Object.defineProperty(navigator, 'geolocation', {
    value: {
      getCurrentPosition: (success) => {
        log('info', 'Geolocation requested — returning mock coordinates');
        success({
          coords: {
            latitude: -28.6780227,
            longitude: -49.3735495,
            accuracy: 10,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
          },
          timestamp: Date.now()
        });
      },
      watchPosition: () => {}
    },
    configurable: true
  });

  function doPunch() {
    log('info', '--- Punch flow started ---');
    notify('Starting punch flow...');

    const clicked = clickButtonContainingText('Bater ponto');
    if (!clicked) {
      log('error', 'Punch flow aborted: "Bater ponto" button missing');
      return;
    }

    setTimeout(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      log('info', `Found ${buttons.length} buttons in DOM during confirmation step`);

      if (buttons[7]) {
        buttons[7].click();
        log('info', `Confirm button (index 7) clicked: "${buttons[7].textContent.trim()}"`);
        notify('Punch confirmed!');
      } else {
        log('error', `Confirm button at index 7 not found (only ${buttons.length} buttons present)`);
        notify('Confirm button not found', true);
      }

      log('info', '--- Punch flow ended ---');
    }, 1500);
  }

  // ── On-demand: Tampermonkey menu command ──────────────────────────────────
  // Click the Tampermonkey icon in the toolbar → "Punch now" to trigger manually
  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('👊 Punch now', () => {
      log('info', 'Manual trigger via menu command');
      doPunch();
    });
  }

  // ── On-demand: floating button on the page ────────────────────────────────
  function injectManualButton() {
    const btn = document.createElement('button');
    btn.textContent = '👊 Punch now';
    Object.assign(btn.style, {
      position: 'fixed',
      top: '16px',
      right: '16px',
      zIndex: '999999',
      background: '#2980b9',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      fontSize: '13px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    });
btn.addEventListener('mouseenter', () => { btn.style.background = '#1a6fa0'; });
btn.addEventListener('mouseleave', () => { btn.style.background = '#2980b9'; });
    btn.addEventListener('click', () => {
      log('info', 'Manual trigger via floating button');
      doPunch();
    });
    document.body.appendChild(btn);
  }

// ── Scheduled trigger ─────────────────────────────────────────────────────
function randomOffset() {
  return Math.floor(Math.random() * 13) + 1; // 1–13
}

function addMinutes(h, m, minutes) {
  const total = h * 60 + m + minutes;
  return { h: Math.floor(total / 60) % 24, m: total % 60 };
}

function diffMinutes(a, b) {
  return (b.h * 60 + b.m) - (a.h * 60 + a.m);
}

const WORK_MINUTES = 8 * 60; // 480 minutes total

// Base times — first and last define the workday boundaries
const BASE = [
  { h: 9, m: 10 }, // punch in
  { h: 12, m: 3 }, // lunch out
  { h: 13, m: 1 }, // lunch back
  { h: 18, m: 7 }, // punch out  ← will be auto-adjusted
];

// Apply random offsets to first 3 punches independently
const t0 = addMinutes(BASE[0].h, BASE[0].m, randomOffset()); // punch in
const t1 = addMinutes(BASE[1].h, BASE[1].m, randomOffset()); // lunch out
const t2 = addMinutes(BASE[2].h, BASE[2].m, randomOffset()); // lunch back

// Calculate how many minutes were "lost" at lunch
const lunchMinutes = diffMinutes(t1, t2);

// Last punch = punch-in + 8h + lunch duration, so net work = exactly 8h
const t3 = addMinutes(t0.h, t0.m, WORK_MINUTES + lunchMinutes);

const TARGET_TIMES = [t0, t1, t2, t3];

TARGET_TIMES.forEach((t, i) => {
  const labels = ['Punch in', 'Lunch out', 'Lunch back', 'Punch out'];
  log('info', `${labels[i]} scheduled at ${String(t.h).padStart(2,'0')}:${String(t.m).padStart(2,'0')}`);
});

// Sanity check
const netWork = diffMinutes(t0, t3) - lunchMinutes;
log('info', `Total work time: ${Math.floor(netWork / 60)}h ${netWork % 60}min`);

let lastRunKey = null;

function checkSchedule() {
  const now = new Date();
  const hh = now.getHours();
  const mm = now.getMinutes();
  const key = `${hh.toString().padStart(2,'0')}:${mm.toString().padStart(2,'0')}`;

  if (key === lastRunKey) return;

  const match = TARGET_TIMES.find(t => t.h === hh && t.m === mm);
  if (match) {
    lastRunKey = key;
    log('info', `Scheduled trigger matched at ${key}`);
    doPunch();
  }
}

log('info', `Script loaded. Scheduled times: ${TARGET_TIMES.map(t =>
  `${t.h.toString().padStart(2,'0')}:${t.m.toString().padStart(2,'0')}`
).join(', ')}. Polling every 10s.`);

injectManualButton();
setInterval(checkSchedule, 10 * 1000);
})();