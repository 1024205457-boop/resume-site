// 首页逻辑
(function () {
  // 填入 tagline
  const taglineEl = document.querySelector('.hero__tagline');
  if (taglineEl) taglineEl.textContent = RESUME_DATA.tagline;

  // 渲染公司卡片
  const grid = document.getElementById('companyGrid');

  COMPANIES.forEach(company => {
    const card = document.createElement('a');
    card.href = `resume.html#${company.id}`;
    card.className = 'company-card fade-in';

    if (company.id === 'visitor') {
      card.classList.add('company-card--visitor');
    }

    // 设置公司强调色
    card.style.setProperty('--card-accent', company.accentColor);

    const name = Renderer.el('div', 'company-card__name', company.name);
    card.appendChild(name);

    if (company.nameEn && company.id !== 'visitor') {
      card.appendChild(Renderer.el('div', 'company-card__name-en', company.nameEn));
    }

    card.appendChild(Renderer.el('div', 'company-card__position', company.targetPosition));

    grid.appendChild(card);
  });

  // 启动滚动渐入
  Renderer.observeFadeIn();
})();
