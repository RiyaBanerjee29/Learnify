import React from 'react'
import pic  from "../assets/pic.jpg"
import pic1  from "../assets/pic1.jpg"
import pic2  from "../assets/pic2.jpg"
import pic3  from "../assets/pic3.jpg"
import Carousel from '../components/Utility/Carousel '
import {kitten , dog , hero , one ,two ,three} from "../assets/index.js"
  

function Home() {
  const images = [
    one,two,three
  ];
  
  return (
   <>
      <div className=''>
      <h2 className='text-2xl my-5'>Interested in welcoming a pet into your home?</h2>
      <Carousel images={images}  className="h-30"/> 
       <div className='flex '>
       { /* <img src={hero} className='h-96 m-4' />
        <h2>
        Waiting Eyes, Wagging Tails. Open Your Home to a Forever Friend
        </h2>*/}
       </div>
      </div>
    
     

   </>
  )
}

export default Home