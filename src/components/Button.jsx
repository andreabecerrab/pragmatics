import addProfileIcon from './icons/add_profile.svg';
import chatIcon from './icons/chat.svg';
import profileIcon from './icons/profile.svg';
import loadIcon from './icons/load.svg';
import trashIcon from './icons/trash.svg';
import './styles.css';


const icons = {
  add_profile: addProfileIcon,
  chat: chatIcon,
  profile: profileIcon,
  load: loadIcon,
  trash: trashIcon,
};

/**
 * Reusable pill-shaped button.
 * Pass an icon filename (without the .svg extension) to render an app icon.
 */
export default function Button({
  children,
  label,
  variant = 'primary',
  icon,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const text = label ?? children;

  return (
    <button
      type={type}
      className={`app-button app-button--${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && icons[icon] && (
        <img className="app-button__icon" src={icons[icon]} alt="" aria-hidden="true" />
      )}
      {/* show this only if text provided */}
      {text && <span>{text}</span>}
    </button>
  );
}
