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
        '用户侧：护肤用户只说“美白/祛痘/抗老/修护”时，真实决策会卡在肤质、成分禁忌和风险判断上',
        '业务侧：传统导购容易停留在热门产品推荐，无法解释推荐依据，也难以稳定处理敏感肌、孕期、刷酸期等限制',
        '系统侧：这个问题适合 AI 介入，因为它需要把自然语言需求拆成意图、约束、商品、成分和风险多层判断'
      ],
      goalMetrics: [
        '用户侧指标：每轮输出 3-5 个候选产品，并给出推荐理由、风险提示和适用建议',
        '业务侧指标：把模糊功效诉求转成可解释推荐，提升用户从咨询到商品对比的决策效率',
        '系统侧指标：商品匹配、成分召回、风险筛查和事实约束均有固定口径；信息不足时明确标注，不编造价格、库存、销量和未披露成分'
      ],
      action: [
        '数据与规则：整理功效成分、风险成分、肤质禁忌和特殊人群限制，形成可召回的筛查规则',
        '场景拆解：把用户输入拆成功效目标、肤质/禁忌、过敏史、孕期/哺乳期、刷酸期和风险偏好',
        'Agent 分层：按“意图识别 → 商品检索 → 成分筛查 → 推荐排序 → 逐品分析 → 多轮追问”组织输出',
        '评测约束：用内部自检检查意图识别、商品匹配、风险召回、事实准确性和安全合规'
      ],
      evidence: [
        '量化口径：候选商品数、商品点击率、订单渗透率、风险召回准确率和工具调用成功率可作为上线后验证指标',
        '过程证据：已接入电商导购体验短链接，可演示从功效诉求到商品推荐、成分筛查和多轮对比的完整流程',
        '过程证据：GitHub 中保留 RAG 导购方法库和 Prompt 结构，可看到需求解析、风险召回、输出格式和自检规则',
        '结果判断：这个案例证明的是“可解释导购 Agent”能力，而不是泛泛商品推荐'
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
        '用户侧：体验课后家长会持续询问到课、学情、课程选择和购买问题，卡点不在单个答案，而在服务是否连续',
        '业务侧：原链路依赖人工顾问经验，容易出现跟进断点、话术不一致、推荐时机不稳定和线索沉淀不完整',
        '系统侧：这个场景适合 AI 介入，因为它需要在多阶段链路里判断用户阶段、识别意图并推进下一步动作'
      ],
      goalMetrics: [
        '用户侧指标：家长问题能被归入明确意图，并获得符合当前阶段的回复和下一步建议',
        '业务侧指标：体验会员从课后跟进到转化线索沉淀的关键节点要完整覆盖',
        '系统侧指标：服务节点、触发条件、回复口径和转人工/兜底边界可配置、可复盘',
        '合规指标：对外展示全程脱敏，不出现真实品牌名'
      ],
      action: [
        '数据与语料：抽取脱敏顾问对话、家长高频问题和课后跟进节点，归并成可复用服务场景',
        '场景拆解：把体验会员服务拆成阶段判断、提醒触达、学情反馈、问题答疑、课程推荐和异议处理',
        'Agent 分层：用“阶段识别 → 意图路由 → 上下文抽取 → 回复生成 → 转人工兜底”承接服务流程',
        '边界处理：对品牌、用户信息和高风险表达做脱敏，只保留业务方法和产品结构'
      ],
      evidence: [
        '量化口径：课后触达覆盖率、问题解决率、转人工率、转化线索沉淀率和路由准确率可作为验证指标',
        '过程证据：已形成脱敏案例，可用用户旅程图、对话样例、意图分类表和服务流程图说明方案',
        '过程证据：首页将该项目放在主作品流左侧大位，突出“教育转化场景 + Agent 服务编排”的核心能力',
        '结果判断：案例重点证明从人工经验到可执行 Agent 服务流程的产品抽象能力'
      ],
    },
    chart: {
      category: '研究交付工作流',
      title: 'CHART AI｜研究可视化交付智能体',
      media: { label: '洞察报告 → 图表表达' },
      audience: '咨询分析师、产品经理、行业研究和竞品研究使用者',
      summary: '把“我要表达一个商业判断”转成可选择图表模型、可校验字段来源的结构化可视化交付。',
      role: '设计 Chart-AI 产品链路、图表模型库、图表推荐规则、Agent 进度状态、硬规则校验和字段来源追溯。',
      intro: 'CHART AI 独立解决“研究结论如何转成可编辑图表表达”的问题。用户输入业务判断、分析目标或已有洞察后，系统推荐合适图表模型，再根据定位图、雷达图、热力地图、漏斗图、桑基图、流程图、维恩图等模型生成结构化图表数据。生成后继续检查图表类型、字段映射、数值范围和结构完整性，让结论进入可编辑、可追溯的汇报表达。',
      demo: '当前可放 Chart-AI 运行录屏、图表模型选择页、字段来源面板和生成结果截图。',
      background: [
        '用户侧：咨询分析师和产品经理已经有洞察结论，但常卡在该用什么图表达、缺哪些字段、口径是否自洽',
        '业务侧：只做图表生成容易停留在好看，无法保证字段来源、结论可靠和后续汇报可编辑',
        '系统侧：这个问题适合 AI 介入，因为它需要把表达意图、图表模型、字段结构和校验规则串成可验证链路'
      ],
      goalMetrics: [
        '用户侧指标：输入业务判断后，系统能推荐合适图表模型并生成可编辑可视化',
        '业务侧指标：让研究结论更快进入汇报表达，减少从洞察到图表的反复沟通成本',
        '系统侧指标：图表类型、字段映射、数值范围和结构完整性必须通过检查，关键字段能回溯来源'
      ],
      action: [
        '场景拆解：把用户输入拆成表达意图、分析对象、图表模型、字段结构和校验结果',
        '工具定义：沉淀定位图、雷达图、热力图、漏斗图、桑基图、流程图等图表模型和推荐规则',
        'Agent 分层：按“意图识别 → 图表推荐 → 字段映射 → 结构生成 → 规则校验 → 来源展示”组织流程',
        '验收方式：用字段来源、结构检查和图表可编辑性作为可交付标准，而不只看生成是否好看'
      ],
      evidence: [
        '量化口径：图表推荐命中率、字段映射通过率、结构校验通过率和生成可编辑率可作为验证指标',
        '过程证据：本地项目位于 /Users/kanyun/projects/chart-ai，已形成可运行 Next.js 原型',
        '过程证据：可与桌面研究项目串联使用，但本项目独立承担图表模型推荐、字段校验和可视化交付',
        '结果判断：案例证明的是“图表模型推荐 + 字段校验 + 可编辑表达”的 Agent 产品能力，不是简单图表生成'
      ],
    },
    venn: {
      category: '研究交付工作流',
      title: 'VENN AI｜关系可视化笔记',
      media: { label: '概念 → 关系结构' },
      audience: '学生、研究者、知识管理用户和需要做概念对比的人',
      summary: '用维恩图把概念之间的交叉、差异和共性变成可编辑的知识结构。',
      role: '设计概念输入、关系整理、维恩图生成和笔记沉淀方式。',
      intro: '这个项目是研究表达方向的前置迭代：先解决“概念之间的关系怎么被看见”的问题。用户围绕多个概念输入材料或笔记后，产品把共同点、差异点和交叉区域整理成维恩图，帮助使用者从线性文字进入结构化理解。',
      demo: '后续可放维恩图生成截图、笔记编辑截图和知识整理案例。当前先保留 GitHub 入口。',
      background: [
        '用户侧：学习和研究过程中，用户常卡在多个概念之间的共性、差异和交叉关系，很难只靠线性笔记看清结构',
        '业务侧：如果知识整理缺少结构，后续讨论、复盘和迁移都会变慢，内容也难以复用到汇报或研究表达',
        '系统侧：这个问题适合 AI 介入，因为它需要把概念输入、关系抽取、结构归类和可视化表达连接起来'
      ],
      goalMetrics: [
        '用户侧指标：让用户能快速看到多个概念之间的共同点、差异点和交叉区域',
        '业务侧指标：把一次性概念整理转成可复用笔记结构，为后续研究表达和汇报复用提供基础',
        '系统侧指标：输出结果不是静态图片，而是可继续编辑和复用的知识结构'
      ],
      action: [
        '数据输入：支持用户输入多个概念、材料或笔记片段，先抽取候选概念和关键描述',
        '场景拆解：把概念材料整理为共同点、差异点和交叉关系，避免直接生成段落总结',
        '系统分层：按“概念识别 → 关系抽取 → 区域归类 → 维恩图表达 → 笔记编辑”组织流程',
        '产品边界：把 VENN AI 定位为关系可视化笔记项目，重点证明概念关系抽取和可编辑表达'
      ],
      evidence: [
        '量化口径：关系抽取准确率、结构可编辑率、用户二次修改率和图表复用率可作为验证指标',
        '过程证据：GitHub 中保留 VENN AI 项目入口',
        '过程证据：它和 CHART AI、桌面研究放在一起，能体现不同研究表达场景的产品判断',
        '结果判断：案例证明的是“知识关系可视化”的产品判断，而不是单纯图形生成'
      ],
      githubUrl: 'https://github.com/huinan-jiang/Venn'
    },
    mrw: {
      category: '研究交付工作流',
      title: '桌面研究洞察报告工作流',
      media: { label: 'Brief / 材料 → 可信洞察' },
      audience: '产品经理、咨询分析师、行业研究和竞品研究使用者',
      summary: '把分散研究材料整理成有来源、有聚类、有结论的桌面研究报告。',
      role: '设计从 Brief、样本整理、主题聚类、证据引用到报告输出的研究工作流。',
      intro: '桌面研究工作流独立解决“研究材料怎么变成可信洞察”的问题。流程从研究 Brief 出发，整理样本材料和事实来源，做主题聚类、用户画像、痛点 Top、需求机会和策略建议，并通过源校验、交叉校验和逻辑校验保证关键洞察能回溯证据。',
      demo: '已准备样例报告页面，可展示从敏感肌护肤品类消费者洞察到用户画像、痛点排序和机会判断的完整报告形态。',
      background: [
        '用户侧：产品经理和咨询分析师常常面对大量访谈、评论、社媒和竞品材料，卡在材料分散、主题不清和洞察难提炼',
        '业务侧：如果洞察没有证据来源，报告很难进入评审、汇报和后续产品决策',
        '系统侧：这个问题适合 AI 介入，因为桌面研究需要建立 Brief、样本、主题、证据和结论之间的可追溯关系'
      ],
      goalMetrics: [
        '用户侧指标：样本材料能被聚类成用户画像、核心动机、典型行为和关键痛点',
        '业务侧指标：最终产出能直接进入汇报页，支持评审和后续产品决策',
        '系统侧指标：关键洞察需要有来源支撑，并通过来源校验、交叉校验和逻辑校验减少主观总结'
      ],
      action: [
        '数据处理：从 Brief、样本材料和事实来源开始，做材料整理、脱敏、主题归并和证据标注',
        '场景拆解：把桌面研究拆成 Brief 理解、样本整理、主题聚类、洞察提炼和报告生成',
        '工作流分层：按“材料输入 → 主题聚类 → 证据绑定 → 洞察生成 → 报告输出 → 校验兜底”组织流程',
        '质量控制：要求洞察、痛点和建议都能对应原始材料或样例来源，并用来源校验、交叉校验和逻辑校验减少主观总结'
      ],
      evidence: [
        '量化口径：材料覆盖数、洞察来源覆盖率、交叉校验通过率和报告可用率可作为验证指标',
        '过程证据：已生成敏感肌护肤品类消费者洞察样例报告',
        '过程证据：报告中包含用户画像、痛点排序、典型引述和策略建议',
        '结果判断：这个项目证明的是桌面研究到结构化报告交付的能力'
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
        '用户侧：私域运营每周要持续产出社群、朋友圈和导购触达素材，卡在选题、改写、配图和审核都依赖人工',
        '业务侧：内容容易主题重复、渠道口径不稳定，图文素材与文案审核也常常割裂，导致推送节奏不稳定',
        '系统侧：这个问题适合 AI 介入，因为它可以把文案生成、图片生成、历史去重和审核状态组织成稳定工作流'
      ],
      goalMetrics: [
        '用户侧指标：运营一次性拿到 7 天 × 3 渠道 × 3 条内容，共 63 条文案',
        '业务侧指标：主题循环可控、历史内容可去重、风险表达可审核，支撑稳定推送节奏',
        '系统侧指标：文案、导购卡和配图能批量生成，并形成可复盘内容包'
      ],
      action: [
        '数据输入：定义事实输入、主题排期、渠道格式、利益点、禁用表达、历史内容和审核状态',
        '场景拆解：把私域内容生产拆成选题、渠道改写、历史去重、风险审核、图片生成和格式输出',
        '工作流分层：按“事实输入 → 主题排期 → 文案生成 → 历史去重 → 风险审核 → 图生图素材 → 渠道输出”组织流程',
        '质量控制：加入时令感知、历史去重、风险审核和渠道格式约束，让结果从临时写稿变成可复盘内容生产线'
      ],
      evidence: [
        '量化结果：一次流程可生成 7 天 × 3 渠道 × 3 条内容，共 63 条文案',
        '过程证据：已沉淀为 GitHub 中的私域内容生产工作流',
        '过程证据：可展示 7 天排期、63 条文案样例、去重规则、审核流程和素材生成链路',
        '结果判断：案例说明运营工作流自动化能力，不绑定具体公司或内部系统'
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
        '用户侧：餐饮新人需要高频练习真实顾客提问、投诉、催促和特殊需求，但门店人工陪练时间有限',
        '业务侧：一次性讲解难以保证话术稳定，培训负责人也缺少对话过程和薄弱点记录',
        '系统侧：这个问题适合 AI 介入，因为服务培训可以拆成场景、角色、回应、反馈和纠偏的任务型流程'
      ],
      goalMetrics: [
        '用户侧指标：新人能在移动端重复练习多个服务场景，并获得即时反馈',
        '业务侧指标：降低人工带教依赖，让标准话术和服务动作更容易复用',
        '系统侧指标：反馈能覆盖礼貌度、完整性、安抚能力和下一步动作，异常场景有兜底建议'
      ],
      action: [
        '语料处理：将服务场景、顾客角色、常见问题、标准动作和纠偏建议整理为可组合模块',
        '场景拆解：把陪练流程拆成场景选择、顾客扮演、逐轮回应、即时反馈和复练建议',
        'Agent 分层：按“场景识别 → 角色模拟 → 回应评估 → 反馈生成 → 兜底建议”组织训练流程',
        '脱敏处理：页面文案弱化具体品牌，只保留餐饮服务话术陪练的可迁移方法'
      ],
      evidence: [
        '量化口径：完成练习次数、反馈命中率、复练率和人工带教节省时间可作为验证指标',
        '过程证据：已有 GitHub 项目和在线 Demo',
        '过程证据：可展示移动端场景选择、对话练习、即时反馈页和训练链路',
        '结果判断：案例证明把线下培训经验拆成可执行 AI 工作流的产品能力'
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
        '用户侧：运营需要快速看清线索从触达到购买的转化损耗，但常卡在多源后台、字段分散和口径不一致',
        '业务侧：人工复制、清洗和汇总耗时 2-3 小时，容易出现字段漏取、口径不一致和历史覆盖错误',
        '系统侧：这个问题不只是展示图表，而是要先解决字段映射、来源校验、漏斗口径和异常回读'
      ],
      goalMetrics: [
        '用户侧指标：运营能稳定看到加微 UV、领取 UV、激活 UV、购买等关键节点，快速定位漏斗流失',
        '业务侧指标：把单次更新从 2-3 小时压缩到分钟级',
        '系统侧指标：覆盖 4 大业务模块和 15 个功能的数据流向，支持异常提示和回读检查'
      ],
      action: [
        '数据处理：整理多源数据字段、来源口径、清洗规则、异常值和关键转化节点',
        '场景拆解：把人工更新流程拆成数据获取、字段映射、清洗汇总、漏斗计算、异常提示和历史回读',
        '系统分层：按“数据源 → 字段映射 → 清洗规则 → 漏斗口径 → 异常校验 → 标准看板”组织输出',
        '脱敏表达：对外不出现具体公司、内部系统或后台名称，只保留可迁移的数据产品方法'
      ],
      evidence: [
        '量化结果：核心证据是从 2-3 小时人工更新压缩到分钟级',
        '过程证据：已沉淀为数据更新工作流，形成可复用字段映射、漏斗口径和标准化输出',
        '过程证据：覆盖 4 大业务模块和 15 个功能的数据流向',
        '结果判断：案例证明的是“线索转化漏斗数据看板”的数据产品能力，而不是单纯周报自动化'
      ],
      githubUrl: 'https://github.com/huinan-jiang/ai-product-skills/tree/main/%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0%E5%B7%A5%E4%BD%9C%E6%B5%81'
    },
    frame: {
      category: '场景陪练迭代',
      title: 'Alcheme 帧我：多模态情绪健康练习',
      media: { label: '视频情绪记录' },
      audience: '需要情绪觉察、情绪记录和低门槛自我观察的年轻用户',
      summary: '通过视频录制、AI 三层引导和多模态情绪分析，帮助用户系统化觉察情绪并获得个性化建议。',
      role: '定义情绪健康练习流程，设计三层递进式 Prompt、多模态情绪分析链路和 memory 管理方案。',
      intro: '项目来自抖音 AI 创变者跨年黑客松。远端 GitHub 版本定位为基于 AI 的情绪健康练习工具：用户通过视频回答三层引导问题，系统结合文字转录、语音情绪和视频情绪识别生成结构化建议。路演时获得 2 家孵化器支持，200+ 观众中 69 人愿意试用。',
      demo: '展示位支持上传 App 页面截图、三层引导流程图、多模态情绪识别流程和建议生成结果。',
      background: [
        '用户侧：年轻用户需要低门槛表达和记录情绪，但纯聊天陪伴容易卡在表达发散、难复盘和建议不稳定',
        '业务侧：情绪产品需要把表达、分析和建议组织成一次可完成、可回看的练习流程',
        '系统侧：这个问题适合 AI 介入，因为视频上传、音频转写、语音情绪、视频情绪识别和 LLM 生成需要被拆成稳定链路'
      ],
      goalMetrics: [
        '用户侧指标：用户能通过三层引导完成一次情绪表达和记录',
        '业务侧指标：路演现场验证试用意愿和孵化兴趣',
        '系统侧指标：形成“视频记录 + 多模态分析 + 个性化建议”的核心原型'
      ],
      action: [
        '数据处理：将用户视频拆成音频、画面和文本三路信号，分别用于转写、语音情绪和视频情绪识别',
        '场景拆解：把情绪练习拆成事件探索、感受细化、情绪认知、建议生成和历史回看',
        '系统分层：搭建 React Native + Expo 前端和 FastAPI 后端，拆分认证、视频处理、引导问题、建议生成和记忆管理接口',
        'LLM 编排：用 LangChain 管理三层递进式 Prompt，把开放聊天约束为稳定引导流程，并把三轮回答、情绪标签和时间戳摘要为用户记忆'
      ],
      evidence: [
        '量化结果：项目路演时获得 2 家孵化器支持',
        '量化结果：200+ 观众中 69 人愿意试用',
        '过程证据：GitHub 中保留 FastAPI 后端、Expo 前端、LangChain 引导与建议生成、多模态情绪分析相关代码'
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
        '用户侧：新人卡在不知道去哪看鸟、看见后不会识别、拍完后照片散乱，难以形成持续记录',
        '业务侧：只做同城动态无法形成长期留存，需要把每次观察转成用户资产和社区贡献',
        '系统侧：这个问题适合 AI 介入，因为地图、识别、相册、积分和保护机制需要串成一条可验证闭环',
        '生态边界：观鸟产品不能只追求打卡效率，敏感物种、繁殖地和夜行鸟类需要被产品规则保护'
      ],
      goalMetrics: [
        '用户侧指标：让新人打开首页就知道去哪、何时去、看什么和下一步做什么',
        '业务侧指标：用任务和积分把一次拍照转成持续上传、补充照片和社区参与',
        '系统侧指标：从地图发现、鸟点判断、上传识别、相册归档到积分反馈形成连续路径',
        '保护指标：把敏感物种坐标模糊、繁殖地禁用导航、夜行鸟类勿靠近前置到核心界面'
      ],
      action: [
        '场景拆解：V1 先做地图鸟点、鸟讯动态和鸟种标签，验证“地点发现 + 社区分享”的入口价值',
        '工作流分层：V2 按“首页决策 → 鸟点判断 → 上传识别 → 相册归档 → 积分反馈 → 保护规则”重构闭环',
        '工具定义：首页聚合天气、最佳观鸟时间、附近鸟点、当季明星、积分任务和同城动态，降低首次决策成本',
        '规则约束：鸟点页用时效颜色、鸟种标签、确认人数、导航入口和生态保护规则帮助用户判断是否前往'
      ],
      evidence: [
        '量化口径：首页入口点击、鸟点查看、上传识别、相册归档、积分任务完成和保护规则触发可作为验证指标',
        '过程证据：首页大图展示 V2 的首页、鸟点、积分和相册四个核心界面',
        '过程证据：GitHub 最新版本包含 birdcircle.html、proxy.py、鸟种图片、相册导出和 README，旧版保留在 deferred 目录',
        '结果判断：案例证明的是从兴趣场景洞察到 AI 产品闭环设计的能力，而不是单点图像识别'
      ],
      caseStudy: {
        insightTitle: '人群洞察',
        insights: [
          {
            label: '观鸟收集型用户',
            text: '观鸟一个望远镜就可以开始，更多地关注鸟的珍稀种类和自己本身的行为，比如我的好朋友讲到，雄性翠鸟的嘴巴是纯黑的，雌性的嘴巴是上黑下黄，所以会说翠鸟会“涂口红”。\n\n这类群体的需求上偏向于收集，学科上偏向于博物学。'
          },
          {
            label: '拍鸟摄影型用户',
            text: '拍鸟则是摄影基于对象的一个分支，鸟只是拍摄对象的一种，所以不拘什么鸟类都可以，就像在北京公园里经常出现的“长枪短炮”的摄影师，这类群体的需求偏向于捕捉瞬间的美丽。'
          }
        ],
        comparisonTitle: '四组迭代对照',
        comparisons: [
          {
            title: '入口',
            left: {
              label: '照片 / 活动',
              images: [
                'assets/images/projects/birdcircle-v1/community-photos.png',
                'assets/images/projects/birdcircle-v1/community-events.png'
              ],
              text: '用鸟有照片和鸟有活动，把观鸟拆成可浏览、可参与的社区入口。'
            },
            right: {
              label: '首页决策',
              images: ['assets/images/projects/birdcircle-v2/home.png'],
              text: '把位置、天气、最佳观鸟时间、附近鸟点、任务和同城动态集中到首页。'
            }
          },
          {
            title: '信息',
            left: {
              label: '问答 / 来信',
              images: [
                'assets/images/projects/birdcircle-v1/community-qa.png',
                'assets/images/projects/birdcircle-v1/mail-chat.png',
                'assets/images/projects/birdcircle-v1/mail-inbox.png'
              ],
              text: '承接鸟种识别、路线、装备和观察经验交流。'
            },
            right: {
              label: '鸟点地图',
              images: ['assets/images/projects/birdcircle-v2/map.png'],
              text: '用鸟讯时效、鸟种标签、确认人数、导航和保护规则帮助出发前判断。'
            }
          },
          {
            title: '收集',
            left: {
              label: '图鉴',
              images: ['assets/images/projects/birdcircle-v1/field-guide.png'],
              text: '按地点、纲目、季节收集鸟类知识。'
            },
            right: {
              label: '相册',
              images: ['assets/images/projects/birdcircle-v2/album.png'],
              note: 'drag/swipe interaction +循环轮播栈',
              text: '按鸟种和科目自动归档照片，支持搜索、筛选和导出。'
            }
          },
          {
            title: '激励',
            left: {
              label: '装备',
              images: ['assets/images/projects/birdcircle-v1/gear.png'],
              text: '围绕望远镜、相机等装备做准备。'
            },
            right: {
              label: '积分',
              images: ['assets/images/projects/birdcircle-v2/points.png'],
              text: '把上传鸟点、补充照片、加入同城群等行为转成即时反馈和长期目标。'
            }
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
        '业务侧：鸟讯依赖熟人传播，缺少围绕地点和鸟种组织的信息入口',
        '系统侧：第一版需要先验证“地图发现 + 同城动态”是否能承接兴趣社区'
      ],
      goalMetrics: [
        '用户侧指标：用户能从当前位置看到附近鸟点和常见鸟种',
        '业务侧指标：用户能基于一次观察发布鸟讯，形成同城动态',
        '系统侧指标：从社区分享中识别下一版应补足的识鸟、相册和激励需求'
      ],
      action: [
        '场景拆解：把观鸟入门拆成附近鸟点、常见鸟种、鸟讯发布和同城动态',
        '工具定义：用地图入口降低新人寻找观鸟地点的成本，用鸟种标签组织地点信息',
        '验证设计：用轻量发布和同城动态观察用户是否愿意持续贡献记录',
        '迭代承接：从社区分享中识别下一版应补足的识鸟、相册和激励需求'
      ],
      evidence: [
        '量化口径：附近鸟点查看、鸟讯发布、同城动态互动和复访可作为验证指标',
        '过程证据：旧版页面保留在 GitHub deferred 目录，可作为 V1 参考',
        '过程证据：V2 在此基础上补齐 AI 识鸟、相册归档、积分和保护机制',
        '结果判断：V1 证明的是从兴趣入口到社区内容组织的产品判断'
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
        '业务侧：只靠动态分享不足以形成长期留存，需要把每次观察转成可累计资产',
        '系统侧：这个问题适合 AI 介入，因为地图、识别、相册、积分和保护机制必须串成一条闭环，而不是孤立功能'
      ],
      goalMetrics: [
        '用户侧指标：从首页推荐到地图鸟点、上传识别、相册归档和积分反馈要连贯',
        '业务侧指标：用任务和积分把一次性拍照转成持续记录行为',
        '系统侧指标：敏感物种、夜行鸟类和繁殖地坐标需要模糊和导航限制'
      ],
      action: [
        '场景拆解：把 V2 拆成首页决策、地图判断、照片上传、AI 识鸟、相册归档、积分激励和保护规则',
        '工具定义：首页聚合天气、最佳观鸟时间、附近鸟点、任务和同城动态，减少新人决策成本',
        '系统分层：用地图颜色表达鸟讯时效，用上传识别承接记录，用相册归档沉淀资产，用积分推动贡献',
        '规则约束：把敏感物种、夜行鸟类和繁殖地保护规则前置，避免用户为了追热点打扰敏感鸟类'
      ],
      evidence: [
        '量化口径：首页入口点击、地图鸟点查看、上传识别、相册归档、积分任务完成和保护规则触发可作为验证指标',
        '过程证据：GitHub 最新版本包含 birdcircle.html、proxy.py、鸟种图片、相册导出和 README',
        '过程证据：四张 V2 截图分别覆盖首页、鸟点地图、积分体系和相册归档',
        '结果判断：案例证明的是兴趣社区产品从“内容发现”到“AI 工具闭环”的迭代能力'
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
        '业务侧：这是一个小但高频、即时触发的需求，适合用极轻量工具快速验证真实使用意愿',
        '系统侧：产品成败不在功能复杂度，而在来电界面、触发流程和移动端可信度是否足够稳定'
      ],
      goalMetrics: [
        '用户侧指标：交互足够接近真实来电，移动端视觉可信',
        '业务侧指标：上线后能获得真实用户使用和社交传播',
        '系统侧指标：用户能快速触发，不需要复杂设置'
      ],
      action: [
        '用户调研：通过 4 场用户访谈确认“线上场景自然离场”的真实痛点',
        '场景拆解：把需求限定为快速触发、高仿真来电界面和自然离场三步',
        '系统实现：用快速开发工具完成触发流程、来电界面和移动端适配',
        '产品取舍：不堆功能，只围绕“自然离场”单点做可信度'
      ],
      evidence: [
        '量化结果：项目 3 小时内完成开发上线',
        '量化结果：积累 300+ 用户，并在社交平台获得 6w+ 关注',
        '过程证据：获得清华 Vibe Coding 黑客松最佳创意奖和最具创新解决方案奖'
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
        '系统侧：这不是 AI 项目，但能说明把真实业务表格流程拆成可录入、可汇总、可导出的产品工具'
      ],
      goalMetrics: [
        '用户侧指标：支持项目维护、食材维护、发票金额录入、按月统计和用餐类别汇总',
        '业务侧指标：支持发票夹总览、历史保存和 CSV 导出，减少手工汇总',
        '系统侧指标：无需后端，数据存在浏览器 localStorage，适合快速上线'
      ],
      action: [
        '流程梳理：拆出项目列表、项目内食材维护、发票记录录入、日期筛选和统计汇总',
        '工具定义：把发票夹总览、历史记录和 CSV 导出收敛到一个本地网页',
        '系统取舍：用 LocalStorage 承接轻量数据存储，避免为小工具引入后端复杂度',
        '作品集定位：放在“更多项目”中，不抢主 AI 作品流位置'
      ],
      evidence: [
        '量化口径：录入完成率、月度汇总耗时、导出成功率和历史记录保存率可作为验证指标',
        '过程证据：Demo 已复制到 assets/demos/history/，可直接打开体验',
        '过程证据：可演示项目维护、金额录入、统计汇总和 CSV 导出',
        '结果判断：保留业务工具落地证据，补充展示从表格流程到产品工具的转化能力'
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

      const axis = document.createElement('div');
      axis.className = 'project-modal__pair-axis';

      const leftAxis = document.createElement('span');
      leftAxis.textContent = 'V1';

      const rightAxis = document.createElement('span');
      rightAxis.textContent = 'V2';

      axis.append(leftAxis, rightAxis);

      function createVersionMedia(version, side) {
        const images = Array.isArray(version.images) && version.images.length
          ? version.images
          : [version.image].filter(Boolean);

        const wrap = document.createElement('div');
        wrap.className = `project-modal__pair-media project-modal__pair-media--${side}`;

        const carousel = document.createElement('div');
        carousel.className = 'project-modal__carousel';
        if (images.length <= 1) carousel.classList.add('project-modal__carousel--single');

        images.forEach(src => {
          const image = document.createElement('img');
          image.src = src;
          image.alt = version.label;
          image.loading = 'lazy';
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

        if (version.note) {
          const note = document.createElement('p');
          note.className = 'project-modal__pair-note';
          note.textContent = version.note;
          wrap.appendChild(note);
        }

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

      compareSection.append(heading, axis, list);
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

  document.querySelectorAll('.project-card[data-project], .project-feature-card[data-project], .more-project-card[data-project]').forEach(card => {
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
