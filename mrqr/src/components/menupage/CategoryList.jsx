import CategorySkeleton from "../../skeleton/skeleton_stock/CategorySkeleton";

function CategoryList({
  categoryLoading,
  queryStock,
  selectedCategoryId,
  setSelectedCategoryId,
}) {
  if (categoryLoading) {
    return (
      <div className="flex items-center px-[1.5rem] gap-[1.1rem]">
        {Array.from({ length: 3 }).map((_, index) => (
          <CategorySkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center px-[1.5rem] gap-[1.1rem]">
      {queryStock.map((category) => (
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
      ))}
    </div>
  );
}

export default CategoryList;
