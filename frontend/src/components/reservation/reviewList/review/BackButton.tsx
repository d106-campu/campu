import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const BackButton = ({ route }: { route: string }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`${route}`)}
      className="p-3 rounded-full hover:bg-SUB_GREEN_01 hover:text-MAIN_GREE"
    >
      <SlArrowLeft />
    </button>
  );
};
export default BackButton;
