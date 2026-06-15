// ============================================================
// 1. 金色光尘粒子（Hero区域）
// ============================================================
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'dust';
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;';
  document.querySelector('.hero').appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    const hero = document.querySelector('.hero');
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Dust {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = -Math.random() * 0.3 - 0.1;
      this.radius = Math.random() * 2 + 0.8;
      this.alpha = Math.random() * 0.6 + 0.3;
      this.life = Math.random() * 200 + 100;
      this.age = 0;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.age++;
      if (this.age > this.life || this.y < 0) this.reset();
    }
    draw() {
      const fade = 1 - this.age / this.life;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${this.alpha * fade})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Dust());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================================
// 2. Hero文字逐字显现
// ============================================================
(function () {
  const name = document.querySelector('.hero__name');
  const text = name.textContent;
  name.textContent = '';
  name.style.visibility = 'visible';

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.opacity = '0';
      span.style.animation = `fadeInChar 0.5s ease forwards`;
      span.style.animationDelay = `${i * 0.15}s`;
      name.appendChild(span);
      i++;
      setTimeout(typeChar, 150);
    }
  }
  setTimeout(typeChar, 500);
})();

// ============================================================
// 3. 卡片hover光线扫过
// ============================================================
(function () {
  document.querySelectorAll('.strength-card').forEach(card => {
    const shine = document.createElement('div');
    shine.className = 'shine-effect';
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(shine);

    card.addEventListener('mouseenter', () => {
      shine.style.animation = 'none';
      void shine.offsetWidth; // reflow
      shine.style.animation = 'shineSweep 0.6s ease forwards';
    });
  });
})();

// ============================================================
// 4. 滚动渐入动画
// ============================================================
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ============================================================
// 5. Tagline 打字机效果 + 光标
// ============================================================
(function () {
  const tagline = document.querySelector('.hero__tagline');
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.classList.add('typing-cursor');

  let i = 0;
  function type() {
    if (i < text.length) {
      tagline.textContent += text[i];
      i++;
      setTimeout(type, 60);
    } else {
      // 打完后光标闪烁3秒后消失
      setTimeout(() => tagline.classList.remove('typing-cursor'), 3000);
    }
  }
  setTimeout(type, 2000); // 等名字显现完再开始打
})();

// ============================================================
// 6. Hero 滚动视差（加强版）
// ============================================================
(function () {
  const hero = document.querySelector('.hero__inner');
  const scroll = document.querySelector('.hero__scroll');
  const cards = document.querySelectorAll('.strength-card');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Hero视差
    if (y < window.innerHeight) {
      hero.style.transform = `translateY(${y * 0.2}px)`;
      hero.style.opacity = 1 - y / (window.innerHeight * 0.7);
      if (scroll) scroll.style.opacity = 1 - y / 200;
    }

    // 卡片微视差：每张卡片以略不同的速度移动
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (rect.top - window.innerHeight / 2) * (0.02 + index * 0.01);
        card.style.transform = `translateY(${offset}px)`;
      }
    });
  });
})();
