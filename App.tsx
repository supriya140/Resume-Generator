
import React, { useState } from 'react';
import { ResumeData } from './types';
import { INITIAL_RESUME_DATA } from './constants';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Header from './components/Header';
import { downloadPdf, downloadDocx, downloadTxt } from './services/downloadService';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async (format: 'pdf' | 'docx' | 'txt') => {
    setIsGenerating(true);
    try {
      const previewElement = document.getElementById('resume-preview');
      if (!previewElement) {
        console.error('Resume preview element not found');
        return;
      }

      switch (format) {
        case 'pdf':
          await downloadPdf(previewElement, resumeData.name);
          break;
        case 'docx':
          await downloadDocx(resumeData);
          break;
        case 'txt':
          await downloadTxt(resumeData);
          break;
      }
    } catch (error) {
      console.error(`Failed to download ${format}`, error);
      alert(`Sorry, there was an error generating the ${format.toUpperCase()} file.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Header onDownload={handleDownload} isGenerating={isGenerating} />
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8 max-w-screen-2xl mx-auto">
        <div className="lg:h-[calc(100vh-120px)] lg:overflow-y-auto pr-4">
           <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        <div className="lg:h-[calc(100vh-120px)] lg:overflow-y-auto">
           <div className="sticky top-0">
             <ResumePreview resumeData={resumeData} />
           </div>
        </div>
      </main>
    </div>
  );
}

export default App;
