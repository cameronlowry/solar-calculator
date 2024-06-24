import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Form, Input } from "../forms";
import { useAppState } from "../state";
import { Slider } from "../forms/Slider";

const SIZE_RATIO = 0.0026548;
const PANEL_BASE = 0.55; // 550W panels
const SAVINGS_RATIO = 2.9788; // keep in sync with current price

export const Results = () => {
  const [state, setState] = useAppState();

  const { handleSubmit, register, getValues, setValue } = useForm({
    defaultValues: { ...state, monthlyBill: 200, percentage: 66, showBattery: true, solutionType: "loadShedding", theme: "light" },
  });
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/complete");
  };
  const currentSizeRatio = SIZE_RATIO;
  const systemSize =
    getValues().solutionType === "loadShedding"
      ? (getValues()?.monthlyBill * currentSizeRatio * getValues()?.percentage) / 100
      : getValues()?.monthlyBill * currentSizeRatio;
  const systemSizeRoundedUp = Math.ceil(systemSize / PANEL_BASE) * PANEL_BASE;

  const inverter =
    systemSizeRoundedUp < 4.95
      ? 5
      : systemSizeRoundedUp < 7.7
      ? 8
      : systemSizeRoundedUp < 12.1
      ? 12
      : systemSizeRoundedUp < 19.8
      ? 16
      : systemSizeRoundedUp < 29.7
      ? 30
      : systemSizeRoundedUp < 69.85
      ? 50
      : 100;

  const batterySize =
    inverter <= 5 ? 5 : inverter <= 10 ? 10 : inverter <= 15 ? 15 : inverter <= 20 ? 20 : inverter <= 30 ? 30 : inverter < 70 ? 60 : 100;
  // const panels = inverter <= 5 ? 6 : inverter <= 10 ? 12 : inverter <= 15 ? 16 : inverter <= 20 ? 18 : inverter <= 30 ? 36 : inverter < 70 ? 72 : 100;
  const panels = Math.ceil(systemSize / PANEL_BASE);
  const savings = systemSizeRoundedUp * SAVINGS_RATIO * 6 * 30 * 12 * 5;

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <Form onSubmit={handleSubmit(saveData)}>
        <fieldset>
          <label>Current electricity bill</label>
          <div className="d-flex align-items-center mb-2">
            R
            <Input
              type="number"
              value={getValues()?.monthlyBill}
              onChange={(event) => {
                setState({ ...state, monthlyBill: event?.target?.valueAsNumber });
                setValue("monthlyBill", event?.target?.valueAsNumber);
              }}
            />
          </div>
          <Slider
            max={25000}
            {...register("monthlyBill", { onChange: (event) => setState({ ...state, monthlyBill: event?.target?.valueAsNumber }) })}
          />

          <label>Solution type</label>

          <div className="radio-group">
            <label className={`radio-label ${getValues("solutionType") === "loadShedding" ? "selected" : ""}`} htmlFor="field-loadShedding">
              <Input
                {...register("solutionType", { onChange: () => setState({ ...state, solutionType: "loadShedding" }) })}
                type="radio"
                value="loadShedding"
                id="field-loadShedding"
              />
              Load shedding solution
              <span className="radio-flag">recommended</span>
            </label>
            <label className={`radio-label ${getValues("solutionType") === "offGrid" ? "selected" : ""}`} htmlFor="field-offGrid">
              <Input
                {...register("solutionType", { onChange: () => setState({ ...state, solutionType: "offGrid" }) })}
                type="radio"
                value="offGrid"
                id="field-offGrid"
              />
              Off-grid system
            </label>
          </div>

          {/* <div>
            <label>System size</label>
            <div>{systemSizeRoundedUp}kWp</div>
          </div> */}

          <label>Inverter Size {getValues().solutionType === "loadShedding" ? "" : "(Off-grid)"} </label>
          <div>{inverter}kW Hybrid Inverter</div>

          <label>Battery</label>
          {getValues()?.showBattery && <div>{batterySize}kWh Lithium Battery</div>}

          <label>Number of panels</label>
          <div>{panels}x 550W Tier1 Solar Panels</div>

          {/* <label className="switch mt-0">
            <Input
              type="checkbox"
              {...register("showBattery", {
                onChange: (event) => {
                  setState({ ...state, showBattery: !getValues().showBattery });
                },
              })}
            />
            <span className="switch__slider round"></span>
          </label> */}

          <hr />

          <label className="mt-4">Potential savings</label>
          <div>R{numberFormatter.format(savings)} Over 5 Years</div>

          <div className="mt-3">
            <label>ENVIRONMENTAL IMPACT (5 YEARS)</label>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <label>CO2 Offset:</label>
                <div>{numberFormatter.format(systemSize * 5.660377)} metric tons</div>
              </div>
              <div className="col-sm-12 col-md-4">
                <label>Car driven:</label>
                <div>{numberFormatter.format(systemSize * 13637.7358)} km</div>
              </div>
              <div className="col-sm-12 col-md-4">
                <label>Trees planted:</label>
                <div>{numberFormatter.format(systemSize * 90.56603)}</div>
              </div>
            </div>

            <label>Keep in Mind</label>
            <div>This is for ideal situations, but you may need more or less panels depending on your needs</div>
          </div>
          {/* <label>Possible reasons to decrease:</label>
          <div>Limited roof-space Heavily shaded roof Financial constraints/budget </div>
      
          <label>Possible reasons to increase:</label>
          <div>Desire to use additional AC/heat Planned home renovation/expansion Adding electric vehicle</div>
      
          <Field label="First name" error={errors?.firstName}>
            <Input {...register("firstName", { required: "First name is required" })} id="first-name" />
          </Field>
          <Field label="Last name" error={errors?.lastName}>
            <Input {...register("lastName", { required: "Last name is required" })} id="last-name" />
          </Field>
          <Field label="Email" error={errors?.email}>
            <Input {...register("email", { required: "Email is required" })} type="email" id="email" />
          </Field> */}
          {/* <div className="button-row">
            <Link className={`btn btn-secondary`} to="/MonthlyBill">
              {"<"} Previous
            </Link>
            <Button>How much will it cost? {">"}</Button>
          </div> */}
        </fieldset>
      </Form>
      {/* <a
        onClick={() => {
          var element = document.documentElement;
          element.setAttribute("data-bs-theme", getValues()?.theme === "dark" ? "light" : "dark");
          setState({ ...state, theme: getValues()?.theme === "dark" ? "light" : "dark" });
          setValue("theme", getValues()?.theme === "dark" ? "light" : "dark");
        }}
        className="theme-toggle"
      >
        <img
          style={{ filter: `invert(${getValues()?.theme === "dark" ? "1" : "0"})` }}
          src={getValues()?.theme === "dark" ? sun : sunglasses}
          alt="Dark/light mode"
        />
      </a> */}
    </>
  );
};
