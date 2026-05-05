// 公司列表 + 各公司定制内容
const COMPANIES = [
  {
    id: "bytedance",
    name: "字节跳动",
    nameEn: "ByteDance",
    accentColor: "#3C8CE7",
    greeting: "您好，字节的面试官",
    targetPosition: "AI 产品经理实习生",
    productAnalysis: {
      title: "字节跳动 AI 产品分析",
      sections: [
        {
          heading: "岗位理解",
          content: "抖音AI策略产品实习生，核心是将AI生成式能力与抖音内容生态结合，定义理想体验并推动效果提升。需要与模型算法、工程技术、评测团队紧密协作，完成从策略制定到产品上线的全流程。"
        },
        {
          heading: "我的匹配度",
          content: "【AI落地】猿辅导实习期间设计Prompt策略接入智谱大模型，实现7天×3渠道共63条文案自动生产，人力从3人降至0人，直接对应\"推动效果提升\"的要求。\n【策略思维】搭建转化漏斗（加微UV→领取UV→激活UV→购买）与流失分析模型，具备数据驱动的策略产品能力。\n【抖音生态】抖音AI创变者黑客松获\"优秀产品\"奖，用LangChain重写后端并完成部署，对抖音生态有实际参与经验。\n【技术栈】掌握Prompt Engineering、RAG、LangChain、Agent开发，能与算法和工程团队无障碍沟通。"
        },
        {
          heading: "我能贡献什么",
          content: "1. 将猿辅导积累的AI内容自动化经验迁移到抖音场景，快速上手AI+内容生态的策略工作。\n2. 用数据分析能力（多数据源采集、漏斗分析、A/B Test）支撑策略迭代和效果评测。\n3. 兼具产品设计与全栈开发能力，能独立完成从需求定义到原型验证的快速迭代。"
        }
      ]
    },
    featuredProjects: ["venn-ai", "douyin-hackathon", "tencent-hackathon", "tsinghua-hackathon"]
  },
  {
    id: "tencent",
    name: "腾讯",
    nameEn: "Tencent",
    accentColor: "#07C160",
    greeting: "您好，腾讯的面试官",
    targetPosition: "AI 产品经理实习生",
    productAnalysis: {
      title: "腾讯 AI 产品分析",
      sections: [
        { heading: "产品概览", content: "（内容即将更新）" },
        { heading: "竞争优势分析", content: "（内容即将更新）" },
        { heading: "我能贡献什么", content: "（内容即将更新）" }
      ]
    },
    featuredProjects: ["tencent-hackathon", "venn-ai", "douyin-hackathon", "tsinghua-hackathon"]
  },
  {
    id: "alibaba",
    name: "阿里巴巴",
    nameEn: "Alibaba",
    accentColor: "#FF6A00",
    greeting: "您好，阿里的面试官",
    targetPosition: "AI 产品经理实习生",
    productAnalysis: {
      title: "阿里巴巴 AI 产品分析",
      sections: [
        { heading: "产品概览", content: "（内容即将更新）" },
        { heading: "竞争优势分析", content: "（内容即将更新）" },
        { heading: "我能贡献什么", content: "（内容即将更新）" }
      ]
    },
    featuredProjects: ["venn-ai", "douyin-hackathon", "tencent-hackathon", "tsinghua-hackathon"]
  },
  {
    id: "meituan",
    name: "美团",
    nameEn: "Meituan",
    accentColor: "#FFD000",
    greeting: "您好，美团的面试官",
    targetPosition: "AI 产品经理实习生",
    productAnalysis: {
      title: "美团产品分析",
      sections: [
        {
          heading: "岗位理解",
          content: "闪购事业部产品经理，核心是从复杂的本地生活业务场景和数据中挖掘用户痛点，以结果为导向推动产品优化。岗位类型覆盖功能、策略、数据、工具等多种产品方向，注重落地能力和数据敏感度。"
        },
        {
          heading: "我的匹配度",
          content: "【数据驱动】猿辅导搭建多数据源（Pipe、Mario、Dora、BI）自动化采集与清洗流程，设计转化漏斗与流失分析模型，输出标准化周报支撑决策——直接对应\"对数据的意义很敏感\"。\n【落地能力】数据处理系统从2-3h缩短至分钟级并推动全组采纳；清华黑客松3小时开发上线获300+用户；腾讯黑客松7小时完成全流程交付——每个项目都有可量化的落地成果。\n【AI产品经验（加分项）】猿辅导AI产品实习在职，Venn AI独立全栈开发，4个AI获奖项目，掌握Prompt Engineering/RAG/LangChain/Agent——远超JD\"AI经验优先\"的门槛。\n【产品全流程】用户调研、需求分析、PRD撰写、Figma原型、A/B Test全链路覆盖。"
        },
        {
          heading: "我能贡献什么",
          content: "1. 将数据分析能力应用到闪购业务（履约效率、商品转化、用户留存），用漏斗思维驱动产品优化。\n2. 作为团队中AI能力最强的产品经理，推动AI在本地生活场景的创新应用（智能选品、需求预测、内容生成等）。\n3. 从0到1的产品落地经验可快速适配闪购的多类型产品需求。"
        }
      ]
    },
    featuredProjects: ["venn-ai", "douyin-hackathon", "tencent-hackathon", "tsinghua-hackathon"]
  },
  {
    id: "visitor",
    name: "访客 / 通用版",
    nameEn: "General",
    accentColor: "#2563EB",
    greeting: null,
    targetPosition: "AI 产品经理",
    productAnalysis: null,
    featuredProjects: ["venn-ai", "douyin-hackathon", "tencent-hackathon", "tsinghua-hackathon"]
  }
];
