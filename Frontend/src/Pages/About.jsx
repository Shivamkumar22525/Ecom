import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia cupiditate, officiis laudantium mollitia cum ullam ut, neque nisi facere nemo voluptas rerum similique placeat a voluptate ex et. Provident, repellat.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti et eos voluptatem corrupti quo sequi hic laudantium tenetur nesciunt dolores, beatae doloribus, iste minima fugit magnam officia quas laboriosam. Ab.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor blanditiis minima mollitia saepe odit molestias temporibus sint, ab odio consequatur obcaecati natus ducimus recusandae deleniti nisi suscipit perspiciatis quos amet?</p>
        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga laudantium et enim itaque magni, iure, quaerat iusto, explicabo soluta beatae impedit magnam sapiente sint quisquam nobis mollitia rerum labore officia.</p>          
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga laudantium et enim itaque magni, iure, quaerat iusto, explicabo soluta beatae impedit magnam sapiente sint quisquam nobis mollitia rerum labore officia.</p>          
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service::</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga laudantium et enim itaque magni, iure, quaerat iusto, explicabo soluta beatae impedit magnam sapiente sint quisquam nobis mollitia rerum labore officia.</p>          
        </div>

      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
