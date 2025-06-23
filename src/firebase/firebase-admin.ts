import admin from 'firebase-admin'
if(!process.env.FIREBASE_ADMIN_KEYS){
    console.error("NO keys found")
    throw new Error("NO keys found")
}
const serviceAccount=JSON.parse(process.env.FIREBASE_ADMIN_KEYS)
if(!admin.apps.length){
    admin.initializeApp({
        credential:admin.credential.cert(serviceAccount)
    })
}
export async function verifyIdToken(token:string){
    try{
    const decodedToken=admin.auth().verifyIdToken(token)
    return decodedToken;
    }catch(err){
        console.error(err)
        return null
    }
}
export {admin}