
import { type ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '123-456-7890',
  address: '123 Main St, Anytown, USA',
  summary: 'A highly motivated and detail-oriented professional with a proven track record of success. Seeking to leverage my skills in a challenging new role.',
  photo: '',
  skills: 'React, TypeScript, Node.js, Project Management, Agile Methodologies',
  experience: [
    {
      title: 'Senior Frontend Engineer',
      company: 'Tech Solutions Inc.',
      duration: 'Jan 2020 - Present',
      responsibilities: '- Led the development of a major client-facing web application using React and TypeScript.\n- Mentored junior developers and improved code quality by 30%.\n- Collaborated with UX/UI designers to create intuitive user experiences.'
    }
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      year: '2016-2020',
      details: 'Graduated with Honors, GPA: 3.8'
    }
  ],
  awards: [
    {
      name: 'Innovator of the Year',
      year: '2022',
      issuer: 'Tech Solutions Inc.'
    }
  ],
  references: [
    {
      name: 'John Smith',
      relation: 'Former Manager',
      contact: 'Available upon request'
    }
  ]
};

export const NEW_EXPERIENCE = { title: '', company: '', duration: '', responsibilities: '' };
export const NEW_EDUCATION = { school: '', degree: '', year: '', details: '' };
export const NEW_AWARD = { name: '', year: '', issuer: '' };
export const NEW_REFERENCE = { name: '', relation: '', contact: '' };
