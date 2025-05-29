import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FormType } from "@/app/types/formType";
import { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.vfs;
export const GeneratePDF_file=(formdata:FormType)=>{
    const{name,email,role}=formdata
    const docDefinition:TDocumentDefinitions={
        content:[
            {text:name,style:'header'},
            {text:role,style:'subheader'},
            {text:email,style:'email'}
        ],
        styles:{
            header:{
                bold:true,
                color:"#3366ff",
                marginBottom:10,
                fontSize:28
            },
            subheader:{
                bold:true,
                color:"black",
                marginLeft:16,
                marginBottom:10,
                fontSize:19
            }
        }
        
        
    }
    const pdfGenerator=pdfMake.createPdf(docDefinition);
   
    pdfGenerator.getBlob((blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = "resume.pdf";
  link.textContent = "Download PDF";
  document.body.appendChild(link);
});


}