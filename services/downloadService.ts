import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Packer, Document, Paragraph, TextRun, HeadingLevel, ImageRun, BorderStyle, AlignmentType } from 'docx';
import saveAs from 'file-saver';
import { ResumeData } from '../types';

// --- PDF Generation ---
export const downloadPdf = async (element: HTMLElement, name: string) => {
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true, 
  });
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(`${name.replace(/\s/g, '_')}_Resume.pdf`);
};

// --- TXT Generation ---
const formatTxt = (data: ResumeData): string => {
  let content = '';
  
  content += `${data.name}\n`;
  content += `${data.email} | ${data.phone} | ${data.address}\n`;
  content += '====================================\n\n';
  
  content += 'SUMMARY\n';
  content += '------------------------------------\n';
  content += `${data.summary}\n\n`;
  
  content += 'SKILLS\n';
  content += '------------------------------------\n';
  content += `${data.skills.join(', ')}\n\n`;
  
  content += 'WORK EXPERIENCE\n';
  content += '------------------------------------\n';
  data.workExperience.forEach(exp => {
    content += `${exp.jobTitle.toUpperCase()} | ${exp.company}\n`;
    content += `${exp.duration}\n`;
    content += `${exp.responsibilities}\n\n`;
  });
  
  content += 'EDUCATION\n';
  content += '------------------------------------\n';
  data.education.forEach(edu => {
    content += `${edu.school}\n`;
    content += `${edu.degree}\n`;
    content += `${edu.details}\n\n`;
  });

  if(data.awards.length > 0) {
    content += 'AWARDS & CERTIFICATIONS\n';
    content += '------------------------------------\n';
    data.awards.forEach(award => {
        content += `${award.name}\n`;
        content += `${award.details}\n\n`;
    });
  }
  
  content += 'REFERENCES\n';
  content += '------------------------------------\n';
  content += `${data.references}\n`;
  
  return content;
};

export const downloadTxt = async (data: ResumeData) => {
  const content = formatTxt(data);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${data.name.replace(/\s/g, '_')}_Resume.txt`);
};

// --- DOCX Generation ---
const dataUrlToBuffer = (dataUrl: string): ArrayBuffer => {
    const base64 = dataUrl.split(',')[1];
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};


export const downloadDocx = async (data: ResumeData) => {
    const sections = [
        new Paragraph({
            children: [
                new TextRun({
                    text: data.name,
                    bold: true,
                    size: 48,
                }),
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
            text: `${data.email} | ${data.phone} | ${data.address}`,
            alignment: AlignmentType.CENTER,
        }),
    ];

    if (data.profilePhoto) {
        try {
            const buffer = dataUrlToBuffer(data.profilePhoto);
            sections.unshift(
                new Paragraph({
                    children: [
                        new ImageRun({
                            buffer: buffer,
                            transformation: {
                                width: 150,
                                height: 150,
                            },
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                })
            );
        } catch (error) {
            console.error("Could not process image for DOCX", error);
        }
    }


    sections.push(
        new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } } }),
        new Paragraph(data.summary),
        new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } } }),
        new Paragraph(data.skills.join(', ')),
        new Paragraph({ text: "Work Experience", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } } })
    );

    data.workExperience.forEach(exp => {
        sections.push(
            new Paragraph({ text: exp.jobTitle, style: 'IntenseQuote' }),
            new Paragraph({
                children: [
                    new TextRun({ text: exp.company, bold: true }),
                    new TextRun(`\t${exp.duration}`),
                ],
            }),
            new Paragraph({ text: exp.responsibilities, bullet: { level: 0 } }),
            new Paragraph("") // Spacer
        );
    });

    sections.push(new Paragraph({ text: "Education", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } } }));

    data.education.forEach(edu => {
        sections.push(
            new Paragraph({ text: edu.school, style: 'IntenseQuote' }),
            new Paragraph(edu.degree),
            new Paragraph({
                children: [
                    new TextRun({ text: edu.details, color: "888888" }),
                ],
             }),
            new Paragraph("") // Spacer
        );
    });
    
    if (data.awards.length > 0) {
        sections.push(new Paragraph({ text: "Awards & Certifications", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } } }));
        data.awards.forEach(award => {
            sections.push(
                new Paragraph({ text: award.name, style: 'IntenseQuote' }),
                new Paragraph(award.details),
                new Paragraph("") // Spacer
            );
        });
    }

    sections.push(
        new Paragraph({ text: "References", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, style: BorderStyle.SINGLE, size: 6 } } }),
        new Paragraph(data.references)
    );

    const doc = new Document({ sections: [{ children: sections }] });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${data.name.replace(/\s/g, '_')}_Resume.docx`);
};