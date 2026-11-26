import './App.css'
// @ts-ignore - UserCard is implemented in JavaScript and has no declaration file
import UserCard from './components/UserCard.jsx';
// @ts-ignore - SelectablePillCard is implemented in JavaScript and has no declaration file
import SelectablePill from './components/SelectablePillCard.jsx'
// @ts-ignore - SelectablePillCard is implemented in JavaScript and has no declaration file
import ToggleButtons from './components/ToggleButtons.jsx';
// @ts-ignore - SelectablePillCard is implemented in JavaScript and has no declaration file
import TextInput from './components/TextInput.jsx';
// @ts-ignore - SelectablePillCard is implemented in JavaScript and has no declaration file
import OptionCard from './components/OptionCard.jsx';

function App() {

  let selected: boolean = false;
  let setSelected: (value: boolean) => void = (value: boolean) => {
    selected = value;
  };

  let setLevel: (value: string) => void = (value: string) => {
    console.log(value);
  }

  let message: string = '';
  let setMessage: (value: string) => void = (value: string) => {
    message = value;
  }

  const handleAttach = () => {
    console.log("Attach file");
  }

  const handleSend = () => {
    console.log("Send message:", message);
  }

  return (
    <section>
      <UserCard
        name="Chloe Buscema"
        age={9}
        characteristics={["Irony", "Level 1"]}
        img="/images/chloe.png"
        onSeeProfile={() => console.log("Profile")}
        onPractice={() => console.log("Practice")}
      />

      <SelectablePill
        selected={selected}
        onChange={setSelected}
        img="/images/chloe.png"
        title="Sarcasm"
        description="Understanding playful or critical teasing behind literal words."
      >
      </SelectablePill>
      <ToggleButtons
        options={['Beginner', 'Intermediate', 'Advanced']}
        multiple={false}
        onChange={setLevel}
      />
      <TextInput
        value={message}
        onChange={setMessage}
        placeholder="Write a message..."
        firstIcon="attach_file"
        secondIcon="send"
        onFirstAction={handleAttach}
        onSecondAction={handleSend}
      />
      <OptionCard
        title="Explore the city"
        status="Available"
        img="/images/city.jpg"
        onAction={() => console.log('Open option')}
      />
    </section>
  )
}

export default App
