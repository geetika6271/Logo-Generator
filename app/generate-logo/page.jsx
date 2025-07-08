"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DownloadIcon, LayoutDashboard, LoaderIcon } from 'lucide-react'
import Lookup from '../_data/Lookup'
import Link from 'next/link'



const GenerateLogo = () => {
  const {userDetail,setUserDetail} = useContext(UserDetailContext);
  const[formData,setFormData]=useState();
 const [loading,setLoading] =useState(false);
 const [logoImage,setLogoImage]=useState();
  const searchParams=useSearchParams();
  const modelType=searchParams.get('type');


  useEffect(()=>{
    if(typeof window !=undefined && userDetail?.email){
      const storage = localStorage.getItem('formData');
      if(storage)
      {
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage));
      }
    }
  },[userDetail]);


  useEffect(()=>{
    if(formData?.title){
      GenerateAILogo();
    }
  },[formData])

  useEffect(()=>{
    if(typeof window !=undefined && logoImage)
    {
      localStorage.clear();
    }
  },[logoImage]);

  const GenerateAILogo=async()=>{


    if (modelType!='Free'&&userDetail?.credits<=0) {
      alert('Not Enought Credits!!!');
      return ;
    }

    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT
    .replace('{logoTitle}',formData.title)
    .replace('{logoDesc}',formData?.desc)
    .replace('{logoIdea}',formData.idea)
    .replace('{logoColor}',formData.palette)
    .replace('{logoDesign}',formData.design?.title)
    .replace('{logoPrompt}',formData?.design?.prompt);

    console.log(PROMPT);


		try {
			const res = await axios.post("/api/ai-logo-model", { 
        prompt: PROMPT,
        email: userDetail?.email,
        title: formData.title,
        desc: formData.desc,
        type:modelType,
        userCredits:userDetail?.credits
      });

      // console.log(res?.data);
			setLogoImage(res.data.image);
		} catch (error) {
			console.error("Image generation failed:", error.message);
		} finally {
			setLoading(false);
		}
  }

 const downloadPic=()=>{
  if (!logoImage) return;
  const link = document.createElement('a');
  link.href = logoImage;
  link.download = `${formData?.title || 'ai-logo'}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
   
      <h2 className='font-bold text-3xl text-pink-500'>{Lookup.LoadingWaitTitle}</h2>
      {loading&& <div className='flex flex-col items-center mt-2'>
        <p className='text-xl text-gray-500'>{Lookup.LoadingWaitDesc}</p>
        <LoaderIcon className='animate-spin'/>
        <Image src={'/loading.gif'} alt='loading' width={200} height={200}/>
        <h2 className='mt-2 font-medium text-2xl text-gray-500'>Do Not Refresh</h2>
        </div>}

      {logoImage&&
      <div className='mt-5'>
      <Image src={logoImage} alt="logo" width={300} height={300} className='rounded-xl' />

      <div className='mt-4 flex items-center gap-5'>
        <Button onClick={()=>downloadPic()}> <DownloadIcon/> Download</Button>
        <Link href={'/dashboard'}>
        <Button variant="outline"> <LayoutDashboard/> Dashboard</Button>
        </Link>
      </div>
      </div>
      }
    </div>





    // <div> 
    //   <h2>{loading&&'Loading...'}</h2>
    //   {!loading&&
    //   <div>
    //     <img src={logoImage} alt='logo' width={200} height={200}/>
    //   <Button onClick={downloadPic}>Download</Button>
    //   </div>
    //   }
    // </div>

  )
}

export default GenerateLogo