import React, { useEffect, useState } from 'react'
import HeadingDesc from './HeadingDesc'
import Lookup from '@/app/_data/Lookup'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'
import { Loader2Icon } from 'lucide-react'

const LogoIdea = ({formData,onHandleInputChange}) => {

  const[ideas,setIdeas] = useState([]);
  const[loading,setLoading]=useState(true);
  const[selectedOption,setSelectedOption]=useState();

  useEffect(()=>{
    generateLogoDesignIdea();
  },[])
  const generateLogoDesignIdea=async()=>{
    setLoading(true);

    const PROMPT=Prompt.DESIGN_IDEA_PROMPT
    .replace('{logoType}',formData?.design.title)
    .replace('{logoTitle}',formData?.title)
    .replace('{logoDesc}',formData.desc)
    .replace('{logoPrompt}',formData.design.prompt)

    //console.log(PROMPT)
    try{
      const result= await axios.post('/api/ai-design-ideas',{
        prompt: PROMPT
      })
    
      console.log(result.data.logo_ideas);
      const ideasArray = result.data.logo_ideas;
      // console.log("Fetched ideas:", ideasArray);
      setIdeas(ideasArray);
      setLoading(false);

    } catch(e){
      console.log(e);
    }
   
  }
  return (
    <div className='mt-10'>
      <HeadingDesc title={Lookup.LogoIdeaTitle}
      description={Lookup.LogoIdeaDesc}/>
     
     
     {loading&&<Loader2Icon className='animate-spin my-10'/>}
      <div>
      {ideas && ideas.map((item,index)=>(
        <h2 key={index}
        onClick={()=>{setSelectedOption(item);
          onHandleInputChange(item);
        }}
        className={`p-2 mt-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption==item&&'border-primary'}`}>{item}</h2>
      ))}

      <h2 className={`p-2 mt-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption=='Let AI select the best idea'&&'border-primary'}`}
          onClick={()=>{setSelectedOption('Let AI select the best idea');
            onHandleInputChange('Let AI select the best idea');
          }}>
            Let AI select the best idea
            </h2>
      </div>

     
    </div>
  )
}

export default LogoIdea
