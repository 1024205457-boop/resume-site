// 作品详情页逻辑
(function () {
  const container = document.getElementById('projectContent');
  const backBtn = document.getElementById('backBtn');

  // 返回按钮逻辑
  backBtn.addEventListener('click', function () {
    if (document.referrer && document.referrer.includes('resume.html')) {
      history.back();
    } else {
      window.location.href = 'resume.html#visitor';
    }
  });

  // 获取项目 ID
  const params = new URLSearchParams(location.search);
  const projectId = params.get('id');

  if (!projectId || !PROJECT_DETAILS[projectId]) {
    // 项目不存在
    const notFound = Renderer.el('div', 'not-found');
    notFound.appendChild(Renderer.el('h1', 'not-found__title', '项目未找到'));
    notFound.appendChild(Renderer.el('p', 'not-found__text', '该项目不存在或链接有误'));
    const btn = document.createElement('a');
    btn.href = 'resume.html#visitor';
    btn.className = 'btn btn--primary';
    btn.textContent = '返回简历';
    notFound.appendChild(btn);
    container.appendChild(notFound);
    return;
  }

  const project = PROJECT_DETAILS[projectId];

  // 更新页面标题
  document.title = `${project.name} - 姜慧男`;

  // 渲染 Hero
  container.appendChild(Renderer.renderProjectHero(project));

  // 渲染各 Section
  project.sections.forEach(section => {
    container.appendChild(Renderer.renderDetailSection(section));
  });

  // 启动滚动渐入
  Renderer.observeFadeIn();
})();
