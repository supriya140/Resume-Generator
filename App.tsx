
import React, { useState, useRef, useCallback } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { type ResumeData, type Experience, type Education, type Award, type Reference } from './types';
import { INITIAL_RESUME_DATA } from './constants';
import { generatePdf, generateTxt, generateDocx } from './services/fileGenerator';
import { DownloadIcon, BrainCircuitIcon } from './components/icons/Icons';

const App: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
    const [isLoading, setIsLoading] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [section, index, field] = name.split('.');

        if (index && field) {
            // Handle arrays like experience, education
            setResumeData(prev => {
                const newSection = [...(prev[section as keyof ResumeData] as any[])];
                newSection[parseInt(index)] = { ...newSection[parseInt(index)], [field]: value };
                return { ...prev, [section]: newSection };
            });
        } else {
            // Handle simple fields
            setResumeData(prev => ({ ...prev, [name]: value }));
        }
    }, []);

    const handleAddItem = useCallback(<T,>(section: keyof ResumeData, newItem: T) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...(prev[section] as T[]), newItem]
        }));
    }, []);

    const handleRemoveItem = useCallback((section: keyof ResumeData, index: number) => {
        setResumeData(prev => ({
            ...prev,
            [section]: (prev[section] as any[]).filter((_, i) => i !== index)
        }));
    }, []);

    const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeData(prev => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleDownloadPdf = useCallback(() => {
        if (previewRef.current) {
            generatePdf(previewRef.current);
        }
    }, []);

    const handleDownloadDocx = useCallback(() => {
        generateDocx(resumeData);
    }, [resumeData]);

    const handleDownloadTxt = useCallback(() => {
        generateTxt(resumeData);
    }, [resumeData]);

    // Dummy AI function for placeholder
    const handleAiEnhance = useCallback(() => {
        setIsLoading(true);
        // This is a placeholder for a real API call.
        // In a real scenario, you'd send `resumeData.summary` to Gemini.
        setTimeout(() => {
            setResumeData(prev => ({
                ...prev,
                summary: prev.summary + " Enhanced by AI to be more impactful, showcasing key achievements and aligning with target job descriptions for optimal visibility."
            }));
            setIsLoading(false);
        }, 1500);
    }, []);


    return (
        <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">AI Resume Builder</h1>
                <p className="text-gray-600 mt-2">Create a professional resume in minutes.</p>
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-700">Your Details</h2>
                        <div className="flex items-center space-x-2">
                             <button onClick={handleAiEnhance} disabled={isLoading} className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:bg-purple-300">
                                <BrainCircuitIcon className="w-5 h-5 mr-2"/>
                                {isLoading ? 'Enhancing...' : 'Enhance with AI'}
                            </button>
                        </div>
                    </div>
                    
                    <ResumeForm 
                        resumeData={resumeData} 
                        onInputChange={handleInputChange} 
                        onAddItem={handleAddItem}
                        onRemoveItem={handleRemoveItem}
                        onPhotoUpload={handlePhotoUpload}
                    />

                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Download Your Resume</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button onClick={handleDownloadPdf} className="flex items-center justify-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">
                                <DownloadIcon className="w-5 h-5 mr-2" />
                                PDF
                            </button>
                            <button onClick={handleDownloadDocx} className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                                <DownloadIcon className="w-5 h-5 mr-2" />
                                DOCX
                            </button>
                            <button onClick={handleDownloadTxt} className="flex items-center justify-center p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300">
                                <DownloadIcon className="w-5 h-5 mr-2" />
                                TXT
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:sticky top-8 self-start">
                  <div className="bg-white p-2 rounded-xl shadow-lg">
                    <h2 className="text-center text-2xl font-bold text-gray-700 my-4">Live Preview</h2>
                    <div className="aspect-[8.5/11] w-full overflow-hidden border rounded-lg">
                       <ResumePreview ref={previewRef} data={resumeData} />
                    </div>
                  </div>
                </div>
            </main>
        </div>
    );
};

export default App;
