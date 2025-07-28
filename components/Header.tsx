
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface HeaderProps {
  onDownload: (format: 'pdf' | 'docx' | 'txt') => void;
  isGenerating: boolean;
}

const Header: React.FC<HeaderProps> = ({ onDownload, isGenerating }) => {
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          AI Resume <span className="text-indigo-600">Generator</span>
        </h1>
        <div className="flex items-center space-x-2 md:space-x-4">
           {isGenerating && <div className="text-sm text-gray-600 animate-pulse">Generating...</div>}
          <button
            onClick={() => onDownload('pdf')}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
          >
            <DownloadIcon className="h-5 w-5" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={() => onDownload('docx')}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            <DownloadIcon className="h-5 w-5" />
            <span className="hidden sm:inline">DOCX</span>
          </button>
          <button
            onClick={() => onDownload('txt')}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-500"
          >
            <DownloadIcon className="h-5 w-5" />
            <span className="hidden sm:inline">TXT</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
