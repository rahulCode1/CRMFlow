import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const MainNavigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Auto close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const NavItems = () => (
    <>
      <li className="nav-item">
        <NavLink to="/" end className="nav-link text-light">
          <i className="bi bi-house-door me-2"></i>
          Dashboard
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/leads" end className="nav-link text-light">
          <i className="bi bi-people me-2"></i>
          Leads
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/leads/addLeads" className="nav-link text-light">
          <i className="bi bi-person-plus me-2"></i>
          Add Leads
        </NavLink>
      </li>

      <li className="nav-item mt-3">
        <div className="text-muted small text-uppercase px-3">
          Sales Team
        </div>
      </li>

      <li className="nav-item">
        <NavLink to="/salesAgent" end className="nav-link text-light">
          <i className="bi bi-person-badge me-2"></i>
          Sales Agents
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/salesAgent/add" className="nav-link text-light">
          <i className="bi bi-person-plus-fill me-2"></i>
          Add Sales Agent
        </NavLink>
      </li>

      <li className="nav-item mt-3">
        <div className="text-muted small text-uppercase px-3">
          Analytics
        </div>
      </li>

      <li className="nav-item">
        <NavLink to="/report" className="nav-link text-light">
          <i className="bi bi-bar-chart me-2"></i>
          Reports
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/leads/newLeads" className="nav-link text-light">
          <i className="bi bi-star me-2"></i>
          Leads Via Status
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/leads/leadByAgents" className="nav-link text-light">
          <i className="bi bi-diagram-3 me-2"></i>
          Leads by Agent
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/setting" className="nav-link text-light">
          <i className="bi bi-gear me-2"></i>
          Setting
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* ================= MOBILE TOP NAVBAR ================= */}
      <nav className="navbar navbar-dark bg-dark d-md-none px-3">
        <span className="navbar-brand fw-semibold">CRMFlow</span>

        <button
          className="btn btn-outline-light"
          onClick={() => setOpen(!open)}
        >
          <i className="bi bi-list fs-4">☰</i>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="bg-dark d-md-none border-top border-secondary">
          <ul className="nav flex-column px-3 py-2 gap-2">
            <NavItems />
          </ul>
        </div>
      )}

      {/* ================= DESKTOP / TABLET SIDEBAR ================= */}
      <aside
        className="bg-dark border-end border-secondary shadow-lg
                   flex-shrink-0 d-none d-md-flex flex-column"
        style={{
          width: "240px",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <div className="p-3 border-bottom border-secondary">
          <h5 className="text-white mb-0 fw-semibold">CRMFlow</h5>
        </div>

        <nav className="flex-grow-1 p-3">
          <ul className="nav nav-pills flex-column gap-2">
            <NavItems />
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MainNavigation;
