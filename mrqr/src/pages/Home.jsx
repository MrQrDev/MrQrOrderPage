import { useQuery } from "@tanstack/react-query";
import { getLogin } from "../api/login";
import { getCategory, getStocks } from "../api/stocks";

function Home() {
  const {
    data: stockOfCategory,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["stocks"], queryFn: () => getStocks(1) });
  console.log(stockOfCategory);
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
