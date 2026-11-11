import React from 'react';
import { CATEGORY_COLORS } from '../../utils/constants';

export default function Badge({
  children,
  category,
  variant,
  size = 'sm',
  className = '',
}) {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 font-semibold',
    sm: 'text-xs px-2.5 py-1 font-semibold',
    md: 'text-sm px-3 py-1.5 font-bold',
  };

  let colorStyle = 'bg-slate-800 text-slate-300 border-slate-700';

  if (category && CATEGORY_COLORS[category]) {
    colorStyle = CATEGORY_COLORS[category];
  } else if (variant === 'success') {
    colorStyle = 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60 shadow-xs shadow-emerald-950';
  } else if (variant === 'danger') {
    colorStyle = 'bg-rose-950/80 text-rose-400 border-rose-700/60 shadow-xs shadow-rose-950';
  } else if (variant === 'warning') {
    colorStyle = 'bg-amber-950/80 text-amber-400 border-amber-700/60 shadow-xs shadow-amber-950';
  } else if (variant === 'info') {
    colorStyle = 'bg-sky-950/80 text-sky-400 border-sky-700/60 shadow-xs shadow-sky-950';
  } else if (variant === 'secondary') {
    colorStyle = 'bg-slate-800 text-slate-400 border-slate-700';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-xs ${sizeStyles[size] || sizeStyles.sm} ${colorStyle} ${className}`}
    >
      {children || category}
    </span>
  );
}
