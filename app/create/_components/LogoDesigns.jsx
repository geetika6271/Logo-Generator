import React, { useState } from 'react'
import HeadingDesc from './HeadingDesc'
import Lookup from '@/app/_data/Lookup'
import LogoDesig from '@/app/_data/LogoDesig'
import Image from 'next/image'

const LogoDesigns = ({onHandleInputChange,formData}) => {
  const[selectedOption,setSelectedOption] = useState(formData?.design?.title);
  return (
    <div className='my-10'>
        <HeadingDesc title={Lookup?.LogoDesignTitle}
        description={Lookup?.LogoDesignDesc}/>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
          {LogoDesig.map((design,index)=>(
            <div key={index} onClick={()=>{setSelectedOption(design.title);
              onHandleInputChange(design)
            }}
            className={`p-1 hover:border-2 border-primary rounded-xl cursor pointer${selectedOption == design.title && 'border-2 rounded-xl border-primary'}`}>
              <Image src={design.image} width={300} height={200} alt="img"
              className='w-full rounded-xl h-[150px] object-cover'/>
            </div>
          ))}
        </div>
        {/* <input type="text" placeholder={Lookup.InputTitlePlaceholder}
        className='p-4 border rounded-lg w-full mt-5'
        defaultValue={title}
        onChange={(e)=>onHandleInputChange(e.target.value)}/> */}
    </div>
  )
}

export default LogoDesigns