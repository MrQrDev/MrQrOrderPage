import { useQuery } from "@tanstack/react-query";
import StoreHeader from "../components/StoreHeader";
import { getCategory } from "../api/stocks";
import { useContext } from "react";
import { MenuContext } from "../context/MenuListContext";

function StorePage() {
  const {
    data: queryStock,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["category"], queryFn: getCategory });
  console.log(isLoading ? "loading" : "not loading");
  const { menuData } = useContext(MenuContext);
  return (
    <section>
      <StoreHeader title="Store" tableNumber={1} />
      <div className="flex items-center px-[1.5rem] gap-[1.1rem]">
        {queryStock &&
          queryStock.map((category) => {
            return (
              <div
                key={category.id}
                className="px-[1.4rem] text-[1.6rem] border-b-[3px] pb-[1rem]"
              >
                <h2>{category.name}</h2>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default StorePage;
