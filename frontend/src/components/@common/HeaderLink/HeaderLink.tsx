import { useNavigate } from "react-router-dom";

interface IHeaderLinkProps {
  label: string;
  link: string;
  isClicked: boolean;
}

const HeaderLink = ({ label, link, isClicked }: IHeaderLinkProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex justify-center flex-grow mx-1 p-2 text-sm cusor-pointer rounded-md hover:bg-SUB_GREEN_01 cursor-pointer hover:text-MAIN_GREEN ${
        isClicked ? "text-MAIN_GREEN" : ""
      }`}
      onClick={() => navigate(link)}
    >
      {label}
    </div>
  );
};

export default HeaderLink;
