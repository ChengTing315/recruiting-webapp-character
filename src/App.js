import { useState } from 'react';
import './App.css';
import Character from './components/Character';
import PartySkillCheck from './components/PartySkillCheck';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';
import {  handleSkillCheck, handlePartySkillCheck, saveCharacters, loadCharacters } from './utils';

function App() {
  const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attr) => {
    acc[attr] = 10;
    return acc;
  }, {});

  const initialSkills = SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = 0;
    return acc;
  }, {});

  const initialCharacter = {
    attributes: initialAttributes,
    skills: initialSkills,
    skillPoints: 10,
  };

  const [characters, setCharacters] = useState([initialCharacter]);
  const [skillCheckResult, setSkillCheckResult] = useState(null);

  const addNewCharacter = () => {
    setCharacters([...characters, { ...initialCharacter }]);
  };

  const updateCharacter = (index, updatedCharacter) => {
    const newCharacters = [...characters];
    newCharacters[index] = updatedCharacter;
    setCharacters(newCharacters);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <button onClick={addNewCharacter}>Add New Character</button>
        <button onClick={() => saveCharacters(characters)}>Save All Characters</button>
        <button onClick={() => loadCharacters(setCharacters)}>Load All Characters</button>
        {characters.map((character, index) => (
          <Character
            key={index}
            character={character}
            index={index}
            updateCharacter={updateCharacter}
            handleSkillCheck={(skill, dc) => handleSkillCheck(characters, index, skill, dc, setSkillCheckResult)}
            skillCheckResult={skillCheckResult}
          />
        ))}
        <PartySkillCheck handlePartySkillCheck={(skill, dc) => handlePartySkillCheck(characters, skill, dc, setSkillCheckResult)} />
      </section>
    </div>
  );
}

export default App;