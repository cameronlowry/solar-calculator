import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./state";
import { Results } from "./steps/Results";

import "./App.css";

function SolarCalculator() {

  return (
    <div className="solar-calculator">
      <header>
        <h3>
          Solar Calculator
        </h3>
      </header>
      <AppProvider>
        <Router>
          {/* <Stepper /> */}
          <Routes>
            {/* <Route path="/" element={<SelectSystemType />} /> */}
            {/* <Route path="/bill" element={<MonthlyBill />} /> */}
            <Route path="/" element={<Results />} />
            <Route path="/calculator" element={<Results />} />
            <Route path="/solar-calculator" element={<Results />} />
          </Routes>
        </Router>
        
      </AppProvider>
    </div>
  );
}

export default SolarCalculator;
