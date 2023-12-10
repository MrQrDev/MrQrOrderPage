import OrderItem from "./OrderItem";
export default function OrderList({ menuData }) {
  return (
    <div className="p-[1rem] flex flex-col ">
      <h2 className="text-[1.4rem] bold">주문내역</h2>
      {menuData &&
        menuData.map((menu, index) => <OrderItem key={index} menu={menu} />)}
    </div>
  );
}
