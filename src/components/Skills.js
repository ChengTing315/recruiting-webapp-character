import React from 'react';
import { SKILL_LIST } from '../consts';

const Skills = ({ skills, attributes, handleSkillChange, calculateModifier }) => {
  return (
    <div>
      <h2>Skills</h2>
      {SKILL_LIST.map(skill => (
        <div key={skill.name}>
          {skill.name}: {skills[skill.name]} (Modifier: {calculateModifier(attributes[skill.attributeModifier])})
          <button onClick={() => handleSkillChange(skill.name, 1)}>+</button>
          <button onClick={() => handleSkillChange(skill.name, -1)}>-</button>
        </div>
      ))}
    </div>
  );
};

export default Skills;