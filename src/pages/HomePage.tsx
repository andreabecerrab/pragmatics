import './pages.css';
import { useNavigate } from 'react-router-dom';
import people from '../configs/dummy_name.json';
// @ts-ignore - UserCard is implemented in JavaScript and has no declaration file
import UserCard from '../components/UserCard.jsx';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="page home-page">
      <h1>Who needs to practice today?</h1>
      <section>
        {/* search bar and button */}
      </section>
      <section className="page-rows">
        {people.map((person) => (
          <UserCard
            key={person.id}
            name={person.name}
            age={person.age}
            img={person.imageUrl}
            onSeeProfile={() => console.log('Profile:', person.name)}
            onPractice={() => navigate(`/skills/${person.id}`)}
          />
        ))}
      </section>
    </main>
  );
}
