import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Header({ title }) {
  const navigate = useNavigate();

  return (
    <section
      className={`flex z-20 items-center justify-between px-[2rem] py-[1.7rem] w-full transition-all duration-300 border-b-[1px]`}
    >
      <div className="w-1/4">
        <FaAngleLeft
          size={24}
          className={`text-start `}
          onClick={() => navigate(-1)}
        />
      </div>
      <h1 className="w-2/4 text-center text-[1.8rem] regular">{title}</h1>
      <div className="w-1/4" />
    </section>
  );
}

export default Header;
