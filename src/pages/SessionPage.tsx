import './pages.css';
import { useLocation, useNavigate } from 'react-router-dom';
import examples from '../configs/dummy_example.json';
// @ts-ignore - Button is implemented in JavaScript and has no declaration file
import Button from '../components/Button.jsx';
// @ts-ignore - TextInput is implemented in JavaScript and has no declaration file
import TextInput from '../components/TextInput.jsx';
// @ts-ignore - OptionCard is implemented in JavaScript and has no declaration file
import OptionCard from '../components/OptionCard.jsx';
import raccoonHi from '../assets/img/raccoon_hi.png';

export default function SessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activitySettings = (location.state as Record<string, unknown> | null) ?? {};
  const personId = typeof activitySettings.personId === 'string'
    ? activitySettings.personId
    : undefined;
  const goSkills = () => {
    if (personId) navigate(`/skills/${personId}`);
    else navigate(-1);
  };

  const startActivity = () => {
    const activityPayload = {
      ...activitySettings,
      questions: examples.map((example) => ({
        id: example.id,
        title: example.title,
        text: example.text,
        options: example.options.map((option) => ({
          title: option.title,
          status: option.status,
          imgUrl: option.imgUrl,
        })),
      })),
    };
    const activityJson = JSON.stringify(activityPayload);

    console.log('Live activity POST payload:', activityJson);
    void fetch('/api/live-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: activityJson,
    }).then((response) => {
      console.log('Live activity POST response:', response.status);
    }).catch((error: unknown) => {
      console.info('Dummy live-session endpoint is unavailable:', error);
    });

    navigate('/live/session', { state: activityPayload });
  };

  return (
    <main className="page session-page">
      <section className="session-questions" aria-label="Activity questions">
        <Button variant="terciary" onClick={goSkills}> Back </Button>
        <div className='skills-title'>
        <h1 className='page-title'>Activity questions</h1>
        <p>Review, discard and freely edit each question and answers of the activity.</p>
        </div>
        {examples.map((example, index) => (
          <article className="session-question" key={`${example.id}-${index}`}>
            <div>
                <h2 className="session-question__heading">Question {example.id}</h2>
                {/* <div className="session-question__divider" /> */}
            </div>
            <TextInput
              className="session-question__text"
              defaultValue={`${example.text}`}
              rows={2}
              aria-label={`Question ${example.id} title and phrase`}
            />
            <div className="session-question__options">
              {example.options.map((option, optionIndex) => (
                <OptionCard
                  key={`${option.title}-${optionIndex}`}
                  title={option.title}
                  status={option.status}
                  img={option.imgUrl}
                />
              ))}
            </div>
          </article>
        ))}
      </section>

      <aside className="session-actions">
        <img src={raccoonHi} className="session-mascot" alt="" />
        <Button variant="secondary" className="session-start-button" onClick={startActivity}>
          Start Activity
        </Button>
      </aside>
    </main>
  );
}
