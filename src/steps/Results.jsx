import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Form, Input } from "../forms";
import { useAppState } from "../state";
import { Slider } from "../forms/Slider";
import sun from "../assets/sun.svg";
import sunglasses from "../assets/sunglasses.svg";
const sizeRatio = 0.0023896;
const sizeRatioBattery = 0.0026548;
const savingsRatio = 2.9788;

export const Results = () => {
  const [state, setState] = useAppState();

  const { handleSubmit, register, getValues, setValue } = useForm({
    defaultValues: { ...state, monthlyBill: 200, percentage: 100, showBattery: true, theme: "light" },
  });
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/complete");
  };
  const currentSizeRatio = getValues().showBattery ? sizeRatioBattery : sizeRatio;
  const size = ((getValues()?.monthlyBill * currentSizeRatio * getValues()?.percentage) / 100).toFixed(2);
  const inverter = size <= 3 ? `3 kW` : size <= 5 ? `5 kW` : size <= 10 ? `10 kW` : size <= 15 ? `${Math.ceil(size / 5)}x 5 kW` : `${Math.ceil(size / 10)}x 10 kW`;
  const batteries = size <= 3 ? `1 x 3kWh` : size <= 5 ? `1 x 5kWh` : size <= 10 ? `1 x 10 kWh` : size <= 15 ? `${Math.ceil(size / 5)}x 5kWh` : `${Math.ceil(size / 10)}x 10kWh`;
  const panels = Math.ceil(size / 0.55);
  const savings = size * savingsRatio * 6 * 30 * 12 * 5;

  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <Form onSubmit={handleSubmit(saveData)}>
        <fieldset>
          <label>Current bill</label>
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
          <Slider max={25000} {...register("monthlyBill", { onChange: (event) => setState({ ...state, monthlyBill: event?.target?.valueAsNumber }) })} />

          <h4 className="mt-5">To cover {getValues()?.percentage}% of your average utility bill, you’ll need:</h4>
          <label>Number of panels</label>
          <div>{panels} Tier 1 550 Watt Panels</div>

          <label>System size</label>
          <div>{size} kWp</div>

          <label>Inverter size</label>
          <div>{inverter}</div>

          <label>Battery</label>
          {getValues()?.showBattery && <div>{batteries}</div>}
          <label className="switch mt-1">
            <Input
              type="checkbox"
              {...register("showBattery", {
                onChange: (event) => {
                  setState({ ...state, showBattery: !getValues().showBattery });
                },
              })}
            />
            <span className="switch__slider round"></span>
          </label>

          <label className="mt-4">Potential savings</label>
          <div>R{numberFormatter.format(savings)} Over 5 Years</div>

          <div className="py-4">
            <h5>ENVIRONMENTAL IMPACT (5 YEARS)</h5>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <label>CO2 Offset:</label>
                <div>{numberFormatter.format(size * 5.660377)} metric tons</div>
              </div>
              <div className="col-sm-12 col-md-4">
                <label>Car driven:</label>
                <div>{numberFormatter.format(size * 13637.7358)} km</div>
              </div>
              <div className="col-sm-12 col-md-4">
                <label>Trees planted:</label>
                <div>{numberFormatter.format(size * 90.56603)}</div>
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
      <a
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
      </a>
    </>
  );
};
