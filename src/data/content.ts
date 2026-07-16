/**
 * 站点内容常量 — 所有可配置文案集中管理
 * 修改这里即可更新站点显示内容，无需改动组件
 */

export const site = {
  name: 'KLB工坊',
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
  /** 英文标题（双语展示） */
  titleEn?: string;
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
  {
    id: 'floor-tiles-repair',
    title: '维修各种地板或瓷砖',
    titleEn: 'Timber Floor & Tiles Repair',
    description:
      '专业承接各类地板与瓷砖的维修、更换、翻新服务。无论是地板划痕、翘起、瓷砖空鼓、开裂，还是整体翻新，均能提供精细施工，恢复原有美观与功能。',
    image: '/assets/material-wood.jpg',
    imageAlt: '地板与瓷砖维修',
    colSpan: 12,
  },
];

/** 服务覆盖区域（中英双语） */
export const serviceAreas: { zh: string; en: string }[] = [
  { zh: '吉隆坡', en: 'Kuala Lumpur' },
  { zh: '雪兰莪', en: 'Selangor' },
  { zh: '森美兰', en: 'Negeri Sembilan' },
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

export interface ContactItem {
  key: string;
  label: string;
  value: string;
  icon: string;
  /** 可选链接：电话跳 WhatsApp、邮箱跳 mailto */
  href?: string;
}

export const contactInfo: ContactItem[] = [
  {
    key: 'address',
    label: '地址',
    value: '[Your Address Here]',
    icon: 'map-pin',
  },
  {
    key: 'phone',
    label: '电话 / WhatsApp',
    value: '0162523524',
    icon: 'phone',
    // 点击跳转 WhatsApp（马来西亚号码 +60，去掉前导 0）
    href: 'https://wa.me/60162523524',
  },
  {
    key: 'email',
    label: '邮箱',
    value: 'ck.887@outlook.com',
    icon: 'mail',
    href: 'mailto:ck.887@outlook.com',
  },
];

export const footer = {
  copyright: `© ${new Date().getFullYear()} KLB工坊. 保留所有权利.`,
  /** 小红书主页链接 */
  rednoteUrl:
    'https://www.rednote.com/user/profile/61ab537d000000001000d825?xsec_token=ABRc08PgYdAsJkKuCcJMuqOzCz7IOoGQubA6jObn8w90I=&xsec_source=pc_note',
  rednoteLabel: '小红书',
} as const;
