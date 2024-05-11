import { useLocation, useNavigate } from "react-router-dom";

export const Stepper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkClass = (path) => {
    return "nav-link disabled " + (path === location.pathname ? "active" : undefined);
  };

  return (
    <nav className="stepper navbar navbar-expand-lg">
      <div className="collapse navbar-collapse">
        <ol className="navbar-nav">
          <li className="step nav-item" onClick={() => navigate("/")}>
            <span className={getLinkClass("/")}>Select System Type</span>
          </li>
          <li className="step nav-item" onClick={() => navigate("/bill")}>
            <span className={getLinkClass("/MonthlyBill")}>Average monthly utility Bill</span>
          </li>
          <li className="step nav-item" onClick={() => navigate("/results")}>
            <span className={getLinkClass("/results")}>Results</span>
          </li>
          {/* <li className="step nav-item" onClick={() => navigate("/complete")}>
            <span className={getLinkClass("/complete")}>Complete</span>
          </li> */}
        </ol>
      </div>
    </nav>
  );
};
