import { useState } from 'react'
import '../styles/modal.css'
const SERVICE = [
  '직원 호출',
  '물',
  '물티슈',
  '단무지',
  '양념장',
  '수저',
  '컵',
  '냅킨',
  '기타'
]

function StoreHeader ({ title, tableNumber }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleServiceSelect = service => {
    setSelectedServices(prevServices => {
      if (prevServices.includes(service)) {
        return prevServices.filter(s => s !== service)
      } else {
        return [...prevServices, service]
      }
    })
  }

  const handleRequestClick = () => {
    console.log('선택된 서비스:', selectedServices)
  }

  return (
    <div className='w-full flex items-center my-[2rem] justify-between px-[2rem]'>
      <div className='flex items-center gap-[1.2rem]'>
        <h2 className='text-[1.8rem] semibold'>{title}</h2>
        <span className='text-grayLight text-[1.2rem]'>No.{tableNumber}</span>
      </div>
      <button
        onClick={toggleModal}
        className='px-[1.6rem] py-[0.6rem] text-[1.4rem] ring-primary ring-[1px] rounded-[1rem] text-primary semibold'
      >
        직원요청
      </button>

      {isModalOpen && (
        <>
          <div
            className='fixed inset-0 bg-black bg-opacity-50'
            onClick={closeModal}
          />
          <div
            className={`fixed bottom-0 left-0 right-0 h-[90%] bg-white rounded-t-[2rem] pb-[6rem] modal-slide-up`}
          >
            <div className='px-[5rem] py-[4.5rem] overflow-y-scroll h-full'>
              <div className='flex flex-col justify-center items-center gap-[2rem]'>
                <div className='text-center'>
                  <h1 className='text-[1.8rem] semibold'>
                    요청사항을 클릭해주세요
                  </h1>
                  <span>요청하실 내용을 선택 후, 요청하기를 눌러주세요</span>
                </div>
                <div className='grid grid-cols-2 gap-[1rem] w-full'>
                  {SERVICE.map((item, index) => (
                    <div
                      key={index}
                      className={`bg-gray-200 w-full h-[12rem] ring-1 rounded-md flex justify-center items-center ${
                        selectedServices.includes(item)
                          ? 'ring-primary text-primary'
                          : 'ring-transparent'
                      }`}
                      onClick={() => handleServiceSelect(item)}
                    >
                      <h1 className='text-[1.6rem]'>{item}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <section className='z-50 fixed bottom-0 left-0 w-full bg-white border-t-[1px] h-[8rem] px-[1.6rem] pt-[1.5rem]'>
              <button
                className={`w-full py-[1.2rem] rounded-md text-[1.6rem] ${
                  selectedServices.length > 0
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-black'
                }`}
                onClick={handleRequestClick}
                disabled={selectedServices.length === 0}
              >
                요청하기
              </button>
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default StoreHeader
