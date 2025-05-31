export function EscapeJSONStringForJSON(input:string) {
  const escaped = input
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
    
  return `"${escaped}"`; 
}
export function UnEscapeJSONstring(input:string ){
    try{
         const escapedInput = input
      .replace(/\\/g, '\\\\')    // Escape backslashes
      .replace(/"/g, '\\"')      // Escape double quotes
      .replace(/\n/g, '\\n')     // Escape newlines
      .replace(/\r/g, '\\r'); 
      return JSON.parse(`"${escapedInput}"`)
    }catch(err){
        console.log("Failed to parse the string ",err)
        return 
    }
}


