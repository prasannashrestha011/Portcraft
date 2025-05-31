import { create } from "zustand"

type StoreType={
    resultHTML:string 
    setResultHTML:(resultHTML:string)=>void 
}
export const useResultStore=create<StoreType>((set)=>({
    resultHTML:'',
    setResultHTML:(html)=>set({resultHTML:html})
}))