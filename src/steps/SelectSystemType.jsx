import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../forms";
import { CheckboxGrid } from "../forms/CheckboxGrid";
import { useAppState } from "../state";
import systemTypeData from "./stystem_type_data.json";

export const SelectSystemType = () => {
  const [state, setState] = useAppState();
  const [preferences] = useState(systemTypeData);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: state, mode: "onSubmit" });
  const navigate = useNavigate();

  const saveData = (data) => {
    setState({ ...state, ...data });
    navigate("/bill");
  };

  return (
    <Form className="y-3" onSubmit={handleSubmit(saveData)}>
      <fieldset>
        {/* <h1>LET'S GET YOU OFF-GRID</h1> */}
        {/* <p>Use our calculator to get an estimate of what you need to keep more than the lights on…</p> */}

        <div style={{ background: "white", borderRadius: "12px", display: "flex", flexDirection: "row" }}>
          <div>
            {/* <h3>WELCOME TO YOUR SOLAR COST SAVINGS CALCULATOR</h3> */}
            <h3>Select a system type</h3>

            <CheckboxGrid items={preferences} />
          </div>
        </div>

        {/* <Button className="my-3">Next {">"}</Button> */}
      </fieldset>
    </Form>
  );
};
