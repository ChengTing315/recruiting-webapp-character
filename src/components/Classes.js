import React from 'react';
import { CLASS_LIST } from '../consts';

const Classes = ({ selectedClass, setSelectedClass, meetsClassRequirements }) => {
  return (
    <div>
      <h2>Classes</h2>
      {Object.entries(CLASS_LIST).map(([className, classDetails]) => (
        <div
          key={className}
          onClick={() => setSelectedClass(className)}
          style={{ color: meetsClassRequirements(className) ? 'green' : 'red' }}
        >
          {className}
        </div>
      ))}
      {selectedClass && CLASS_LIST[selectedClass] && (
        <div>
          <h3>{selectedClass} Minimum Requirements</h3>
          {Object.entries(CLASS_LIST[selectedClass]).map(([attr, minValue]) => (
            <div key={attr}>
              {attr}: {minValue}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;