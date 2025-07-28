
import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  name: 'Amelia Chen',
  email: 'amelia.chen@example.com',
  phone: '555-123-4567',
  address: 'San Francisco, CA',
  summary: 'Dedicated and results-oriented Frontend Engineer with 5+ years of experience in building and maintaining responsive web applications using React, TypeScript, and modern JavaScript frameworks. Proven ability to collaborate with cross-functional teams to deliver high-quality software products. Passionate about creating intuitive user interfaces and optimizing performance.',
  profilePhoto: 'https://picsum.photos/id/237/400/400',
  skills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'Node.js', 'Jest', 'Git & GitHub'],
  education: [
    {
      id: 'edu1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      details: 'Graduated with Honors, 2015-2019'
    }
  ],
  workExperience: [
    {
      id: 'work1',
      jobTitle: 'Senior Frontend Engineer',
      company: 'Innovate Inc.',
      duration: '2021 - Present',
      responsibilities: 'Led the development of a new user-facing dashboard, improving user engagement by 20%. Mentored junior developers and conducted code reviews to ensure code quality and consistency.'
    },
    {
      id: 'work2',
      jobTitle: 'Frontend Developer',
      company: 'Tech Solutions LLC',
      duration: '2019 - 2021',
      responsibilities: 'Developed and maintained components for a large-scale e-commerce platform. Collaborated with UI/UX designers to translate wireframes into functional, responsive web pages.'
    }
  ],
  awards: [
      {
          id: 'award1',
          name: 'Developer of the Year',
          details: 'Innovate Inc., 2022'
      }
  ],
  references: 'Available upon request.'
};
