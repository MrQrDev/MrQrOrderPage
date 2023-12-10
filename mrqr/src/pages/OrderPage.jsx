import { useContext, useState } from "react";
import { MenuContext } from "../context/MenuListContext";
import { Link } from "react-router-dom";
import OrderList from "../components/orderpage/OrderList";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { handlePhoneInput } from "../util/formatphone";
import { reqServiceItems } from "../static/reqService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaPlus } from "react-icons/fa6";
function OrderPage() {
  const { menuData } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(true);

  const renderToggleButtonContent = () => {
    const icon = isOpen ? (
      <IoIosArrowUp size={14} />
    ) : (
      <IoIosArrowDown size={14} />
    );
    const text = isOpen ? "주문내역 닫기" : "주문내역 열기";

    return (
      <>
        {icon}
        <span className="text-[1.2rem] leading-[122%] semibold">{text}</span>
      </>
    );
  };

  return (
    <section className="px-[2rem] flex flex-col justify-center items-center h-[100vh] gap-[1rem]">
      <div className="flex w-full rounded-[1rem] ring-1 px-[2rem] py-[1.2rem] justify-between items-center">
        <span className="text-[1.4rem]">쿠폰 적립이 완료되었습니다!</span>
        <Link
          to={`/my/coupon`}
          className=" text-primary underline underline-offset-2 semibold text-[1.6rem]"
        >
          쿠폰함 이동하기
        </Link>
      </div>
      {/* 주문진행 상황UI */}
      <div className="flex flex-col w-full rounded-[1rem] ring-1 p-[2rem] pb-[1.5rem]">
        <div className="flex justify-between">
          <div>
            <h1 className="bold text-[2.2rem]">주문 진행중이에요</h1>
            <p className="text-[1.2rem] text-graycaption">
              맛있게 조리해드릴게요! <br />
              잠시만 기다려주세요!
            </p>
          </div>
          <div className="flex flex-col h-fit gap-[.4rem] p-[.8rem] items-center  bg-bgGrayLight rounded-[1rem]">
            <span className="text-[1rem] text-[#757575] semibold leading-[122%]">
              남은시간
            </span>
            <span className="text-[1.6rem] leading-[100%] bold">10분</span>
          </div>
        </div>
        {/* 주문 진행 바 */}
        <BorderLine />
        {/* 주문내역 */}
        {isOpen && <OrderList menuData={menuData} />}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-[.4rem] text-graycaption"
        >
          {renderToggleButtonContent()}
        </button>
      </div>
      {/* 전화번호 입력 섹션 */}
      <div className="flex flex-col gap-[1rem] w-full rounded-[1rem] ring-1 px-[2rem] py-[1.5rem] justify-between">
        <h1 className="text-[1.6rem] semibold">전화번호가 비어있어요</h1>
        <input
          type="tel"
          className=" w-full tracking-wide py-[.8rem] text-center ring-black ring-1 rounded-[1rem] placeholder:text-center placeholder:text-[1.8rem] text-[1.8rem]"
          placeholder="010-XXXX-XXXX"
          onChange={handlePhoneInput}
        />

        <p className="flex flex-col text-[1.2rem] text-graycaption">
          광고성 메시지가 걱정되시나요 ?<br />
          <span className="bold text-[1.6rem]">광고 NO 해킹 NO</span>
          오로지 고객님의 쿠폰 사라짐 방지만을 위한 서비스입니다.
        </p>
      </div>
      {/* 빠른 요청하기 섹션 */}
      <div className="flex flex-col gap-[1.5rem] w-full rounded-[1rem] ring-1 px-[2rem] py-[1.5rem]">
        <h1 className="text-[1.6rem] semibold">빠른 요청하기</h1>
        {/* 여기부터 다듬기  */}
        <div>
          <Swiper spaceBetween={6} slidesPerView={"auto"} freeMode={true}>
            {reqServiceItems.map((item, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <div className="relative flex items-center w-[5rem] h-[5rem] gap-[.4rem]">
                  <button className="w-full h-full text-[1.2rem] text-white bg-gray-400 rounded-[1rem] flex justify-center items-center">
                    {item}
                  </button>
                  <FaPlus className="absolute -top-2 -right-2 text-[1.4rem] p-[.2rem] rounded-full bg-primary text-white" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default OrderPage;

function BorderLine() {
  return <div className="w-full h-[.4rem] bg-[#f4f4f4]" />;
}
