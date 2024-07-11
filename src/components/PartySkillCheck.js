import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';

const PartySkillCheck = ({ handlePartySkillCheck }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(0);

  return (
    <div>
      <h3>Party Skill Check</h3>
      <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
        {SKILL_LIST.map(skill => (
          <option key={skill.name} value={skill.name}>{skill.name}</option>
        ))}
      </select>
      <input type="number" value={dc} onChange={(e) => setDc(parseInt(e.target.value))} placeholder="DC" />
      <button onClick={() => handlePartySkillCheck(selectedSkill, dc)}>Roll</button>
    </div>
  );
};

export default PartySkillCheck;