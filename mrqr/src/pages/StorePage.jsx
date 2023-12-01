import { useQuery } from "@tanstack/react-query";
import StoreHeader from "../components/StoreHeader";
import { getCategory } from "../api/stocks";
import { useContext } from "react";
import { MenuContext } from "../context/MenuListContext";

function StorePage() {
  const queryStock = useQuery({ queryKey: ["category"], queryFn: getCategory });
  console.log(queryStock.data);
  const { menuData } = useContext(MenuContext);
  console.log(menuData);
  return (
    <section>
      <StoreHeader title="Store" tableNumber={1} />
      {queryStock.data &&
        queryStock.data.map((category) => {
          return (
            <div key={category.id}>
              <h2>{category.name}</h2>
            </div>
          );
        })}
    </section>
  );
}

export default StorePage;
