/**
 * 站点内容常量 — 所有可配置文案集中管理
 * 所有文案使用 { zh, en } 双语结构，由 i18n 系统按语言模式取值
 */

import type { LocalizedText } from '@/i18n/LanguageContext';

export const site = {
  name: 'KLB瓷砖家具美容',
  nameEn: 'KLB Tile & Furniture Beauty',
  slogan: {
    zh: '匠心修补，浑然天成',
    en: 'Craftsman Repair, Seamless Restoration',
  } as LocalizedText,
  description: {
    zh: '专注补洞修复与手工调色，让每一道瑕疵消失于无形',
    en: 'Specialized in hole repair and custom color mixing, making every flaw disappear',
  } as LocalizedText,
} as const;

export const navLinks: { href: string; label: LocalizedText }[] = [
  {
    href: '#services',
    label: { zh: '服务介绍', en: 'Services' },
  },
  {
    href: '#materials',
    label: { zh: '材质展示', en: 'Materials' },
  },
  {
    href: '#contact',
    label: { zh: '联系我们', en: 'Contact' },
  },
];

export const casesNavLabel: LocalizedText = {
  zh: '真实案例',
  en: 'Cases',
};

export const hero = {
  title: {
    zh: '匠心修补，浑然天成',
    en: 'Craftsman Repair, Seamless Restoration',
  } as LocalizedText,
  subtitle: {
    zh: '专注补洞修复与手工调色，让每一道瑕疵消失于无形',
    en: 'Specialized in hole repair and custom color mixing, making every flaw disappear',
  } as LocalizedText,
  ctaText: { zh: '了解服务', en: 'Explore Services' } as LocalizedText,
  ctaHref: '#services',
  image: '/assets/hero-craftsman.jpg',
  imageAlt: { zh: '匠人在温暖的木质工作台上进行精细修复', en: 'Craftsman performing fine repair on a warm wooden workbench' } as LocalizedText,
} as const;

export interface ServiceItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  /** 在 12 栏网格中所占栏数（1-12） */
  colSpan: number;
}

export const services: ServiceItem[] = [
  {
    id: 'patch-repair',
    title: { zh: '补洞修复', en: 'Hole Repair' },
    description: {
      zh: '专注木质、大理石等各类材质的孔洞修复。采用专业填充材料与精密工艺，修复后表面平整光滑，与原有材质浑然一体，不留痕迹。无论是装修遗留的钉孔、意外磕碰，还是岁月侵蚀的破损，都能恢复如初。',
      en: 'Expert repair for wood, marble, and tiles — nail holes, dents, and damage restored seamlessly.',
    },
    image: '/assets/service-patch-v2.jpg',
    imageAlt: { zh: '补洞修复过程', en: 'Hole repair process' },
    colSpan: 7,
  },
  {
    id: 'color-mixing',
    title: { zh: '手工调色', en: 'Custom Color Mixing' },
    description: {
      zh: '凭借多年经验与敏锐色感，为各种材质精准调配色彩。无论木质纹理、石材色泽还是墙面涂料，都能实现完美匹配，恢复如初。',
      en: 'Precise color matching for wood, stone, and paint — restored to look brand new.',
    },
    image: '/assets/service-color.jpg',
    imageAlt: { zh: '手工调色过程', en: 'Custom color mixing process' },
    colSpan: 5,
  },
];

/** 服务覆盖区域（中英双语） */
export const serviceAreas: { zh: string; en: string }[] = [
  { zh: '吉隆坡', en: 'Kuala Lumpur' },
  { zh: '雪兰莪', en: 'Selangor' },
  { zh: '森美兰', en: 'Negeri Sembilan' },
];

export const serviceAreasTitle: LocalizedText = {
  zh: '服务区域',
  en: 'Service Areas',
};

export interface MaterialItem {
  id: string;
  name: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
}

export const materials: MaterialItem[] = [
  {
    id: 'wood',
    name: { zh: '木质', en: 'Wood' },
    image: '/assets/material-wood.jpg',
    imageAlt: { zh: '温暖的橡木纹理', en: 'Warm oak grain' },
  },
  {
    id: 'marble',
    name: { zh: '大理石', en: 'Marble' },
    image: '/assets/material-marble.jpg',
    imageAlt: { zh: '温暖的米色大理石纹理', en: 'Warm beige marble texture' },
  },
  {
    id: 'tiles',
    name: { zh: '瓷砖', en: 'Tiles' },
    image: '/assets/material-stone.jpg',
    imageAlt: { zh: '瓷砖纹理', en: 'Tile texture' },
  },
];

