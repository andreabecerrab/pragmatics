
import { useState } from 'react';

export default function SelectablePill({
  children,
  selected,
  img,
  title,
  description,
  defaultSelected = false,
  onChange,
  className = '',
  disabled = false,
  ...props
}) {
  const [internalSelected, setInternalSelected] =
    useState(defaultSelected);

  const isControlled = selected !== undefined;
  const isSelected = isControlled
    ? selected
    : internalSelected;

  const handleClick = () => {
    if (disabled) return;

    const nextSelected = !isSelected;

    if (!isControlled) {
      setInternalSelected(nextSelected);
    }

    onChange?.(nextSelected);
  };

  return (
    <button
      type="button"
      className={`selectable-pill ${
        isSelected ? 'selectable-pill--selected' : ''
      } ${className}`}
        aria-pressed={isSelected}
        disabled={disabled}
        onClick={handleClick}
        {...props}
    >
      <div className="user-card__top">
        <img className="user-card__avatar" src={img} alt="example picture" />
        <div className="pill_info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </button>
  );
}
