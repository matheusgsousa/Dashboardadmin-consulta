import React, { useState } from 'react';
import './Style.css';
import Calendar from 'react-calendar';

function Agenda() {
    const [value, onChange] = useState(new Date());
  
    return (
      <div>
        <Calendar className={['c1','c2']}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  }

export default Agenda