export const sectionTitles = {
  services: {
    title: { zh: '专业服务', en: 'Our Services' },
    subtitle: {
      zh: '多年匠心沉淀，为每一处细节负责',
      en: 'Years of craftsmanship, accountable for every detail',
    },
  },
  materials: {
    title: { zh: '擅长材质', en: 'Materials We Master' },
    subtitle: {
      zh: '精通多种材质的修复与调色工艺',
      en: 'Expert repair & color craft',
    },
  },
  contact: {
    title: { zh: '联系我们', en: 'Contact Us' },
    subtitle: {
      zh: '期待为您解决每一处表面瑕疵',
      en: 'Looking forward to solving every surface flaw for you',
    },
  },
} as const;

export interface ContactItem {
  key: string;
  label: LocalizedText;
  value: string;
  icon: string;
  /** 可选链接：电话跳 WhatsApp、邮箱跳 mailto */
  href?: string;
}

export const contactInfo: ContactItem[] = [
  {
    key: 'whatsapp',
    label: { zh: 'WhatsApp', en: 'WhatsApp' },
    value: '0162523524',
    icon: 'phone',
    // 点击跳转 WhatsApp（马来西亚号码 +60，去掉前导 0）
    href: 'https://wa.me/60162523524',
  },
  {
    key: 'email',
    label: { zh: '邮箱', en: 'Email' },
    value: 'ck.887@outlook.com',
    icon: 'mail',
    href: 'mailto:ck.887@outlook.com',
  },
  {
    key: 'rednote',
    label: { zh: '小红书', en: 'RedNote' },
    value: 'KLB瓷砖家具美容',
    icon: 'link',
    href: 'https://www.rednote.com/user/profile/61ab537d000000001000d825?xsec_token=ABRc08PgYdAsJkKuCcJMuqOzCz7IOoGQubA6jObn8w90I=&xsec_source=pc_note',
  },
];

/** 联系表单相关文案 */
export const contactFormText = {
  nameLabel: { zh: '姓名', en: 'Name' },
  namePlaceholder: { zh: '您的称呼', en: 'Your name' },
  nameError: { zh: '请输入您的姓名', en: 'Please enter your name' },
  phoneLabel: { zh: '电话', en: 'Phone' },
  phonePlaceholder: { zh: '便于我们联系您', en: 'So we can reach you' },
  phoneError: { zh: '请输入联系电话', en: 'Please enter your phone number' },
  phoneFormatError: { zh: '电话格式不正确', en: 'Invalid phone format' },
  messageLabel: { zh: '留言', en: 'Message' },
  messagePlaceholder: { zh: '简要描述您的修复需求', en: 'Briefly describe your repair needs' },
  messageError: { zh: '请输入您的需求', en: 'Please enter your request' },
  messageShortError: { zh: '留言至少 5 个字', en: 'Message must be at least 5 characters' },
  submit: { zh: '提交咨询', en: 'Submit Inquiry' },
  success: {
    zh: '咨询已提交，我们会尽快与您联系。',
    en: 'Inquiry submitted. We will contact you soon.',
  },
} as const;

export const footer = {
  copyright: {
    zh: `© ${new Date().getFullYear()} KLB瓷砖家具美容. 保留所有权利.`,
    en: `© ${new Date().getFullYear()} KLB Tile & Furniture Beauty. All rights reserved.`,
  } as LocalizedText,
} as const;

/** 滚动指示器 aria-label */
export const scrollDownLabel: LocalizedText = {
  zh: '向下滚动',
  en: 'Scroll down',
};

/** 移动菜单按钮 aria-label */
export const menuLabels = {
  open: { zh: '打开菜单', en: 'Open menu' },
  close: { zh: '关闭菜单', en: 'Close menu' },
} as const;

/** 真实案例页文案 */
export const casesPageText = {
  backHome: { zh: '返回首页', en: 'Back to Home' },
  title: { zh: '真实案例', en: 'Real Cases' },
  subtitle: {
    zh: '修复前后的真实对比，匠心效果一目了然',
    en: 'Real before/after comparisons — the craftsmanship speaks for itself',
  },
  before: { zh: '之前', en: 'Before' },
  after: { zh: '之后', en: 'After' },
  caseLabel: { zh: '案例', en: 'Case' },
  desc: { zh: '修复前后对比', en: 'Before / After' },
} as const;
