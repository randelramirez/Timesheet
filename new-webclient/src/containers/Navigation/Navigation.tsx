import React from 'react';

function Navigation(props: any) {
  return (
    <div style={{ background: 'navyblue' }}>
      <ul>
        <li>
          <a href="#">Create</a>
        </li>
        <li>
          <a href="#">Previous Timecards</a>
        </li>
        <li>
          <a href="#">Report</a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
