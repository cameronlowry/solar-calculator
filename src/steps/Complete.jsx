import { Link } from "react-router-dom";

export const Complete = () => {
  return (
    <>
      <h1>Complete</h1>

      <Link className={`btn btn-secondary`} to="/">
        {"<"} Start over
      </Link>
    </>
  );
};
