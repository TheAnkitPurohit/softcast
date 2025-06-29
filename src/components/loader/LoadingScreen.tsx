import LoadingSpinner from '@/components/loader/LoadingSpinner'

const LoadingScreen = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <LoadingSpinner />
    </div>
  )
}

export default LoadingScreen
