import React from 'react'
import { Link } from 'react-router-dom'
import {BiSearch} from 'react-icons/bi';
import bimg from '../../../styles/images/bcardsimg.png';
import {FiBook} from 'react-icons/fi';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {CiUser} from 'react-icons/ci'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './blogc.css'




const BlogCommon = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 1,
    }
  };

  return (
    <div className='bg-gray-100'>

    <h1 style={{textAlign:'center', fontSize:'32px',color:'#151415', padding:'30px'}} >Blog Posts</h1>
    <div className='flex gap-20 w-[80%] mx-auto my-20 py-10 rounded-[20px]  border bg-white navbar-blogs '>
        <div className="d-flex gap-20 w-[70%] ml-20 items-center nav-bloglinks">
      <Link>News</Link>
      <Link>Trends</Link>
      <Link>Inspirational</Link>
      <Link>LifeStyle</Link>
      <Link>Resources</Link>
        </div>
        <div className=" d-flex gap-5 w-[30%] mr-10 bg-gray-100 items-center py-2 rounded-[10px] ">
            <i className=' ml-3' style={{color:'gray'}}>
            <BiSearch/>
            </i>
            <input type="text" className=' bg-transparent outline-none py-2 w-full ' placeholder='Search' />

        </div>
    </div>




<div className=' w-[80%] m-auto blog-cards '>

    <Carousel 
     swipeable={true}
     draggable={true}
     showDots={true}
     responsive={responsive}
     arrows={false}
     infinite={true}
    //  autoPlay={true}
    //  autoPlaySpeed={2000}
    //  transitionDuration={500}
     removeArrowOnDeviceType={["tablet", "mobile"]}
    
    
    >
    <div class="card rounded-[20px]  mt-5 mb-5" style={{width:"35rem",margin:'auto'}}>
  <img src={bimg} class="card-img-top w-[33rem] mt-3 ml-3 rounded-[10px]" alt="..."/>
  <div class="card-body">
    <h5 class="card-title" style={{fontSize:'24px', fontWeight:'500',lineHeight:'24px',color:'#151415'}}>How to keep your home clean at all times, made easy</h5>
    <div className=" d-flex mt-6 gap-6  " style={{fontSize:'15px',color:'#868B9A',fontWeight:'500'}}>
      <div className='flex items-center gap-2'>
      <CiUser/>
      <span>Jake </span>
      </div>
      <div className='flex items-center gap-2'>
      <AiOutlineClockCircle/>
      <span>11/04/22 </span>
      </div>
      <div className='flex items-center gap-2'>
      <FiBook/>
      <span>3m read </span>
      </div>
   
    </div>
    <p class="card-text mt-4" style={{fontSize:'16px',color:'#555555'}}>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo cons...Ut wisi enim ad...</p>
    <button class="btn btn-primary w-full p-2 rounded-[10px] mt-3" style={{fontSize:'22px'}}>Read More</button>
  </div>
</div>
<div class="card rounded-[20px]  mt-5 m-5" style={{width:"35rem",margin:'auto'}}>
  <img src={bimg} class="card-img-top w-[33rem] mt-3 ml-3 rounded-[10px]" alt="..."/>
  <div class="card-body">
    <h5 class="card-title" style={{fontSize:'24px', fontWeight:'500',lineHeight:'24px',color:'#151415'}}>How to keep your home clean at all times, made easy</h5>
    <div className=" d-flex mt-6 gap-6  " style={{fontSize:'15px',color:'#868B9A',fontWeight:'500'}}>
      <div className='flex items-center gap-2'>
      <CiUser/>
      <span>Jake </span>
      </div>
      <div className='flex items-center gap-2'>
      <AiOutlineClockCircle/>
      <span>11/04/22 </span>
      </div>
      <div className='flex items-center gap-2'>
      <FiBook/>
      <span>3m read </span>
      </div>
   
    </div>
    <p class="card-text mt-4" style={{fontSize:'16px',color:'#555555'}}>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo cons...Ut wisi enim ad...</p>
    <button class="btn btn-primary w-full p-2 rounded-[10px] mt-3" style={{fontSize:'22px'}}>Read More</button>
  </div>
</div>
<div class="card rounded-[20px]  mt-5 mb-5" style={{width:"35rem",margin:'auto'}}>
  <img src={bimg} class="card-img-top w-[33rem] mt-3 ml-3 rounded-[10px]" alt="..."/>
  <div class="card-body">
    <h5 class="card-title" style={{fontSize:'24px', fontWeight:'500',lineHeight:'24px',color:'#151415'}}>How to keep your home clean at all times, made easy</h5>
    <div className=" d-flex mt-6 gap-6  " style={{fontSize:'15px',color:'#868B9A',fontWeight:'500'}}>
      <div className='flex items-center gap-2'>
      <CiUser/>
      <span>Jake </span>
      </div>
      <div className='flex items-center gap-2'>
      <AiOutlineClockCircle/>
      <span>11/04/22 </span>
      </div>
      <div className='flex items-center gap-2'>
      <FiBook/>
      <span>3m read </span>
      </div>
   
    </div>
    <p class="card-text mt-4" style={{fontSize:'16px',color:'#555555'}}>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo cons...Ut wisi enim ad...</p>
    <button class="btn btn-primary w-full p-2 rounded-[10px] mt-3" style={{fontSize:'22px'}}>Read More</button>
  </div>
</div>
   <div class="card rounded-[20px]  mt-5 mb-5" style={{width:"35rem",margin:'auto'}}>
  <img src={bimg} class="card-img-top w-[33rem] mt-3 ml-3 rounded-[10px]" alt="..."/>
  <div class="card-body">
    <h5 class="card-title" style={{fontSize:'24px', fontWeight:'500',lineHeight:'24px',color:'#151415'}}>How to keep your home clean at all times, made easy</h5>
    <div className=" d-flex mt-6 gap-6  " style={{fontSize:'15px',color:'#868B9A',fontWeight:'500'}}>
      <div className='flex items-center gap-2'>
      <CiUser/>
      <span>Jake </span>
      </div>
      <div className='flex items-center gap-2'>
      <AiOutlineClockCircle/>
      <span>11/04/22 </span>
      </div>
      <div className='flex items-center gap-2'>
      <FiBook/>
      <span>3m read </span>
      </div>
   
    </div>
    <p class="card-text mt-4" style={{fontSize:'16px',color:'#555555'}}>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo cons...Ut wisi enim ad...</p>
    <button class="btn btn-primary w-full p-2 rounded-[10px] mt-3" style={{fontSize:'22px'}}>Read More</button>
  </div>
</div>
</Carousel>
</div>


   
    
 
    </div>
  )
}

export default BlogCommon