import React from 'react';
import { motion } from 'motion/react';

interface SocialIconsProps {
  className?: string;
  textColor?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'col' | 'row';
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  className = '',
  textColor = 'text-[#1b4332]',
  showText = true,
  size = 'md',
  layout = 'col',
}) => {
  const iconSizeClass =
    size === 'lg'
      ? 'w-6 h-6'
      : size === 'md'
      ? 'w-5 h-5'
      : 'w-4.5 h-4.5';

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className={`${iconSizeClass} fill-white`} viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com',
      icon: (
        <svg className={`${iconSizeClass} fill-white`} viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className={`${iconSizeClass} fill-white`} viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className={`${iconSizeClass} fill-none stroke-white`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className={`${iconSizeClass} fill-white`} viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com',
      icon: (
        <svg className={`${iconSizeClass} fill-white`} viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.68c-.02 1.93-.74 3.86-2.06 5.25-1.32 1.39-3.21 2.15-5.14 2.1-1.93-.05-3.8-1.04-4.97-2.61-1.18-1.57-1.47-3.66-1.07-5.55.4-1.89 1.72-3.48 3.53-4.22 1.81-.74 3.91-.49 5.56.55v4.22c-.67-.53-1.55-.83-2.42-.77-.87.05-1.69.52-2.14 1.25-.45.73-.48 1.66-.19 2.47.28.81.99 1.39 1.83 1.52.84.13 1.73-.13 2.31-.76.58-.63.85-1.5.82-2.36V.02h-.55z" />
        </svg>
      ),
    },
  ];

  const btnSize =
    size === 'lg'
      ? 'w-12 h-12 sm:w-14 sm:h-14'
      : size === 'md'
      ? 'w-10 h-10 sm:w-11 sm:h-11'
      : 'w-8 h-8 sm:w-9 sm:h-9';

  return (
    <div
      className={`flex ${
        layout === 'row'
          ? 'flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3'
          : 'flex-col items-start gap-2'
      } ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        {socialLinks.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`${btnSize} rounded-full bg-[#18181b] hover:bg-black text-white flex items-center justify-center shadow-xs border border-neutral-800 transition-colors cursor-pointer flex-shrink-0`}
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
      {showText && (
        <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-tight whitespace-nowrap ${textColor}`}>
          Follow us on social media to stay updated
        </span>
      )}
    </div>
  );
};
