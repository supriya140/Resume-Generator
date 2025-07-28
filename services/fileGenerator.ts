
import { type ResumeData } from '../types';

// These are loaded from index.html via CDN, so we declare them here to make TypeScript happy.
declare const jspdf: any;
declare const html2canvas: any;
declare const docx: any;

/**
 * Generates a PDF from an HTML element.
 * @param element The HTML element to capture.
 */
export const generatePdf = (element: HTMLElement) => {
    html2canvas(element, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;

        // If height is bigger than a page, we need to split it
        if(height > pdfHeight) {
            console.warn("PDF content is larger than one page, which is not fully supported in this simple generator.");
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('resume.pdf');
    }).catch(err => {
        console.error("Error generating PDF:", err);
        alert("Could not generate PDF. See console for details.");
    });
};

/**
 * Generates a plain text (.txt) file from the resume data.
 * @param data The resume data object.
 */
export const generateTxt = (data: ResumeData) => {
    let content = `RESUME\n======\n\n`;
    content += `${data.name.toUpperCase()}\n`;
    content += `${data.email} | ${data.phone} | ${data.address}\n\n`;

    content += `SUMMARY\n-------\n${data.summary}\n\n`;

    content += `SKILLS\n------\n${data.skills}\n\n`;

    content += `EXPERIENCE\n----------\n`;
    data.experience.forEach(exp => {
        content += `\n* ${exp.title} at ${exp.company} (${exp.duration})\n`;
        content += `${exp.responsibilities.split('\n').map(r => `  - ${r}`).join('\n')}\n`;
    });

    content += `\nEDUCATION\n---------\n`;
    data.education.forEach(edu => {
        content += `\n* ${edu.degree}, ${edu.school} (${edu.year})\n`;
        content += `  ${edu.details}\n`;
    });
    
    content += `\nAWARDS\n------\n`;
     data.awards.forEach(award => {
        content += `\n* ${award.name} (${award.year}) - ${award.issuer}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.txt';
    link.click();
    URL.revokeObjectURL(url);
};

// Helper to convert base64 image to a format docx library can use
const base64ToBlob = async (base64: string) => {
    const res = await fetch(base64);
    return res.blob();
};


/**
 * Generates a .docx file from the resume data.
 * @param data The resume data object.
 */
export const generateDocx = async (data: ResumeData) => {
    const { Packer, Document, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun } = docx;

    const sections = [];

    // Header
    sections.push(new Paragraph({
        children: [new TextRun({ text: data.name, bold: true, size: 48 })],
        alignment: AlignmentType.CENTER,
    }));
    sections.push(new Paragraph({
        children: [
            new TextRun({ text: `${data.email} | ${data.phone} | ${data.address}`, size: 22 }),
        ],
        alignment: AlignmentType.CENTER,
    }));

    // Summary
    sections.push(new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }));
    sections.push(new Paragraph({ text: data.summary, style: "Normal" }));

    // Experience
    sections.push(new Paragraph({ text: "Experience", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }));
    data.experience.forEach(exp => {
        sections.push(new Paragraph({ children: [new TextRun({ text: exp.title, bold: true, size: 28 })] }));
        sections.push(new Paragraph({ children: [new TextRun({ text: `${exp.company} | ${exp.duration}`, italics: true, size: 24 })] }));
        exp.responsibilities.split('\n').filter(Boolean).forEach(resp => {
            sections.push(new Paragraph({ text: resp, bullet: { level: 0 } }));
        });
        sections.push(new Paragraph("")); // Spacer
    });

    // Education
    sections.push(new Paragraph({ text: "Education", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }));
    data.education.forEach(edu => {
        sections.push(new Paragraph({ children: [new TextRun({ text: `${edu.degree} - ${edu.school}`, bold: true, size: 28 })]}));
        sections.push(new Paragraph({ children: [new TextRun({ text: `${edu.year} | ${edu.details}`, italics: true, size: 24 })]}));
        sections.push(new Paragraph("")); // Spacer
    });

    // Skills
    sections.push(new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }));
    sections.push(new Paragraph(data.skills));
    
    // Photo
    if (data.photo) {
        try {
            const imageBlob = await base64ToBlob(data.photo);
            const imageBuffer = await imageBlob.arrayBuffer();
             sections.unshift(new Paragraph({
                children: [ new ImageRun({
                    data: imageBuffer,
                    transformation: {
                        width: 100,
                        height: 100,
                    },
                })],
                alignment: AlignmentType.CENTER,
            }));
        } catch (e) {
            console.error("Could not add image to DOCX:", e);
        }
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: sections,
        }],
    });

    Packer.toBlob(doc).then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.docx';
        link.click();
        URL.revokeObjectURL(url);
    });
};
