import { useNavigate } from "react-router-dom";

interface IHeaderLinkProps {
  label: string;
  link: string;
  isClicked: boolean;
  page?: string;
}

const HeaderLink = ({ label, link, isClicked, page }: IHeaderLinkProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex justify-center flex-grow mx-1 p-2 text-sm cusor-pointer rounded-md cursor-pointer ${
        page === "login" ? "hover:bg-white/10 hover:text-white/70" : "hover:bg-SUB_GREEN_01 hover:text-MAIN_GREEN"
      } ${isClicked ? "text-MAIN_GREEN" : ""}`}
      onClick={() => navigate(link)}
    >
      {label}
    </div>
  );
};

export default HeaderLink;
