export default function OrderItem({ menu }) {
  const requiredOptions =
    menu.options?.require?.flatMap((option) => option.selected_items) || [];
  const additionalOptions =
    menu.options?.addition?.flatMap((option) => option.selected_items) || [];
  const allOptions = [...requiredOptions, ...additionalOptions];

  return (
    <div>
      <div className="flex items-center justify-between text-graycaption">
        <div className="flex flex-col gap-[.5rem]">
          <h2 className="text-[1.6rem]">{menu.name}</h2>
        </div>
        <span className="text-[1.6rem]">{menu.price.toLocaleString()}원</span>
      </div>
    </div>
  );
}
