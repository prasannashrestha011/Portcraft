export type FormType={
    name:string 
    role:string
    email:string 
    socialLinks:{
        githubURL?:string 
        linkedinURL?:string  
    }
    skill:string[]
    projects:project[]
    experience?:experience[]
    educations:education[]
    certifications:certification[]
}
export type project={
        name:string 
        description:string 
        techStack:string
        repo?:string
        link?:string  
    }
export type experience={
        company:string 
        role:string 
        duration:string 
        description?:string
    }
export type education={
        instituition:string
        degree:string 
        duration:string 
    }
export type certification={
        title:string 
        issuer:string 
    }