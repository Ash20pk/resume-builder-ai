import React from 'react';
import ReactMarkdown from 'react-markdown';

const ResumePreview = ({ markdown = '', template = 'modern' }) => {
  if (!markdown) {
    return (
      <div className="min-h-[1056px] w-[816px] bg-white rounded-lg p-12 shadow-xl">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: 'min-h-[1056px] w-[816px] bg-white rounded-lg p-12 shadow-xl font-sans',
          heading: 'text-4xl font-bold text-gray-800 mb-2',
          contact: 'text-gray-600 mb-8',
          section: 'mb-8',
          sectionTitle: 'text-2xl font-bold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4',
          subsection: 'mb-4',
          subsectionTitle: 'text-xl font-semibold text-gray-800',
          subsectionMeta: 'text-gray-600 mb-2',
          list: 'list-disc list-inside text-gray-700 space-y-1',
        };
      case 'classic':
        return {
          container: 'min-h-[1056px] w-[816px] bg-white rounded-lg p-12 shadow-xl font-serif',
          heading: 'text-3xl font-bold text-center text-gray-900 mb-2',
          contact: 'text-center text-gray-700 mb-8',
          section: 'mb-6',
          sectionTitle: 'text-xl font-bold text-gray-800 uppercase mb-4',
          subsection: 'mb-4',
          subsectionTitle: 'text-lg font-semibold text-gray-800',
          subsectionMeta: 'text-gray-700 italic mb-2',
          list: 'list-disc list-inside text-gray-700 space-y-1',
        };
      default:
        return {
          container: 'min-h-[1056px] w-[816px] bg-white rounded-lg p-12 shadow-xl',
          heading: 'text-4xl font-bold mb-2',
          contact: 'text-gray-600 mb-8',
          section: 'mb-8',
          sectionTitle: 'text-2xl font-bold mb-4',
          subsection: 'mb-4',
          subsectionTitle: 'text-xl font-semibold',
          subsectionMeta: 'text-gray-600 mb-2',
          list: 'list-disc list-inside space-y-1',
        };
    }
  };

  const styles = getTemplateStyles();

  const components = {
    h1: ({ children }) => <h1 className={styles.heading}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.sectionTitle}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.subsectionTitle}>{children}</h3>,
    p: ({ children }) => {
      // Check if this paragraph contains contact information
      if (typeof children === 'string' && (children.includes('@') || children.includes('|'))) {
        return <p className={styles.contact}>{children}</p>;
      }
      return <p className="mb-2">{children}</p>;
    },
    ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  };

  return (
    <div className={styles.container}>
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default ResumePreview;
