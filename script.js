// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav--open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('nav--open'));
});

// Terminal typing effect
const lines = [
  { prompt: '$ ', text: 'whoami', delay: 30 },
  { prompt: '', text: 'mike-philippakis — bioinformatician', delay: 15, dim: true },
  { prompt: '$ ', text: 'cat focus.txt', delay: 30 },
  { prompt: '', text: 'genomics pipelines, sequence analysis, comp bio', delay: 15, dim: true },
  { prompt: '$ ', text: './say-hello.sh', delay: 30 },
  { prompt: '', text: 'thanks for stopping by. scroll down ↓', delay: 15, dim: true },
];

const body = document.getElementById('terminalBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function typeLine(prompt, text, delay) {
  const lineEl = document.createElement('div');
  if (prompt) {
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = prompt;
    lineEl.appendChild(promptSpan);
  }
  const textSpan = document.createElement('span');
  lineEl.appendChild(textSpan);
  body.appendChild(lineEl);

  if (reduceMotion) {
    textSpan.textContent = text;
    return;
  }
  for (const char of text) {
    textSpan.textContent += char;
    await new Promise(r => setTimeout(r, delay));
  }
}

async function runTerminal() {
  for (const line of lines) {
    await typeLine(line.prompt, line.text, line.delay);
    await new Promise(r => setTimeout(r, 250));
  }
  const caret = document.createElement('span');
  caret.className = 'caret';
  body.appendChild(caret);
}

// Only run once, when hero scrolls into view
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    runTerminal();
    observer.disconnect();
  }
}, { threshold: 0.3 });
observer.observe(document.querySelector('.terminal'));
