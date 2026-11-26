import { useState } from 'react';
import Button from './Button';

export default function TextInput({
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Write something...',
  firstIcon = 'load',
  secondIcon = 'trash',
  firstActionLabel = 'First action',
  secondActionLabel = 'Send',
  onFirstAction,
  onSecondAction,
  rows = 4,
  disabled = false,
  className = '',
  id,
  name,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  const handleChange = (event) => {
    const nextValue = event.target.value;
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const onReGenerate = () => {
    console.log('Reload');
  };

  return (
    <div className={`text-input ${className}`.trim()}>
      <textarea
        id={id}
        name={name}
        className="text-input__field"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...props}
      />

      <div className="text-input__actions">
        <Button
          variant="secondary"
          icon="load"
          onClick={onReGenerate}>
        </Button>
        <Button
          variant="primary"
          icon="trash"
          onClick={onReGenerate}>
        </Button>
      </div>
    </div>
  );
}
