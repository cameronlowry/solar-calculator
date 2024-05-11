import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "../forms";
import { useAppState } from "../state";
import { Slider } from "../forms/Slider";

export const MonthlyBill = () => {
  const [state, setState] = useAppState();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { ...state, monthlyBill: 800 }, mode: "onSubmit" });
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/results");
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <h3>Average monthly utility Bill</h3>
        <div>R{getValues()?.monthlyBill}</div>

        <Slider max={25000} {...register("monthlyBill", { onChange: (event) => setState({ monthlyBill: event?.currentTarget?.value }) })} />

        <Link className={`btn btn-secondary`} to="/">
          {"<"} Previous
        </Link>
        <Button>Calculate {">"}</Button>
      </fieldset>
    </Form>
  );
};
