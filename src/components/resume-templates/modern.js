import React from 'react';
import { Mail, Phone, MapPin, Calendar, Building, GraduationCap, Award, Globe } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { parseMarkdownContent } from '@/utils/parse-markdown';

const ModernTemplate = ({ content, primaryColor = '#0A84FF', preview }) => {
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

  const SectionHeader = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 mb-6">
      <div 
        className="p-2 rounded-lg"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <Icon className="w-5 h-5" style={{ color: primaryColor }} />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">{children}</h2>
    </div>
  );

  return (
    <div className="p-8 max-w-[850px] mx-auto bg-white min-h-screen font-sans">
      {/* Header/Intro Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start gap-8">
            <Avatar className="w-32 h-32">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {data.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.name}</h1>
              <p className="text-xl text-gray-600 mt-2 mb-4">{data.title}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1.5">
                  <Mail className="w-4 h-4" />
                  {data.contact.email}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1.5">
                  <Phone className="w-4 h-4" />
                  {data.contact.phone}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1.5">
                  <MapPin className="w-4 h-4" />
                  {data.contact.location}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content - Left 2 Columns */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          <Card>
            <CardContent className="pt-6">
              <SectionHeader icon={Building}>Professional Summary</SectionHeader>
              <p className="text-gray-700 leading-relaxed">{data.sections.summary}</p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardContent className="pt-6">
              <SectionHeader icon={Building}>Experience</SectionHeader>
              <div className="space-y-6">
                {data.sections.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <Badge variant="outline" className="text-gray-600">
                        {exp.period}
                      </Badge>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {exp.points.map((point, j) => (
                        <li key={j} className="text-gray-700 flex gap-2">
                          <span className="text-gray-400">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    {i < data.sections.experience.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardContent className="pt-6">
              <SectionHeader icon={GraduationCap}>Education</SectionHeader>
              <div className="space-y-4">
                {data.sections.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.school}</p>
                      </div>
                      <Badge variant="outline" className="text-gray-600">
                        {edu.year}
                      </Badge>
                    </div>
                    {i < data.sections.education.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(data.sections.skills) ? (
                  data.sections.skills.map((skill, i) => (
                    <Badge 
                      key={i}
                      variant="secondary"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor
                      }}
                    >
                      {skill}
                    </Badge>
                  ))
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;