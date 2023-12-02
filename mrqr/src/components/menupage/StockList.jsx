import { Link } from "react-router-dom";
import StockSkeleton from "../../skeleton/skeleton_stock/StockSkeleton";

function StockList({ stocksLoading, stocks, selectedCategoryName }) {
  return (
    <div className="flex flex-col justify-center gap-[1.5rem] mt-[2.5rem]">
      <h2 className="text-[2rem] semibold ml-[2rem]">{selectedCategoryName}</h2>
      {stocksLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <StockSkeleton key={index} />
          ))
        : stocks?.map((stock) => (
            <Link
              to={`${stock.id}`}
              key={stock.id}
              className="flex items-center justify-between w-full p-[2rem] bg-white border-b-2"
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
                src={"/images/menuImage/example.png"}
                alt={stock.name}
              />
            </Link>
          ))}
    </div>
  );
}
export default StockList;
