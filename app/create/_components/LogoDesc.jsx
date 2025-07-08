import React from 'react'
import HeadingDesc from './HeadingDesc'
import Lookup from '@/app/_data/Lookup'

export const LogoDesc = ({onHandleInputChange,formData}) => {
  return (
    <div className='my-10'>
        <HeadingDesc title={Lookup?.LogoDesc}
        description={Lookup?.LogoDescTitle}/>

        <input type="text" placeholder={Lookup.InputTitlePlaceholder}
        className='p-4 border rounded-lg w-full mt-5'
        defaultValue={formData?.desc}
        onChange={(e)=>onHandleInputChange(e.target.value)}/> 
    </div>
  )
}
