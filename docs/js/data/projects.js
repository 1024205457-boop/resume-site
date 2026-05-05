// 作品详情数据 — 每个项目的详情页内容
const PROJECT_DETAILS = {
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
    name: "抖音AI创变者跨年黑客松",
    subtitle: "多模态AI情绪识别与发泄APP",
    role: "产品经理 & 全栈开发",
    period: "2025.12 - 2026.1",
    tags: ["AI", "LangChain", "情绪识别", "黑客松"],
    award: "优秀产品",
    sections: [
      {
        type: "text",
        heading: "项目背景",
        content: "通过竞品分析和行业调研找准\"情绪卸载\"切入点，定义\"多模态AI情绪识别与发泄APP\"产品定位。用Figma设计原型，需求变更率控制在10%以内，路演当日获2家孵化器支持，200+观众中69人愿意试用。"
      },
      {
        type: "video",
        heading: "产品演示",
        src: "assets/videos/douyin-hackathon-demo.mp4",
        poster: "",
        caption: "抖音黑客松路演演示"
      },
      {
        type: "text",
        heading: "技术实现",
        content: "利用LangChain框架重写后端，优化memory存储调用逻辑并调试引导问题生成Prompt；前端通过Kimi设计交互动画，完成APP核心功能开发与部署，在阿里云其天老师的指导下进行迭代升级。"
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
