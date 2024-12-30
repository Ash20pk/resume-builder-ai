import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdLink,
  MdFileDownload 
} from 'react-icons/md';
import { 
  FaGithub, 
  FaLinkedin,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaAward,
  FaUserCircle
} from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import styles from '../styles/ResumePreview.module.css';

const ResumePreview = ({ markdown = '', template = 'modern' }) => {
  const resumeRef = useRef(null);

  const handleDownload = () => {
    const element = resumeRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 3,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      }
    };

    html2pdf().set(opt).from(element).save();
  };

  console.log('Markdown:', markdown);
  
  const getContactIcon = (text) => {
    const lowerText = text.toLowerCase().trim();
    if (lowerText.includes('@')) return <MdEmail />;
    if (lowerText.includes('phone') || lowerText.includes('+') || /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/.test(text)) 
      return <MdPhone />;
    if (lowerText.includes('github')) return <FaGithub />;
    if (lowerText.includes('linkedin')) return <FaLinkedin />;
    if (lowerText.includes('http') || lowerText.includes('.com')) return <MdLink />;
    if (lowerText.match(/^[a-z]{3,}\s+\d{4}\s*-\s*[a-z]{3,}\s+\d{4}$/i)) return null;
    if (text.startsWith('**')) return null;
    if (lowerText.includes('location:')) return <MdLocationOn />;
    return <FaBriefcase />;
  };

  const getSectionIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('experience') || lowerTitle.includes('work')) 
      return <FaBriefcase />;
    if (lowerTitle.includes('education')) 
      return <FaGraduationCap />;
    if (lowerTitle.includes('skills') || lowerTitle.includes('technologies')) 
      return <FaTools />;
    if (lowerTitle.includes('awards') || lowerTitle.includes('achievements')) 
      return <FaAward />;
    if (lowerTitle.includes('profile') || lowerTitle.includes('about')) 
      return <FaUserCircle />;
    return <FaBriefcase />;
  };

  if (!markdown) {
    return (
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
          </div>
        </div>
      </div>
    );
  }

  const components = {
    h1: ({ children }) => <h1 className={styles.heading}>{children}</h1>,
    h2: ({ children }) => {
      const titleText = React.Children.toArray(children).join('');
      const icon = getSectionIcon(titleText);
      const isFirstSection = titleText.toLowerCase().includes('summary') || 
                           titleText.toLowerCase().includes('profile') ||
                           titleText.toLowerCase().includes('about');
      
      return (
        <h2 className={isFirstSection ? styles.firstSectionTitle : styles.sectionTitle}>
          <span>{icon}{children}</span>
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = React.Children.toArray(children).join('');
      if (text.includes('|')) {
        const [organization, date] = text.split('|').map(item => item.trim());
        return (
          <p className={styles.organizationTitle}>
            <span>{organization}</span>
            <span className={styles.date}>{date}</span>
          </p>
        );
      }
      return <h3 className={styles.subsectionTitle}>{children}</h3>;
    },
    p: ({ children }) => {
      const extractText = (child) => {
        if (typeof child === 'string') return child;
        if (child?.props?.children) {
          if (Array.isArray(child.props.children)) {
            return child.props.children.map(extractText).join('');
          }
          return extractText(child.props.children);
        }
        return '';
      };

      const text = React.Children.toArray(children).map(extractText).join('');
      
      // Check if this is part of the summary section
      const isSummary = text.toLowerCase().includes('summary') || 
                       text.toLowerCase().includes('profile') ||
                       text.toLowerCase().includes('about');
      
      // Handle contact information
      if (text && (text.includes('@') || text.includes('|'))) {
        const items = text.split('|').map(item => item.trim());
        const isInSection = text.includes('**') || text.includes('Nov') || text.includes('Dec');
        
        if (isInSection) {
          const [position, date] = text.split('|').map(item => item.trim());
          return (
            <h3 className={styles.subsectionTitle}>
              <span className={styles.strong}>{position.replace(/\*\*/g, '')}</span>
              <span className={styles.date}>{date}</span>
            </h3>
          );
        }

        return (
          <p className={styles.contact}>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <span className={styles.contactItem}>
                  {getContactIcon(item)}
                  <span>{item}</span>
                </span>
                {index < items.length - 1 && <span className={styles.contactSeparator} />}
              </React.Fragment>
            ))}
          </p>
        );
      }

      // Use different styles for summary and regular paragraphs
      return <p className={isSummary ? styles.summary : styles.paragraph}>{children}</p>;
    },
    ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
    li: ({ children }) => <li className={styles.listItem}>{children}</li>,
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
  };

  return (
    <>
      <div ref={resumeRef} className={styles.container}>
        <div className={styles.contentWrapper}>
          <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
        </div>
      </div>
      <div className={styles.downloadWrapper}>
        <button onClick={handleDownload} className={styles.downloadButton}>
          <MdFileDownload />
          Download PDF
        </button>
      </div>
    </>
  );
};

export default ResumePreview;
