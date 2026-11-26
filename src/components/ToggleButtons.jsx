import { useState } from 'react';

/**
 * A group of pill-shaped toggle buttons.
 *
 * @param {Array<string | {label: string, value: string, disabled?: boolean}>} options
 * @param {string[]} value Selected values (controlled mode).
 * @param {string[]} defaultValue Initial selected values (uncontrolled mode).
 * @param {(nextValue: string[]) => void} onChange Called with the next selected values.
 * @param {boolean} multiple Whether more than one option can be selected.
 */
export default function ToggleButtons({
  options = [],
  value,
  defaultValue = [],
  onChange,
  multiple = true,
  disabled = false,
  className = '',
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : internalValue;

  const handleToggle = (optionValue) => {
    if (disabled) return;

    let nextValue;
    if (selectedValues.includes(optionValue)) {
      nextValue = selectedValues.filter((item) => item !== optionValue);
    } else if (multiple) {
      nextValue = [...selectedValues, optionValue];
    } else {
      nextValue = [optionValue];
    }

    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div
      className={`toggle-buttons ${className}`.trim()}
      role="group"
      {...props}
    >
      {options.map((option) => {
        const item = typeof option === 'string'
          ? { label: option, value: option }
          : option;
        const isSelected = selectedValues.includes(item.value);
        const isDisabled = disabled || item.disabled;

        return (
          <button
            key={item.value}
            type="button"
            className={`toggle-buttons__pill${isSelected ? ' toggle-buttons__pill--selected' : ''}`}
            aria-pressed={isSelected}
            disabled={isDisabled}
            onClick={() => handleToggle(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
