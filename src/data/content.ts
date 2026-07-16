/**
 * 站点内容常量 — 所有可配置文案集中管理
 * 修改这里即可更新站点显示内容，无需改动组件
 */

export const site = {
  name: '匠缮工坊',
  slogan: '匠心修补，浑然天成',
  description: '专注补洞修复与手工调色，让每一道瑕疵消失于无形',
} as const;

export const navLinks = [
  { href: '#services', label: '服务介绍' },
  { href: '#materials', label: '材质展示' },
  { href: '#contact', label: '联系我们' },
] as const;

export const hero = {
  title: '匠心修补，浑然天成',
  subtitle: '专注补洞修复与手工调色，让每一道瑕疵消失于无形',
  ctaText: '了解服务',
  ctaHref: '#services',
  image: '/assets/hero-craftsman.jpg',
  imageAlt: '匠人在温暖的木质工作台上进行精细修复',
} as const;

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** 在 12 栏网格中所占栏数（1-12） */
  colSpan: number;
}

export const services: ServiceItem[] = [
  {
    id: 'patch-repair',
    title: '补洞修复',
    description:
      '专注墙面、木质、大理石等各类材质的孔洞修复。采用专业填充材料与精密工艺，修复后表面平整光滑，与原有材质浑然一体，不留痕迹。无论是装修遗留的钉孔、意外磕碰，还是岁月侵蚀的破损，都能恢复如初。',
    image: '/assets/service-patch.jpg',
    imageAlt: '墙面补洞修复过程',
    colSpan: 7,
  },
  {
    id: 'color-mixing',
    title: '手工调色',
    description:
      '凭借多年经验与敏锐色感，为各种材质精准调配色彩。无论木质纹理、石材色泽还是墙面涂料，都能实现完美匹配，恢复如初。',
    image: '/assets/service-color.jpg',
    imageAlt: '手工调色过程',
    colSpan: 5,
  },
];

export interface MaterialItem {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
}

export const materials: MaterialItem[] = [
  {
    id: 'wood',
    name: '木质',
    image: '/assets/material-wood.jpg',
    imageAlt: '温暖的橡木纹理',
  },
  {
    id: 'marble',
    name: '大理石',
    image: '/assets/material-marble.jpg',
    imageAlt: '温暖的米色大理石纹理',
  },
  {
    id: 'stone',
    name: '石材',
    image: '/assets/material-stone.jpg',
    imageAlt: '天然石灰华石材纹理',
  },
  {
    id: 'metal',
    name: '金属',
    image: '/assets/material-metal.jpg',
    imageAlt: '拉丝黄铜金属表面',
  },
];

export const sectionTitles = {
  services: {
    title: '专业服务',
    subtitle: '多年匠心沉淀，为每一处细节负责',
  },
  materials: {
    title: '擅长材质',
    subtitle: '精通多种材质的修复与调色工艺',
  },
  contact: {
    title: '联系我们',
    subtitle: '期待为您解决每一处表面瑕疵',
  },
} as const;

export const contactInfo = [
  {
    key: 'address',
    label: '地址',
    value: '[Your Address Here]',
    icon: 'map-pin',
  },
  {
    key: 'phone',
    label: '电话',
    value: '[Your Phone Number]',
    icon: 'phone',
  },
  {
    key: 'email',
    label: '邮箱',
    value: '[Your Email]',
    icon: 'mail',
  },
] as const;

export const footer = {
  copyright: `© ${new Date().getFullYear()} 匠缮工坊. 保留所有权利.`,
} as const;
