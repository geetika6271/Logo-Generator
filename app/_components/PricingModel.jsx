"use client"
import React, { useEffect } from 'react'
import HeadingDesc from '../create/_components/HeadingDesc'
import Lookup from '../_data/Lookup'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const PricingModel = ({formData,onHandleInputChange}) => {

    const {user} = useUser();
    useEffect(()=>{
        if(formData?.title && typeof window!=='undefined')
        {

            localStorage.setItem('formData',JSON.stringify(formData));
        }
    },[formData])

  return (
    <div className='my-10'>
        <HeadingDesc title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}/>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {Lookup.pricingOption.map((pricing,index)=>(
                <div className='flex flex-col items-center p-5 border rounded-xl'
                key={index}>
                    <Image src={pricing.icon} alt={pricing.title}
                    width={60} height={60}/>
                <h2>{pricing.title}</h2>
                <div>
                    {pricing.features.map((feature,index)=>(
                        <h2 className='index' key={index}>{feature}</h2>
                    ))}
                </div>
                {user?
                <Link href={'/generate-logo?type='+pricing.title}>
                 <Button>{pricing.button}</Button>
                 </Link>
                 :<SignInButton mode='modal' forceRedirectUrl={'/generate-logo?type='+pricing.title}>
                    <Button>{pricing.button}</Button>
                  </SignInButton>
                }
               
                </div>
            ))}
        </div>

    </div>
  )
}

export default PricingModel