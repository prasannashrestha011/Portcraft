import axios from "axios";

export default async function SubmitPrompt(data:string){
    console.log(process.env.API_URL)
    try{
        const response=await axios.post(`${process.env.API_URL}?key=${process.env.API_KEY}`,{
        contents:[
            {
                parts:[
                    {
                        text:data,
                    },
                ],
            },
            
        ],
    },{
        headers:{
            "Content-Type":"application/json"
        }
    })
    console.log(response.data)
    return response.data 
    }catch(error){
        console.log("API error",error)
        return 
    }
}