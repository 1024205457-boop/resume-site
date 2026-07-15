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
      category: 'AI Agent 产品',
      title: '敏敏肌选品｜护肤搜索导购 Agent',
      media: { label: '成分安全筛查' },
      audience: '有功效诉求的护肤用户、敏感肌/痘肌/孕期等需避险人群、导购顾问',
      summary: '把“我想美白/祛痘/抗老/修护”这类模糊需求，转成可检索、可筛查、可排序的护肤选品决策报告。',
      role: '设计 Agent Prompt、知识库字段和输出结构，拆解需求解析、核心功效成分匹配、产品检索、成分风险召回、推荐排序和多轮追问规则。',
      intro: '项目来自腾讯云 Agent Mini-hackathon。用户只输入功效需求时，Agent 直接按普通肌肤给出初筛推荐；如果补充肤质、过敏史、孕期/哺乳期、刷酸期或“不想要酒精/香精”等限制，则优先转成筛选条件。系统会围绕烟酰胺、熊果苷、VC、传明酸、水杨酸、神经酰胺、泛醇、视黄醇等核心成分检索 3-5 个产品，并基于完整成分表检查 MIT/CMIT、甲醛释放体、高排位香精、高排位变性酒精、SLS/SLES、人工色素、BHT、精油、A 醇和酸类等风险。最终输出推荐优先级表、逐个产品分析、肤质适配建议、成分科普和下一步可追问方向，避免编造价格、库存、销量或未披露成分。',
      demo: '已接入电商导购体验短链接，可直接体验从消费需求到商品推荐、对比和风险提示的导购流程；完整 Prompt 和方法库仍保留在 AI Product Skills 的 RAG 导购目录。'
    },
    zebra: {
      category: 'AI Agent 产品',
      title: '某头部教育品牌智能学习顾问',
      media: { label: '学习顾问流程' },
      audience: '体验会员、家长、学习顾问和转化运营团队',
      summary: '用 AI 顾问承接体验会员的学习跟进、答疑和转化线索，提高服务连续性。',
      role: '梳理体验会员链路，拆解到课提醒、学情反馈、课程推荐、购买答疑等服务节点。',
      intro: '项目围绕体验课后的关键转化场景，把原本分散在人工顾问经验里的服务动作沉淀为可复用流程：先判断用户阶段和问题类型，再给出学习反馈、课程建议或购买解释，减少回复口径不一致和跟进遗漏。',
      demo: '展示位支持上传用户旅程图、顾问对话样例、意图分类表或服务流程图；对外只保留脱敏项目名，不出现真实品牌。'
    },
    chart: {
      category: 'AI Agent 产品',
      title: 'Chart AI｜桌面研究可视化智能体',
      media: { label: '研究 → 图表' },
      audience: '咨询分析师、产品经理、行业研究和竞品研究使用者',
      summary: '把“我要表达一个商业判断”转成可选择图表模型、可补充桌面研究、可校验字段来源的结构化可视化生成流程。',
      role: '设计 Chart-AI 产品链路、图表模型库、图表推荐规则、Agent 进度状态、硬规则校验和字段来源追溯。',
      intro: '项目是一个独立的 Next.js 可视化智能体原型。用户输入业务问题、文字材料或表格数据后，系统先理解分析目标并推荐图表模型，再根据定位图、雷达图、热力地图、漏斗图、桑基图、流程图、维恩图等模型生成结构化图表数据；当本地数据不足时，会调用桌面研究模块补充咨询/行业来源线索，并在生成后检查图表类型、字段映射、数值范围和结构完整性。它和 Market Research Workflow 可以捏在一起：MRW 负责从 Brief 到洞察报告的研究主链路，Chart-AI 负责把研究结论转成可编辑、可追溯的图表表达。',
      demo: '当前可放 Chart-AI 运行录屏、图表模型选择页、字段来源面板和生成结果截图；MRW 的样例报告可作为“研究结论进入可视化表达”的延展 Demo。'
    },
    content: {
      category: 'AI 工作流自动化',
      title: '私域 7 天内容批量生产工作流',
      media: { label: '7 天 × 3 渠道' },
      audience: '私域运营、品牌内容团队、社群转化负责人',
      summary: '把每周 3 天人工写私域文案和导购素材的流程，改造成 7 天 × 3 渠道 × 主题循环的批量生成与审核工作流。',
      role: '设计主题循环、时令感知、历史去重 Prompt 策略，接入大模型生成 63 条渠道文案，并对接图生图工具批量生成导购卡和配图。',
      intro: '项目来自私域增长运营场景。原流程需要多人按周产出社群、朋友圈和导购触达内容，口径容易重复、风格不稳定、审核成本高。我将流程拆成事实输入、主题排期、7 天 × 3 渠道批量文案、历史内容去重、风险审核、图生图素材生成和渠道格式输出，形成“生成 → 审核 → 推送”的闭环，让私域运营从临时写稿转成可复用的内容生产线。',
      demo: '展示位支持放 7 天内容排期表、63 条文案生成样例、历史去重规则、图生图素材对比和审核流程录屏。'
    },
    training: {
      category: 'AI 工作流自动化',
      title: '小捞陪练｜餐饮服务话术陪练',
      media: { label: '移动端陪练' },
      audience: '餐饮新人、门店培训负责人、一线服务团队',
      summary: '用移动端角色扮演陪练降低新人服务话术训练对人工带教的依赖。',
      role: '设计服务员场景、顾客角色、话术反馈和移动端 Demo 交互。',
      intro: '项目围绕头部餐饮品牌新人岗前服务训练，模拟真实门店顾客提问和服务冲突场景。新人通过对话练习服务话术，系统给出反馈和纠偏建议，帮助培训流程从一次性讲解变成可反复练习的陪练体验。',
      demo: '已有在线 Demo；展示位支持上传移动端操作录屏、服务场景截图和反馈页截图。'
    },
    dataops: {
      category: 'AI 工作流自动化',
      title: '增长周报数据自动更新工作流',
      media: { label: '加微 → 购买漏斗' },
      audience: '运营分析、数据看板维护者、周期报表负责人',
      summary: '把增长周报中分散在多套业务后台和数据看板的多源数据，整理成加微 UV → 领取 UV → 激活 UV → 购买的标准转化漏斗。',
      role: '梳理 4 大业务模块和 15 个功能的数据流向，设计字段映射、清洗规则、异常提示、漏斗口径和标准化周报输出。',
      intro: '项目来自增长运营场景。原先运营周报需要在多套业务后台和数据看板之间手工复制数据，再清洗成可汇报口径，单次更新耗时 2-3 小时且容易漏字段。我将加微 UV、领取 UV、激活 UV、购买等关键节点抽象为统一漏斗，沉淀字段映射、来源校验、清洗规则和回读检查，把周期性更新压缩到分钟级，并让运营能稳定复用同一套口径分析流失。',
      demo: '展示位支持放多数据源字段表、加微到购买漏斗样例、更新前后耗时对比、异常提示和自动化运行截图。'
    },
    frame: {
      category: 'AI 陪伴与社区产品',
      title: '帧我：多模态情绪发泄与记录',
      media: { label: '情绪识别体验' },
      audience: '需要情绪卸载、情绪记录和低门槛自我观察的年轻用户',
      summary: '用对话生成发泄对象，并通过语音、表情和文本形成多模态情绪记录。',
      role: '定义情绪卸载切入点，设计多模态情绪识别、Prompt 引导、memory 管理和游戏化发泄体验。',
      intro: '项目来自抖音 AI 创变者跨年黑客松。产品不是单纯聊天陪伴，而是“情绪发泄 + 情绪记录”双模式：用户用短文本或对话表达情绪，AI 提取情绪对象并生成可互动的发泄内容；记录模式结合语音语调、面部表情和文本语义做情绪识别，再生成情绪手账和建议。路演时获得 2 家孵化器支持，200+ 观众中 69 人愿意试用。',
      demo: '展示位支持上传 App 页面截图、情绪识别流程图、输入输出对比和短视频演示。'
    },
    birdcircle: {
      category: 'AI 陪伴与社区产品',
      title: '鸟有圈：AI 观鸟记录工具',
      media: { label: '地图鸟讯 + AI 识鸟' },
      audience: '观鸟新人、自然观察用户、拍鸟和记录型兴趣用户',
      summary: '把找鸟、识鸟、生成鸟讯和照片归档串成一条观鸟记录闭环。',
      role: '设计地图鸟点发现、照片上传识别、鸟讯生成、按鸟种归档、积分激励和敏感物种保护机制。',
      intro: '项目最新版本在 GitHub birdcircle。产品基于地图鸟讯与 AI 相册解决四个痛点：新人不知道附近哪里能看鸟、遇到鸟不会识别、照片散落在手机相册里、鸟讯和照片整理割裂。核心链路是发现附近鸟点 → 上传照片和位置 → AI 初步识鸟 → 生成鸟讯 → 同步到相册 → 获得积分。技术上使用 Leaflet + 高德地图瓦片、百度 AI 图像识别代理、JSZip 相册导出，并为敏感物种、夜行鸟类和繁殖地设计坐标模糊与导航限制。',
      demo: 'GitHub 已包含 birdcircle.html、app.py、proxy.py、鸟种图片和 README；展示位后续可上传地图页、上传识别页、相册归档页和保护机制截图。'
    },
    busycall: {
      category: 'AI 陪伴与社区产品',
      title: '真的很忙',
      media: { label: '来电模拟 Demo' },
      audience: '远程办公用户、会议高频用户、需要轻量脱身场景的人',
      summary: '用高仿真来电模拟解决线上会议难以自然离场的轻量痛点。',
      role: '通过 4 场用户访谈定义痛点，参考微信来电弹窗设计交互，并用 Cursor 快速完成上线。',
      intro: '项目来自清华 Vibe Coding 黑客松。它从“线上会议难以优雅离场”这个高频小痛点切入，通过高仿真来电界面和快速触发流程，给用户一个自然离场的社交缓冲。项目 3 小时内完成开发上线，积累 300+ 用户，并在小红书获得 6w+ 关注。',
      demo: '展示位支持上传来电界面截图、触发流程录屏和移动端效果图。'
    },
    invoice: {
      category: '更多项目 · 业务工具',
      title: '发票金额填报与汇总工具',
      media: { label: '发票填报 Demo' },
      audience: '食堂采购、财务对账人员、项目负责人和月度汇总维护者',
      summary: '把多供应商、多用餐类别的发票金额录入和月度汇总做成无需后端的本地网页工具。',
      role: '梳理供应商项目、食材维护、日期筛选、用餐类别汇总、发票夹总览和 CSV 导出流程。',
      intro: '这个工具来自一个很具体的运营场景：多个食材供应商按项目填报发票金额，需要按年月、用餐类别、食材、数量、金额和均价做汇总。网站提供项目列表管理、项目内食材维护、发票记录录入、按月统计、发票夹总览、历史汇总和 CSV/Excel 导出。数据存储在浏览器 localStorage，适合轻量内部工具快速上线。',
      demo: 'Demo 已复制到 assets/demos/history/，入口为 index.html。它不是 AI 项目，但能展示把真实业务表格流程产品化、工具化的落地能力。'
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
      fields.github.textContent = card.dataset.linkLabel || '查看 GitHub';
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

  document.querySelectorAll('.project-card[data-project], .more-project-card[data-project]').forEach(card => {
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
  const allowedThemes = new Set(['gold', 'theme2', 'eye']);
  const stored = localStorage.getItem('theme');
  const saved = stored === 'theme3' ? 'eye' : stored;
  const initialTheme = allowedThemes.has(saved) ? saved : 'gold';

  document.documentElement.setAttribute('data-theme', initialTheme);
  btns.forEach(b => b.classList.toggle('active', b.dataset.theme === initialTheme));

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      if (!allowedThemes.has(theme)) return;
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
