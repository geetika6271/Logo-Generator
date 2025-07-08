"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'

const Info = () => {

    const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text 3xl text-pink-600'>Hii {userDetail?.name}</h2>
            <div className='flex items-center gap-2'>
                <Image src={'/globe.svg'} alt='img' width={35} height={35}/>
                <h2>{userDetail?.credits} Credit Left</h2>
            </div>
        </div>
        <div className='flex justify-between items-center mt-6'>
          <h2 className='font-bold trext-2xl'>Dashboard</h2>
          <Link href='/create'><Button>+ Create New Logo</Button></Link>
        </div>
    </div>
  )
}

export default Info