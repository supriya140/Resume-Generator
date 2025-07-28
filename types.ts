
export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  duration: string;
  responsibilities: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  details: string;
}

export interface Award {
    id: string;
    name: string;
    details: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  profilePhoto: string | null;
  skills: string[];
  education: Education[];
  workExperience: WorkExperience[];
  awards: Award[];
  references: string;
}
