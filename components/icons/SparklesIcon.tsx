
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6-11A2 2 0 0 0 3.937 0l11 6a2 2 0 0 0 1.437 1.437l6 11a2 2 0 0 0-3.437 3.437z"></path>
        <path d="m22 2-2.5 2.5"></path>
        <path d="m13.5 13.5-2 2"></path>
        <path d="M20 10.5 18 12.5"></path>
        <path d="m5 16 1.5-1.5"></path>
    </svg>
);
