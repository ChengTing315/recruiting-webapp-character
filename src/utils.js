// utils.js
import { SKILL_LIST } from './consts';

export const calculateModifier = (value) => {
  return Math.floor((value - 10) / 2);
};

export const handleSkillCheck = (characters, charIndex, skill, dc, setSkillCheckResult) => {
  const randomRoll = Math.floor(Math.random() * 20) + 1;
  const skillInfo = SKILL_LIST.find(s => s.name === skill);
  const attributeModifier = skillInfo?.attributeModifier || 'Strength'; // Provide a default
  const totalSkill = characters[charIndex].skills[skill] + calculateModifier(characters[charIndex].attributes[attributeModifier]);
  const result = randomRoll + totalSkill >= dc ? 'Successful' : 'Failure';
  setSkillCheckResult({ charIndex, skill, randomRoll, dc, result });
};

export const handlePartySkillCheck = (characters, skill, dc, setSkillCheckResult) => {
  const bestCharacter = characters.reduce((best, char, index) => {
    const totalSkill = char.skills[skill] + calculateModifier(char.attributes[SKILL_LIST.find(s => s.name === skill).attributeModifier]);
    return totalSkill > best.totalSkill ? { index, totalSkill } : best;
  }, { index: 0, totalSkill: 0 });

  handleSkillCheck(characters, bestCharacter.index, skill, dc, setSkillCheckResult);
};

export const saveCharacters = async (characters) => {
  const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/ChengTing315/character', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characters),
  });
  const data = await response.json();
  console.log(data);
};

export const loadCharacters = async (setCharacters) => {
  const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/ChengTing315/character');
  const data = await response.json();
  setCharacters(data.body);
};