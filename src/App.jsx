import logo from '../images/logo.svg';
import dollar from '../images/icon-dollar.svg';
import person from '../images/icon-person.svg';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
function App() {
  const { register, watch, resetField, reset } = useForm();
  const tipAmounts = [5, 10, 15, 20, 25];
  const paymentValue = watch('paymentValue', 0);
  const amountOfPeople = watch('amountOfPeople', 0);
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState(null);

  useEffect(() => console.log(selectedTip), [selectedTip]);
  const handleTipClick = (tip) => {
    resetField('customValue');
    setCustomTip(null);
    setSelectedTip(tip);
  }

  const calculateTip = () => {
    if (!amountOfPeople) return 0;
    if (customTip) {
      return (paymentValue * (customTip / 100) / amountOfPeople).toFixed(2);
    } else {
      return (paymentValue * (selectedTip / 100) / amountOfPeople).toFixed(2);
    }
  }

  const calculateTotal = () => {
    if (!amountOfPeople) return 0;
    if (customTip) {
      return (paymentValue / amountOfPeople + paymentValue * (customTip / 100) / amountOfPeople).toFixed(2);
    } else {
      return (paymentValue / amountOfPeople + paymentValue * (selectedTip / 100) / amountOfPeople).toFixed(2);
    }
  }

  const handleCustomTip = (e) => {
    setSelectedTip(null);
    setCustomTip(e.target.value);
  }

  const handleReset = () => {
    reset();
    setSelectedTip(null)
    setCustomTip(null);
  }
  
  return (
    <>
    <img className="splitter-logo" src={logo} alt="Splitter logo" />
      <div className="container">
          <div className="top">
          <form>
            <div className="bill-container">
              <label htmlFor='bill'>Bill</label>
              <img className="dollar" src={dollar} alt="" />
              <input 
                id="bill"
                type="number"
                placeholder='0'
                {...register('paymentValue')}
                />
            </div>
            <div className="tip-container">
            <label htmlFor="tip-grid">Select Tip %</label>
              <div className="tip-grid">
                {tipAmounts.map(tip => (
                  <button
                    type="button"
                    className={`tip ${selectedTip === tip ? 'selected' : ''}`}
                    key={tip}
                    onClick={() => handleTipClick(tip)}
                    >{tip}</button>
                ))}
                <input 
                  type="number"
                  className="custom-tip"
                  placeholder="Custom"
                  {...register('customValue')}
                  onChange={(e) => handleCustomTip(e)}
                  ></input>
              </div>
            </div>
            <div className="num-of-people">
              <label htmlFor="">Number of People</label>
              <img className="person" src={person} alt="" />
              <input
                type="number"
                placeholder='0'
                {...register('amountOfPeople')}
                />
            </div>
            </form>
          </div>
          <div className="bottom">
            <div className="results">
              <div className="tip-amount">
                <div className="tip-text">
                  <h1>Tip-Amount</h1>
                  <p className='person-text'>/ person</p>
                </div>
                <p className="tip-result">{calculateTip()}</p>
              </div>
              <div className="total-amount">
                <div className="total-text">
                  <h1>Total</h1>
                  <p className='person-text'>/ person</p>
                </div>
                <p className="total-result">${calculateTotal()}</p>
              </div>
              <button
                className='reset-button'
                onClick={() => handleReset()}>RESET</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
