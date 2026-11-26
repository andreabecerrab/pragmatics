import './styles.css';
import Button from './Button';

export default function OptionCard({
  title,
  status,
  img,
  onAction,
  buttonIcon = 'arrow_forward',
  buttonLabel,
  className = '',
}) {
  const accessibleButtonLabel = buttonLabel || `Open ${title}`;

  const onReGenerateImage = () => {
    console.log('Reload');
  };

  return (
    <article className={`option-card ${className}`.trim()}>
      <div className="option-card__content">
        {status && <span className="option-card__status">{status}</span>}
        <h3 className="option-card__title">{title}</h3>
      </div>

      <div className="option-card__image-wrap">
        <img className="option-card__image" src={img} alt={title} />
        <div className="card-option-img-btn">
          <Button
            variant="secondary"
            icon="load"
            onClick={onReGenerateImage}
          >
          </Button>
        </div>
      </div>
    </article>
  );
}
