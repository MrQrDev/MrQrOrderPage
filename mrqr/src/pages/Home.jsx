import { useQuery } from "@tanstack/react-query";
import { getLogin } from "../api/login";
import { getCategory } from "../api/stocks";

function Home() {
  const queryStock = useQuery({ queryKey: ["stocks"], queryFn: getCategory });
  console.log(queryStock.data);
  return (
    <div className="p-[2rem]">
      Home
      <button
        onClick={() =>
          getLogin({
            email: "mrqr@naver.com",
            password: "a123",
          })
        }
      >
        login
      </button>
      <button onClick={() => getCategory()}>get CATEGORY</button>
    </div>
  );
}

export default Home;
