import { data } from '../../utils/testimonials.js'

const Testimonials = () => {
  return (
    <>
      <div className='bg-custom-gray p-2 md:pb-4'>
        <h1 className='text-center font-extrabold text-2xl py-4 font-poppins md:mt-4'>
          Response From Peoples On Complaints
        </h1>
        <p className='text-center text-sm font-inter my-2 md:mb-4'>
          Empowering citizens to report crimes quickly and efficiently, ensuring safer communities for all.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-11/12 mx-auto">
          {data.map((data, index) => (
            <div key={index} className="bg-white shadow-xl rounded-sm p-4">
              <div className='flex flex-col'>
                <h3 className='text-center font-bold font-poppins mt-2 lg:my-2'>{data.title}</h3>
                <p className='text-center font-normal my-2 font-poppins lg:text-sm'>{data.description}</p>
              </div>
              <div className='md:flex md:flex-row-reverse  md:justify-between md:items-center'>  
                <div>
                  <img src={data.icon} alt="icon" className='w-12 mx-auto my-2 md:me-8' />
                </div>
                <div className='flex flex-col items-center'>
                  <img src={data.img} alt="image" className='rounded-full mx-auto w-16' />
                  <p className='font-poppins mt-2 lg:text-sm'>{data.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Testimonials
