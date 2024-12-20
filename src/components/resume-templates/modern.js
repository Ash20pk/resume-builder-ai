'use client';

import React from 'react';
import { Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';
import { parseMarkdownContent } from '@/utils/parse-markdown';

const ModernTemplate = ({ content, primaryColor = '#3b82f6', preview }) => {
  const previewContent = {
    name: 'John Doe',
    title: 'Software Engineer',
    contact: {
      email: 'john@example.com',
      phone: '+1 234 567 890',
      location: 'San Francisco, CA'
    },
    sections: {
      summary: 'Experienced software engineer with a focus on web technologies and distributed systems. Passionate about building scalable solutions and mentoring junior developers.',
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'Tech Corp',
          period: '2020 - Present',
          points: [
            'Led development of cloud infrastructure serving 1M+ users',
            'Managed team of 5 engineers and improved deployment time by 40%'
          ]
        }
      ],
      education: [
        {
          degree: 'B.S. Computer Science',
          school: 'University of Technology',
          year: '2016 - 2020'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Python', 'Docker', 'Kubernetes']
    }
  };

  const data = preview ? previewContent : parseMarkdownContent(content);
  if (!data) return null;

  return (
    <div className="p-8 max-w-[850px] mx-auto bg-white min-h-screen font-sans">
      {/* Header Section with improved visual hierarchy */}
      <header className="mb-8">
        <div className="border-l-4 pl-6" style={{ borderColor: primaryColor }}>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.name}</h1>
          <p className="text-xl text-gray-600 mt-2 font-medium">{data.title}</p>
        </div>
        
        {/* Contact info with icons */}
        <div className="mt-6 flex flex-wrap gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>{data.contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>{data.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{data.contact.location}</span>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        {/* Summary Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2"
              style={{ borderColor: primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.sections.summary}</p>
        </section>

        {/* Experience Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2"
              style={{ borderColor: primaryColor }}>
            Experience
          </h2>
          <div className="space-y-6">
            {data.sections.experience.map((exp, i) => (
              <div key={i} className="relative pl-4">
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
                     style={{ backgroundColor: primaryColor }}/>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{exp.title}</h3>
                  <div className="flex gap-4 text-gray-600 mt-1 mb-3">
                    <span className="flex items-center gap-1">
                      <Building size={14} />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-gray-700 relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2"
              style={{ borderColor: primaryColor }}>
            Education
          </h2>
          <div className="space-y-4">
            {data.sections.education.map((edu, i) => (
              <div key={i} className="relative pl-4">
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full"
                     style={{ backgroundColor: primaryColor }}/>
                <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                <div className="flex gap-4 text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Building size={14} />
                    {edu.school}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {edu.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b-2"
              style={{ borderColor: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.sections.skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: `${primaryColor}15`,
                  color: primaryColor
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ModernTemplate;