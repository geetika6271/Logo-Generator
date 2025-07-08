import { AILogoPrompt } from "@/app/configs/AiModel";
import { db } from "@/app/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req){

    const {prompt,title,email,desc}=await req.json();


    try{
        //Generate Ai text prompt for logo
    
        const AiPromptResult = await AILogoPrompt(prompt);

        const parsedPrompt = JSON.parse(AiPromptResult);
        
        console.log(parsedPrompt.prompt);

        const inputtext = parsedPrompt.prompt;


        // generate logo for the prompt
		const response = await axios.post(
			"https://router.huggingface.co/fal-ai/fal-ai/flux-lora",
			{
				sync_mode: true,
				prompt:inputtext,
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
					"Content-Type": "application/json",
				},
			
			}
		);


        const imageUrl = response.data.images[0].url;

        try{
            const docRef= setDoc(doc(db,'users',email,'logos',Date.now().toString()),{
                image:imageUrl,
                title:title,
                desc:desc
            })

        }
        catch(e){
            console.log(e);
        }
		return NextResponse.json({ image: imageUrl });
	} catch (error) {
		console.error("Image generation error:", error.message);
		return NextResponse.json({ error: "Failed to generate logo image" }, { status: 500 });
	}
}
        