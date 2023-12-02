import { useContext } from "react";
import { MenuContext } from "../context/MenuListContext";

function CartIndicator() {
  const { menuData } = useContext(MenuContext);
  return (
    <section className="z-50 fixed bottom-0 left-0 w-full bg-white border-t-[1px] h-[10rem] px-[1.6rem] pt-[1.5rem]">
      <div className="flex items-center justify-between px-[1.8rem] py-[1.3rem] bg-primary rounded-[1rem]">
        <div className="w-[30%]">
          <span className="bg-white w-[2.5rem] h-[2.5rem] semibold rounded-full flex justify-center items-center text-primary">
            {menuData.length}
          </span>
        </div>
        <span className="w-[30%] text-[1.6rem] text-white semibold text-center">
          장바구니 보기
        </span>
        <span className="w-[30%] text-end text-[1.6rem] medium text-white">
          9,000원
        </span>
      </div>
    </section>
  );
}

export default CartIndicator;
