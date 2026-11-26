import { useState } from 'react';
import './pages.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import people from '../configs/dummy_name.json';
import skills from '../configs/skills.json';
import raccoonHi from '../assets/img/raccoon_hi.png';
import raccoonThinking from '../assets/img/raccoon_thinking.png';
// @ts-ignore - Button is implemented in JavaScript and has no declaration file
import Button from '../components/Button.jsx';
// @ts-ignore - SelectablePill is implemented in JavaScript and has no declaration file
import SelectablePill from '../components/SelectablePillCard.jsx';
// @ts-ignore - ToggleButtons is implemented in JavaScript and has no declaration file
import ToggleButtons from '../components/ToggleButtons.jsx';

const skillImages = import.meta.glob<string>(
  '../assets/img/skills/*.png',
  { eager: true, import: 'default', query: '?url' },
);

export default function SkillsPage() {
  const navigate = useNavigate();
  const { personId } = useParams();
  const person = people.find(({ id }) => id === personId);
  const goUsers = () => navigate('/');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preparingOpen, setPreparingOpen] = useState(false);
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<string[]>([]);
  const [questionTimer, setQuestionTimer] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const createContent = () => setSettingsOpen(true);
  const settingsReady = Boolean(difficulty.length && questionCount.length && questionTimer.length);

  const confirmSettings = () => {
    if (!person || !settingsReady) return;

    const activityData = {
      personId: person.id,
      personName: person.name,
      difficulty: difficulty[0],
      questionCount: questionCount[0],
      questionTimer: questionTimer[0],
      topics: selectedTopics,
    };
    const activityJson = JSON.stringify(activityData);

    console.log('Activity POST payload:', activityJson);
    void fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: activityJson,
    }).then((response) => {
      console.log('Activity POST response:', response.status);
    }).catch((error: unknown) => {
      console.info('Dummy activity endpoint is unavailable:', error);
    });

    setSettingsOpen(false);
    setPreparingOpen(true);
    window.setTimeout(() => {
      navigate('/session', { state: activityData });
    }, 4000);
  };

  if (!person) return <Navigate to="/" replace />;

  return (
    <main className="page">
      <Button variant="terciary" onClick={goUsers}>
        Back
      </Button>
      <div>
        <h1 className='page-title'>Which skill does {person.name} need to practice today?</h1>
        <p> Select one or more skill for the activity.</p>
      </div>
    <div className='page-rows'>
        {skills.map((skill) => (
          <SelectablePill
            key={skill.id}
            id={skill.id}
            img={skillImages[skill.imageUrl]}
            title={skill.title}
            description={skill.description}
            onChange={(isSelected: boolean) => {
              setSelectedTopics((currentTopics) => (
                isSelected
                  ? [...currentTopics, skill.title]
                  : currentTopics.filter((topic) => topic !== skill.title)
              ));
            }}
          />
        ))}
    </div>
    <Button variant="secondary" onClick={createContent} className="skills-btn">
        Confirm
    </Button>
      <img src={raccoonHi} className="skills-mascot" alt="" />
      {settingsOpen && (
        <div
          className="activity-settings-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSettingsOpen(false);
          }}
        >
            {/* DIALOG CONFIG */}
          <section
            className="activity-settings-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-settings-title"
          >
            <h1 id="activity-settings-title">Activity settings</h1>
            <div className="activity-settings-divider" />

            <div className="activity-settings-field">
              <p>Difficulty level</p>
              <ToggleButtons
                options={['Easy', 'Medium', 'Hard']}
                value={difficulty}
                onChange={setDifficulty}
                multiple={false}
              />
            </div>

            <div className="activity-settings-field">
              <p>Number of questions</p>
              <ToggleButtons
                options={['3', '4', '5', '6', '7', '8', '9', '10']}
                value={questionCount}
                onChange={setQuestionCount}
                multiple={false}
              />
            </div>

            <div className="activity-settings-field">
              <p>Timer for each question</p>
              <ToggleButtons
                options={['15s', '30s', '45s', '60s', '90s', 'Unlimited']}
                value={questionTimer}
                onChange={setQuestionTimer}
                multiple={false}
              />
            </div>

            <div className="activity-settings-divider" />
            <div className="activity-settings-actions">
              <Button variant="primary" onClick={() => setSettingsOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={confirmSettings} disabled={!settingsReady}>
                Confirm
              </Button>
            </div>
          </section>
          {/* DIALOG WAITING */}
          
        </div>
      )}
      {preparingOpen && (
        <div className="activity-settings-backdrop">
          <section
            className="activity-settings-dialog activity-preparing-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-preparing-title"
            aria-describedby="activity-preparing-description"
          >
            <img src={raccoonThinking} alt="" className="activity-preparing-image" />
            <h1 id="activity-preparing-title">Preparing the activity...</h1>
            <p id="activity-preparing-description">This should take just a few seconds...</p>
          </section>
        </div>
      )}
    </main>
)}
