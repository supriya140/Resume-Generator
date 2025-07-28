
import React, { forwardRef } from 'react';
import { type ResumeData } from '../types';
import { MailIcon, PhoneIcon, LocationIcon, AwardIcon, UserIcon, UsersIcon } from './icons/Icons';

interface ResumePreviewProps {
    data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ data }, ref) => {
    const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);

    return (
        <div ref={ref} className="w-full h-full bg-white text-gray-800 p-8 font-serif text-[10px] leading-snug">
            <div className="flex flex-col h-full">
                {/* Header */}
                <header className="text-center border-b-2 pb-4 mb-4 border-gray-700">
                    <h1 className="text-4xl font-bold tracking-widest text-gray-800 uppercase">{data.name || "Your Name"}</h1>
                </header>

                {/* Main Content */}
                <div className="flex-grow flex gap-6">
                    {/* Left Column */}
                    <aside className="w-1/3 pr-6 border-r border-gray-300">
                        {data.photo && (
                            <div className="flex justify-center mb-6">
                                <img src={data.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-gray-200" />
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-extrabold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1 text-gray-700">Contact</h3>
                                <ul className="space-y-1 text-gray-600">
                                    {data.email && <li className="flex items-center"><MailIcon className="w-3 h-3 mr-2 shrink-0" /><span>{data.email}</span></li>}
                                    {data.phone && <li className="flex items-center"><PhoneIcon className="w-3 h-3 mr-2 shrink-0" /><span>{data.phone}</span></li>}
                                    {data.address && <li className="flex items-center"><LocationIcon className="w-3 h-3 mr-2 shrink-0" /><span>{data.address}</span></li>}
                                </ul>
                            </div>
                            
                            {skillsArray.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-extrabold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1 text-gray-700">Skills</h3>
                                    <ul className="flex flex-wrap gap-1">
                                        {skillsArray.map((skill, index) => (
                                            <li key={index} className="bg-gray-200 text-gray-700 rounded-md px-2 py-0.5 text-[9px]">{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data.education.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-extrabold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1 text-gray-700">Education</h3>
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="mb-2">
                                            <p className="font-bold text-gray-800">{edu.degree}</p>
                                            <p className="text-gray-600">{edu.school}</p>
                                            <p className="text-xs text-gray-500">{edu.year}</p>
                                            {edu.details && <p className="text-xs text-gray-500 italic">{edu.details}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Right Column */}
                    <main className="w-2/3">
                        <section>
                            <h2 className="text-lg font-extrabold uppercase tracking-wider mb-2 border-b-2 border-gray-400 pb-1 text-gray-800">Summary</h2>
                            <p className="text-gray-600 whitespace-pre-wrap">{data.summary}</p>
                        </section>

                        {data.experience.length > 0 && (
                            <section className="mt-6">
                                <h2 className="text-lg font-extrabold uppercase tracking-wider mb-2 border-b-2 border-gray-400 pb-1 text-gray-800">Experience</h2>
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-md font-bold text-gray-800">{exp.title}</h3>
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <p className="font-semibold">{exp.company}</p>
                                            <p>{exp.duration}</p>
                                        </div>
                                        <ul className="list-disc list-inside text-gray-600 space-y-1 pl-1">
                                            {exp.responsibilities.split('\n').filter(Boolean).map((resp, i) => (
                                                <li key={i}>{resp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>
                        )}

                        {data.awards.length > 0 && (
                            <section className="mt-6">
                                <h2 className="text-lg font-extrabold uppercase tracking-wider mb-2 border-b-2 border-gray-400 pb-1 text-gray-800">Awards</h2>
                                {data.awards.map((award, index) => (
                                    <div key={index} className="flex items-start mb-2">
                                       <AwardIcon className="w-3 h-3 mr-2 mt-0.5 shrink-0 text-gray-600"/>
                                       <div>
                                           <p className="font-semibold text-gray-800">{award.name} <span className="text-xs text-gray-500 font-normal">({award.year})</span></p>
                                           <p className="text-xs text-gray-500">{award.issuer}</p>
                                       </div>
                                    </div>
                                ))}
                            </section>
                        )}
                         {data.references.length > 0 && (
                            <section className="mt-6">
                                <h2 className="text-lg font-extrabold uppercase tracking-wider mb-2 border-b-2 border-gray-400 pb-1 text-gray-800">References</h2>
                                {data.references.map((ref, index) => (
                                    <div key={index} className="flex items-start mb-2">
                                       <UsersIcon className="w-3 h-3 mr-2 mt-0.5 shrink-0 text-gray-600"/>
                                       <div>
                                           <p className="font-semibold text-gray-800">{ref.name} <span className="text-xs text-gray-500 font-normal">({ref.relation})</span></p>
                                           <p className="text-xs text-gray-500">{ref.contact}</p>
                                       </div>
                                    </div>
                                ))}
                            </section>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
});
