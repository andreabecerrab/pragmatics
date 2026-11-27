import './styles.css';

const pillTypes = ['primary', 'info', 'success', 'error'];

export default function Pill({ text, type = 'primary', className = '' }) {
  const variant = pillTypes.includes(type) ? type : 'primary';

  return (
    <span className={`app-pill app-pill--${variant} ${className}`.trim()}>
      {text}
    </span>
  );
}
