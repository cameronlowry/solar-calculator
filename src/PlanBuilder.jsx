import { useState } from "react";
import "./App.css";
import { useAppState } from "./state";

function PlanBuilder() {
  const [currentStep, setCurrentStep] = useAppState();

  return (
    <div>
      <header>header</header>

      <Steps />
    </div>
  );
}

export default PlanBuilder;
