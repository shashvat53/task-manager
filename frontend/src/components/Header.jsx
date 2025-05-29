import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div className="h-16 w-full border-b">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="md:text-3xl font-bold">Task Management System</h1>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
