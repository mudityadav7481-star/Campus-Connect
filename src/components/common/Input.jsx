import React from 'react';

export default function Input({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  helperText = '',
  required = false,
  icon: Icon,
  className = '',
  disabled = false,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-300 mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`block w-full rounded-xl border transition-all duration-200 py-2.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
            Icon ? 'pl-11 pr-3.5' : 'px-3.5'
          } ${
            error
              ? 'border-rose-600/80 bg-rose-950/20 focus:border-rose-500 focus:ring-rose-500/30'
              : 'border-slate-800 bg-[#0d0f17] hover:border-slate-700 focus:border-rose-500 focus:ring-rose-500/20'
          } ${disabled ? 'bg-slate-900/50 cursor-not-allowed opacity-60' : ''}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
          <span>•</span> {error}
        </p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}
