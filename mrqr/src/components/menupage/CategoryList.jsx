import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import CategorySkeleton from '../../skeleton/skeleton_stock/CategorySkeleton'

function CategoryList ({
  categoryLoading,
  queryStock,
  selectedCategoryId,
  setSelectedCategoryId
}) {
  if (categoryLoading) {
    return (
      <div className='flex items-center px-[1.5rem] gap-[1.1rem]'>
        {Array.from({ length: 3 }).map((_, index) => (
          <CategorySkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className='px-[1.5rem]'>
      <div className='grid grid-cols-4'>
        {queryStock.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`shrink-0 text-[1.6rem] py-[1rem] border-b-2 ${
              category.id === selectedCategoryId
                ? 'border-Primary'
                : 'border-transparent'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
