import React from 'react'

const HeadingDesc = ({title,description}) => {
  return (
    <div>
        <h2 className='font-bold text-3xl text-primary'>{title}</h2>
        <p>{description}</p>
    </div>
  )
}

export default HeadingDesc