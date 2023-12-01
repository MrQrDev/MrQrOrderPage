import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Header({ title }) {
  const navigate = useNavigate();

  return (
    <section
      className={`flex z-20 items-center justify-between px-6 py-2 w-full transition-all duration-300`}
    >
      <LeftOutlined
        className={`w-1/4 text-start text-2xl`}
        onClick={() => navigate(-1)}
      />
      <h1 className="w-2/4 text-center text-[1.8rem]">{title}</h1>
    </section>
  );
}

export default Header;
