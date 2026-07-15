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
      category: 'L3 · 决策与研究智能体',
      title: '敏敏肌选品导购智能体',
      media: { label: '护肤导购 Demo' },
      audience: '敏感肌用户、护肤导购、成分安全关注者',
      summary: '把海外护肤品选购从“凭经验看成分”改造成“需求解析 + RAG 检索 + 风险规则”的导购决策流程。',
      role: '定义成分党与敏感肌痛点，设计功效需求解析、知识库结构、Prompt 规则和微信小程序交付路径。',
      intro: '项目来自腾讯云 Agent Mini-hackathon。用户提出美白、祛痘、抗老、保湿等功效需求后，Agent 基于腾讯元器知识库检索成分和产品事实，结合敏感肌风险规则给出推荐、避雷提示和成分解释。项目重点不是泛泛推荐，而是把“海外护肤品成分核验难”转成可追溯、可解释的导购流程。',
      demo: '展示位支持上传知识库截图、对话输出截图或完整导购流程录屏；当前保留镏金封面，便于后续替换真实素材。'
    },
    zebra: {
      category: 'L3 · 决策与研究智能体',
      title: '某头部教育品牌智能学习顾问',
      media: { label: '学习顾问流程' },
      audience: '体验会员、家长、学习顾问和转化运营团队',
      summary: '用 AI 顾问承接体验会员的学习跟进、答疑和转化线索，提高服务连续性。',
      role: '梳理体验会员链路，拆解到课提醒、学情反馈、课程推荐、购买答疑等服务节点。',
      intro: '项目围绕体验课后的关键转化场景，把原本分散在人工顾问经验里的服务动作沉淀为可复用流程：先判断用户阶段和问题类型，再给出学习反馈、课程建议或购买解释，减少回复口径不一致和跟进遗漏。',
      demo: '展示位支持上传用户旅程图、顾问对话样例、意图分类表或服务流程图；对外只保留脱敏项目名，不出现真实品牌。'
    },
    chart: {
      category: 'L3 · 决策与研究智能体',
      title: '可视化桌面研究智能体',
      media: { label: '研究可视化' },
      audience: '咨询分析师、产品经理、行业研究和竞品研究使用者',
      summary: '把桌面研究从“手工整理材料”改造成“Brief 解析 + 数据采集 + 框架分析 + 三元校验 + HTML 报告”的可运行 Pipeline。',
      role: '设计 6 阶段研究 Pipeline、三元校验规则、黄金评测集和 Jinja2 可视化洞察报告模板。',
      intro: '项目不是图表生成工具，而是 AI 辅助市场研究工作流。系统读取研究 Brief 和样例舆情数据后，完成研究设计、数据加载、框架化分析、源/交叉/逻辑三元校验，并生成含用户画像、痛点、决策路径和策略建议的 HTML 报告。Demo 指标包括洞察有源率 100%、平均 MOS 3.9+，适合展示“研究产出如何可追溯、可评测”。',
      demo: '已有本地 Demo 和样例报告：assets/demos/mrw-demo.html、assets/reports/mrw-sample-report.html；展示位后续可替换为运行录屏或报告截图。'
    },
    content: {
      category: 'L2 · 业务流程自动化',
      title: '私域内容生产',
      media: { label: '内容生产看板' },
      audience: '私域运营、品牌内容团队、社群转化负责人',
      summary: '把私域文案与素材生产从“多人手工产出”改造成“主题规划 + 批量生成 + 审核去重 + 渠道适配”的流程。',
      role: '设计主题循环、时令感知、历史去重 Prompt 策略，并串联文案生成、图生图素材和审核输出。',
      intro: '项目来自教育业务私域运营场景。原流程每周需要多人持续产出文案和导购素材；我将内容生产拆成事实输入、主题循环、7 天 × 3 渠道批量生成、历史去重、风险审核和渠道格式输出，并接入大模型 API 与图生图工具，减少重复人工和风格不稳定问题。',
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
      summary: '把周报和漏斗数据更新从 2-3 小时手工处理改造成分钟级的多源采集清洗流程。',
      role: '梳理 4 大业务模块和 15 个功能的数据流向，设计转化漏斗、字段映射、清洗规则和标准化周报输出。',
      intro: '项目来自教育业务增长运营场景。原先周报数据分散在 Pipe、Mario、Dora、BI 等多数据源，人工复制和清洗耗时且容易出错。我将加微 UV、领取 UV、激活 UV、购买等关键节点整理成转化漏斗，并把采集、清洗、字段归一和周报输出沉淀为可复用流程。',
      demo: '展示位支持上传数据源示例、更新前后对比、异常提示和自动化运行截图。'
    },
    frame: {
      category: 'L4 · 陪伴与社区体验',
      title: '帧我：多模态情绪发泄与记录',
      media: { label: '情绪识别体验' },
      audience: '需要情绪卸载、情绪记录和低门槛自我观察的年轻用户',
      summary: '用对话生成发泄对象，并通过语音、表情和文本形成多模态情绪记录。',
      role: '定义情绪卸载切入点，设计多模态情绪识别、Prompt 引导、memory 管理和游戏化发泄体验。',
      intro: '项目来自抖音 AI 创变者跨年黑客松。产品不是单纯聊天陪伴，而是“情绪发泄 + 情绪记录”双模式：用户用短文本或对话表达情绪，AI 提取情绪对象并生成可互动的发泄内容；记录模式结合语音语调、面部表情和文本语义做情绪识别，再生成情绪手账和建议。路演时获得 2 家孵化器支持，200+ 观众中 69 人愿意试用。',
      demo: '展示位支持上传 App 页面截图、情绪识别流程图、输入输出对比和短视频演示。'
    },
    birdcircle: {
      category: 'L4 · 陪伴与社区体验',
      title: '鸟有圈：AI 观鸟记录工具',
      media: { label: '地图鸟讯 + AI 识鸟' },
      audience: '观鸟新人、自然观察用户、拍鸟和记录型兴趣用户',
      summary: '把找鸟、识鸟、生成鸟讯和照片归档串成一条观鸟记录闭环。',
      role: '设计地图鸟点发现、照片上传识别、鸟讯生成、按鸟种归档、积分激励和敏感物种保护机制。',
      intro: '项目最新版本在 GitHub birdcircle。产品基于地图鸟讯与 AI 相册解决四个痛点：新人不知道附近哪里能看鸟、遇到鸟不会识别、照片散落在手机相册里、鸟讯和照片整理割裂。核心链路是发现附近鸟点 → 上传照片和位置 → AI 初步识鸟 → 生成鸟讯 → 同步到相册 → 获得积分。技术上使用 Leaflet + 高德地图瓦片、百度 AI 图像识别代理、JSZip 相册导出，并为敏感物种、夜行鸟类和繁殖地设计坐标模糊与导航限制。',
      demo: 'GitHub 已包含 birdcircle.html、app.py、proxy.py、鸟种图片和 README；展示位后续可上传地图页、上传识别页、相册归档页和保护机制截图。'
    },
    busycall: {
      category: 'L4 · 陪伴与社区体验',
      title: '真的很忙',
      media: { label: '来电模拟 Demo' },
      audience: '远程办公用户、会议高频用户、需要轻量脱身场景的人',
      summary: '用高仿真来电模拟解决线上会议难以自然离场的轻量痛点。',
      role: '通过 4 场用户访谈定义痛点，参考微信来电弹窗设计交互，并用 Cursor 快速完成上线。',
      intro: '项目来自清华 Vibe Coding 黑客松。它从“线上会议难以优雅离场”这个高频小痛点切入，通过高仿真来电界面和快速触发流程，给用户一个自然离场的社交缓冲。项目 3 小时内完成开发上线，积累 300+ 用户，并在小红书获得 6w+ 关注。',
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
