'use client';

import React from 'react';
import { clsx } from 'clsx';
import { parseMarkdownContent } from '@/utils/parse-markdown';

export const CreativeTemplate = ({ content, primaryColor = '#3b82f6', preview }) => {
  const previewContent = {
    name: 'John Doe',
    title: 'Software Engineer',
    contact: {
      email: 'john@example.com',
      phone: '+1 234 567 890',
      location: 'San Francisco, CA'
    },
    sections: {
      summary: 'Experienced software engineer with a focus on web technologies...',
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'Tech Corp',
          period: '2020 - Present',
          points: ['Led development of cloud infrastructure', 'Managed team of 5 engineers']
        }
      ],
      education: [
        {
          degree: 'B.S. Computer Science',
          school: 'University of Technology',
          year: '2016 - 2020'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'Python']
    }
  };

  const data = preview ? previewContent : parseMarkdownContent(content);
  if (!data) return null;

  return (
    <div
      className={clsx(
        "min-h-[1056px] bg-white",
        `bg-[${primaryColor}]/5`
      )}
      style={{ backgroundColor: `${primaryColor}05` }}
    >
      <header className="p-8 text-center" style={{ backgroundColor: primaryColor }}>
        <h1 className="text-4xl font-bold text-white">{data.name}</h1>
        <p className="text-xl text-white/90 mt-2">{data.title}</p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-white/80">
          <span>{data.contact.email}</span>
          <span>{data.contact.phone}</span>
          <span>{data.contact.location}</span>
        </div>
      </header>

      <main className="p-8 grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Experience
            </h2>
            {data.sections.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 text-sm">{exp.company}</p>
                <ul className="mt-2 space-y-1 text-gray-700">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex items-start">
                      <span 
                        className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Summary
            </h2>
            <p className="text-gray-700">{data.sections.summary}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Education
            </h2>
            {data.sections.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.school}</p>
                <p className="text-gray-500 text-sm">{edu.year}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.sections.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm"
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
        </div>
      </main>
    </div>
  );
};
