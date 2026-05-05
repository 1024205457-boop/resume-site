// DOM 渲染引擎 — 将数据对象转为 DOM 元素
const Renderer = {

  // 创建元素的快捷方法
  el(tag, className, textContent) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
  },

  // ============================================================
  // 教育经历卡片
  // ============================================================
  renderEduCard(edu) {
    const card = this.el('div', 'edu-card fade-in');

    const header = this.el('div', 'edu-card__header');
    header.appendChild(this.el('span', 'edu-card__school', edu.school));
    header.appendChild(this.el('span', 'edu-card__period', edu.period));
    card.appendChild(header);

    card.appendChild(this.el('div', 'edu-card__degree',
      `${edu.college} ${edu.degree} ${edu.direction}`));

    const details = [];
    if (edu.gpa) details.push(`GPA: ${edu.gpa}`);
    if (edu.honors && edu.honors.length) details.push(`荣誉: ${edu.honors.join('、')}`);
    if (edu.language) details.push(edu.language);
    if (details.length) {
      card.appendChild(this.el('div', 'edu-card__detail', details.join('   ')));
    }

    return card;
  },

  // ============================================================
  // 技能标签组
  // ============================================================
  renderSkillGroup(skill) {
    const group = this.el('div', 'skill-group fade-in');
    group.appendChild(this.el('div', 'skill-group__label', skill.category));

    const tags = this.el('div', 'skill-group__tags');
    skill.items.forEach(item => {
      tags.appendChild(this.el('span', 'tag', item));
    });
    group.appendChild(tags);

    return group;
  },

  // ============================================================
  // 实习经历卡片
  // ============================================================
  renderExpCard(exp) {
    const card = this.el('div', 'exp-card fade-in');

    const header = this.el('div', 'exp-card__header');
    header.appendChild(this.el('span', 'exp-card__company', exp.company));
    header.appendChild(this.el('span', 'exp-card__period', exp.period));
    card.appendChild(header);

    card.appendChild(this.el('div', 'exp-card__role', exp.role));

    const list = this.el('ul', 'exp-card__highlights');
    exp.highlights.forEach(h => {
      const li = this.el('li', 'exp-card__highlight');
      const label = this.el('span', 'exp-card__highlight-label', h.label + '：');
      const content = this.el('span', 'exp-card__highlight-content', h.content);
      li.appendChild(label);
      li.appendChild(content);
      list.appendChild(li);
    });
    card.appendChild(list);

    return card;
  },

  // ============================================================
  // 项目卡片（简历页中使用，可点击跳转详情页）
  // ============================================================
  renderProjectCard(project) {
    const card = this.el('div', 'project-card fade-in');
    if (project.hasDetailPage) {
      card.classList.add('project-card--clickable');
      card.addEventListener('click', () => {
        window.location.href = `project.html?id=${project.id}`;
      });
      const arrow = this.el('span', 'project-card__arrow', '\u2192');
      card.appendChild(arrow);
    }

    const header = this.el('div', 'project-card__header');
    const nameWrap = this.el('div', 'project-card__name');
    nameWrap.appendChild(document.createTextNode(project.name));
    if (project.award) {
      nameWrap.appendChild(this.el('span', 'badge', project.award));
    }
    header.appendChild(nameWrap);
    header.appendChild(this.el('span', 'project-card__period', project.period));
    card.appendChild(header);

    const meta = this.el('div', 'project-card__meta');
    meta.appendChild(this.el('span', null, project.role));
    card.appendChild(meta);

    const list = this.el('ul', 'project-card__highlights');
    project.highlights.forEach(h => {
      const li = this.el('li', 'project-card__highlight');
      li.appendChild(this.el('span', 'project-card__highlight-label', h.label + '：'));
      li.appendChild(this.el('span', 'project-card__highlight-content', h.content));
      list.appendChild(li);
    });
    card.appendChild(list);

    return card;
  },

  // ============================================================
  // 公司 Banner（简历页顶部）
  // ============================================================
  renderCompanyBanner(company) {
    if (!company.greeting) return null;

    const banner = this.el('div', 'company-banner fade-in');
    banner.appendChild(this.el('div', 'company-banner__greeting', company.greeting));
    banner.appendChild(this.el('div', 'company-banner__position',
      `目标岗位：${company.targetPosition}`));
    return banner;
  },

  // ============================================================
  // 产品分析区
  // ============================================================
  renderAnalysis(company) {
    if (!company.productAnalysis) return null;

    const wrapper = document.createDocumentFragment();

    const divider = this.el('div', 'analysis-divider');
    divider.textContent = `以下是我对 ${company.name} 的产品分析`;
    wrapper.appendChild(divider);

    const analysis = company.productAnalysis;
    const titleEl = this.el('h2', 'section-title fade-in', analysis.title);
    wrapper.appendChild(titleEl);

    analysis.sections.forEach(section => {
      const sec = this.el('div', 'analysis-section fade-in');
      sec.appendChild(this.el('h3', 'analysis-section__heading', section.heading));

      if (section.content && !section.content.startsWith('（')) {
        sec.appendChild(this.el('div', 'analysis-section__content', section.content));
      } else {
        sec.appendChild(this.el('div', 'analysis-placeholder',
          section.content || '该部分内容即将更新，敬请期待'));
      }
      wrapper.appendChild(sec);
    });

    return wrapper;
  },

  // ============================================================
  // 区块标题
  // ============================================================
  renderSectionTitle(text) {
    return this.el('h2', 'section-title fade-in', text);
  },

  // ============================================================
  // 项目详情页 — Hero
  // ============================================================
  renderProjectHero(project) {
    const hero = this.el('div', 'project-hero');

    const name = this.el('h1', 'project-hero__name', project.name);
    hero.appendChild(name);

    if (project.subtitle) {
      hero.appendChild(this.el('div', 'project-hero__subtitle', project.subtitle));
    }

    const meta = this.el('div', 'project-hero__meta');
    if (project.award) {
      meta.appendChild(this.el('span', 'badge', project.award));
    }
    meta.appendChild(this.el('span', null, project.role));
    meta.appendChild(this.el('span', 'project-hero__period', project.period));
    hero.appendChild(meta);

    if (project.tags && project.tags.length) {
      const tags = this.el('div', 'project-hero__tags');
      project.tags.forEach(t => tags.appendChild(this.el('span', 'tag', t)));
      hero.appendChild(tags);
    }

    return hero;
  },

  // ============================================================
  // 项目详情页 — Section 渲染（按 type 分发）
  // ============================================================
  renderDetailSection(section) {
    const wrapper = this.el('div', 'detail-section fade-in');

    if (section.heading) {
      wrapper.appendChild(this.el('h2', 'detail-section__heading', section.heading));
    }

    switch (section.type) {
      case 'text':
        wrapper.appendChild(this.el('p', 'detail-section__text', section.content));
        break;

      case 'video': {
        const videoWrap = this.el('div', 'video-wrapper');
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        video.src = section.src;
        if (section.poster) video.poster = section.poster;
        videoWrap.appendChild(video);
        wrapper.appendChild(videoWrap);
        if (section.caption) {
          wrapper.appendChild(this.el('div', 'video-caption', section.caption));
        }
        break;
      }

      case 'image': {
        const imgWrap = this.el('div', 'image-wrapper');
        const img = document.createElement('img');
        img.src = section.src;
        img.alt = section.alt || '';
        img.loading = 'lazy';
        imgWrap.appendChild(img);
        wrapper.appendChild(imgWrap);
        if (section.caption) {
          wrapper.appendChild(this.el('div', 'image-caption', section.caption));
        }
        break;
      }

      case 'links': {
        const list = this.el('div', 'link-list');
        section.items.forEach(item => {
          const a = document.createElement('a');
          a.href = item.url;
          a.className = 'link-item';
          a.target = '_blank';
          a.rel = 'noopener noreferrer';

          const iconMap = {
            github: '\uD83D\uDCBB',
            external: '\uD83D\uDD17',
            document: '\uD83D\uDCC4'
          };
          const icon = this.el('span', 'link-item__icon', iconMap[item.icon] || '\uD83D\uDD17');
          a.appendChild(icon);
          a.appendChild(document.createTextNode(item.label));
          list.appendChild(a);
        });
        wrapper.appendChild(list);
        break;
      }
    }

    return wrapper;
  },

  // ============================================================
  // IntersectionObserver — 滚动渐入
  // ============================================================
  observeFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }
};
