import { useState } from 'react'
import './App.css'
import Range from './components/Range'
import { calculateMonthlyCost } from './utils/monthlyCostCalculator'

function App() {
  const [loanAmount, setLoanAmount] = useState(20000)
  const [loanYears, setLoanYears] = useState(2)

  const monthlyCost = calculateMonthlyCost(loanAmount, loanYears)

  const sendApplication = () => {
    const url = `/loan-application/?amount=${loanAmount}&months=${
      loanYears * 12
    }`
    console.log('Sending application to:', url)
  }

  return (
    <main className="main-container">
      <section className="main-section">
        <header className="header">
          <h1>Lånekalkyl</h1>
          <div className="monthly-cost-bubble">
            <p>Exempel på månadskostnad</p>
            <p>{`${monthlyCost} SEK / mån`}</p>
          </div>
        </header>
        <article className="range-section">
          <div className="range-container">
            <h2>Lånebelopp</h2>
            <Range
              min={20000}
              max={200000}
              step={10000}
              value={loanAmount}
              setValue={setLoanAmount}
              type="currency"
            />
          </div>
          <div className="range-container">
            <h2>Lånetid</h2>
            <Range
              min={2}
              max={10}
              step={1}
              value={loanYears}
              setValue={setLoanYears}
              type="years"
            />
          </div>
        </article>
        <footer className="loan-footer">
          <button className="cta-button" onClick={sendApplication}>
            Till ansökan
          </button>
        </footer>
      </section>
    </main>
  )
}

export default App
