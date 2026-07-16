import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { contactInfo, sectionTitles } from '@/data/content';
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';
import SectionTitle from '@/components/SectionTitle';

const iconMap = {
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
} as const;

interface FormState {
  name: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

const initialState: FormState = { name: '', phone: '', message: '' };

/**
 * 联系我们区
 * - 左侧：地址/电话/邮箱
 * - 右侧：咨询表单（前端校验 + 成功提示）+ 地图占位
 */
export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) {
      e.name = '请输入您的姓名';
    }
    if (!form.phone.trim()) {
      e.phone = '请输入联系电话';
    } else if (!/^[\d\s+\-()]{6,20}$/.test(form.phone.trim())) {
      e.phone = '电话格式不正确';
    }
    if (!form.message.trim()) {
      e.message = '请输入您的需求';
    } else if (form.message.trim().length < 5) {
      e.message = '留言至少 5 个字';
    }
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // 无后端：仅前端展示成功提示
      setSubmitted(true);
      setForm(initialState);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const inputBaseStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 'var(--radius-sm)',
    color: 'hsl(var(--foreground))',
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 160ms ease',
  } as const;

  return (
    <section
      id="contact"
      className="px-6 lg:px-8"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1280px' }}>
        <SectionTitle
          title={sectionTitles.contact.title}
          subtitle={sectionTitles.contact.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '3rem', marginTop: '4rem' }}
        >
          {/* 左侧：联系信息 */}
          <motion.div variants={staggerItem} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {contactInfo.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? MapPin;
              // 有 href 的项渲染为可点击链接（电话跳 WhatsApp、邮箱跳 mailto）
              const Tag: React.ElementType = item.href ? 'a' : 'div';
              const linkProps = item.href
                ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              return (
                <Tag
                  key={item.key}
                  className="flex"
                  style={{
                    gap: '1rem',
                    alignItems: 'flex-start',
                    textDecoration: 'none',
                    cursor: item.href ? 'pointer' : 'default',
                  }}
                  {...linkProps}
                >
                  <span
                    className="shrink-0"
                    style={{
                      color: 'hsl(var(--muted-foreground))',
                      marginTop: '2px',
                      display: 'inline-flex',
                    }}
                  >
                    <Icon size={20} />
                  </span>
                  <div>
                    <span
                      style={{
                        color: 'hsl(var(--foreground))',
                        fontSize: '15px',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        color: item.href
                          ? 'hsl(var(--secondary))'
                          : 'hsl(var(--muted-foreground))',
                        fontSize: '15px',
                        lineHeight: 1.6,
                        textDecoration: item.href ? 'underline' : 'none',
                        textDecorationColor: 'hsl(var(--border))',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                </Tag>
              );
            })}

            {/* 地图占位 */}
            <div
              className="flex items-center justify-center"
              style={{
                background: 'hsl(var(--muted))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                minHeight: '200px',
                padding: '2rem',
              }}
            >
              <div className="text-center">
                <span
                  style={{
                    color: 'hsl(var(--accent-foreground))',
                    opacity: 0.5,
                    display: 'inline-flex',
                  }}
                >
                  <MapPin size={40} />
                </span>
                <p
                  style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '14px',
                    marginTop: '1rem',
                  }}
                >
                  地图服务待接入
                </p>
              </div>
            </div>
          </motion.div>

          {/* 右侧：咨询表单 */}
          <motion.form
            variants={staggerItem}
            onSubmit={handleSubmit}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: 'block',
                  color: 'hsl(var(--foreground))',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                姓名
              </label>
              <input
                id="contact-name"
                type="text"
                value={form.name}
                onChange={update('name')}
                placeholder="您的称呼"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
                style={{
                  ...inputBaseStyle,
                  borderColor: errors.name
                    ? 'hsl(var(--destructive))'
                    : inputBaseStyle.border,
                }}
              />
              {errors.name && (
                <p
                  id="err-name"
                  style={{
                    color: 'hsl(var(--destructive))',
                    fontSize: '13px',
                    marginTop: '0.375rem',
                  }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                style={{
                  display: 'block',
                  color: 'hsl(var(--foreground))',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                电话
              </label>
              <input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="便于我们联系您"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
                style={{
                  ...inputBaseStyle,
                  borderColor: errors.phone
                    ? 'hsl(var(--destructive))'
                    : inputBaseStyle.border,
                }}
              />
              {errors.phone && (
                <p
                  id="err-phone"
                  style={{
                    color: 'hsl(var(--destructive))',
                    fontSize: '13px',
                    marginTop: '0.375rem',
                  }}
                >
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                style={{
                  display: 'block',
                  color: 'hsl(var(--foreground))',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                留言
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={update('message')}
                placeholder="简要描述您的修复需求"
                rows={4}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
                style={{
                  ...inputBaseStyle,
                  resize: 'vertical',
                  minHeight: '110px',
                  borderColor: errors.message
                    ? 'hsl(var(--destructive))'
                    : inputBaseStyle.border,
                }}
              />
              {errors.message && (
                <p
                  id="err-message"
                  style={{
                    color: 'hsl(var(--destructive))',
                    fontSize: '13px',
                    marginTop: '0.375rem',
                  }}
                >
                  {errors.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -1, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center"
              style={{
                padding: '13px 28px',
                background: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                gap: '0.5rem',
              }}
            >
              <Send size={16} />
              提交咨询
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-center"
                  style={{
                    gap: '0.5rem',
                    padding: '12px 16px',
                    background: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '14px',
                  }}
                >
                  <CheckCircle2 size={18} />
                  咨询已提交，我们会尽快与您联系。
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
