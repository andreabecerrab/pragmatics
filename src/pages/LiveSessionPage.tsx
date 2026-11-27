import './pages.css';
import { useLocation } from 'react-router-dom';
import people from '../configs/dummy_name.json';
import connectedIcon from '../components/icons/connected.svg';
import loadingIcon from '../components/icons/loading.svg';
import disconnectedIcon from '../components/icons/cross.svg';
// @ts-ignore - Pill is implemented in JavaScript and has no declaration file
import Pill from '../components/Pill.jsx';
// @ts-ignore - Button is implemented in JavaScript and has no declaration file
import Button from '../components/Button.jsx';

type ConnectionStatus = 'connected' | 'weak' | 'disconnected';

const connectionStatusIcons: Record<ConnectionStatus, string> = {
  connected: connectedIcon,
  weak: loadingIcon,
  disconnected: disconnectedIcon,
};

type LiveActivityState = {
  personId?: string;
  personName?: string;
  personAge?: number | string;
  personImg?: string;
  difficulty?: string;
  questionCount?: string;
  questionTimer?: string;
  topics?: string[];
  questions?: Array<{ id: string; title: string; text: string }>;
};

export default function LiveSessionPage() {
  const { state } = useLocation();
  const activity = (state as LiveActivityState | null) ?? {};
  const person = people.find(({ id }) => id === activity.personId)
    ?? people.find(({ name }) => name === activity.personName)
    ?? people[0];
  const personName = activity.personName ?? person?.name ?? 'Participant';
  const personAge = activity.personAge ?? person?.age;
  const personImg = activity.personImg ?? person?.imageUrl;
  const connectionStatus: ConnectionStatus = 'connected';

  const sendHint = (size: 'small' | 'medium' | 'big') => {
    console.log('Hint requested:', {
      size,
      personId: activity.personId,
      topics: activity.topics ?? [],
    });
  };

  return (
    <main className="page live-session-page">
      <header className="live-session-panel live-session-header">
        <div>
     
          <img
            className="user-card__avatar"
            src={personImg}
            alt={`${personName}'s avatar`}
          />
        
          <h2>Practice with {personName}</h2>
          <p>Age {personAge}</p>
        </div>
        <div className="pg-pills-section">
            <div className="live-session-summary" aria-label="Activity settings">
            {activity.questionCount && <Pill text={`${activity.questionCount} questions`} type="primary" />}
            {activity.difficulty && <Pill text={activity.difficulty} type="success" />}
            {activity.topics?.map((topic) => (
                <Pill key={topic} text={topic} type="info" />
            ))}
            </div>
            {/* <div className="live-session-topics" aria-label="Selected topics">
            {activity.topics?.map((topic) => (
                <Pill key={topic} text={topic} type="info" />
            ))}
            </div> */}
        </div>
        <div className="pages-cols">
            <img
              className={`live-session-connection-icon live-session-connection-icon--${connectionStatus}`}
              src={connectionStatusIcons[connectionStatus]}
              alt={`${connectionStatus} connection`}
            />
            <p className='status-text'>Connection</p>
        </div>
      </header>

      <div className="live-session-columns">
        <div className="live-session-main-column">
          <section className="live-session-panel live-session-activity">
            <div className="live-seesion-info">
                <Pill key="01" text="Question 1" type="primary" />
                <Pill key="01" text="00:01" type="primary" />
            </div>
            <p>Live view (mirror of what the child sees)</p>
            <div className="live-seesion-btns">
                <Button variant="primary" onClick={() => sendHint('small')}> Small Hint </Button>
                <Button variant="primary" onClick={() => sendHint('medium')}> Regular Hint </Button>
                <Button variant="primary" onClick={() => sendHint('big')}> Big Hint </Button>
            </div>
          </section>

          <section className="live-session-panel live-session-logs">
            <h3>Session Logs</h3>
          </section>
        </div>

        <aside className="live-session-panel live-session-notes">
          <h3>Notes</h3>
          <textarea aria-label="Session notes" placeholder="Write notes here..." />
        </aside>
      </div>
    </main>
  );
}
