// 简历页逻辑
(function () {
  let baseRendered = false;

  function getCompanyId() {
    return location.hash.slice(1) || 'visitor';
  }

  function findCompany(id) {
    return COMPANIES.find(c => c.id === id) || COMPANIES.find(c => c.id === 'visitor');
  }

  // 应用公司主题色
  function applyTheme(company) {
    document.documentElement.style.setProperty('--color-accent', company.accentColor);
    document.documentElement.style.setProperty('--color-accent-light',
      company.accentColor + '14');
    document.documentElement.style.setProperty('--color-accent-medium',
      company.accentColor + '25');
  }

  // 渲染通用基础简历（只执行一次）
  function renderBase() {
    if (baseRendered) return;
    baseRendered = true;

    const data = RESUME_DATA;

    // 联系方式
    const contactEl = document.getElementById('contactInfo');
    contactEl.textContent = `${data.contact.email} | ${data.contact.phone} | ${data.contact.availability}`;

    // 教育经历
    const eduSection = document.getElementById('educationSection');
    eduSection.appendChild(Renderer.renderSectionTitle('教育经历'));
    data.education.forEach(edu => {
      eduSection.appendChild(Renderer.renderEduCard(edu));
    });

    // 个人技能
    const skillsSection = document.getElementById('skillsSection');
    skillsSection.appendChild(Renderer.renderSectionTitle('个人技能'));
    data.skills.forEach(skill => {
      skillsSection.appendChild(Renderer.renderSkillGroup(skill));
    });

    // 实习经历
    const expSection = document.getElementById('experienceSection');
    expSection.appendChild(Renderer.renderSectionTitle('实习经历'));
    data.experience.forEach(exp => {
      expSection.appendChild(Renderer.renderExpCard(exp));
    });

    // 项目经历
    const projSection = document.getElementById('projectsSection');
    projSection.appendChild(Renderer.renderSectionTitle('项目经历'));
    data.projects.forEach(proj => {
      projSection.appendChild(Renderer.renderProjectCard(proj));
    });
  }

  // 渲染公司定制区（每次切换公司重新渲染）
  function renderCompanySection(company) {
    // Banner
    const bannerEl = document.getElementById('companyBanner');
    bannerEl.innerHTML = '';
    const banner = Renderer.renderCompanyBanner(company);
    if (banner) bannerEl.appendChild(banner);

    // 产品分析
    const analysisEl = document.getElementById('analysisSection');
    analysisEl.innerHTML = '';
    const analysis = Renderer.renderAnalysis(company);
    if (analysis) analysisEl.appendChild(analysis);

    // 更新页面标题
    if (company.id !== 'visitor') {
      document.title = `简历 - 姜慧男 | ${company.name}`;
    } else {
      document.title = '简历 - 姜慧男';
    }
  }

  // 主渲染函数
  function render() {
    const companyId = getCompanyId();
    const company = findCompany(companyId);

    applyTheme(company);
    renderBase();
    renderCompanySection(company);

    // 启动/重新启动滚动渐入
    Renderer.observeFadeIn();
  }

  // 初始渲染
  render();

  // 监听 hash 变化（公司切换）
  window.addEventListener('hashchange', render);
})();
