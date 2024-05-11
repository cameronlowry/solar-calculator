import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Button, Field, Form, Input } from "../forms";

export const Register = () => {
  const [state, setState] = useState(0);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: state });
  const navigate = useNavigate();
  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/results");
  };

  return (
    <Form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        <legend>Register</legend>
        <Field label="First name" error={errors?.firstName}>
          <Input {...register("firstName", { required: "First name is required" })} id="first-name" />
        </Field>
        <Field label="Last name" error={errors?.lastName}>
          <Input {...register("lastName", { required: "Last name is required" })} id="last-name" />
        </Field>
        <Field label="Email" error={errors?.email}>
          <Input {...register("email", { required: "Email is required" })} type="email" id="email" />
        </Field>
        <div className="button-row">
          <Link className={`btn btn-secondary`} to="/">
            {"<"} Previous
          </Link>
          <Button>Next {">"}</Button>
        </div>
      </fieldset>
    </Form>
  );
};
