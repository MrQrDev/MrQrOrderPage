function ErrorFallback () {
  return (
    <div className='flex flex-col w-full h-[100vh] justify-center items-center '>
      <span className='text-[2rem] w-[80%] text-center'>
        죄송합니다. 에러가 발생했습니다.
      </span>
      <img src='/images/404.jpeg' alt='error' className='w-[50%] h-[50%]' />
    </div>
  )
}

export default ErrorFallback
