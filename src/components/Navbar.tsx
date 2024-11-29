import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();  // Use location hook to get the current URL path

  // Function to check if the current path matches the filter
  const getActiveClass = (path: string) => {
    return location.search === `?todos=${path}` ? "active" : "";
  };

  return (
    <nav>
      <Link to="/" className={getActiveClass("all")}>All</Link>
      <Link to="/?todos=active" className={getActiveClass("active")}>Active</Link>
      <Link to="/?todos=completed" className={getActiveClass("completed")}>Completed</Link>
    </nav>
  );
}

export default Navbar;
