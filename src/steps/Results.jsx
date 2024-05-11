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
    defaultValues: { ...state, monthlyBill: 200, percentage: 100, showBattery: true },
  });
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/complete");
  };
  const currentSizeRatio = getValues().showBattery ? sizeRatioBattery : sizeRatio;
  const size = ((getValues()?.monthlyBill * currentSizeRatio * getValues()?.percentage) / 100).toFixed(2);
  const batteries = size <= 5 ? "1x 5kWh" : `${Math.ceil(size / 9)}x 10kWh`;
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
          <h4>To cover {getValues()?.percentage}% of your average utility bill, you’ll need:</h4>
          <label>Number of panels</label>
          <div>{panels} Tier 1 550 Watt Panels</div>
          <label>System size</label>
          <div>{size} kWp</div>
          <label>Battery</label>
          {getValues()?.showBattery && <div>{batteries}</div>}
          <label className="switch mt-1">
            <Input
              type="checkbox"
              {...register("showBattery", {
                onChange: (event) => {
                  setState({ showBattery: !getValues().showBattery });
                },
              })}
            />
            <span className="switch__slider round"></span>
          </label>
          <label className="mt-4">Potential savings</label>
          <div>R{numberFormatter.format(savings)} Over 5 Years</div>
          <label>Current bill</label>
          <div className="d-flex align-items-center mb-2">
            R
            <Input
              type="number"
              value={getValues()?.monthlyBill}
              onChange={(event) => {
                setState({ monthlyBill: event?.target?.valueAsNumber });
                setValue("monthlyBill", event?.target?.valueAsNumber);
              }}
            />
          </div>
          <Slider max={25000} {...register("monthlyBill", { onChange: (event) => setState({ monthlyBill: event?.target?.valueAsNumber }) })} />
          <label>New offset bill @ {getValues()?.percentage}%</label>R
          {numberFormatter.format((getValues()?.monthlyBill * getValues()?.percentage) / 100)}
          <Slider
            style={{ color: "green", width: "100%" }}
            min={1}
            max={200}
            {...register("percentage", { onChange: (event) => setState({ percentage: event?.target?.valueAsNumber }) })}
          />
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
            <div>
              <small>
                Slider @ 100% is to offset your ENTIRE electric bill. Your needs may vary. Try moving the slider for smaller or bigger system sizes to
                suit your budget and goals.
              </small>
            </div>
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
          element.setAttribute("data-bs-theme", state.theme === "dark" ? "light" : "dark");
          setState({ theme: state.theme === "dark" ? "light" : "dark" });
        }}
        className="theme-toggle"
      >
        <img style={{filter: `invert(${state.theme === "dark" ? "1" : "0"})`}} src={state.theme === "dark" ? sun : sunglasses} alt="Dark/light mode" />
      </a>
    </>
  );
};
