
export interface Education {
  school: string;
  degree: string;
  year: string;
  details: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string;
}

export interface Award {
  name: string;
  year: string;
  issuer: string;
}

export interface Reference {
    name: string;
    contact: string;
    relation: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  photo: string; // Base64 encoded string
  skills: string; // Comma-separated
  education: Education[];
  experience: Experience[];
  awards: Award[];
  references: Reference[];
}
