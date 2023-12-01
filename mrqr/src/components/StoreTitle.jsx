function StoreTitle({ title }) {
  return (
    <section className="flex items-center justify-center w-full h-16 text-[1.6rem] font-bold text-center text-white bg-black">
      {title ? title : "띵동 1호점"}
      <button>직원요청</button>
    </section>
  );
}

export default StoreTitle;
