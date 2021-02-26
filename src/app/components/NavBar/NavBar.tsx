import React, { useState } from 'react';

const NavBar: React.FC = ({ setTab, tabsList, tab }) => {
  const tabButtons = tabsList.reduce((acc, name) => {
    acc.push(
      <button
        className="navBarButtons"
        key={name}
        style={
          tab === name
            ? { color: '#1cb5c9', backgroundColor: '#212121' }
            : { color: '#e6e6e6' }
        }
        onClick={() => {
          setTab(name);
        }}
      >
        {name}
      </button>
    );
    return acc;
  }, []);
  // render the array of NavBar buttons generated above
  return <div className="navBar">{tabButtons}</div>;
};

export default NavBar;
