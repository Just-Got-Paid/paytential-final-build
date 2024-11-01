import { useState, useEffect } from 'react';
import CalendarSimulator from './CalendarSimulator';

export default function FinancialSimulator() {

  return (
  <div className="financial-simulator-container">
    <div className="main-content">
        <>

          <div className="calendar-container">
            <CalendarSimulator 
            />
          </div>
        </>
      )
    </div>

    {/* Popup for Lifestyle Expenses */}
    {/* {showPopup && (
      <div className="popup">
        <h3>You've Chosen: the {pendingLifestyle.charAt(0).toUpperCase() + pendingLifestyle.slice(1)} Lifestyle</h3>
        <ul>
          {Object.entries(lifestyleOptions[pendingLifestyle]).map(([key, value]) => (
            <li key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: ${value}
            </li>
          ))}
        </ul>
      </div> */}
    )}
  </div>
);
}
