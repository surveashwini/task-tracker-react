import Button from "../Button/Button";
import { useLocation } from "react-router-dom";

const Header = ({ showAddTask, onAdd }) => {
  const location = useLocation();
  return (
    <div className="header">
      <h1>Task Tracker</h1>

      {location.pathname === "/task-tracker-react/" && (
        <Button
          title={showAddTask ? "Close" : "Add"}
          color={showAddTask ? "red" : "green"}
          click={onAdd}
        />
      )}
    </div>
  );
};

export default Header;
