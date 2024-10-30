import { useState, useEffect } from 'react';
import CalendarSimulator from './CalendarSimulator';

const incomeLevels = [30000, 50000, 75000, 100000, 200000];
const lifestyleOptions = {
  basic: { expenses: { housing: 950, transportation: 200, food: 400, misc: 350 } },
  moderate: { expenses: { housing: 1500, transportation: 300, food: 750, misc: 500} },
  luxury: { expenses: { housing: 2500, transportation: 500, food: 1000, misc: 1000} },
};

const FinancialSimulator = () => {
  const [income, setIncome] = useState(null);
  const [lifestyle, setLifestyle] = useState('');
  const [tax, setTax] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [breakdown, setBreakdown] = useState({ needs: 0, wants: 0, savings: 0 });
  const [lifestyleExpenses, setLifestyleExpenses] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const taxBrackets = [
    { limit: 8500, rate: 0.04 },
    { limit: 11700, rate: 0.045 },
    { limit: 13900, rate: 0.0525 },
    { limit: 21400, rate: 0.059 },
    { limit: Infinity, rate: 0.0645 },
  ];

  const calculateTax = (income) => {
    let tax = 0;
    let remainingIncome = income;
    for (const bracket of taxBrackets) {
      if (remainingIncome <= bracket.limit) {
        tax += remainingIncome * bracket.rate;
        break;
      } else {
        tax += bracket.limit * bracket.rate;
        remainingIncome -= bracket.limit;
      }
    }
    return tax;
  };

  const handleIncomeSelection = (event) => {
    setIncome(parseInt(event.target.value, 10));
  };

  const handleLifestyleSelection = (event) => {
    const selectedLifestyle = event.target.value;
    setLifestyle(selectedLifestyle);
    setLifestyleExpenses(lifestyleOptions[selectedLifestyle]?.expenses || {});
  };

  useEffect(() => {
    if (income && lifestyle) {
      const taxAmount = calculateTax(income);
      setTax(taxAmount);
      const netIncome = income - taxAmount;
      const monthly = netIncome / 12;

      setMonthlyIncome(monthly);

      // Allocate monthly breakdown based on net income and lifestyle expenses
      const needsAllocation = Math.max(monthly * 0.5 - lifestyleExpenses.housing - lifestyleExpenses.food, 0);
      const wantsAllocation = Math.max(monthly * 0.3 - lifestyleExpenses.transportation - lifestyleExpenses.misc, 0);
      const savingsAllocation = Math.max(monthly * 0.2, 0);

      setBreakdown({
        needs: needsAllocation,
        wants: wantsAllocation,
        savings: savingsAllocation,
      });

      if (needsAllocation + wantsAllocation + savingsAllocation + taxAmount > income) {
        setErrorMessage("Expenses exceed income. Adjust your lifestyle or income level.");
      } else {
        setErrorMessage('');
      }
    }
  }, [income, lifestyle, lifestyleExpenses]);

  return (
    <div className="financial-simulator">
      <h1 className="financial-simulator-title">Financial Simulator</h1>
      
      <div className="income-selection">
        <h2>Select Your Annual Income</h2>
        <select onChange={handleIncomeSelection} value={income || ''}>
          <option value="" disabled>Select income level</option>
          {incomeLevels.map((level) => (
            <option key={level} value={level}>${level.toLocaleString()}</option>
          ))}
        </select>
      </div>
  
      <div className="lifestyle-selection">
        <h2>Select Your Lifestyle</h2>
        <select onChange={handleLifestyleSelection} value={lifestyle || ''}>
          <option value="" disabled>Select lifestyle</option>
          {Object.keys(lifestyleOptions).map((option) => (
            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          ))}
        </select>
      </div>
  
      {errorMessage && <p className="error-message">{errorMessage}</p>}
  
      {income && lifestyle && !errorMessage && (
        <>
          <div className="income-details">
            <h3>Annual Income: ${income.toLocaleString()}</h3>
            <p>After Taxes: ${(income - tax).toFixed(2)}</p>
            <p>Monthly Income: ${monthlyIncome?.toFixed(2)}</p>
          </div>
  
          <div className="monthly-breakdown">
            <h4>Monthly Breakdown</h4>
            <ul>
              <li>Needs (50%): ${breakdown.needs.toFixed(2)}</li>
              <li>Wants (30%): ${breakdown.wants.toFixed(2)}</li>
              <li>Savings (20%): ${breakdown.savings.toFixed(2)}</li>
            </ul>
          </div>
  
          <div className="lifestyle-expenses">
            <h4>Your Lifestyle Expenses</h4>
            <ul>
              <li>Housing: ${lifestyleExpenses.housing}</li>
              <li>Transportation: ${lifestyleExpenses.transportation}</li>
              <li>Food: ${lifestyleExpenses.food}</li>
              <li>Miscellaneous: ${lifestyleExpenses.misc}</li>
            </ul>
          </div>
  
          <CalendarSimulator 
            lifestyle={lifestyle}
            setLifestyle={setLifestyle}
            lifestyleOptions={lifestyleOptions}
            breakdown={breakdown} 
            setBreakdown={setBreakdown} 
            monthlyIncome={monthlyIncome} 
            lifestyleExpenses={lifestyleExpenses} // Pass lifestyleExpenses as a prop
          />
        </>
      )}
    </div>
  );
}  

export default FinancialSimulator;
