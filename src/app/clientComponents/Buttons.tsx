
interface AppendButtonProp{
    appendAction:()=>void
    disabled?:boolean
}
interface RemoveButtonProp{
   
    removeAction:()=>void
}
export default function AppendButton({appendAction,disabled}:AppendButtonProp){
    return(
        <button
        type="button"
        className={`
        px-6 py-1 mt-4 bg-blue-600 text-white
         rounded-lg hover:bg-blue-700 
         ${disabled&&'bg-gray-600 hover:bg-gray-600'}
        font-medium transition-colors`}
        onClick={()=>appendAction()}
        disabled={disabled}
        >
            Add
        </button>
    )
}
export  function RemoveButton({removeAction}:RemoveButtonProp){
    return(
        <button
        className="px-6 py-1  text-white rounded-lg hover:scale-75 transition-all duration-150 font-medium"
        onClick={()=>removeAction()}>
          &#10060;
        </button>
    )
}
