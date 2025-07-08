import { AiDesignIdeas } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req){
    const {prompt} = await req.json();

    try{

        const result = await AiDesignIdeas(prompt);
       
       
        const parsed = JSON.parse(result);

        return NextResponse.json(parsed); 

    } catch(e){
        console.log(e);
        return NextResponse.json({error:e});
    }

}