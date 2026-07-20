// 作品详情数据 — 每个项目的详情页内容
const PROJECT_DETAILS = {
  "ai-research-workflow": {
    name: "AI 辅助市场研究工作流",
    subtitle: "快消母婴品类消费者旅程研究 — Brief到洞察报告的全链路自动化",
    role: "产品经理",
    period: "2026.6",
    tags: ["AI", "NLP", "jieba", "TF-IDF", "三元校验", "Pipeline", "Streamlit"],
    award: null,
    sections: [
      {
        type: "text",
        heading: "项目背景",
        content: "传统市场咨询中，Brief澄清、数据采集、定性归纳、可信度验证和报告撰写占项目周期60%+。本项目将「社媒舆情采集→NLP框架分析→三元校验→报告自动生成」产品化为可运行的5阶段Pipeline，Demo场景为婴幼儿配方奶粉品类的电商消费者旅程与触点研究。"
      },
      {
        type: "text",
        heading: "5 阶段 Pipeline",
        content: "BriefParser → DataCollector → FrameworkAnalyzer → TripleValidator → ReportGenerator。每个stage为纯函数+标准IO，可独立测试和替换。数据采集通过adapter接口抽象，当前使用65条模拟舆情（覆盖小红书/抖音/知乎/微博/电商/妈妈群6大数据源），后续可接真实爬虫/API。"
      },
      {
        type: "text",
        heading: "NLP 分析引擎",
        content: "基于jieba分词+TF-IDF提取高频话题关键词，自动识别消费者核心痛点（价格/过敏/配方/广告等），并对齐消费者决策旅程框架（认知→轻兴趣→深兴趣→购买）。按决策行为自动识别人群分层：深度学习型/适度研究型/快速决策型。可选接入LLM增强分析深度。"
      },
      {
        type: "text",
        heading: "三元校验机制",
        content: "每条洞察必须通过三重检验：源校验（洞察是否绑定有效source_id，jieba语义相关性评估）、交叉校验（多条原声情感方向一致性+数据源多样性）、逻辑校验（正则检测过度推断，可选LLM辅助判断推理链跳跃）。按置信度分级（high≥0.75直接入报告/medium标注置信度/low进入人工复核队列）。"
      },
      {
        type: "text",
        heading: "Streamlit 可视化界面",
        content: "提供交互式Streamlit前端，包含数据概览（情感分布/平台分布/TF-IDF关键词）、洞察分析（原声溯源）、三元校验（置信度分布图）、消费者旅程漏斗图、原始数据筛选五大模块，支持自定义Brief和数据上传。"
      },
      {
        type: "links",
        heading: "相关链接",
        items: [
          { label: "GitHub 源码", url: "https://github.com/huinan-jiang/intership1-marking-consulting", icon: "github" },
          { label: "方法论文档", url: "https://github.com/huinan-jiang/intership1-marking-consulting/blob/main/docs/methodology.md", icon: "external" }
        ]
      }
    ]
  },

  "ai-product-eval": {
    name: "AI 产品体验评测系统",
    subtitle: "黄金集设计→LLM-as-Judge评分→低分归因→标杆回复生成→复测验证",
    role: "产品经理",
    period: "2026.6",
    tags: ["AI", "LLM-as-Judge", "MOS评分", "评测体系", "归因分析", "Streamlit"],
    award: null,
    sections: [
      {
        type: "text",
        heading: "项目背景",
        content: "AI产品（如旅游规划助手）的体验质量难以用传统指标衡量。本项目设计了一套面向用户体验的评测方法论，覆盖从评测设计到产品优化的完整闭环：黄金集设计→自动评分→低分归因→标杆回复生成→复测验证，帮助产品团队系统化发现和解决AI产品体验问题。"
      },
      {
        type: "text",
        heading: "黄金评测集设计",
        content: "20条测试用例覆盖简单指令（单目标信息查询）与复杂指令（多人出行/预算约束/特殊需求/多日行程）各半。每条用例附带用户画像（性别/年龄段/经验水平）和expected_aspects，实现分层化、可评估的测试覆盖。"
      },
      {
        type: "text",
        heading: "四维度 MOS 评分",
        content: "设计准确性(Accuracy)/完整性(Completeness)/自然度(Naturalness)/可用性(Usability)四维度加权评分体系。权重按用户经验水平动态调整：新手侧重自然度+可用性（各0.3），专家侧重准确性（0.4）+完整性（0.3）。支持LLM-as-Judge与规则引擎双通道，无API Key时自动fallback。"
      },
      {
        type: "text",
        heading: "低分归因与标杆回复",
        content: "自动筛选MOS<3.5的case，按维度/场景/用户类型三个视角聚类分析。归因标签体系包含8类（多约束冲突/预算不合理/信息缺失/过于笼统/行程不完整/用户不适配等）。针对每个低分case生成标杆回复（优质回复样例），作为优化建议交付技术团队用于Prompt优化或模型微调。"
      },
      {
        type: "text",
        heading: "Streamlit 可视化界面",
        content: "提供交互式Streamlit前端，包含评分概览（四维度雷达图+MOS柱状图）、低分归因（维度均分对比/场景聚类/归因标签明细）、标杆回复展示、黄金集浏览四大模块，支持动态调整低分阈值实时查看变化。"
      },
      {
        type: "links",
        heading: "相关链接",
        items: [
          { label: "GitHub 源码", url: "https://github.com/huinan-jiang/intership2-marking-consulting", icon: "github" },
          { label: "方法论文档", url: "https://github.com/huinan-jiang/intership2-marking-consulting/blob/main/docs/methodology.md", icon: "external" }
        ]
      }
    ]
  },

  "venn-ai": {
    name: "Venn AI 维恩图智能笔记",
    subtitle: "让概念交叉关系可视化的 AI 笔记工具",
    role: "产品经理 & 全栈开发",
    period: "2026.3",
    tags: ["AI", "Next.js", "D3.js", "GLM API", "全栈"],
    award: null,
    sections: [
      {
        type: "text",
        heading: "项目背景",
        content: "思维导图只能表达树状层级、无法呈现概念交叉关系。Venn AI 定义\"收集+整理\"双模式产品架构，让用户通过关键词由AI展开子概念与交叉关系，或上传笔记忠于原文提取结构，已上线覆盖学科对比、考试复习、竞品分析等7大场景。"
      },
      {
        type: "video",
        heading: "产品演示",
        src: "assets/videos/venn-ai-demo.mp4",
        poster: "",
        caption: "Venn AI 核心功能演示"
      },
      {
        type: "text",
        heading: "技术架构",
        content: "采用 Next.js + D3.js + SQLite 技术栈，接入智谱GLM大模型API，针对双模式分别设计Prompt策略，实现自然语言到结构化维恩图JSON的端到端生成，支持.txt/.md/.docx多格式文件上传。"
      },
      {
        type: "links",
        heading: "相关链接",
        items: [
          { label: "GitHub 源码", url: "#", icon: "github" },
          { label: "在线体验", url: "#", icon: "external" }
        ]
      }
    ]
  },

  "douyin-hackathon": {
    name: "Alcheme 帧我 — 抖音AI创变者跨年黑客松",
    subtitle: "AI驱动的游戏化情绪发泄与多模态情绪记录APP",
    role: "产品经理 & 全栈开发",
    period: "2025.12 - 2026.1",
    tags: ["AI", "LangChain", "情绪识别", "多模态", "游戏化", "黑客松"],
    award: "优秀产品",
    sections: [
      {
        type: "text",
        heading: "项目背景",
        content: "通过竞品分析和行业调研找准\"情绪卸载\"切入点，定义\"多模态AI情绪识别与发泄APP\"产品定位。用Figma设计原型，需求变更率控制在10%以内，路演当日获2家孵化器支持，200+观众中69人愿意试用。"
      },
      {
        type: "text",
        heading: "产品定位",
        content: "Alcheme 是一款AI驱动的游戏化、定制化情绪发泄与多模态情绪记录软件。在情绪发泄上，通过对话+AI即时定制发泄主体，生成游戏，实现创意化、即时化的情绪释放；在情绪记录上，采用多模态+AI多媒体加工与生成，低门槛、客观观察自身情绪，生成可视化日记和手账卡，培养良好的心理训练习惯。产品名Alcheme源自中世纪炼金术理念（Alchemy + Me），核心在于\"以过程炼价值\"：将情绪视为原材料，通过觉察（对话）→ 理解（分析）→ 转化（仪式）三步完成\"炼金\"。"
      },
      {
        type: "text",
        heading: "核心功能 — 情绪发泄模式",
        content: "【短链路简单输入】规避多模态输入时间较长的弊端，只需选择模式、输入简短文字即可启动，适应情绪消化的即时性。\n\n【AI生成定制化游戏：情绪打地鼠】基于用户对话内容，AI自动提取情绪对象关键词（如\"被狗咬了\"→小狗、\"老板骂我\"→领带），动态生成带有对应面具的地鼠角色。用户通过拍打地鼠进行趣味化的情绪宣泄。设计理念来自心理学中的\"象征性宣泄\"——用户拍打的不是真正的对象，而是情绪的象征符号，在安全的游戏环境中释放压力。"
      },
      {
        type: "text",
        heading: "核心功能 — 情绪记录模式",
        content: "【语音/视频通话：多模态情绪感知】实现语音情感分析（语速/音调/停顿）、面部微表情追踪、文本情绪分类三通道情绪融合感知，为个性化建议提供准确依据。\n\n【三层递进式AI情绪引导】AI扮演\"心理引导提问师\"，三轮对话中完成从事件到情绪的完整觉察闭环：事件探索（结合环境信息）→ 情绪体验细化 → 情绪分类与认知。每次提问结合实时环境信息和用户画像，实现千人千面的个性化引导。\n\n【今日炼金手账】每日对话结束后AI自动生成治愈风手账卡片：20-30字诗意化情绪总结 + AI文生图主题卡片 + 打印收藏功能。\n\n【锤碎与重生仪式】锤碎石头→收集碎片→投入炉中→浇灌重生，寓意愤怒不是要消灭的敌人，而是可以被转化为新生力量的原材料。"
      },
      {
        type: "text",
        heading: "科学建议引擎",
        content: "基于认知行为疗法（CBT）与积极心理学，完成对话和仪式后生成三部分内容：共情回应（2句话让用户感到被理解）、可尝试的微行动（焦虑→5-4-3-2-1感官接地法、愤怒→冷水洗脸+10秒呼吸法、悲伤→自我肯定、疲惫→靠墙拉伸）、推荐视频关键词（用于B站/抖音搜索情绪缓解内容）。"
      },
      {
        type: "text",
        heading: "目标用户与市场",
        content: "情绪记录类APP有效目标用户8300万-1.21亿，月活2900万-4200万；情绪发泄类APP有效目标用户6600万-1.04亿，月活2200万-3500万。数据来源：艾瑞咨询、易观分析、QuestMobile 2025年行业报告。"
      },
      {
        type: "text",
        heading: "技术架构 — AI服务矩阵",
        content: "融合5类AI能力覆盖对话、语音、视觉、生成全链路：LLM对话引擎（情绪引导+建议生成）、语音情感分析（语速/音调/停顿识别）、视觉情绪识别（面部微表情追踪）、文生图（手账卡片生成）、游戏内容生成（关键词提取+角色动态生成）。统一编排层通过LangChain封装，便于Prompt管理、模型热切换及后续扩展RAG/Agent能力。"
      },
      {
        type: "video",
        heading: "产品演示",
        src: "assets/videos/douyin-hackathon-demo.mp4",
        poster: "",
        caption: "Alcheme 帧我 产品演示"
      },
      {
        type: "links",
        heading: "相关链接",
        items: [
          { label: "GitHub 源码", url: "https://github.com/huinan-jiang/alcheme3.0", icon: "github" },
          { label: "项目文档", url: "#", icon: "document" }
        ]
      }
    ]
  },

  "tencent-hackathon": {
    name: "腾讯云Agent Mini-hackathon",
    subtitle: "敏敏肌选品 — 护肤品成分核验导购Agent",
    role: "产品经理 & 全栈开发",
    period: "2025.12",
    tags: ["RAG", "Agent", "微信小程序", "腾讯元器"],
    award: "三等奖",
    sections: [
      {
        type: "text",
        heading: "项目背景",
        content: "通过行业报告归纳\"海外护肤品成分核验难\"痛点，洞察71%成分党的消费潜力，定义\"敏敏肌选品\"导购Agent产品定位，梳理了解-搜索-电商操作闭环并编写PRD。"
      },
      {
        type: "video",
        heading: "产品演示",
        src: "assets/videos/tencent-hackathon-demo.mp4",
        poster: "",
        caption: "腾讯云Agent黑客松演示"
      },
      {
        type: "text",
        heading: "技术实现",
        content: "在腾讯元器平台基于RAG机制设计Prompt与知识库，调整API对接策略，7小时内完成从产品设计到微信小程序上线的全流程交付。"
      },
      {
        type: "links",
        heading: "相关链接",
        items: [
          { label: "项目文档", url: "#", icon: "document" }
        ]
      }
    ]
  },

  "tsinghua-hackathon": {
    name: "清华vibe coding黑客松",
    subtitle: "\"真的很忙\" — 来电模拟脱身工具",
    role: "产品经理",
    period: "2025.12",
    tags: ["Cursor", "创意产品", "小红书6w+"],
    award: "最佳创意",
    sections: [
      {
        type: "text",
        heading: "项目背景",
        content: "通过4场用户访谈精准定义\"线上会议难以优雅离场\"痛点，参考微信弹窗设计高仿真来电模拟软件\"真的很忙\"，3小时内用Cursor完成开发上线，目前拥有300+忠实用户，小红书获6w+用户关注。"
      },
      {
        type: "video",
        heading: "产品演示",
        src: "assets/videos/tsinghua-hackathon-demo.mp4",
        poster: "",
        caption: "\"真的很忙\"产品演示"
      },
      {
        type: "links",
        heading: "相关链接",
        items: [
          { label: "小红书主页", url: "#", icon: "external" }
        ]
      }
    ]
  }
};
