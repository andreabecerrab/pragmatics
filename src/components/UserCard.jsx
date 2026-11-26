import Button from './Button';
import './styles.css';

/**
 * Profile card with an avatar, name, age, characteristic chips and actions.
 *
 * Props:
 * - name: string
 * - age: number | string
 * - characteristics: string[]
 * - img: string (image URL or imported asset)
 * - onSeeProfile?: () => void
 * - onPractice?: () => void
 */
export default function UserCard({
  name,
  age,
  characteristics = [],
  img,
  onSeeProfile,
  onPractice,
}) {
  return (
    <article className="user-card">
      <div className="user-card__top">
        <img className="user-card__avatar" src={img} alt={`${name}'s avatar`} />

        <div className="user-card__info">
          <h2 className="user-card__name">
            {name} <span className="user-card__age">- Age {age}</span>
          </h2>

          <ul className="user-card__characteristics" aria-label="Characteristics">
            {characteristics.map((characteristic, index) => (
              <li className="user-card__chip" key={`${characteristic}-${index}`}>
                {characteristic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="user-card__divider" />

      <div className="user-card__actions">
        <Button
          variant="primary"
          icon="profile"
          onClick={onSeeProfile}
        >
          See profile
        </Button>
        <Button
          variant="secondary"
          icon="chat"
          onClick={onPractice}
        >
          Practice
        </Button>
      </div>
    </article>
  );
}
