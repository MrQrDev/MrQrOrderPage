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
      <Swiper
        spaceBetween={10} // 슬라이드 간 간격 조정
        slidesPerView={'auto'} // 슬라이드 크기 자동 조정
        freeMode={true} // 자유로운 스크롤 모드 활성화
      >
        {queryStock.map(category => (
          <SwiperSlide key={category.id} style={{ width: 'auto' }}>
            <button
              onClick={() => setSelectedCategoryId(category.id)}
              className={`shrink-0 text-[1.6rem] py-[1.5rem] px-[1.4rem] border-b-2 ${
                category.id === selectedCategoryId
                  ? 'border-Primary'
                  : 'border-transparent'
              }`}
            >
              {category.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CategoryList
