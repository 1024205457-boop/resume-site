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
      title: '鸟有圈：AI 观鸟记录工具',
      media: { label: '地图鸟讯 + AI 识鸟' },
      audience: '观鸟新人、自然观察用户、拍鸟和记录型兴趣用户',
      summary: '把找鸟、识鸟、生成鸟讯和照片归档串成一条观鸟记录闭环。',
      role: '设计地图鸟点发现、照片上传识别、鸟讯生成、按鸟种归档、积分激励和敏感物种保护机制。',
      intro: '项目最新版本在 GitHub birdcircle。产品基于地图鸟讯与 AI 相册解决四个痛点：新人不知道附近哪里能看鸟、遇到鸟不会识别、照片散落在手机相册里、鸟讯和照片整理割裂。核心链路是发现附近鸟点 → 上传照片和位置 → AI 初步识鸟 → 生成鸟讯 → 同步到相册 → 获得积分。技术上使用 Leaflet + 高德地图瓦片、百度 AI 图像识别代理、JSZip 相册导出，并为敏感物种、夜行鸟类和繁殖地设计坐标模糊与导航限制。',
      demo: 'GitHub 已包含 birdcircle.html、app.py、proxy.py、鸟种图片和 README；展示位后续可上传地图页、上传识别页、相册归档页和保护机制截图。',
      background: [
        '用户侧：观鸟新人不知道附近哪里能看鸟，遇到鸟也不一定能识别',
        '业务侧：兴趣社区如果只做发帖，无法解决照片散落、鸟讯整理割裂和持续记录的问题',
        '系统侧：观鸟产品需要把地图、识别、相册、鸟讯和保护机制串成闭环'
      ],
      goalMetrics: [
        '用户指标：从发现附近鸟点到上传照片、AI 初步识别、生成鸟讯和同步相册要连贯',
        '社区指标：用积分激励和按鸟种归档提升持续记录意愿',
        '安全指标：敏感物种、夜行鸟类和繁殖地坐标需要模糊和导航限制'
      ],
      action: [
        '产品链路：设计地图鸟点发现、照片上传识别、鸟讯生成、按鸟种归档和积分激励',
        '技术实现：使用 Leaflet + 高德地图瓦片、百度 AI 图像识别代理和 JSZip 相册导出',
        '保护机制：把敏感物种保护前置到定位、展示和导航环节，而不是事后提醒',
        '社区闭环：让找鸟、识鸟、记录和归档都服务于长期兴趣社区'
      ],
      evidence: [
        '最新版本已在 GitHub birdcircle',
        '仓库包含 birdcircle.html、app.py、proxy.py、鸟种图片和 README',
        '可直接看到地图页、上传识别、相册导出和敏感物种坐标模糊等核心能力'
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
