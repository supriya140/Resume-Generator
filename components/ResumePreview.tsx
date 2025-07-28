
import React from 'react';
import { ResumeData } from '../types';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const { name, email, phone, address, summary, profilePhoto, skills, education, workExperience, awards, references } = resumeData;

  const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-xl font-bold text-indigo-800 border-b-2 border-indigo-200 pb-1 mb-3">{title}</h2>
      {children}
    </div>
  );

  return (
    <div id="resume-preview" className="bg-white p-8 shadow-lg w-full max-w-4xl mx-auto A4-ratio">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 text-gray-700">
          {profilePhoto && (
            <div className="mb-6">
              <img src={profilePhoto} alt="Profile" className="rounded-full w-40 h-40 object-cover mx-auto shadow-md" />
            </div>
          )}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          </div>
          <div className="mb-6 space-y-2">
            <h3 className="text-lg font-semibold text-indigo-800 border-b border-indigo-100 pb-1">Contact</h3>
            <p className="text-sm">{email}</p>
            <p className="text-sm">{phone}</p>
            <p className="text-sm">{address}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-indigo-800 border-b border-indigo-100 pb-1">Skills</h3>
            <ul className="mt-2 space-y-1">
              {skills.map((skill, index) => (
                <li key={index} className="bg-indigo-50 text-indigo-800 text-sm font-medium px-2 py-1 rounded">{skill}</li>
              ))}
            </ul>
          </div>
           {references && (
             <div className="mb-6">
                <h3 className="text-lg font-semibold text-indigo-800 border-b border-indigo-100 pb-1">References</h3>
                <p className="text-sm mt-2 whitespace-pre-wrap">{references}</p>
            </div>
           )}
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          <Section title="Summary">
            <p className="text-sm leading-relaxed">{summary}</p>
          </Section>

          <Section title="Work Experience">
            {workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                <div className="flex justify-between items-baseline">
                  <p className="text-md font-medium text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                </div>
                <p className="text-sm mt-1 whitespace-pre-wrap">{exp.responsibilities}</p>
              </div>
            ))}
          </Section>

          <Section title="Education">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="text-lg font-semibold">{edu.school}</h3>
                <p className="text-md font-medium text-gray-600">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.details}</p>
              </div>
            ))}
          </Section>
          
          {awards.length > 0 && (
             <Section title="Awards & Certifications">
                {awards.map((award) => (
                  <div key={award.id} className="mb-3">
                    <h3 className="text-lg font-semibold">{award.name}</h3>
                    <p className="text-md text-gray-600">{award.details}</p>
                  </div>
                ))}
              </Section>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
