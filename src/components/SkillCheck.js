import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';

const SkillCheck = ({ handleSkillCheck, skills, attributes }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(0);

  const onRoll = () => {
    const skillInfo = SKILL_LIST.find(s => s.name === selectedSkill);
    if (skillInfo && skills[selectedSkill] !== undefined && attributes[skillInfo.attributeModifier] !== undefined) {
      handleSkillCheck(selectedSkill, dc);
    } else {
      console.error('Invalid skill or attribute');
    }
  };

  return (
    <div>
      <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
        {SKILL_LIST.map(skill => (
          <option key={skill.name} value={skill.name}>{skill.name}</option>
        ))}
      </select>
      <input type="number" value={dc} onChange={(e) => setDc(parseInt(e.target.value))} placeholder="DC" />
      <button onClick={onRoll}>Roll</button>
    </div>
  );
};

export default SkillCheck;