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
      demo: '已接入电商导购体验短链接，可直接体验从消费需求到商品推荐、对比和风险提示的导购流程；完整 Prompt 和方法库仍保留在 AI Product Skills 的 RAG 导购目录。',
      background: '护肤导购的真实难点不是“推荐热门产品”，而是用户只会说美白、祛痘、抗老、修护这类功效词，但购买决策同时受肤质、过敏史、孕期/哺乳期、刷酸期、屏障状态和成分禁忌影响。普通推荐很容易忽略风险，也很难解释为什么某个产品更适合当前用户。',
      goalMetrics: '目标是把模糊功效诉求转成可检索、可筛查、可排序的选品报告。核心指标按输出质量设计：每轮推荐 3-5 个产品；每个产品必须有核心功效成分、风险成分提示、适用建议；无法获得完整成分表时明确标注信息不足，不编造价格、库存、销量和未披露成分。',
      action: '我设计了完整 Agent Prompt 和知识库字段：先解析功效目标、肤质/禁忌和风险偏好，再匹配烟酰胺、VC、水杨酸、神经酰胺、视黄醇等核心成分；随后按完整成分表召回 MIT/CMIT、甲醛释放体、高排位香精、变性酒精、SLS/SLES、BHT、精油、酸类和 A 醇等风险，并用“功效匹配度、成分排位、风险数量、肤质适配、信息完整度”排序。',
      evidence: '已接入电商导购体验短链接，可演示从“我想解决某个皮肤问题”到产品推荐、成分筛查、风险解释和多轮对比的完整流程。GitHub 中保留 RAG 导购方法库和 Prompt 结构，能看到需求解析、风险召回、输出格式和内部自检规则。',
      trialUrl: 'https://yfdurl14.com/Cus1rC',
      trialLabel: '试用电商导购',
      githubUrl: 'https://github.com/1024205457-boop/ai-product-skills/tree/main/RAG%E5%AF%BC%E8%B4%AD'
    },
    zebra: {
      category: 'AI Agent 产品',
      title: '某头部教育品牌智能学习顾问',
      media: { label: '学习顾问流程' },
      audience: '体验会员、家长、学习顾问和转化运营团队',
      summary: '用 AI 顾问承接体验会员的学习跟进、答疑和转化线索，提高服务连续性。',
      role: '梳理体验会员链路，拆解到课提醒、学情反馈、课程推荐、购买答疑等服务节点。',
      intro: '项目围绕体验课后的关键转化场景，把原本分散在人工顾问经验里的服务动作沉淀为可复用流程：先判断用户阶段和问题类型，再给出学习反馈、课程建议或购买解释，减少回复口径不一致和跟进遗漏。',
      demo: '展示位支持上传用户旅程图、顾问对话样例、意图分类表或服务流程图；对外只保留脱敏项目名，不出现真实品牌。',
      background: '体验课后到正式转化之间存在大量高频但分散的服务动作：到课提醒、课后反馈、学习问题解释、课程推荐、购买答疑和异议处理。原链路依赖人工顾问经验，容易出现跟进断点、回复口径不一致、推荐时机不稳定和线索沉淀不完整。',
      goalMetrics: '目标是让 AI 顾问承接体验会员的连续服务，而不是只做 FAQ。衡量重点包括：关键服务节点覆盖完整；不同用户阶段有不同话术策略；家长问题能被归入明确意图；转化线索能沉淀为可跟进状态；对外展示全程脱敏，不出现真实品牌名。',
      action: '我把体验会员链路拆成阶段判断、提醒触达、学情反馈、问题答疑、课程推荐和购买异议处理六类服务节点，并为每类节点设计触发条件、意图分类、回复口径和下一步动作。对高风险表达做脱敏处理，确保作品集只呈现方法和业务抽象。',
      evidence: '已形成脱敏的智能学习顾问案例，可用用户旅程图、对话样例、意图分类表和服务流程图说明完整产品思路。这个项目在首页占最大篇幅，是为了突出“教育转化场景 + Agent 服务编排”的核心能力。',
    },
    chart: {
      category: 'AI Agent 产品',
      title: 'Chart AI｜桌面研究可视化智能体',
      media: { label: '研究 → 图表' },
      audience: '咨询分析师、产品经理、行业研究和竞品研究使用者',
      summary: '把“我要表达一个商业判断”转成可选择图表模型、可补充桌面研究、可校验字段来源的结构化可视化生成流程。',
      role: '设计 Chart-AI 产品链路、图表模型库、图表推荐规则、Agent 进度状态、硬规则校验和字段来源追溯。',
      intro: '项目是一个独立的 Next.js 可视化智能体原型。用户输入业务问题、文字材料或表格数据后，系统先理解分析目标并推荐图表模型，再根据定位图、雷达图、热力地图、漏斗图、桑基图、流程图、维恩图等模型生成结构化图表数据；当本地数据不足时，会调用桌面研究模块补充咨询/行业来源线索，并在生成后检查图表类型、字段映射、数值范围和结构完整性。它和 Market Research Workflow 可以捏在一起：MRW 负责从 Brief 到洞察报告的研究主链路，Chart-AI 负责把研究结论转成可编辑、可追溯的图表表达。',
      demo: '当前可放 Chart-AI 运行录屏、图表模型选择页、字段来源面板和生成结果截图；MRW 的样例报告可作为“研究结论进入可视化表达”的延展 Demo。',
      background: '商业研究和咨询分析经常卡在“结论有了，但不知道用什么图表达、缺哪些字段、口径能不能自洽”。如果只做图表生成，无法解决桌面研究补数、字段来源追溯和图表结构校验的问题；如果只做研究报告，又很难把洞察转成可编辑的汇报图形。',
      goalMetrics: '目标是把 Chart-AI 和 research flow 捏成一个“研究结论 → 可视化表达”的智能体链路。指标包括：能根据分析目标推荐合适图表模型；能在数据不足时补充桌面研究线索；生成结果必须通过图表类型、字段映射、数值范围和结构完整性检查；关键字段能回溯来源。',
      action: '我搭建了 Next.js 原型，设计图表模型库、图表推荐规则、Agent 进度状态、桌面研究补数、结构化图表 JSON、硬规则校验和字段来源面板。MRW 负责 Brief 到洞察报告的研究主链路，Chart-AI 负责把研究结论转成定位图、雷达图、热力图、漏斗图、桑基图、流程图等表达。',
      evidence: '本地项目位于 /Users/kanyun/projects/chart-ai，已形成可运行原型；相关研究工作流 README 中有 65 条样例舆情、100% 洞察有源率、MOS 3.9+ 等评测口径，可作为“研究链路有证据、图表表达可追溯”的支撑。',
    },
    content: {
      category: 'AI 工作流自动化',
      title: '私域 7 天内容批量生产工作流',
      media: { label: '7 天 × 3 渠道' },
      audience: '私域运营、品牌内容团队、社群转化负责人',
      summary: '把每周 3 天人工写私域文案和导购素材的流程，改造成 7 天 × 3 渠道 × 主题循环的批量生成与审核工作流。',
      role: '设计主题循环、时令感知、历史去重 Prompt 策略，接入大模型生成 63 条渠道文案，并对接图生图工具批量生成导购卡和配图。',
      intro: '项目来自私域增长运营场景。原流程需要多人按周产出社群、朋友圈和导购触达内容，口径容易重复、风格不稳定、审核成本高。我将流程拆成事实输入、主题排期、7 天 × 3 渠道批量文案、历史内容去重、风险审核、图生图素材生成和渠道格式输出，形成“生成 → 审核 → 推送”的闭环，让私域运营从临时写稿转成可复用的内容生产线。',
      demo: '展示位支持放 7 天内容排期表、63 条文案生成样例、历史去重规则、图生图素材对比和审核流程录屏。',
      background: '私域运营的内容生产不是单篇文案问题，而是每周固定要为社群、朋友圈和导购触达准备不同渠道素材。人工写稿耗时长，主题容易重复，渠道口径不稳定，审核也很难判断哪些内容是历史复用、哪些是新生成。',
      goalMetrics: '目标是把“每周临时写稿”改造成可复用内容生产线。核心指标是 7 天 × 3 渠道 × 3 条内容，共 63 条文案一次性生成；同时要求主题循环可控、历史内容可去重、风险表达可审核、配图和导购卡可批量生成。',
      action: '我设计了事实输入、主题排期、渠道格式、时令感知、历史去重、风险审核和图生图素材生成流程。Prompt 不只生成文案，还约束每条内容的渠道、主题、利益点、禁用表达和审核状态，最后输出可推送、可复盘的内容包。',
      evidence: '已沉淀为 GitHub 中的私域内容生产工作流，能够展示 7 天排期、63 条文案样例、去重规则、审核流程和素材生成链路。项目说明的是运营工作流自动化能力，不绑定具体公司或内部系统。',
      githubUrl: 'https://github.com/1024205457-boop/ai-product-skills/tree/main/%E7%A7%81%E5%9F%9F%E5%86%85%E5%AE%B9%E7%94%9F%E4%BA%A7'
    },
    training: {
      category: 'AI 工作流自动化',
      title: '餐饮服务话术陪练 Agent',
      media: { label: '移动端陪练' },
      audience: '餐饮新人、门店培训负责人、一线服务团队',
      summary: '用移动端角色扮演陪练降低新人服务话术训练对人工带教的依赖。',
      role: '设计服务员场景、顾客角色、话术反馈和移动端 Demo 交互。',
      intro: '项目围绕头部餐饮品牌新人岗前服务训练，模拟真实门店顾客提问和服务冲突场景。新人通过对话练习服务话术，系统给出反馈和纠偏建议，帮助培训流程从一次性讲解变成可反复练习的陪练体验。',
      demo: '已有在线 Demo；展示位支持上传移动端操作录屏、服务场景截图和反馈页截图。',
      background: '一线服务培训依赖人工带教，真实顾客提问、投诉、催促和特殊需求很难高频复现。新人通常听完标准话术后缺少反复练习环境，培训负责人也缺少对话过程和薄弱点的结构化记录。',
      goalMetrics: '目标是把一次性讲解式培训改造成可重复的角色扮演陪练。指标包括：覆盖多个服务场景；顾客角色能提出不同难度的问题；新人每轮回应后获得即时反馈；反馈能指出礼貌度、完整性、安抚能力和下一步动作。',
      action: '我设计移动端陪练交互，把服务场景、顾客角色、话术回应、即时反馈和纠偏建议拆成可组合模块。用户选择场景后进入对话，系统根据回应给出评分式反馈和更优回复，形成“练习 → 纠偏 → 再练习”的闭环。',
      evidence: '已有 GitHub 项目和在线 Demo，可展示移动端场景选择、对话练习、即时反馈页和训练链路。页面文案已弱化具体品牌，只保留“餐饮服务话术陪练”的可迁移方法。',
      githubUrl: 'https://github.com/1024205457-boop/training'
    },
    dataops: {
      category: 'AI 工作流自动化',
      title: '增长周报数据自动更新工作流',
      media: { label: '加微 → 购买漏斗' },
      audience: '运营分析、数据看板维护者、周期报表负责人',
      summary: '把增长周报中分散在多套业务后台和数据看板的多源数据，整理成加微 UV → 领取 UV → 激活 UV → 购买的标准转化漏斗。',
      role: '梳理 4 大业务模块和 15 个功能的数据流向，设计字段映射、清洗规则、异常提示、漏斗口径和标准化周报输出。',
      intro: '项目来自增长运营场景。原先运营周报需要在多套业务后台和数据看板之间手工复制数据，再清洗成可汇报口径，单次更新耗时 2-3 小时且容易漏字段。我将加微 UV、领取 UV、激活 UV、购买等关键节点抽象为统一漏斗，沉淀字段映射、来源校验、清洗规则和回读检查，把周期性更新压缩到分钟级，并让运营能稳定复用同一套口径分析流失。',
      demo: '展示位支持放多数据源字段表、加微到购买漏斗样例、更新前后耗时对比、异常提示和自动化运行截图。',
      background: '增长周报需要周期性整合多源后台和看板数据，人工复制、清洗和汇总耗时 2-3 小时。问题不只是慢，还包括字段漏取、口径不一致、历史数据覆盖错误和运营无法快速定位漏斗流失点。',
      goalMetrics: '目标是把周期性周报更新标准化为同一套漏斗口径。指标包括：覆盖 4 大业务模块和 15 个功能的数据流向；统一加微 UV、领取 UV、激活 UV、购买等关键节点；异常值可提示；回读检查能避免覆盖错误；单次更新压缩到分钟级。',
      action: '我梳理字段映射、来源校验、清洗规则、异常提示、漏斗口径和回读检查，把多个分散表格整理成标准化转化漏斗。工作流重点不是展示某个内部系统，而是把“取数、清洗、校验、输出”拆成可迁移的自动化方法。',
      evidence: '已沉淀为 GitHub 中的数据更新工作流，核心证据是从 2-3 小时人工更新压缩到分钟级，并形成可复用字段映射和漏斗输出。对外页面不出现具体公司、内部系统或后台名称。',
      githubUrl: 'https://github.com/1024205457-boop/ai-product-skills/tree/main/%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0%E5%B7%A5%E4%BD%9C%E6%B5%81'
    },
    frame: {
      category: 'AI 陪伴与社区产品',
      title: '帧我：多模态情绪发泄与记录',
      media: { label: '情绪识别体验' },
      audience: '需要情绪卸载、情绪记录和低门槛自我观察的年轻用户',
      summary: '用对话生成发泄对象，并通过语音、表情和文本形成多模态情绪记录。',
      role: '定义情绪卸载切入点，设计多模态情绪识别、Prompt 引导、memory 管理和游戏化发泄体验。',
      intro: '项目来自抖音 AI 创变者跨年黑客松。产品不是单纯聊天陪伴，而是“情绪发泄 + 情绪记录”双模式：用户用短文本或对话表达情绪，AI 提取情绪对象并生成可互动的发泄内容；记录模式结合语音语调、面部表情和文本语义做情绪识别，再生成情绪手账和建议。路演时获得 2 家孵化器支持，200+ 观众中 69 人愿意试用。',
      demo: '展示位支持上传 App 页面截图、情绪识别流程图、输入输出对比和短视频演示。',
      background: '年轻用户需要即时情绪卸载和低门槛记录，但纯聊天陪伴容易停留在安慰，缺少“释放动作”和“可回看的记录结果”。项目从黑客松场景切入，重点验证多模态情绪识别和游戏化发泄是否能让用户更愿意完成一次情绪处理流程。',
      goalMetrics: '目标是做出“情绪发泄 + 情绪记录”双模式原型。指标包括：短文本或对话能生成发泄对象；语音、表情、文本能形成情绪识别输入；记录结果能生成情绪手账；路演现场能验证试用意愿和孵化兴趣。',
      action: '我定义情绪卸载切入点，设计多模态情绪识别、Prompt 引导、memory 管理、发泄对象生成和游戏化释放体验。发泄模式把情绪对象转成可互动内容；记录模式结合语音语调、面部表情和文本语义生成情绪手账和建议。',
      evidence: '项目路演时获得 2 家孵化器支持，200+ 观众中 69 人愿意试用。GitHub 中保留原型代码，可展示情绪识别流程、输入输出对比、手账生成和游戏化发泄链路。',
      githubUrl: 'https://github.com/1024205457-boop/alcheme3.0'
    },
    birdcircle: {
      category: 'AI 陪伴与社区产品',
      title: '鸟有圈：AI 观鸟记录工具',
      media: { label: '地图鸟讯 + AI 识鸟' },
      audience: '观鸟新人、自然观察用户、拍鸟和记录型兴趣用户',
      summary: '把找鸟、识鸟、生成鸟讯和照片归档串成一条观鸟记录闭环。',
      role: '设计地图鸟点发现、照片上传识别、鸟讯生成、按鸟种归档、积分激励和敏感物种保护机制。',
      intro: '项目最新版本在 GitHub birdcircle。产品基于地图鸟讯与 AI 相册解决四个痛点：新人不知道附近哪里能看鸟、遇到鸟不会识别、照片散落在手机相册里、鸟讯和照片整理割裂。核心链路是发现附近鸟点 → 上传照片和位置 → AI 初步识鸟 → 生成鸟讯 → 同步到相册 → 获得积分。技术上使用 Leaflet + 高德地图瓦片、百度 AI 图像识别代理、JSZip 相册导出，并为敏感物种、夜行鸟类和繁殖地设计坐标模糊与导航限制。',
      demo: 'GitHub 已包含 birdcircle.html、app.py、proxy.py、鸟种图片和 README；展示位后续可上传地图页、上传识别页、相册归档页和保护机制截图。',
      background: '观鸟新人常见四个断点：不知道附近哪里能看鸟、遇到鸟不会识别、照片散落在手机相册里、鸟讯和照片归档割裂。兴趣社区如果只做发帖，无法帮助新人完成从发现到记录的完整闭环。',
      goalMetrics: '目标是把找鸟、识鸟、生成鸟讯、照片归档和社区激励串起来。指标包括：地图能展示附近鸟点；照片上传后可做 AI 初步识别；鸟讯能同步到相册；用户能按鸟种导出记录；敏感物种、夜行鸟类和繁殖地坐标需要做模糊和导航限制。',
      action: '我设计地图鸟点发现、照片上传识别、鸟讯生成、按鸟种归档、积分激励和敏感物种保护机制。技术上使用 Leaflet + 高德地图瓦片、百度 AI 图像识别代理、JSZip 相册导出，并把保护逻辑前置到定位和导航环节。',
      evidence: '最新版本已在 GitHub birdcircle，包含 birdcircle.html、app.py、proxy.py、鸟种图片和 README。可直接看到地图页、上传识别、相册导出和敏感物种坐标模糊等核心能力。',
      githubUrl: 'https://github.com/1024205457-boop/birdcircle'
    },
    busycall: {
      category: 'AI 陪伴与社区产品',
      title: '真的很忙',
      media: { label: '来电模拟 Demo' },
      audience: '远程办公用户、会议高频用户、需要轻量脱身场景的人',
      summary: '用高仿真来电模拟解决线上会议难以自然离场的轻量痛点。',
      role: '通过 4 场用户访谈定义痛点，参考微信来电弹窗设计交互，并用 Cursor 快速完成上线。',
      intro: '项目来自清华 Vibe Coding 黑客松。它从“线上会议难以优雅离场”这个高频小痛点切入，通过高仿真来电界面和快速触发流程，给用户一个自然离场的社交缓冲。项目 3 小时内完成开发上线，积累 300+ 用户，并在小红书获得 6w+ 关注。',
      demo: '展示位支持上传来电界面截图、触发流程录屏和移动端效果图。',
      background: '远程会议和线上沟通中，用户有时需要自然离场，但直接打断或临时编理由会造成社交压力。这个需求很小，但频率高、触发即时，适合用极轻量工具验证。',
      goalMetrics: '目标是在黑客松时间内做出可信、可触发、可传播的来电模拟工具。指标包括：交互足够接近真实来电；用户能快速触发；移动端视觉可信；上线后能获得真实用户使用和社交传播。',
      action: '我通过 4 场用户访谈确认痛点，参考真实来电弹窗设计高仿真界面，用快速开发工具完成触发流程和移动端适配。产品没有堆功能，只围绕“自然离场”这个单点做可信度。',
      evidence: '项目 3 小时内完成开发上线，积累 300+ 用户，并在社交平台获得 6w+ 关注；也获得清华 Vibe Coding 黑客松最佳创意奖和最具创新解决方案奖。',
    },
    invoice: {
      category: '更多项目 · 业务工具',
      title: '发票金额填报与汇总工具',
      media: { label: '发票填报 Demo' },
      audience: '食堂采购、财务对账人员、项目负责人和月度汇总维护者',
      summary: '把多供应商、多用餐类别的发票金额录入和月度汇总做成无需后端的本地网页工具。',
      role: '梳理供应商项目、食材维护、日期筛选、用餐类别汇总、发票夹总览和 CSV 导出流程。',
      intro: '这个工具来自一个很具体的运营场景：多个食材供应商按项目填报发票金额，需要按年月、用餐类别、食材、数量、金额和均价做汇总。网站提供项目列表管理、项目内食材维护、发票记录录入、按月统计、发票夹总览、历史汇总和 CSV/Excel 导出。数据存储在浏览器 localStorage，适合轻量内部工具快速上线。',
      demo: 'Demo 已复制到 assets/demos/history/，入口为 index.html。它不是 AI 项目，但能展示把真实业务表格流程产品化、工具化的落地能力。',
      background: '多个供应商按项目填报发票金额时，金额、用餐类别、食材、数量和均价分散在表格里，月度汇总和历史留存很容易出错。这个项目不是 AI 项目，但能说明把真实业务表格流程产品化的能力。',
      goalMetrics: '目标是做一个无需后端、可本地运行的轻量业务工具。指标包括：支持项目维护、食材维护、发票金额录入、按月统计、用餐类别汇总、发票夹总览、历史保存和 CSV 导出；数据存在浏览器 localStorage，适合快速落地。',
      action: '我梳理项目列表、项目内食材维护、发票记录录入、日期筛选、统计汇总、发票夹总览、历史记录和 CSV 导出流程，把分散表格操作收敛到一个本地网页。',
      evidence: 'Demo 已复制到 assets/demos/history/，可直接打开体验项目维护、金额录入、统计汇总和 CSV 导出。它被放在“更多项目”里，不抢主作品流位置，但保留业务工具落地证据。',
      trialUrl: 'assets/demos/history/index.html',
      trialLabel: '打开 Demo'
    }
  };

  const fields = {
    category: modal.querySelector('#project-detail-category'),
    title: modal.querySelector('#project-detail-title'),
    summary: modal.querySelector('#project-detail-summary'),
    background: modal.querySelector('#project-detail-background'),
    action: modal.querySelector('#project-detail-action'),
    goal: modal.querySelector('#project-detail-goal'),
    result: modal.querySelector('#project-detail-result'),
    footer: modal.querySelector('.project-modal__footer'),
    trial: modal.querySelector('#project-detail-trial'),
    github: modal.querySelector('#project-detail-github')
  };

  function renderPoints(element, content) {
    const points = Array.isArray(content)
      ? content
      : String(content || '')
        .split(/[。；]/)
        .map(point => point.trim())
        .filter(Boolean);

    element.innerHTML = '';

    if (!points.length) return;

    const list = document.createElement('ul');
    list.className = 'project-modal__point-list';

    points.forEach(point => {
      const item = document.createElement('li');
      item.textContent = point;
      list.appendChild(item);
    });

    element.appendChild(list);
  }

  function openProject(card) {
    const project = projects[card.dataset.project];
    if (!project) return;
    fields.category.textContent = project.category;
    fields.title.textContent = project.title;
    fields.summary.textContent = project.summary;
    renderPoints(fields.background, project.background || project.intro);
    renderPoints(fields.action, project.goalMetrics || project.goal || project.summary);
    renderPoints(fields.goal, project.action || project.role);
    renderPoints(fields.result, project.evidence || project.result || project.demo);

    const trialUrl = project.trialUrl || card.dataset.trial;
    const githubUrl = project.githubUrl || (!card.dataset.linkLabel ? card.dataset.github : '');

    function updateLink(link, url, label) {
      if (url) {
        link.href = url;
        link.textContent = label;
        link.hidden = false;
        return;
      }
      link.href = '#';
      link.hidden = true;
    }

    updateLink(fields.trial, trialUrl, project.trialLabel || card.dataset.trialLabel || '试用链接');
    updateLink(fields.github, githubUrl, 'GitHub');

    if (fields.footer) {
      fields.footer.hidden = !trialUrl && !githubUrl;
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
