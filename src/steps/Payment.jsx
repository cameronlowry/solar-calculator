import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../forms";
import { useAppState } from "../state";

export const Payment = () => {
  const [state, setState] = useAppState();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  const watchPassword = watch("password");
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/MonthlyBill");
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>Payment</legend>

        <Button>Next {">"}</Button>
      </fieldset>
    </Form>
  );
};
