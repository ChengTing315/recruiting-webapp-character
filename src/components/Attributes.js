import React from 'react';
import { ATTRIBUTE_LIST } from '../consts';

const Attributes = ({ attributes, handleAttributeChange, calculateModifier }) => {
  return (
    <div>
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map(attr => (
        <div key={attr}>
          {attr}: {attributes[attr]} (Modifier: {calculateModifier(attributes[attr])})
          <button onClick={() => handleAttributeChange(attr, 1)}>+</button>
          <button onClick={() => handleAttributeChange(attr, -1)}>-</button>
        </div>
      ))}
    </div>
  );
};

export default Attributes;