import React from 'react';

export interface RupiahInputProps {
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  showPrefix?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const formatRupiahDots = (num: number): string => {
  if (num === 0 || !num || isNaN(num)) return '0';
  return new Intl.NumberFormat('id-ID').format(num);
};

export const RupiahInput: React.FC<RupiahInputProps> = ({
  value,
  onChange,
  placeholder = '0',
  disabled = false,
  style,
  className = '',
  showPrefix = true,
  size = 'md',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip out non-digit characters
    const cleanDigits = e.target.value.replace(/\D/g, '');
    const numericValue = cleanDigits ? parseInt(cleanDigits, 10) : 0;
    onChange(numericValue);
  };

  const displayValue = value === 0 ? '' : formatRupiahDots(value);

  const paddingLeft = showPrefix 
    ? size === 'lg' ? '2.75rem' : '2.25rem' 
    : '0.75rem';

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
      {showPrefix && (
        <span style={{
          position: 'absolute',
          left: '0.75rem',
          fontSize: size === 'lg' ? '0.95rem' : '0.825rem',
          fontWeight: 700,
          color: '#64748b',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          Rp
        </span>
      )}

      <input
        type="text"
        inputMode="numeric"
        disabled={disabled}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        style={{
          width: '100%',
          paddingLeft: paddingLeft,
          paddingRight: '0.75rem',
          paddingTop: size === 'lg' ? '0.65rem' : '0.5rem',
          paddingBottom: size === 'lg' ? '0.65rem' : '0.5rem',
          fontSize: size === 'lg' ? '1.05rem' : '0.875rem',
          fontWeight: 700,
          color: '#09090b',
          backgroundColor: disabled ? '#f4f4f5' : '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          outline: 'none',
          transition: 'all 0.15s ease',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#09090b';
          e.currentTarget.style.boxShadow = '0 0 0 2px rgba(9, 9, 11, 0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#cbd5e1';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)';
        }}
      />
    </div>
  );
};
