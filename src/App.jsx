import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./state";
import { Results } from "./steps/Results";
import logo from "./assets/GC-Solar_icon.svg";

function SolarCalculator() {

  return (
    <div className="solar-calculator">
      <header>
        <h3>
          <img className="logo m-0 p-1" src={logo} alt="Greencoin Logo" /> Solar Calculator
        </h3>
      </header>
      <AppProvider>
        <Router>
          {/* <Stepper /> */}
          <Routes>
            {/* <Route path="/" element={<SelectSystemType />} /> */}
            {/* <Route path="/bill" element={<MonthlyBill />} /> */}
            <Route path="/" element={<Results />} />
          </Routes>
        </Router>
        
      </AppProvider>
    </div>
  );
}

export default SolarCalculator;
