import { features } from '../../utils/features.js'

const Features = () => {
  return (
    <>
      <div className='bg-custom-gray pb-2 md:pb-8'>
        <h1 className='text-center font-extrabold text-2xl py-4 font-inter'>Features</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-8 gap-4 w-10/12 mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-xl rounded-sm p-4 hover:bg-custom-teal hover:text-white hover:cursor-default">
              <img src={feature.iconUrl} alt="icon" className='w-12 mx-auto my-2 lg:w-1/12'/>
              <h3 className='text-center font-bold font-poppins mt-2'>{feature.title}</h3>
              <p className='text-center font-normal my-2 font-poppins lg:text-sm'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Features
