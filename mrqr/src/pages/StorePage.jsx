import { useQuery } from "@tanstack/react-query";
import StoreHeader from "../components/StoreHeader";
import { getCategory, getStocks } from "../api/stocks";
import { useContext, useState, useEffect } from "react";
import { MenuContext } from "../context/MenuListContext";

function StorePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const {
    data: queryStock,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["category"], queryFn: getCategory });

  const {
    data: stocks,
    isLoading: stocksLoading,
    isError: stocksError,
  } = useQuery(
    selectedCategoryId && {
      queryKey: ["stocks", selectedCategoryId],
      queryFn: () => getStocks(selectedCategoryId),
    }
  );

  useEffect(() => {
    if (queryStock && queryStock.length > 0) {
      setSelectedCategoryId(queryStock[0].id);
    }
  }, [queryStock]);

  const { menuData } = useContext(MenuContext);

  const selectedCategoryName = queryStock?.find(
    (category) => category.id === selectedCategoryId
  )?.name;

  return (
    <section>
      <StoreHeader title="Store" tableNumber={1} />
      <div className="flex items-center px-[1.5rem] gap-[1.1rem]">
        {queryStock &&
          queryStock.map((category) => {
            return (
              <button
                onClick={() => setSelectedCategoryId(category.id)}
                key={category.id}
                className={`px-[1.4rem] text-[1.6rem] border-b-2 pb-[1.5rem] ${
                  category.id === selectedCategoryId
                    ? "border-Primary"
                    : "border-transparent"
                }`}
              >
                {category.name}
              </button>
            );
          })}
      </div>
      {/* MenuSection */}
      <div className="flex flex-col justify-center gap-[1.5rem] mt-[2.5rem]">
        <h2 className="text-[2rem] semibold ml-[2rem]">
          {selectedCategoryName}
        </h2>
        {stocks &&
          stocks.map((stock) => {
            return (
              <div
                key={stock.id}
                className="flex items-center justify-between w-full p-[2rem] bg-white border-b-2
                "
              >
                <div className="flex flex-col gap-[.9rem] ">
                  <p className="text-[1.6rem]">{stock.name}</p>
                  <p className="text-[1.4rem] light text-textGray">
                    {stock.describe}
                  </p>
                  <p className="text-[1.4rem]">
                    {stock.price.toLocaleString()}원
                  </p>
                </div>
                <img
                  className="w-[9rem] h-[9rem] object-cover rounded-md"
                  // src={stock.image_url }
                  src={"/images/menuImage/example.png"}
                  alt={stock.name}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default StorePage;
