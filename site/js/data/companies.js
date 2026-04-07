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
        { heading: "产品概览", content: "（内容即将更新）" },
        { heading: "竞争优势分析", content: "（内容即将更新）" },
        { heading: "我能贡献什么", content: "（内容即将更新）" }
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
      title: "美团 AI 产品分析",
      sections: [
        { heading: "产品概览", content: "（内容即将更新）" },
        { heading: "竞争优势分析", content: "（内容即将更新）" },
        { heading: "我能贡献什么", content: "（内容即将更新）" }
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
