import { forwardRef } from "react";
import { useForm } from "react-hook-form";

import { Button } from ".";
import { useAppState } from "../state";

export const CheckboxGrid = forwardRef(
  ({ children, items, ...props }, ref) => {
    const [state, setState] = useAppState();
    const {
      register,
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    return (
      <div className="checkbox-grid-container">
        {items.map((button) => (
          <Button
            id={button.id}
            onClick={() => setState("selectedSystemType", button.name)}
          >
            {button.title}
          </Button>
        ))}

      </div>
    );
  }
);
