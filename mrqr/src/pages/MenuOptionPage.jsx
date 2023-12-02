import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FakegetStockById } from "../api/stocks";

function MenuOptionPage() {
  const { stock_id } = useParams();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    data: stock,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stockDetail"],
    queryFn: () => FakegetStockById(stock_id),
  });

  useEffect(() => {
    if (stock) {
      calculateTotal();
    }
  }, [selectedOptions, additionalOptions, stock]);

  const handleSelectOption = (optionId, item) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions, [optionId]: item.price };
      return newOptions;
    });
  };

  const handleCheckOption = (optionId, item, isChecked) => {
    setAdditionalOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      if (isChecked) {
        if (!newOptions[optionId]) newOptions[optionId] = [];
        newOptions[optionId].push(item.price);
      } else {
        newOptions[optionId] = newOptions[optionId].filter(
          (price) => price !== item.price
        );
      }
      return newOptions;
    });
  };

  const calculateTotal = () => {
    let newTotal = stock ? stock.price : 0;
    Object.values(selectedOptions).forEach((price) => {
      newTotal += price;
    });
    Object.values(additionalOptions)
      .flat()
      .forEach((price) => {
        newTotal += price;
      });
    setTotalPrice(newTotal);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading the stock details.</div>;
  }

  return (
    <section className="pb-[10rem]">
      <img
        src="/images/menuImage/example2.png"
        alt={stock.name}
        className="h-80 w-full object-cover"
      />
      <div className="">
        <div className="flex flex-col gap-[.5rem] p-[2rem] border-b-[1px]">
          <h3 className="text-[2rem] semibold">{stock.name}</h3>
          <p className="text-[1.4rem] text-textGray leading-[1.8rem]">
            {stock.describe}
          </p>
        </div>
        <div className="flex items-center justify-between px-[2.5rem] py-[2rem] border-b-[1px]">
          <h1 className="text-[1.6rem]">가격</h1>
          <h1 className="text-[1.6rem]">{stock.price.toLocaleString()}원</h1>
        </div>
        {stock.options.require.map((option) => (
          <div
            key={option.option_id}
            className="flex flex-col border-b-[1px] p-[2rem] text-[1.6rem]"
          >
            <h4 className="medium mb-[1.7rem]">{option.title}</h4>
            <div className="flex flex-col gap-[3.1rem]">
              {option.items.map((item) => (
                <label
                  key={item.name}
                  className="flex items-center justify-between hover:bg-gray-100 rounded-lg"
                >
                  <span className="flex items-center">
                    <input
                      type="radio"
                      name={`option-${option.option_id}`}
                      className="text-primary focus:ring-0 mr-2"
                      onChange={() =>
                        handleSelectOption(option.option_id, item)
                      }
                    />
                    <span>{item.name}</span>
                  </span>
                  <span>{`+${item.price.toLocaleString()}원`}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {stock.options.addition.map((option) => (
          <div
            key={option.option_id}
            className="flex flex-col p-[2rem] text-[1.6rem]"
          >
            <h4 className="medium mb-[1.7rem]">{option.title}</h4>
            <div className="flex flex-col gap-[3.1rem]">
              {option.items.map((item) => (
                <label
                  key={item.name}
                  className="flex items-center justify-between hover:bg-gray-100 rounded-lg"
                >
                  <span className="flex items-center">
                    <input
                      type="checkbox"
                      className="text-primary focus:ring-0 mr-2"
                      onChange={(e) =>
                        handleCheckOption(
                          option.option_id,
                          item,
                          e.target.checked
                        )
                      }
                    />
                    <span>{item.name}</span>
                  </span>
                  <span>
                    {item.price > 0
                      ? `+${item.price.toLocaleString()}원`
                      : "무료"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-[10rem] px-[1.6rem] pt-[1.5rem] border-t-[1px] bg-white">
        <button className="w-full py-[1.65rem] text-[1.6rem] rounded-[1rem] bg-primary text-white semibold">
          {totalPrice.toLocaleString()}원 담기
        </button>
      </div>
    </section>
  );
}

export default MenuOptionPage;
