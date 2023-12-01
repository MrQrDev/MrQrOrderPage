function StoreHeader({ title, tableNumber }) {
  return (
    <div className="w-full flex items-center my-[2rem] justify-between px-[2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <h2 className="text-[1.8rem] semibold">{title}</h2>
        <span className="text-grayLight text-[1.2rem]">No.{tableNumber}</span>
      </div>
      <button className="px-[1.6rem] py-[0.6rem] text-[1.4rem] ring-primary ring-[1px] rounded-[1rem] text-primary semibold">
        직원요청
      </button>
    </div>
  );
}

export default StoreHeader;
