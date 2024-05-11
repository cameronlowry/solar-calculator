import { forwardRef } from "react";

export const Slider = forwardRef(({ min = 100, max = 10000, ...props }, ref) => {
  return <input className="slider" ref={ref} type="range" min={min} max={max} {...props} />;
});
