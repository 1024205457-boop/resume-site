// ============================================================
// 0. 页面导航切换
// ============================================================
(function () {
  const tabs = document.querySelectorAll('.top-nav__tab');
  const pages = document.querySelectorAll('.page');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.page;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      pages.forEach(p => {
        p.classList.toggle('active', p.id === 'page-' + target);
      });
      window.scrollTo(0, 0);
      // Directly show all reveal elements on the active page
      document.querySelectorAll('#page-' + target + ' .reveal').forEach(el => {
        el.classList.add('visible');
      });
    });
  });
})();

// ============================================================
// 1. 项目详情弹层
// ============================================================
(function () {
  const modal = document.querySelector('#project-detail');
  if (!modal) return;

  const projects = {
    minmin: {
      category: 'L3 · 决策型智能体',
      title: '敏敏肌选品导购智能体',
      media: { label: '护肤导购 Demo' },
      audience: '敏感肌用户、护肤导购、成分安全关注者',
      summary: '把护肤品导购从“主观推荐”改造成“成分事实 + 风险规则 + 肤质建议”的决策流程。',
      role: '设计功效需求解析、成分风险筛查、知识库检索和结构化报告输出规则。',
      intro: '用户只输入美白、祛痘、抗老、保湿等功效需求，智能体会检索对应核心成分和产品信息，再逐一筛查 MIT/CMIT、甲醛释放体、前排香精、变性酒精、SLS/SLES、BHT、视黄醇、水杨酸等风险点，最后输出产品对比表、风险提示、肤质建议和成分科普。',
      demo: '展示位支持上传知识库截图、对话输出截图或完整导购流程录屏；当前保留镏金封面，便于后续替换真实素材。'
    },
    zebra: {
      category: 'L3 · 决策型智能体',
      title: '某头部教育品牌智能学习顾问',
      media: { label: '学习顾问流程' },
      audience: '体验会员、家长、学习顾问和转化运营团队',
      summary: '用 AI 顾问承接体验会员的学习跟进、答疑和转化线索，提高服务连续性。',
      role: '梳理体验会员链路，拆解到课提醒、学情反馈、课程推荐、购买答疑等服务节点。',
      intro: '项目围绕体验课后的关键转化场景，把原本分散在人工顾问经验里的服务动作沉淀为可复用流程：先判断用户阶段和问题类型，再给出学习反馈、课程建议或购买解释，减少回复口径不一致和跟进遗漏。',
      demo: '展示位支持上传用户旅程图、顾问对话样例、意图分类表或服务流程图；对外只保留脱敏项目名，不出现真实品牌。'
    },
    chart: {
      category: 'L3 · 决策型智能体',
      title: '可视化桌面研究智能体',
      media: { label: '研究可视化' },
      audience: '咨询分析师、产品经理、行业研究和竞品研究使用者',
      summary: '把桌面研究材料提炼为可视化观点结构，让图表成为研究结论的表达载体。',
      role: '设计研究问题理解、材料结构化、观点提炼、可视化结构选择和结果校验流程。',
      intro: '项目不是图表生成工具，而是面向桌面研究场景：用户输入研究目标、行业材料或竞品信息后，智能体先识别关键变量、关系和判断框架，再选择定位图、象限图、漏斗图、桑基图等视觉结构承载结论，帮助使用者更快形成可汇报、可讨论的研究表达。',
      demo: '展示位支持上传研究输入、观点结构、可视化结果和交互录屏，重点呈现从材料到研究结论的完整链路。'
    },
    content: {
      category: 'L2 · 业务流程自动化',
      title: '私域内容生产',
      media: { label: '内容生产看板' },
      audience: '私域运营、品牌内容团队、社群转化负责人',
      summary: '把私域文案和图片生成拆成可复用、可审核、可控频的内容生产流程。',
      role: '设计事实输入、批量生成、审核门、去重、渠道适配和频控规则。',
      intro: '项目解决私域内容生产慢、风格不稳定、重复投放和审核成本高的问题。流程先收集商品或活动事实，再批量生成候选内容，通过审核规则过滤风险表达，最后按渠道格式输出。',
      demo: '展示位支持上传内容生产表格、生成结果对比、审核规则和批量处理录屏。'
    },
    training: {
      category: 'L2 · 业务流程自动化',
      title: '小捞陪练｜海底捞服务话术陪练',
      media: { label: '移动端陪练' },
      audience: '餐饮新人、门店培训负责人、一线服务团队',
      summary: '用移动端角色扮演陪练降低新人服务话术训练对人工带教的依赖。',
      role: '设计服务员场景、顾客角色、话术反馈和移动端 Demo 交互。',
      intro: '项目围绕海底捞新人岗前服务训练，模拟真实门店顾客提问和服务冲突场景。新人通过对话练习服务话术，系统给出反馈和纠偏建议，帮助培训流程从一次性讲解变成可反复练习的陪练体验。',
      demo: '已有在线 Demo；展示位支持上传移动端操作录屏、服务场景截图和反馈页截图。'
    },
    dataops: {
      category: 'L2 · 业务流程自动化',
      title: '数据更新工作流',
      media: { label: '数据更新链路' },
      audience: '运营分析、数据看板维护者、周期报表负责人',
      summary: '把周期报表更新从手工搬运改造成可校验的数据处理流程。',
      role: '设计来源校验、字段清洗、受控写入、异常说明和回读检查。',
      intro: '项目面向固定周期的数据更新任务，重点解决字段来源不稳定、人工复制容易出错、更新后缺少验证的问题。流程会先确认数据来源和字段映射，再清洗写入目标表，最后回读关键字段检查结果。',
      demo: '展示位支持上传数据源示例、更新前后对比、异常提示和自动化运行截图。'
    },
    frame: {
      category: 'L4 · 陪伴与社区体验',
      title: '帧我：多模态情绪陪伴',
      media: { label: '情绪识别体验' },
      audience: '需要情绪记录、情绪卸载和轻陪伴体验的年轻用户',
      summary: '用表情、语音和文本识别承接用户即时情绪表达，形成轻陪伴反馈。',
      role: '设计多模态输入、情绪识别链路、反馈交互和陪伴型产品体验。',
      intro: '项目关注用户情绪难表达、难被即时接住的问题。用户可以通过文本、语音或表情输入当前状态，产品识别情绪后给出反馈和记录，帮助用户完成情绪卸载和自我观察。',
      demo: '展示位支持上传 App 页面截图、情绪识别流程图、输入输出对比和短视频演示。'
    },
    birdcircle: {
      category: 'L4 · 陪伴与社区体验',
      title: '鸟有圈：观鸟兴趣社区',
      media: { label: '观鸟社区原型' },
      audience: '观鸟爱好者、自然观察用户、兴趣社群成员',
      summary: '围绕观鸟记录、兴趣交流和 AI 陪伴，构建小众兴趣社区的持续参与机制。',
      role: '设计用户记录、社区互动、AI 陪伴和兴趣人群体验路径。',
      intro: '项目面向观鸟这一小众但高黏性的兴趣场景，解决用户记录分散、交流弱和持续参与不足的问题。产品通过观察记录、社区内容和陪伴式互动，让兴趣行为从个人记录延伸到社群连接。',
      demo: '展示位支持上传社区首页、观鸟记录页、AI 陪伴对话和用户路径图。'
    },
    busycall: {
      category: 'L4 · 陪伴与社区体验',
      title: '真的很忙',
      media: { label: '来电模拟 Demo' },
      audience: '远程办公用户、会议高频用户、需要轻量脱身场景的人',
      summary: '用高仿真来电模拟解决线上会议难以自然离场的轻量痛点。',
      role: '定义用户痛点、设计高仿真来电交互，并完成快速原型上线。',
      intro: '项目从一个非常具体的社交尴尬场景切入：用户需要从会议或对话中自然脱身，但不想直接打断。产品通过模拟真实来电界面和触发流程，提供低成本、即时可用的社交缓冲工具。',
      demo: '展示位支持上传来电界面截图、触发流程录屏和移动端效果图。'
    }
  };

  const fields = {
    category: modal.querySelector('#project-detail-category'),
    title: modal.querySelector('#project-detail-title'),
    media: modal.querySelector('#project-detail-media'),
    audience: modal.querySelector('#project-detail-audience'),
    summary: modal.querySelector('#project-detail-summary'),
    role: modal.querySelector('#project-detail-role'),
    intro: modal.querySelector('#project-detail-intro'),
    demo: modal.querySelector('#project-detail-demo'),
    github: modal.querySelector('#project-detail-github')
  };

  function renderMedia(project) {
    const media = project.media || {};
    const label = media.label || '项目展示';
    fields.media.innerHTML = '';

    if (media.src && media.type === 'video') {
      const video = document.createElement('video');
      video.src = media.src;
      video.controls = true;
      video.playsInline = true;
      video.poster = media.poster || '';
      video.setAttribute('aria-label', label);
      fields.media.appendChild(video);
      return;
    }

    if (media.src) {
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = label;
      fields.media.appendChild(img);
      return;
    }

    const fallback = document.createElement('div');
    fallback.className = 'project-modal__media-fallback';
    fallback.textContent = label;
    fields.media.appendChild(fallback);
  }

  function openProject(card) {
    const project = projects[card.dataset.project];
    if (!project) return;
    fields.category.textContent = project.category;
    fields.title.textContent = project.title;
    renderMedia(project);
    fields.audience.textContent = project.audience;
    fields.summary.textContent = project.summary;
    fields.role.textContent = project.role;
    fields.intro.textContent = project.intro;
    fields.demo.textContent = project.demo;

    const github = card.dataset.github;
    if (github) {
      fields.github.href = github;
      fields.github.textContent = '查看 GitHub';
      fields.github.classList.remove('is-disabled');
    } else {
      fields.github.href = '#';
      fields.github.textContent = '项目资料整理中';
      fields.github.classList.add('is-disabled');
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', event => {
      event.preventDefault();
      openProject(card);
    });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(card);
      }
    });
  });

  modal.querySelectorAll('[data-project-close]').forEach(control => {
    control.addEventListener('click', closeProject);
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeProject();
    }
  });
})();

