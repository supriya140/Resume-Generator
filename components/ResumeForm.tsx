
import React from 'react';
import { type ResumeData, type Experience, type Education, type Award, type Reference } from '../types';
import { NEW_EXPERIENCE, NEW_EDUCATION, NEW_AWARD, NEW_REFERENCE } from '../constants';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { SectionCard } from './common/SectionCard';
import { PlusIcon, TrashIcon, UserIcon, UploadIcon } from './icons/Icons';

interface ResumeFormProps {
    resumeData: ResumeData;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onAddItem: <T,>(section: keyof ResumeData, newItem: T) => void;
    onRemoveItem: (section: keyof ResumeData, index: number) => void;
    onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onInputChange, onAddItem, onRemoveItem, onPhotoUpload }) => {
    return (
        <form className="space-y-8">
            <SectionCard title="Personal Details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full Name" name="name" value={resumeData.name} onChange={onInputChange} />
                    <Input label="Email" name="email" type="email" value={resumeData.email} onChange={onInputChange} />
                    <Input label="Phone Number" name="phone" type="tel" value={resumeData.phone} onChange={onInputChange} />
                    <Input label="Address" name="address" value={resumeData.address} onChange={onInputChange} />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {resumeData.photo ? <img src={resumeData.photo} alt="Profile" className="w-full h-full object-cover" /> : <UserIcon className="w-8 h-8 text-gray-400" />}
                        </div>
                        <label htmlFor="photo-upload" className="cursor-pointer flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <UploadIcon className="w-5 h-5 mr-2" />
                            Upload Image
                        </label>
                        <input id="photo-upload" name="photo" type="file" className="hidden" accept="image/*" onChange={onPhotoUpload} />
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Professional Summary">
                <Textarea label="Summary" name="summary" value={resumeData.summary} onChange={onInputChange} rows={5} placeholder="Write a brief summary about yourself..." />
            </SectionCard>

            <SectionCard title="Work Experience" onAdd={() => onAddItem<Experience>('experience', NEW_EXPERIENCE)}>
                {resumeData.experience.map((exp, index) => (
                    <div key={index} className="p-4 border rounded-lg mb-4 relative bg-gray-50">
                        <button type="button" onClick={() => onRemoveItem('experience', index)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Job Title" name={`experience.${index}.title`} value={exp.title} onChange={onInputChange} />
                            <Input label="Company" name={`experience.${index}.company`} value={exp.company} onChange={onInputChange} />
                            <Input label="Duration" name={`experience.${index}.duration`} value={exp.duration} onChange={onInputChange} placeholder="e.g., Jan 2020 - Present" />
                        </div>
                        <Textarea label="Responsibilities" name={`experience.${index}.responsibilities`} value={exp.responsibilities} onChange={onInputChange} rows={4} className="mt-4" />
                    </div>
                ))}
            </SectionCard>
            
            <SectionCard title="Education" onAdd={() => onAddItem<Education>('education', NEW_EDUCATION)}>
                {resumeData.education.map((edu, index) => (
                    <div key={index} className="p-4 border rounded-lg mb-4 relative bg-gray-50">
                        <button type="button" onClick={() => onRemoveItem('education', index)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500">
                           <TrashIcon className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="School/University" name={`education.${index}.school`} value={edu.school} onChange={onInputChange} />
                            <Input label="Degree" name={`education.${index}.degree`} value={edu.degree} onChange={onInputChange} />
                            <Input label="Year of Completion" name={`education.${index}.year`} value={edu.year} onChange={onInputChange} />
                        </div>
                        <Input label="Details" name={`education.${index}.details`} value={edu.details} onChange={onInputChange} placeholder="e.g., GPA, Honors" className="mt-4"/>
                    </div>
                ))}
            </SectionCard>

            <SectionCard title="Skills">
                <Textarea label="Skills" name="skills" value={resumeData.skills} onChange={onInputChange} placeholder="Enter skills, separated by commas" />
            </SectionCard>

            <SectionCard title="Awards & Certifications" onAdd={() => onAddItem<Award>('awards', NEW_AWARD)}>
                {resumeData.awards.map((award, index) => (
                     <div key={index} className="p-4 border rounded-lg mb-4 relative bg-gray-50">
                        <button type="button" onClick={() => onRemoveItem('awards', index)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input label="Award/Certification Name" name={`awards.${index}.name`} value={award.name} onChange={onInputChange} />
                            <Input label="Issuer" name={`awards.${index}.issuer`} value={award.issuer} onChange={onInputChange} />
                            <Input label="Year" name={`awards.${index}.year`} value={award.year} onChange={onInputChange} />
                        </div>
                    </div>
                ))}
            </SectionCard>

            <SectionCard title="References" onAdd={() => onAddItem<Reference>('references', NEW_REFERENCE)}>
                {resumeData.references.map((ref, index) => (
                     <div key={index} className="p-4 border rounded-lg mb-4 relative bg-gray-50">
                        <button type="button" onClick={() => onRemoveItem('references', index)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Reference Name" name={`references.${index}.name`} value={ref.name} onChange={onInputChange} />
                            <Input label="Relation" name={`references.${index}.relation`} value={ref.relation} onChange={onInputChange} />
                        </div>
                        <Input label="Contact Info" name={`references.${index}.contact`} value={ref.contact} onChange={onInputChange} placeholder="e.g., phone or 'Available upon request'" className="mt-4"/>
                    </div>
                ))}
            </SectionCard>
        </form>
    );
};
