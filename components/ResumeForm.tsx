
import React, { useCallback, useState } from 'react';
import { ResumeData, WorkExperience, Education, Award } from '../types';
import { enhanceTextWithAI } from '../services/geminiService';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { Trash2Icon } from './icons/Trash2Icon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">{title}</h2>
        {children}
    </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <textarea {...props} rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
);

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
    const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeData(prev => ({ ...prev, profilePhoto: reader.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleDynamicChange = <T extends WorkExperience | Education | Award>(
        section: keyof ResumeData, 
        index: number, 
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setResumeData(prev => {
            const list = [...(prev[section] as T[])] as T[];
            list[index] = { ...list[index], [name]: value };
            return { ...prev, [section]: list };
        });
    };

    const addDynamicItem = <T,>(section: keyof ResumeData, newItem: T) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...(prev[section] as T[]), newItem]
        }));
    };

    const removeDynamicItem = (section: keyof ResumeData, index: number) => {
        setResumeData(prev => ({
            ...prev,
            [section]: (prev[section] as any[]).filter((_, i) => i !== index)
        }));
    };
    
    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResumeData(prev => ({...prev, skills: e.target.value.split(',').map(skill => skill.trim())}));
    }

    const handleEnhance = async (field: 'summary' | `work-${string}` | `edu-${string}`) => {
        let currentText = '';
        let promptText = '';
        
        if (field === 'summary') {
            currentText = resumeData.summary;
            promptText = `Enhance this professional summary for a resume: "${currentText}"`;
        } else if (field.startsWith('work-')) {
            const index = parseInt(field.split('-')[1], 10);
            currentText = resumeData.workExperience[index].responsibilities;
            const jobTitle = resumeData.workExperience[index].jobTitle;
            promptText = `Rewrite these job responsibilities for a "${jobTitle}" role to be more impactful, using action verbs: "${currentText}"`;
        }
    
        if (!currentText) return;
        
        setAiLoading(prev => ({ ...prev, [field]: true }));
        try {
            const enhancedText = await enhanceTextWithAI(promptText);
            if (field === 'summary') {
                setResumeData(prev => ({ ...prev, summary: enhancedText }));
            } else if (field.startsWith('work-')) {
                const index = parseInt(field.split('-')[1], 10);
                setResumeData(prev => {
                    const newWorkExperience = [...prev.workExperience];
                    newWorkExperience[index].responsibilities = enhancedText;
                    return { ...prev, workExperience: newWorkExperience };
                });
            }
        } catch (error) {
            console.error('AI enhancement failed:', error);
            alert('Failed to enhance text. Please check your API key and try again.');
        } finally {
            setAiLoading(prev => ({ ...prev, [field]: false }));
        }
    };


    return (
        <form>
            <FormSection title="Personal Details">
                <Input label="Full Name" name="name" value={resumeData.name} onChange={handleChange} />
                <Input label="Email" name="email" type="email" value={resumeData.email} onChange={handleChange} />
                <Input label="Phone" name="phone" value={resumeData.phone} onChange={handleChange} />
                <Input label="Address" name="address" value={resumeData.address} onChange={handleChange} />
                <Input label="Profile Photo" type="file" accept="image/*" onChange={handlePhotoChange} />
            </FormSection>

            <FormSection title="Professional Summary">
                <div className="relative">
                    <Textarea label="" name="summary" value={resumeData.summary} onChange={handleChange} />
                     <button type="button" onClick={() => handleEnhance('summary')} disabled={aiLoading['summary']} className="absolute bottom-4 right-2 bg-indigo-100 text-indigo-700 p-1 rounded-full hover:bg-indigo-200 transition-colors disabled:opacity-50">
                        {aiLoading['summary'] ? <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div> : <SparklesIcon className="w-5 h-5" />}
                    </button>
                </div>
            </FormSection>

            <FormSection title="Skills">
                <Input label="Skills (comma separated)" name="skills" value={resumeData.skills.join(', ')} onChange={handleSkillsChange} />
            </FormSection>
            
            <FormSection title="Work Experience">
                {resumeData.workExperience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border rounded-md mb-4 relative bg-gray-50">
                        <Input label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={e => handleDynamicChange('workExperience', index, e)} />
                        <Input label="Company" name="company" value={exp.company} onChange={e => handleDynamicChange('workExperience', index, e)} />
                        <Input label="Duration" name="duration" value={exp.duration} onChange={e => handleDynamicChange('workExperience', index, e)} />
                        <div className="relative">
                           <Textarea label="Responsibilities" name="responsibilities" value={exp.responsibilities} onChange={e => handleDynamicChange('workExperience', index, e)} />
                             <button type="button" onClick={() => handleEnhance(`work-${index}`)} disabled={aiLoading[`work-${index}`]} className="absolute bottom-4 right-2 bg-indigo-100 text-indigo-700 p-1 rounded-full hover:bg-indigo-200 transition-colors disabled:opacity-50">
                                {aiLoading[`work-${index}`] ? <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div> : <SparklesIcon className="w-5 h-5" />}
                            </button>
                        </div>
                        <button type="button" onClick={() => removeDynamicItem('workExperience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                            <Trash2Icon />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => addDynamicItem<WorkExperience>('workExperience', { id: `work${Date.now()}`, jobTitle: '', company: '', duration: '', responsibilities: '' })} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                    <PlusCircleIcon />
                    <span>Add Experience</span>
                </button>
            </FormSection>

            <FormSection title="Education">
                {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded-md mb-4 relative bg-gray-50">
                        <Input label="School/University" name="school" value={edu.school} onChange={e => handleDynamicChange('education', index, e)} />
                        <Input label="Degree" name="degree" value={edu.degree} onChange={e => handleDynamicChange('education', index, e)} />
                        <Input label="Details (e.g., Graduation Date)" name="details" value={edu.details} onChange={e => handleDynamicChange('education', index, e)} />
                        <button type="button" onClick={() => removeDynamicItem('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                            <Trash2Icon />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => addDynamicItem<Education>('education', { id: `edu${Date.now()}`, school: '', degree: '', details: '' })} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                     <PlusCircleIcon />
                    <span>Add Education</span>
                </button>
            </FormSection>

            <FormSection title="Awards/Certifications">
                 {resumeData.awards.map((award, index) => (
                    <div key={award.id} className="p-4 border rounded-md mb-4 relative bg-gray-50">
                        <Input label="Award/Certification Name" name="name" value={award.name} onChange={e => handleDynamicChange('awards', index, e)} />
                        <Input label="Details (e.g., Issuing Body, Date)" name="details" value={award.details} onChange={e => handleDynamicChange('awards', index, e)} />
                         <button type="button" onClick={() => removeDynamicItem('awards', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                            <Trash2Icon />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => addDynamicItem<Award>('awards', { id: `award${Date.now()}`, name: '', details: '' })} className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800">
                     <PlusCircleIcon />
                    <span>Add Award</span>
                </button>
            </FormSection>

            <FormSection title="References">
                <Textarea label="" name="references" value={resumeData.references} onChange={handleChange} />
            </FormSection>
        </form>
    );
};

export default ResumeForm;
