import React, { useState } from 'react';
import Attributes from './Attributes';
import Classes from './Classes';
import Skills from './Skills';
import SkillCheck from './SkillCheck';
import { CLASS_LIST  } from '../consts';

const Character = ({ character, index, updateCharacter, handleSkillCheck, skillCheckResult }) => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleAttributeChange = (attr, delta) => {
    const newAttributes = { ...character.attributes };
    const newValue = newAttributes[attr] + delta;
    const totalAttributes = Object.values(newAttributes).reduce((sum, val) => sum + val, 0);
    if (newValue < 0  || totalAttributes + delta > 70) return;
    newAttributes[attr] = newValue;
    updateCharacter(index, { ...character, attributes: newAttributes });
  };

  const handleSkillChange = (skill, delta) => {
    const newSkills = { ...character.skills };
    const newValue = newSkills[skill] + delta;
    if (newValue < 0 || newValue > character.skillPoints) return;
    newSkills[skill] = newValue;
    updateCharacter(index, { ...character, skills: newSkills, skillPoints: character.skillPoints - delta });
  };

  const calculateModifier = (value) => {
    return Math.floor((value - 10) / 2);
  };

  const meetsClassRequirements = (className) => {
    const classDetails = CLASS_LIST[className];
    if (!classDetails) return false;
    return Object.entries(classDetails).every(([attr, minValue]) => character.attributes[attr] >= minValue);
  };

  const totalAttributesUsed = Object.values(character.attributes).reduce((sum, val) => sum + val, 0);
  const attributesLeft = 70 - totalAttributesUsed;

  return (
    <div>
      <h2>Character {index + 1}</h2>
      <p>Attributes left: {attributesLeft}</p>
      <Attributes
        attributes={character.attributes}
        handleAttributeChange={handleAttributeChange}
        calculateModifier={calculateModifier}
      />
      <Classes
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        meetsClassRequirements={meetsClassRequirements}
      />
      <Skills
        skills={character.skills}
        attributes={character.attributes}
        handleSkillChange={handleSkillChange}
        calculateModifier={calculateModifier}
      />
     <SkillCheck 
       handleSkillCheck={(skill, dc) => handleSkillCheck(index, skill, dc)} 
       skills={character.skills}
       attributes={character.attributes}
   />
      {skillCheckResult && skillCheckResult.charIndex === index && (
        <div>
          <h3>Skill Check Results</h3>
          <p>Skill: {skillCheckResult.skill}</p>
          <p>You Rolled: {skillCheckResult.randomRoll}</p>
          <p>The DC was: {skillCheckResult.dc}</p>
          <p>Result: {skillCheckResult.result}</p>
        </div>
      )}
    </div>
  );
};

export default Character;