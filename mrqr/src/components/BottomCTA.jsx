export function BottomCTA({ text, to }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[10rem] px-[1.6rem] pt-[1.5rem] border-t-[1px] bg-white">
      <button
        type="submit"
        className="w-full py-[1.65rem] text-[1.6rem] rounded-[1rem] bg-primary text-white semibold"
      ></button>
    </div>
  );
}