// ============================================================
// 2. 风格切换
// ============================================================
(function () {
  const btns = document.querySelectorAll('.theme-btn');
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    btns.forEach(b => b.classList.toggle('active', b.dataset.theme === saved));
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();

// ============================================================
// 3. 金色光尘粒子（Hero区域）
// ============================================================
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'dust';
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;';
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
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
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--color-accent').trim() || '#C9A84C';
      // Extract RGB from hex
      let r = 201, g = 168, b = 76;
      if (accent.startsWith('#')) {
        r = parseInt(accent.slice(1, 3), 16);
        g = parseInt(accent.slice(3, 5), 16);
        b = parseInt(accent.slice(5, 7), 16);
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha * fade})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Dust());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================================
// 4. Hero文字逐字显现
// ============================================================
(function () {
  const name = document.querySelector('.hero__name');
  if (!name) return;
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
  setTimeout(typeChar, 300);
})();

// ============================================================
// 5. 滚动渐入动画
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
// 6. Hero 滚动视差
// ============================================================
(function () {
  const hero = document.querySelector('.hero__inner');
  const scroll = document.querySelector('.hero__scroll');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.transform = `translateY(${y * 0.2}px)`;
      hero.style.opacity = 1 - y / (window.innerHeight * 0.7);
      if (scroll) scroll.style.opacity = 1 - y / 200;
    }
  });
})();
