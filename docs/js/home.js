// ============================================================
// 0. 单页锚点导航
// ============================================================
(function () {
  const tabs = Array.from(document.querySelectorAll('.top-nav__tab'));
  const sections = tabs
    .map(tab => document.getElementById(tab.dataset.target))
    .filter(Boolean);

  function setActive(targetId) {
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.target === targetId);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const section = document.getElementById(tab.dataset.target);
      if (!section) return;
      setActive(tab.dataset.target);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, {
    rootMargin: '-30% 0px -55% 0px',
    threshold: [0.1, 0.3, 0.6]
  });

  sections.forEach(section => observer.observe(section));
})();

// ============================================================
// 1. 项目详情弹层
// ============================================================
(function () {
  const modal = document.querySelector('#project-detail');
  if (!modal) return;

  const projects = {
    minmin: {
      category: '导购决策迭代',
      title: '敏敏肌选品｜护肤搜索导购 Agent',
      media: { label: '成分安全筛查' },
      audience: '有功效诉求的护肤用户、敏感肌/痘肌/孕期等需避险人群、导购顾问',
      summary: '把“我想美白/祛痘/抗老/修护”这类模糊需求，转成可检索、可筛查、可排序的护肤选品决策报告。',
      role: '设计 Agent Prompt、知识库字段和输出结构，拆解需求解析、核心功效成分匹配、产品检索、成分风险召回、推荐排序和多轮追问规则。',
      intro: '项目来自腾讯云 Agent Mini-hackathon。用户只输入功效需求时，Agent 直接按普通肌肤给出初筛推荐；如果补充肤质、过敏史、孕期/哺乳期、刷酸期或“不想要酒精/香精”等限制，则优先转成筛选条件。系统会围绕烟酰胺、熊果苷、VC、传明酸、水杨酸、神经酰胺、泛醇、视黄醇等核心成分检索 3-5 个产品，并基于完整成分表检查 MIT/CMIT、甲醛释放体、高排位香精、高排位变性酒精、SLS/SLES、人工色素、BHT、精油、A 醇和酸类等风险。最终输出推荐优先级表、逐个产品分析、肤质适配建议、成分科普和下一步可追问方向，避免编造价格、库存、销量或未披露成分。',
      demo: '已接入电商导购体验短链接，可直接体验从消费需求到商品推荐、对比和风险提示的导购流程；完整 Prompt 和方法库仍保留在 AI Product Skills 的 RAG 导购目录。',
      background: [
        '用户侧：护肤用户常用“美白/祛痘/抗老/修护”表达需求，但并不一定理解成分、肤质禁忌和使用风险',
        '业务侧：普通导购如果只推荐热门产品，无法解释为什么适合，也容易忽略敏感肌、孕期、刷酸期等限制',
        '系统侧：导购 Agent 需要把模糊需求转成可检索、可筛查、可排序的决策链路，而不是一次性生成答案'
      ],
      goalMetrics: [
        '用户指标：每轮输出 3-5 个候选产品，并给出推荐理由、风险提示和适用建议',
        '质量指标：每个产品必须对应核心功效成分和完整成分表筛查逻辑',
        '安全指标：成分表不足时明确标注“信息不足”，不编造价格、库存、销量和未披露成分'
      ],
      action: [
        '需求解析：拆出功效目标、肤质/禁忌、过敏史、孕期/哺乳期、刷酸期和风险偏好',
        '知识与规则：匹配烟酰胺、VC、水杨酸、神经酰胺、视黄醇等核心成分，并建立风险成分召回表',
        'Agent 流程：按“产品检索 → 成分筛查 → 推荐排序 → 逐品分析 → 多轮追问”组织输出',
        '评测约束：用内部自检检查意图识别、商品匹配、风险召回、事实准确性和安全合规'
      ],
      evidence: [
        '已接入电商导购体验短链接，可演示从功效诉求到商品推荐、成分筛查和多轮对比的完整流程',
        'GitHub 中保留 RAG 导购方法库和 Prompt 结构，可看到需求解析、风险召回、输出格式和自检规则',
        '这个案例证明的是“可解释导购 Agent”能力，而不是泛泛商品推荐'
      ],
      trialUrl: 'https://yfdurl14.com/Cus1rC',
      trialLabel: '试用电商导购',
      githubUrl: 'https://github.com/huinan-jiang/ai-product-skills/tree/main/RAG%E5%AF%BC%E8%B4%AD'
    },
    zebra: {
      category: '导购决策迭代',
      title: '某头部教育品牌智能学习顾问',
      media: { label: '学习顾问流程' },
      audience: '体验会员、家长、学习顾问和转化运营团队',
      summary: '用 AI 顾问承接体验会员的学习跟进、答疑和转化线索，提高服务连续性。',
      role: '梳理体验会员链路，拆解到课提醒、学情反馈、课程推荐、购买答疑等服务节点。',
      intro: '项目围绕体验课后的关键转化场景，把原本分散在人工顾问经验里的服务动作沉淀为可复用流程：先判断用户阶段和问题类型，再给出学习反馈、课程建议或购买解释，减少回复口径不一致和跟进遗漏。',
      demo: '展示位支持上传用户旅程图、顾问对话样例、意图分类表或服务流程图；对外只保留脱敏项目名，不出现真实品牌。',
      background: [
        '用户侧：体验课后家长会持续询问到课、学情、课程选择和购买问题，需要稳定、及时的服务承接',
        '业务侧：原链路依赖人工顾问经验，容易出现跟进断点、话术不一致、推荐时机不稳定和线索沉淀不完整',
        '系统侧：这个场景不是 FAQ，而是多阶段服务链路，需要 Agent 判断阶段、识别意图并推进下一步动作'
      ],
      goalMetrics: [
        '用户指标：家长问题能被归入明确意图，并获得符合当前阶段的回复和下一步建议',
        '业务指标：体验会员从课后跟进到转化线索沉淀的关键节点要完整覆盖',
        '系统指标：服务节点、触发条件、回复口径和转人工/兜底边界可配置、可复盘',
        '合规指标：对外展示全程脱敏，不出现真实品牌名'
      ],
      action: [
        '链路拆解：把体验会员服务拆成阶段判断、提醒触达、学情反馈、问题答疑、课程推荐和异议处理',
        '路由设计：为每类问题定义意图分类、触发条件、必要上下文和下一步动作',
        '话术设计：把人工顾问经验沉淀为可复用回复策略，减少自由发挥造成的不一致',
        '边界处理：对品牌、用户信息和高风险表达做脱敏，只保留业务方法和产品结构'
      ],
      evidence: [
        '已形成脱敏案例，可用用户旅程图、对话样例、意图分类表和服务流程图说明方案',
        '首页将该项目放在主作品流左侧大位，突出“教育转化场景 + Agent 服务编排”的核心能力',
        '案例重点证明从人工经验到可执行 Agent 服务流程的产品抽象能力'
      ],
    },
    chart: {
      category: '研究表达迭代',
      title: 'Chart AI｜桌面研究可视化智能体',
      media: { label: '研究 → 图表' },
      audience: '咨询分析师、产品经理、行业研究和竞品研究使用者',
      summary: '把“我要表达一个商业判断”转成可选择图表模型、可补充桌面研究、可校验字段来源的结构化可视化生成流程。',
      role: '设计 Chart-AI 产品链路、图表模型库、图表推荐规则、Agent 进度状态、硬规则校验和字段来源追溯。',
      intro: '项目是一个独立的 Next.js 可视化智能体原型。用户输入业务问题、文字材料或表格数据后，系统先理解分析目标并推荐图表模型，再根据定位图、雷达图、热力地图、漏斗图、桑基图、流程图、维恩图等模型生成结构化图表数据；当本地数据不足时，会调用桌面研究模块补充咨询/行业来源线索，并在生成后检查图表类型、字段映射、数值范围和结构完整性。它和 Market Research Workflow 可以捏在一起：MRW 负责从 Brief 到洞察报告的研究主链路，Chart-AI 负责把研究结论转成可编辑、可追溯的图表表达。',
      demo: '当前可放 Chart-AI 运行录屏、图表模型选择页、字段来源面板和生成结果截图；MRW 的样例报告可作为“研究结论进入可视化表达”的延展 Demo。',
      background: [
        '用户侧：咨询分析师和产品经理常有研究结论，但不知道该用什么图表达、缺哪些字段、口径是否自洽',
        '业务侧：只做图表生成无法解决桌面研究补数和字段来源追溯，只做研究报告又难以进入可编辑汇报表达',
        '系统侧：需要把 research flow 的证据链和 Chart-AI 的图表生成合成一条可验证链路'
      ],
      goalMetrics: [
        '用户指标：输入业务判断后，系统能推荐合适图表模型并生成可编辑可视化',
        '质量指标：图表类型、字段映射、数值范围和结构完整性必须通过检查',
        '证据指标：关键字段能回溯来源，数据不足时能触发桌面研究补数'
      ],
      action: [
        '产品链路：把 MRW 定位为 Brief 到洞察报告的研究主链路，把 Chart-AI 定位为研究结论到图表表达的输出层',
        '模型库设计：沉淀定位图、雷达图、热力图、漏斗图、桑基图、流程图等图表模型和推荐规则',
        '执行拆分：设计 Agent 进度状态、桌面研究补数、结构化图表 JSON、硬规则校验和字段来源面板',
        '验收方式：用字段来源、结构检查和图表可编辑性作为可交付标准，而不只看生成是否好看'
      ],
      evidence: [
        '本地项目位于 /Users/kanyun/projects/chart-ai，已形成可运行 Next.js 原型',
        '相关研究工作流已有 65 条样例舆情、100% 洞察有源率、MOS 3.9+ 等评测口径',
        '案例证明的是“研究证据链 + 可视化表达”的 Agent 产品能力，不是简单图表生成'
      ],
    },
    venn: {
      category: '研究表达迭代',
      title: 'Venn AI｜关系可视化笔记',
      media: { label: '概念 → 关系结构' },
      audience: '学生、研究者、知识管理用户和需要做概念对比的人',
      summary: '用维恩图把概念之间的交叉、差异和共性变成可编辑的知识结构。',
      role: '设计概念输入、关系整理、维恩图生成和笔记沉淀方式。',
      intro: '这个项目是研究表达方向的前置迭代：先解决“概念之间的关系怎么被看见”的问题。用户围绕多个概念输入材料或笔记后，产品把共同点、差异点和交叉区域整理成维恩图，帮助使用者从线性文字进入结构化理解。',
      demo: '后续可放维恩图生成截图、笔记编辑截图和知识整理案例。当前先保留 GitHub 入口。',
      background: [
        '用户侧：学习和研究过程中，概念之间的共性、差异和交叉关系很难只靠线性笔记表达',
        '业务侧：如果知识整理缺少结构，后续讨论、复盘和迁移都会变慢',
        '系统侧：需要把概念输入、关系抽取和可视化表达连接起来，而不是只生成文字总结'
      ],
      goalMetrics: [
        '理解指标：让用户能快速看到多个概念之间的共同点、差异点和交叉区域',
        '编辑指标：输出结果不是静态图片，而是可继续编辑和复用的知识结构',
        '迭代指标：为后续 Chart AI 的复杂商业图表表达沉淀“关系可视化”的基础能力'
      ],
      action: [
        '关系拆解：把概念材料整理为共同点、差异点和交叉关系',
        '可视化设计：用维恩图承载概念关系，而不是把所有内容堆成段落',
        '产品连接：把 Venn AI 作为 Chart AI 的前序迭代，从知识关系表达走向研究图表表达'
      ],
      evidence: [
        'GitHub 中保留 Venn AI 项目入口',
        '案例证明的是“知识关系可视化”的产品判断，而不是单纯图形生成',
        '它和 Chart AI 放在一起，能体现从轻量知识结构到复杂研究表达的迭代路径'
      ],
      githubUrl: 'https://github.com/huinan-jiang/Venn'
    },
    mrw: {
      category: '研究表达迭代',
      title: '桌面研究洞察报告工作流',
      media: { label: '材料 → 洞察报告' },
      audience: '产品经理、咨询分析师、行业研究和竞品研究使用者',
      summary: '把分散研究材料整理成有来源、有聚类、有结论的桌面研究报告。',
      role: '设计从 Brief、样本整理、主题聚类、证据引用到报告输出的研究工作流。',
      intro: '这个项目是 Chart AI 的前置迭代：先解决“研究材料怎么变成可信洞察”的问题，再进入“洞察怎么被可视化表达”。流程从研究 Brief 出发，整理样本材料和事实来源，做主题聚类、用户画像、痛点 Top、需求机会和策略建议，并要求关键洞察能回溯证据。',
      demo: '已准备样例报告页面，可展示从敏感肌护肤品类消费者洞察到用户画像、痛点排序和机会判断的完整报告形态。',
      background: [
        '用户侧：产品经理和咨询分析师常常面对大量访谈、评论、社媒和竞品材料，但很难快速抽成清晰洞察',
        '业务侧：如果洞察没有证据来源，报告很难进入评审、汇报和后续产品决策',
        '系统侧：桌面研究需要先建立 Brief、样本、主题、证据和结论之间的可追溯关系'
      ],
      goalMetrics: [
        '研究指标：样本材料能被聚类成用户画像、核心动机、典型行为和关键痛点',
        '证据指标：关键洞察需要有来源支撑，避免只输出主观总结',
        '交付指标：最终产出能直接进入汇报页或作为 Chart AI 的可视化输入'
      ],
      action: [
        '研究拆解：把桌面研究拆成 Brief 理解、样本整理、主题聚类、洞察提炼和报告生成',
        '证据设计：要求洞察、痛点和建议都能对应原始材料或样例来源',
        '报告结构：输出用户画像、痛点 Top、行为路径、机会判断和下一步建议',
        '迭代连接：把这个工作流作为 Chart AI 的上游，让研究结论继续进入图表表达'
      ],
      evidence: [
        '已生成敏感肌护肤品类消费者洞察样例报告',
        '报告中包含用户画像、痛点排序、典型引述和策略建议',
        '这个项目证明的是桌面研究到结构化交付的能力，为 Chart AI 的可视化表达提供上游输入'
      ],
      trialUrl: 'assets/reports/mrw-sample-report.html',
      trialLabel: '查看样例报告'
    },
    content: {
      category: 'AI 工作流自动化',
      title: '私域图文多模态生成工作流',
      media: { label: '7 天 × 3 渠道' },
      audience: '私域运营、品牌内容团队、社群转化负责人',
      summary: '把每周 3 天人工写私域文案和导购素材的流程，改造成 7 天 × 3 渠道 × 主题循环的批量生成与审核工作流。',
      role: '设计主题循环、时令感知、历史去重 Prompt 策略，接入大模型生成 63 条渠道文案，并对接图生图工具批量生成导购卡和配图。',
      intro: '项目来自私域增长运营场景。原流程需要多人按周产出社群、朋友圈和导购触达内容，口径容易重复、风格不稳定、审核成本高。我将流程拆成事实输入、主题排期、7 天 × 3 渠道批量文案、历史内容去重、风险审核、图生图素材生成和渠道格式输出，形成“生成 → 审核 → 推送”的闭环，让私域运营从临时写稿转成可复用的内容生产线。',
      demo: '展示位支持放 7 天内容排期表、63 条文案生成样例、历史去重规则、图生图素材对比和审核流程录屏。',
      background: [
        '用户侧：私域运营每周要持续产出社群、朋友圈和导购触达素材，单靠人工写稿成本高',
        '业务侧：内容容易主题重复、渠道口径不稳定，图文素材与文案审核也常常割裂',
        '系统侧：需要把文案生成、图片生成、历史去重和审核状态组织成稳定工作流'
      ],
      goalMetrics: [
        '产能指标：一次性生成 7 天 × 3 渠道 × 3 条内容，共 63 条文案',
        '质量指标：主题循环可控、历史内容可去重、风险表达可审核',
        '多模态指标：文案、导购卡和配图能批量生成并形成可复盘内容包'
      ],
      action: [
        '输入结构：定义事实输入、主题排期、渠道格式、利益点、禁用表达和审核状态',
        '生成流程：用大模型批量生成多渠道文案，再对接图生图工具生成导购卡和配图',
        '质量控制：加入时令感知、历史去重、风险审核和渠道格式约束',
        '工作流输出：让结果从“临时写稿”变成可审核、可推送、可复盘的内容生产线'
      ],
      evidence: [
        '已沉淀为 GitHub 中的私域内容生产工作流',
        '可展示 7 天排期、63 条文案样例、去重规则、审核流程和素材生成链路',
        '案例说明运营工作流自动化能力，不绑定具体公司或内部系统'
      ],
      githubUrl: 'https://github.com/huinan-jiang/ai-product-skills/tree/main/%E7%A7%81%E5%9F%9F%E5%86%85%E5%AE%B9%E7%94%9F%E4%BA%A7'
    },
    training: {
      category: '场景陪练迭代',
      title: '餐饮服务话术陪练 Agent',
      media: { label: '移动端陪练' },
      audience: '餐饮新人、门店培训负责人、一线服务团队',
      summary: '用移动端角色扮演陪练降低新人服务话术训练对人工带教的依赖。',
      role: '设计服务员场景、顾客角色、话术反馈和移动端 Demo 交互。',
      intro: '项目围绕头部餐饮品牌新人岗前服务训练，模拟真实门店顾客提问和服务冲突场景。新人通过对话练习服务话术，系统给出反馈和纠偏建议，帮助培训流程从一次性讲解变成可反复练习的陪练体验。',
      demo: '已有在线 Demo；展示位支持上传移动端操作录屏、服务场景截图和反馈页截图。',
      background: [
        '用户侧：餐饮新人需要高频练习真实顾客提问、投诉、催促和特殊需求，但门店人工陪练成本高',
        '业务侧：一次性讲解难以保证话术稳定，培训负责人也缺少对话过程和薄弱点记录',
        '系统侧：服务培训适合拆成场景、角色、回应、反馈和纠偏的任务型 AI 流程'
      ],
      goalMetrics: [
        '用户指标：新人能在移动端重复练习多个服务场景，并获得即时反馈',
        '业务指标：降低人工带教依赖，让标准话术和服务动作更容易复用',
        '系统指标：反馈能覆盖礼貌度、完整性、安抚能力和下一步动作'
      ],
      action: [
        '场景拆解：把服务场景、顾客角色、话术回应、即时反馈和纠偏建议拆成可组合模块',
        '交互设计：用户选择场景后进入角色扮演，对话过程中逐轮回应顾客问题',
        '评测设计：系统根据回应给出评分式反馈和更优回复，形成“练习 → 纠偏 → 再练习”闭环',
        '脱敏处理：页面文案弱化具体品牌，只保留餐饮服务话术陪练的可迁移方法'
      ],
      evidence: [
        '已有 GitHub 项目和在线 Demo',
        '可展示移动端场景选择、对话练习、即时反馈页和训练链路',
        '案例证明把线下培训经验拆成可执行 AI 工作流的产品能力'
      ],
      githubUrl: 'https://github.com/huinan-jiang/training'
    },
    dataops: {
      category: 'AI 工作流自动化',
      title: '线索转化漏斗数据看板',
      media: { label: '加微 → 购买漏斗' },
      audience: '运营分析、数据看板维护者、周期报表负责人',
      summary: '把分散在多源后台和看板里的线索数据，整理成加微 UV → 领取 UV → 激活 UV → 购买的标准转化漏斗。',
      role: '梳理 4 大业务模块和 15 个功能的数据流向，设计字段映射、清洗规则、异常提示、漏斗口径和标准化看板输出。',
      intro: '项目来自增长运营场景。原先线索转化数据需要在多套业务后台和数据看板之间手工复制，再清洗成可汇报口径，单次更新耗时 2-3 小时且容易漏字段。我将加微 UV、领取 UV、激活 UV、购买等关键节点抽象为统一漏斗，沉淀字段映射、来源校验、清洗规则和回读检查，把周期性更新压缩到分钟级，并让运营能稳定复用同一套口径分析流失。',
      demo: '展示位支持放多数据源字段表、加微到购买漏斗样例、看板更新前后耗时对比、异常提示和自动化运行截图。',
      background: [
        '用户侧：运营需要快速看清线索从触达到购买的转化损耗，但数据分散在多个来源',
        '业务侧：人工复制、清洗和汇总耗时 2-3 小时，容易出现字段漏取、口径不一致和历史覆盖错误',
        '系统侧：数据看板不能只是展示图表，还要先解决字段映射、来源校验和漏斗口径统一'
      ],
      goalMetrics: [
        '业务指标：统一加微 UV、领取 UV、激活 UV、购买等关键节点，帮助定位漏斗流失',
        '效率指标：把单次更新从 2-3 小时压缩到分钟级',
        '系统指标：覆盖 4 大业务模块和 15 个功能的数据流向，支持异常提示和回读检查'
      ],
      action: [
        '数据梳理：整理多源数据字段、来源口径、清洗规则和关键转化节点',
        '看板口径：把分散表格整理成标准化线索转化漏斗，而不是展示一堆孤立指标',
        '稳定性设计：加入异常值提示、回读检查和历史数据保护，避免覆盖错误',
        '脱敏表达：对外不出现具体公司、内部系统或后台名称，只保留可迁移的数据产品方法'
      ],
      evidence: [
        '已沉淀为数据更新工作流，核心证据是从 2-3 小时人工更新压缩到分钟级',
        '形成可复用字段映射、漏斗口径和标准化输出',
        '案例证明的是“线索转化漏斗数据看板”的数据产品能力，而不是单纯周报自动化'
      ],
      githubUrl: 'https://github.com/huinan-jiang/ai-product-skills/tree/main/%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0%E5%B7%A5%E4%BD%9C%E6%B5%81'
    },
    frame: {
      category: '场景陪练迭代',
      title: '帧我：多模态情绪发泄与记录',
      media: { label: '情绪识别体验' },
      audience: '需要情绪卸载、情绪记录和低门槛自我观察的年轻用户',
      summary: '用对话生成发泄对象，并通过语音、表情和文本形成多模态情绪记录。',
      role: '定义情绪卸载切入点，设计多模态情绪识别、Prompt 引导、memory 管理和游戏化发泄体验。',
      intro: '项目来自抖音 AI 创变者跨年黑客松。产品不是单纯聊天陪伴，而是“情绪发泄 + 情绪记录”双模式：用户用短文本或对话表达情绪，AI 提取情绪对象并生成可互动的发泄内容；记录模式结合语音语调、面部表情和文本语义做情绪识别，再生成情绪手账和建议。路演时获得 2 家孵化器支持，200+ 观众中 69 人愿意试用。',
      demo: '展示位支持上传 App 页面截图、情绪识别流程图、输入输出对比和短视频演示。',
      background: [
        '用户侧：年轻用户有即时情绪卸载和低门槛记录需求，但纯聊天陪伴容易停留在安慰',
        '业务侧：情绪产品需要让用户完成一次可感知的释放动作，并沉淀可回看的记录结果',
        '系统侧：多模态输入、情绪识别、内容生成和游戏化互动需要被拆成稳定链路'
      ],
      goalMetrics: [
        '用户指标：短文本或对话能生成发泄对象，降低表达门槛',
        '产品指标：形成“情绪发泄 + 情绪记录”双模式原型',
        '验证指标：路演现场验证试用意愿和孵化兴趣'
      ],
      action: [
        '场景定义：把产品从普通聊天陪伴收敛到“情绪发泄”和“情绪记录”两个高频任务',
        '多模态设计：结合语音语调、面部表情和文本语义形成情绪识别输入',
        '生成链路：发泄模式生成可互动对象，记录模式生成情绪手账和建议',
        '体验设计：通过 Prompt 引导、memory 管理和游戏化释放动作增强完成感'
      ],
      evidence: [
        '项目路演时获得 2 家孵化器支持',
        '200+ 观众中 69 人愿意试用',
        'GitHub 中保留原型代码，可展示情绪识别、输入输出对比、手账生成和游戏化发泄链路'
      ],
      githubUrl: 'https://github.com/huinan-jiang/alcheme3.0'
    },
    birdcircle: {
      category: '兴趣社区迭代',
      title: '鸟有圈｜从观鸟社区到 AI 记录工具',
      media: { label: 'V1 社区入口 → V2 工具闭环' },
      audience: '观鸟收集型用户、拍鸟摄影型用户、自然观察新人',
      summary: '区分观鸟与拍鸟两类兴趣人群，先验证地图鸟讯社区，再迭代到 AI 识鸟、相册归档、积分激励和生态保护机制。',
      role: '从用户入门路径出发，设计 V1 地图鸟讯社区，并在 V2 补齐首页决策、鸟点地图、AI 识鸟、相册归档、积分激励和保护规则。',
      intro: '鸟有圈的迭代重点不是“加一个 AI 识别功能”，而是先看清两类人群：观鸟者用望远镜也能开始，更在意鸟种、习性和收集体系，偏博物学；拍鸟者更像以鸟为对象的摄影用户，更在意出现位置、瞬间捕捉和作品沉淀。V1 先解决新人不知道去哪看鸟、鸟讯依赖熟人传播的问题；V2 再补齐识别、归档、激励和保护机制，形成发现鸟点 → 判断前往 → 上传识别 → 相册沉淀 → 积分反馈的完整闭环。',
      background: [
        '人群差异：观鸟和拍鸟首先是两个群体，前者偏鸟种收集、行为观察和博物学认知，后者偏摄影对象、瞬间捕捉和作品表达',
        '观鸟门槛：观鸟一个望远镜就可以开始，用户会关注珍稀种类和识别细节，例如翠鸟雌雄嘴色差异这类可被讲述和收藏的知识',
        '拍鸟断点：拍鸟用户不一定只追珍稀鸟类，更在意在北京公园里捕捉好看的动态瞬间，但照片容易散落、缺少按对象归档和复盘',
        '社区断点：只做同城动态无法形成长期留存，需要把每次观察转成用户资产和社区贡献',
        '生态边界：观鸟产品不能只追求打卡效率，敏感物种、繁殖地和夜行鸟类需要被产品规则保护'
      ],
      goalMetrics: [
        '入门指标：让新人打开首页就知道去哪、何时去、看什么和下一步做什么',
        '闭环指标：从地图发现、鸟点判断、上传识别、相册归档到积分反馈形成连续路径',
        '贡献指标：用任务和积分把一次拍照转成持续上传、补充照片和社区参与',
        '保护指标：把敏感物种坐标模糊、繁殖地禁用导航、夜行鸟类勿靠近前置到核心界面'
      ],
      action: [
        'V1：先做地图鸟点、鸟讯动态和鸟种标签，验证“地点发现 + 社区分享”的入口价值',
        'V2：首页聚合天气、最佳观鸟时间、附近鸟点、当季明星、积分任务和同城动态，降低首次决策成本',
        'V2：鸟点页用时效颜色、鸟种标签、确认人数和导航入口帮助用户判断是否前往',
        'V2：积分和相册分别承接贡献激励与个人资产沉淀，让工具能力服务长期留存'
      ],
      evidence: [
        '首页大图展示 V2 的首页、鸟点、积分和相册四个核心界面',
        'GitHub 最新版本包含 birdcircle.html、proxy.py、鸟种图片、相册导出和 README',
        '旧版保留在 deferred 目录，可说明从 V1 社区入口到 V2 工具闭环的迭代路径',
        '案例证明的是从兴趣场景洞察到 AI 产品闭环设计的能力，而不是单点图像识别'
      ],
      caseStudy: {
        insightTitle: '人群洞察',
        insights: [
          {
            label: '观鸟用户',
            text: '一个望远镜就可以开始，关注鸟的珍稀种类、习性和识别知识，需求偏收集，学科气质更接近博物学。'
          },
          {
            label: '拍鸟用户',
            text: '是摄影基于对象的一个分支，鸟只是拍摄对象之一；不拘什么鸟类都可以，更在意捕捉瞬间的美丽和作品沉淀。'
          },
          {
            label: '共同入口',
            text: '两类人群都会需要地点、时间、鸟讯和记录工具，但产品承接方式不同：观鸟重知识与图鉴，拍鸟重鸟点、照片和相册。'
          },
          {
            label: '生态保护边界',
            text: '观鸟不是普通打卡，产品必须主动约束敏感物种、繁殖地和夜行鸟类的坐标与导航规则。'
          }
        ],
        comparisonTitle: 'V1 / V2 四组迭代对照',
        comparisons: [
          {
            title: '入口迭代：从兴趣社区到观鸟决策',
            left: {
              label: 'V1 社区入口',
              images: [
                'assets/images/projects/birdcircle-v1/community-photos.png',
                'assets/images/projects/birdcircle-v1/community-events.png'
              ],
              text: 'V1 先做“鸟有照片”和“鸟有活动”，把观鸟拆成可浏览、可参与的社区入口，让新人先看到同好、活动和内容氛围。'
            },
            right: {
              label: 'V2 首页决策',
              images: ['assets/images/projects/birdcircle-v2/home.png'],
              text: 'V2 把入口前移到决策场景：位置、天气、最佳观鸟时间、附近鸟点、任务和同城动态集中到首页，直接回答“现在去哪、看什么、下一步做什么”。'
            }
          },
          {
            title: '信息迭代：从问答交流到鸟点判断',
            left: {
              label: 'V1 问答 / 来信',
              images: [
                'assets/images/projects/birdcircle-v1/community-qa.png',
                'assets/images/projects/birdcircle-v1/mail-chat.png',
                'assets/images/projects/birdcircle-v1/mail-inbox.png'
              ],
              text: 'V1 用问答和拟鸟来信承接交流需求，让用户可以围绕鸟种识别、路线、装备和观察经验发问，社区关系更轻、更有趣。'
            },
            right: {
              label: 'V2 鸟点地图',
              images: ['assets/images/projects/birdcircle-v2/map.png'],
              text: 'V2 把交流中的“去哪里看”沉淀成地图判断：用鸟讯时效、鸟种标签、确认人数、导航和保护规则，帮助用户在出发前判断是否值得去。'
            }
          },
          {
            title: '成长迭代：从图鉴装备到贡献激励',
            left: {
              label: 'V1 图鉴 / 装备',
              images: [
                'assets/images/projects/birdcircle-v1/field-guide.png',
                'assets/images/projects/birdcircle-v1/gear.png'
              ],
              text: 'V1 通过图鉴和装备建立兴趣成长路径：用户既可以按地点、纲目、季节收集鸟类知识，也能围绕望远镜、相机等装备做准备。'
            },
            right: {
              label: 'V2 积分体系',
              images: ['assets/images/projects/birdcircle-v2/points.png'],
              text: 'V2 把成长路径转成行为激励：上传鸟点、补充鸟种照片、加入同城群都会获得积分，让内容贡献有即时反馈和长期目标。'
            }
          },
          {
            title: '资产迭代：从社区照片到个人记录',
            left: {
              label: 'V1 照片墙 / 鸟点记录',
              images: [
                'assets/images/projects/birdcircle-v1/community-photos.png',
                'assets/images/projects/birdcircle-v1/location-wall.png'
              ],
              text: 'V1 的照片更多是社区内容，重点在展示和互动；用户能看到同好拍了什么、在哪拍，但个人资产沉淀还不够强。'
            },
            right: {
              label: 'V2 相册归档',
              images: ['assets/images/projects/birdcircle-v2/album.png'],
              text: 'V2 把照片沉淀为个人鸟种资产：按鸟种和科目自动归档，用堆叠卡片表达多张记录，支持搜索、筛选和导出。'
            }
          }
        ],
        versionTitle: '版本迭代对照',
        versions: [
          {
            label: 'V1 地图鸟讯社区',
            images: [
              'assets/images/projects/birdcircle-v1/community-photos.png',
              'assets/images/projects/birdcircle-v1/community-events.png',
              'assets/images/projects/birdcircle-v1/community-qa.png',
              'assets/images/projects/birdcircle-v1/mail-inbox.png',
              'assets/images/projects/birdcircle-v1/field-guide.png',
              'assets/images/projects/birdcircle-v1/gear.png'
            ],
            text: '第一版先验证社区入口价值：用鸟有照片、活动、问答、来信、图鉴和装备，把观鸟拆成“看、聊、问、收集、准备装备”的兴趣社区结构。它解决的是新人如何进入圈子、如何找到同好、如何开始积累鸟类知识的问题。'
          },
          {
            label: 'V2 AI 观鸟记录工具',
            image: 'assets/images/projects/birdcircle/cover.jpg',
            text: '第二版把社区入口扩展成完整工具闭环：用户从首页获得观鸟决策，到鸟点页判断是否前往，再通过上传识别、相册归档和积分激励完成长期记录。AI 被放进真实路径里，而不是孤立功能。'
          }
        ]
      },
      screens: [
        {
          src: 'assets/images/projects/birdcircle-v2/home.png',
          title: '首页：把观鸟决策前置',
          text: '首页不是信息流堆叠，而是把位置、天气、最佳观鸟时间、附近鸟点、当季明星和积分任务放在同一屏，让新人不用先学习规则，也能知道“现在去哪、看什么、下一步做什么”。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/map.png',
          title: '鸟点：地图发现与生态保护并重',
          text: '鸟点页用颜色表达鸟讯时效，用底部卡片承载鸟种、活跃度、确认人数和导航入口；顶部保护条把敏感物种、繁殖地和夜行鸟类限制前置，避免产品只追求打卡效率。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/points.png',
          title: '积分：把贡献行为游戏化',
          text: '积分页把上传鸟点、补充鸟种照片、加入同城观鸟群等贡献行为显性化，并用观鸟装备兑换承接激励，目的是让用户从“拍完即走”转向持续贡献和复访。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/album.png',
          title: '相册：把照片变成个人鸟种资产',
          text: '相册按鸟种和科目自动归档，并用堆叠卡片表达同一鸟种的多张照片，解决手机相册里照片散乱的问题；筛选、搜索和导出让记录结果能被复盘和迁移。'
        }
      ],
      githubUrl: 'https://github.com/huinan-jiang/birdcircle'
    },
    'birdcircle-v1': {
      category: '兴趣社区迭代',
      title: '鸟有圈 V1｜地图鸟讯社区',
      media: { label: '附近鸟点 + 鸟讯分享' },
      audience: '观鸟新人、自然观察用户、城市户外兴趣用户',
      summary: '用地图鸟点和同城鸟讯，先验证观鸟兴趣社区的信息发现与分享价值。',
      role: '设计附近鸟点、鸟讯动态、鸟种标签、同城分享和兴趣社区的基础链路。',
      intro: 'V1 更关注“观鸟从哪里开始”：新人不知道附近哪里能看鸟，也缺少低门槛加入同城观鸟圈的入口。因此第一版先把地图鸟点、鸟种标签和动态分享串起来，让用户从地点发现进入兴趣社区，而不是一上来就做复杂工具。',
      background: [
        '用户侧：观鸟新人不知道附近哪里能看鸟，容易卡在兴趣入门第一步',
        '社区侧：鸟讯依赖熟人传播，缺少围绕地点和鸟种组织的信息入口',
        '产品侧：第一版需要先验证“地图发现 + 同城动态”是否能承接兴趣社区'
      ],
      goalMetrics: [
        '发现指标：用户能从当前位置看到附近鸟点和常见鸟种',
        '参与指标：用户能基于一次观察发布鸟讯，形成同城动态',
        '迭代指标：从社区分享中识别下一版应补足的识鸟、相册和激励需求'
      ],
      action: [
        '入口设计：用附近鸟点降低新人寻找观鸟地点的成本',
        '内容结构：围绕地点、鸟种、时间和用户动态组织鸟讯',
        '社区验证：用轻量发布和同城动态观察用户是否愿意持续贡献记录'
      ],
      evidence: [
        '旧版页面保留在 GitHub deferred 目录，可作为 V1 参考',
        'V1 证明的是从兴趣入口到社区内容组织的产品判断',
        'V2 在此基础上补齐 AI 识鸟、相册归档、积分和保护机制'
      ],
      githubUrl: 'https://github.com/huinan-jiang/birdcircle/tree/main/deferred'
    },
    'birdcircle-v2': {
      category: '兴趣社区迭代',
      title: '鸟有圈 V2｜AI 观鸟记录工具',
      media: { label: 'AI 识鸟 + 相册归档' },
      audience: '观鸟新人、拍鸟用户、需要长期记录和归档的自然观察者',
      summary: '把找鸟、识鸟、生成鸟讯、相册归档和积分激励串成一条观鸟记录闭环。',
      role: '设计首页任务入口、地图鸟点发现、照片上传识别、按鸟种归档、积分激励和敏感物种保护机制。',
      intro: 'V2 从社区发现继续迭代到工具闭环：用户先在首页看到附近鸟点、天气和任务，再到地图确认鸟点信息，上传照片后通过 AI 初步识鸟并同步到相册，最后用积分和兑换体系鼓励持续记录。这个版本的重点不是单点识别，而是把“发现、确认、记录、归档、激励”连成完整体验。',
      background: [
        '用户侧：观鸟新人找得到鸟点后，仍会遇到不会识别、照片散乱、记录难沉淀的问题',
        '社区侧：只靠动态分享不足以形成长期留存，需要把每次观察转成可累计资产',
        '系统侧：地图、识别、相册、积分和保护机制必须串成一条闭环，而不是孤立功能'
      ],
      goalMetrics: [
        '路径指标：从首页推荐到地图鸟点、上传识别、相册归档和积分反馈要连贯',
        '留存指标：用任务和积分把一次性拍照转成持续记录行为',
        '保护指标：敏感物种、夜行鸟类和繁殖地坐标需要模糊和导航限制'
      ],
      action: [
        '首页设计：把天气、最佳观鸟时间、附近鸟点、任务和同城动态聚合，减少新人决策成本',
        '地图设计：用颜色区分鸟讯时效，并把保护规则前置，避免用户为了追热点打扰敏感鸟类',
        '积分设计：把上传、补充照片、加入同城群等行为转成可见奖励，推动内容贡献',
        '相册设计：按鸟种和科目自动归档，解决拍摄之后难以整理和复盘的问题'
      ],
      evidence: [
        'GitHub 最新版本包含 birdcircle.html、proxy.py、鸟种图片、相册导出和 README',
        '四张 V2 截图分别覆盖首页、鸟点地图、积分体系和相册归档',
        '案例证明的是兴趣社区产品从“内容发现”到“AI 工具闭环”的迭代能力'
      ],
      screens: [
        {
          src: 'assets/images/projects/birdcircle-v2/home.png',
          title: '首页：把观鸟决策前置',
          text: '首页不是信息流堆叠，而是把位置、天气、最佳观鸟时间、附近鸟点、当季明星和积分任务放在同一屏，让新人不用先学习规则，也能知道“现在去哪、看什么、下一步做什么”。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/map.png',
          title: '鸟点：地图发现与生态保护并重',
          text: '鸟点页用颜色表达鸟讯时效，用底部卡片承载鸟种、活跃度、确认人数和导航入口；顶部保护条把敏感物种、繁殖地和夜行鸟类限制前置，避免产品只追求打卡效率。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/points.png',
          title: '积分：把贡献行为游戏化',
          text: '积分页把上传鸟点、补充鸟种照片、加入同城观鸟群等贡献行为显性化，并用观鸟装备兑换承接激励，目的是让用户从“拍完即走”转向持续贡献和复访。'
        },
        {
          src: 'assets/images/projects/birdcircle-v2/album.png',
          title: '相册：把照片变成个人鸟种资产',
          text: '相册按鸟种和科目自动归档，并用堆叠卡片表达同一鸟种的多张照片，解决手机相册里照片散乱的问题；筛选、搜索和导出让记录结果能被复盘和迁移。'
        }
      ],
      githubUrl: 'https://github.com/huinan-jiang/birdcircle'
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
      background: [
        '用户侧：远程会议和线上沟通中，用户有时需要自然离场，但直接打断会造成社交压力',
        '业务侧：这是一个小但高频、即时触发的需求，适合用极轻量工具快速验证',
        '系统侧：产品成败不在功能复杂度，而在来电界面和触发流程是否足够可信'
      ],
      goalMetrics: [
        '体验指标：交互足够接近真实来电，移动端视觉可信',
        '效率指标：用户能快速触发，不需要复杂设置',
        '验证指标：上线后能获得真实用户使用和社交传播'
      ],
      action: [
        '用户调研：通过 4 场用户访谈确认“线上场景自然离场”的真实痛点',
        '交互设计：参考真实来电弹窗设计高仿真界面',
        '快速上线：用快速开发工具完成触发流程和移动端适配',
        '产品取舍：不堆功能，只围绕“自然离场”单点做可信度'
      ],
      evidence: [
        '项目 3 小时内完成开发上线',
        '积累 300+ 用户，并在社交平台获得 6w+ 关注',
        '获得清华 Vibe Coding 黑客松最佳创意奖和最具创新解决方案奖'
      ],
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
      background: [
        '用户侧：多个供应商按项目填报发票金额时，金额、用餐类别、食材、数量和均价分散在表格里',
        '业务侧：月度汇总和历史留存容易出错，负责人需要一个比表格更稳定的轻量工具',
        '定位说明：这不是 AI 项目，但能说明把真实业务表格流程产品化的能力'
      ],
      goalMetrics: [
        '功能指标：支持项目维护、食材维护、发票金额录入、按月统计和用餐类别汇总',
        '效率指标：支持发票夹总览、历史保存和 CSV 导出，减少手工汇总',
        '落地指标：无需后端，数据存在浏览器 localStorage，适合快速上线'
      ],
      action: [
        '流程梳理：拆出项目列表、项目内食材维护、发票记录录入、日期筛选和统计汇总',
        '工具设计：把发票夹总览、历史记录和 CSV 导出收敛到一个本地网页',
        '数据处理：用 LocalStorage 承接轻量数据存储，避免为小工具引入后端复杂度',
        '作品集定位：放在“更多项目”中，不抢主 AI 作品流位置'
      ],
      evidence: [
        'Demo 已复制到 assets/demos/history/，可直接打开体验',
        '可演示项目维护、金额录入、统计汇总和 CSV 导出',
        '保留业务工具落地证据，补充展示从表格流程到产品工具的转化能力'
      ],
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
    caseStudy: modal.querySelector('#project-detail-case-study'),
    screens: modal.querySelector('#project-detail-screens'),
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

  function renderCaseStudy(element, caseStudy) {
    if (!element) return;
    element.innerHTML = '';

    if (!caseStudy) {
      element.hidden = true;
      return;
    }

    if (Array.isArray(caseStudy.insights) && caseStudy.insights.length) {
      const insightSection = document.createElement('section');
      insightSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.insightTitle || '人群洞察';

      const grid = document.createElement('div');
      grid.className = 'project-modal__insight-grid';

      caseStudy.insights.forEach(insight => {
        const item = document.createElement('article');
        item.className = 'project-modal__insight';

        const label = document.createElement('h4');
        label.textContent = insight.label;

        const text = document.createElement('p');
        text.textContent = insight.text;

        item.append(label, text);
        grid.appendChild(item);
      });

      insightSection.append(heading, grid);
      element.appendChild(insightSection);
    }

    if (Array.isArray(caseStudy.comparisons) && caseStudy.comparisons.length) {
      const compareSection = document.createElement('section');
      compareSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.comparisonTitle || '版本迭代对照';

      const list = document.createElement('div');
      list.className = 'project-modal__pair-list';

      function createVersionMedia(version, side) {
        const images = Array.isArray(version.images) && version.images.length
          ? version.images
          : [version.image].filter(Boolean);

        const wrap = document.createElement('div');
        wrap.className = `project-modal__pair-media project-modal__pair-media--${side}`;

        const badge = document.createElement('span');
        badge.textContent = version.label;
        wrap.appendChild(badge);

        const carousel = document.createElement('div');
        carousel.className = 'project-modal__carousel';
        carousel.style.setProperty('--slide-count', String(images.length || 1));
        if (images.length <= 1) carousel.classList.add('project-modal__carousel--single');

        images.forEach((src, index) => {
          const image = document.createElement('img');
          image.src = src;
          image.alt = version.label;
          image.loading = 'lazy';
          image.style.animationDelay = `${index * 3}s`;
          carousel.appendChild(image);
        });

        wrap.appendChild(carousel);
        return wrap;
      }

      function createVersionText(version, side) {
        const wrap = document.createElement('div');
        wrap.className = `project-modal__pair-text project-modal__pair-text--${side}`;

        const label = document.createElement('h4');
        label.textContent = version.label;

        const text = document.createElement('p');
        text.textContent = version.text;

        wrap.append(label, text);
        return wrap;
      }

      caseStudy.comparisons.forEach(pair => {
        const item = document.createElement('article');
        item.className = 'project-modal__pair';

        const title = document.createElement('h4');
        title.className = 'project-modal__pair-title';
        title.textContent = pair.title;

        const body = document.createElement('div');
        body.className = 'project-modal__pair-body';
        body.append(
          createVersionText(pair.left, 'left'),
          createVersionMedia(pair.left, 'left'),
          createVersionMedia(pair.right, 'right'),
          createVersionText(pair.right, 'right')
        );

        item.append(title, body);
        list.appendChild(item);
      });

      compareSection.append(heading, list);
      element.appendChild(compareSection);
    } else if (Array.isArray(caseStudy.versions) && caseStudy.versions.length) {
      const versionSection = document.createElement('section');
      versionSection.className = 'project-modal__deep-section';

      const heading = document.createElement('h3');
      heading.className = 'project-modal__deep-title';
      heading.textContent = caseStudy.versionTitle || '版本迭代对照';

      const compare = document.createElement('div');
      compare.className = 'project-modal__version-compare';

      caseStudy.versions.forEach(version => {
        const item = document.createElement('article');
        item.className = 'project-modal__version';

        const textWrap = document.createElement('div');
        textWrap.className = 'project-modal__version-text';

        const label = document.createElement('h4');
        label.textContent = version.label;

        const text = document.createElement('p');
        text.textContent = version.text;

        const imageWrap = document.createElement('div');
        imageWrap.className = 'project-modal__version-image';

        const image = document.createElement('img');
        image.src = version.image;
        image.alt = version.label;
        image.loading = 'lazy';

        imageWrap.appendChild(image);
        textWrap.append(label, text);
        item.append(textWrap, imageWrap);
        compare.appendChild(item);
      });

      versionSection.append(heading, compare);
      element.appendChild(versionSection);
    }

    element.hidden = !element.childElementCount;
  }

  function renderScreens(element, screens) {
    if (!element) return;
    element.innerHTML = '';

    if (!Array.isArray(screens) || !screens.length) {
      element.hidden = true;
      return;
    }

    const heading = document.createElement('div');
    heading.className = 'project-modal__screens-heading';
    heading.textContent = 'V2 截图与设计思路';
    element.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'project-modal__screen-grid';

    screens.forEach(screen => {
      const item = document.createElement('article');
      item.className = 'project-modal__screen';

      const image = document.createElement('img');
      image.src = screen.src;
      image.alt = screen.title;
      image.loading = 'lazy';

      const body = document.createElement('div');
      body.className = 'project-modal__screen-body';

      const title = document.createElement('h3');
      title.textContent = screen.title;

      const text = document.createElement('p');
      text.textContent = screen.text;

      body.append(title, text);
      item.append(image, body);
      grid.appendChild(item);
    });

    element.appendChild(grid);
    element.hidden = false;
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
    renderCaseStudy(fields.caseStudy, project.caseStudy);
    renderScreens(fields.screens, project.screens);

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
