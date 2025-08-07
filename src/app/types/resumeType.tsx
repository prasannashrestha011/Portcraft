export type ResumeFormValues = {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skills;
  experience: Experience[];
  projects: Project[];
  education: Education;
};
export type PersonalInfo = {
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
};
export type Skills = {
  languages: string;
  frontend: string;
  backend: string;
  databaseCloud: string;
  toolsPractices: string;
};
export type Experience = {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
};
export type Project = {
  title: string;
  technologies: string;
  descriptions: string[];
};
export type Education = {
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  gpa: string;
  achievements: string;
};
