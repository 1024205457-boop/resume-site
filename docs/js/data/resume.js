// 通用简历数据 — 所有公司共用（数据来源：简历-姜慧男-AI产品经理-new.docx）
const RESUME_DATA = {
  name: "姜慧男",
  title: "AI 产品经理",
  tagline: "港大市场学硕士 | 厦大双学位 | 3段实习 + 4个获奖项目",

  contact: {
    availability: "ASAP, 6个月及以上",
    phone: "15241569480",
    wechat: "15241569480",
    email: "jianghuinan@connect.hku.hk",
    linkedin: "https://www.linkedin.com/in/lily-jiang-325913325",
    targetRole: "AI产品经理"
  },

  education: [
    {
      school: "香港大学",
      college: "商学院",
      degree: "市场学硕士",
      direction: "量化营销方向",
      period: "2024.9 - 2026.12",
      gpa: "3.8/4.3",
      honors: ["Dean's Honours List", "学业优秀奖学金（36,000港币）"],
      language: "英语（雅思7分）"
    },
    {
      school: "厦门大学",
      college: "管理学院",
      degree: "市场营销&人类学（双学位）本科",
      direction: "社会心理学方向",
      period: "2020.9 - 2024.6",
      gpa: "3.6/4.0",
      honors: ["优秀学生干部", "\"挑战杯\"省银奖", "\"互联网+\"校金奖", "4项校级奖学金"]
    }
  ],

  skills: [
    {
      category: "AI开发能力",
      items: ["Prompt Engineering", "RAG", "LangChain", "Agent开发", "Workflow自动化"]
    },
    {
      category: "AI工具应用",
      items: ["Claude Code", "Cursor", "Coze", "腾讯元器"]
    },
    {
      category: "产品能力",
      items: ["用户调研", "需求分析", "PRD撰写", "Figma原型设计", "X-mind流程梳理", "A/B Test"]
    }
  ],

  experience: [
    {
      id: "yuanfudao",
      company: "猿辅导（斑马百科）",
      role: "AI产品",
      period: "2026.2 - 至今",
      highlights: [
        {
          label: "产品设计",
          content: "针对团队周报数据处理耗时2-3h的问题，与业务侧梳理4大业务模块15个功能的操作流程与数据流向，完成需求拆解、信息架构设计与交互原型输出，落地数据处理系统将流程缩短至分钟级，推动全组采纳使用。"
        },
        {
          label: "AI应用落地",
          content: "为替代每周3天的私域文案与素材人工产出，设计Prompt策略（主题循环、时令感知、历史去重），接入智谱大模型API实现7天×3渠道共63条文案自动生产；对接魔袋AI图生图批量生成导购卡与配图，打通\"生成→审核→推送\"全链路，人力从3人降至0人，工作成果得到斑马百科负责人郭常圳的肯定。"
        },
        {
          label: "数据分析",
          content: "搭建多数据源（Pipe、Mario、Dora、BI）自动化采集与清洗流程，设计转化漏斗（加微UV→领取UV→激活UV→购买）与流失分析模型，输出标准化周报表格支撑运营团队决策。"
        }
      ],
      hasDetailPage: false
    }
  ],

  projects: [
    {
      id: "ai-research-workflow",
      name: "AI 辅助市场研究工作流",
      role: "产品经理",
      period: "2026.6",
      award: null,
      highlights: [
        {
          label: "工作流设计",
          content: "搭建 Brief解析→数据采集→NLP框架分析→三元校验→HTML报告自动生成 的5阶段Pipeline，将快消母婴品类消费者旅程研究全流程产品化。"
        },
        {
          label: "NLP分析引擎",
          content: "基于 jieba分词 + TF-IDF 提取话题关键词，自动识别消费者痛点并对齐决策旅程框架（认知→兴趣→决策→购买→分享），可选接入 LLM 增强分析深度。"
        },
        {
          label: "三元校验机制",
          content: "设计源校验（语义相关性）+ 交叉校验（情感一致性+数据源多样性）+ 逻辑校验（过度推断检测）三重质量保障，洞察有源率 100%，校验通过率 62%+。"
        }
      ],
      hasDetailPage: true
    },
    {
      id: "ai-product-eval",
      name: "AI 产品体验评测系统",
      role: "产品经理",
      period: "2026.6",
      award: null,
      highlights: [
        {
          label: "评测方法论",
          content: "设计黄金评测集→LLM-as-Judge四维度MOS评分→低分归因→标杆回复生成→复测验证的完整评测闭环，覆盖简单/复杂指令各半，按用户画像分层评估。"
        },
        {
          label: "评分体系",
          content: "四维度加权MOS评分（准确性/完整性/自然度/可用性），按用户经验水平动态调整权重（新手侧重可用性，专家侧重准确性），支持LLM-as-Judge与规则引擎双通道。"
        },
        {
          label: "归因与优化",
          content: "自动识别8类归因标签（多约束冲突/预算不合理/信息缺失等），按维度/场景/用户类型聚类分析，生成针对性标杆回复作为优化建议交付。"
        }
      ],
      hasDetailPage: true
    },
    {
      id: "venn-ai",
      name: "Venn AI 维恩图智能笔记",
      role: "产品经理 & 全栈开发",
      period: "2026.3",
      award: null,
      highlights: [
        {
          label: "产品设计",
          content: "针对思维导图只能表达树状层级、无法呈现概念交叉关系的痛点，定义\"收集+整理\"双模式产品架构（关键词由AI展开子概念与交叉关系/上传笔记忠于原文提取结构），设计2/3层嵌套生成策略与手动补充机制，已上线覆盖学科对比、考试复习、竞品分析等7大场景。"
        },
        {
          label: "AI能力设计",
          content: "接入智谱GLM大模型API，针对双模式分别设计Prompt策略（收集模式允许AI知识扩展，整理模式约束严格忠于原文），实现自然语言到结构化维恩图JSON的端到端生成，支持.txt/.md/.docx多格式文件上传。"
        },
        {
          label: "全栈开发",
          content: "采用Next.js + D3.js + SQLite技术栈，独立开发可缩放、可编辑的交互式嵌套维恩图组件（简洁/透视双视图、节点增删改、深入分析二次展开），完成部署上线并开源至GitHub。"
        }
      ],
      hasDetailPage: true
    },
    {
      id: "douyin-hackathon",
      name: "抖音AI创变者跨年黑客松",
      role: "产品经理 & 全栈开发",
      period: "2025.12 - 2026.1",
      award: "优秀产品",
      highlights: [
        {
          label: "产品定义",
          content: "通过竞品分析和行业调研找准\"情绪健康练习\"切入点，定义\"AI引导对话+多模态情绪分析\"产品定位；用Figma设计原型，需求变更率控制在10%以内，路演当日获2家孵化器支持，200+观众中69人愿意试用。"
        },
        {
          label: "AI应用开发",
          content: "利用LangChain框架重写后端，优化memory存储调用逻辑并调试引导问题生成Prompt；前端通过Kimi设计交互动画，完成APP核心功能开发与部署，在阿里云其天老师的指导下进行迭代升级。"
        }
      ],
      hasDetailPage: true
    },
    {
      id: "tencent-hackathon",
      name: "腾讯云Agent Mini-hackathon",
      role: "产品经理 & 全栈开发",
      period: "2025.12",
      award: "三等奖",
      highlights: [
        {
          label: "产品定义",
          content: "通过行业报告归纳\"海外护肤品成分核验难\"痛点，洞察71%成分党的消费潜力，定义\"敏敏肌选品\"导购Agent产品定位，梳理了解-搜索-电商操作闭环并编写PRD。"
        },
        {
          label: "AI Agent开发",
          content: "在腾讯元器平台基于RAG机制设计Prompt与知识库，调整API对接策略，7小时内完成从产品设计到微信小程序上线的全流程交付。"
        }
      ],
      hasDetailPage: true
    },
    {
      id: "tsinghua-hackathon",
      name: "清华vibe coding黑客松",
      role: "产品经理",
      period: "2025.12",
      award: "最佳创意",
      highlights: [
        {
          label: "产品设计与落地",
          content: "通过4场用户访谈精准定义\"线上会议难以优雅离场\"痛点，参考微信弹窗设计高仿真来电模拟软件\"真的很忙\"，3小时内用Cursor完成开发上线，目前拥有300+忠实用户，小红书获6w+用户关注。"
        }
      ],
      hasDetailPage: true
    }
  ]
};
