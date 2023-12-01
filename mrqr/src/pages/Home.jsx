import { getLogin } from "../api/login";
import { getCategory } from "../api/stocks";

function Home() {
  return (
    <div className="p-4 bg-black">
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
