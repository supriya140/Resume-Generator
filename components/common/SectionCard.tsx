
import React from 'react';
import { PlusIcon } from '../icons/Icons';

interface SectionCardProps {
    title: string;
    onAdd?: () => void;
    children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, onAdd, children }) => {
    return (
        <div className="border border-gray-200 p-6 rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {onAdd && (
                    <button type="button" onClick={onAdd} className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                        <PlusIcon className="w-4 h-4 mr-1"/>
                        Add
                    </button>
                )}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};
