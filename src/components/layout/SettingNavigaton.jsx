import { NavLink } from "react-router-dom";
const SettingNavigation = () => {
  return (
    <>
      <div className="bg-white shadow-sm px-2 px-sm-3 px-md-4 py-3">
        <div className="d-flex align-items-center justify-content-between flex-nowrap gap-2">
          {/* Title */}
          <h1 className="h4 d-none d-md-block mb-0 fw-semibold text-truncate">
            Settings
          </h1>

          {/* Navigation */}
          <ul className="nav gap-2 flex-nowrap">
            <li className="nav-item">
              <NavLink
                to="/setting/leads"
                className={({ isActive }) =>
                  `nav-link rounded fw-medium px-2 px-md-3 py-1 py-md-2 ${
                    isActive ? "bg-primary text-white" : "bg-light text-dark"
                  }`
                }
                style={{ fontSize: "0.85rem" }}
              >
                Manage Leads
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/setting/agents"
                className={({ isActive }) =>
                  `nav-link rounded fw-medium px-2 px-md-3 py-1 py-md-2 ${
                    isActive ? "bg-primary text-white" : "bg-light text-dark"
                  }`
                }
                style={{ fontSize: "0.85rem" }}
              >
                Manage Sales Agents
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SettingNavigation;
