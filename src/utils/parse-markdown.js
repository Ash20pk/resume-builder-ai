export function parseMarkdownContent(markdown) {
  if (!markdown) return null;

  const data = {
    name: '',
    title: '',
    contact: {
      email: '',
      phone: '',
      location: ''
    },
    sections: {
      summary: '',
      experience: [],
      education: [],
      skills: []
    }
  };

  // First split by main sections (# and ##)
  const mainSections = markdown.split(/^##? /m).filter(Boolean);
  
  mainSections.forEach(section => {
    const lines = section.trim().split('\n').filter(Boolean);
    const sectionTitle = lines[0].toLowerCase().trim();
    const sectionContent = lines.slice(1);

    // Handle the header section (name and contact)
    if (!sectionTitle.includes('professional') && !sectionTitle.includes('education') && !sectionTitle.includes('skills')) {
      data.name = sectionTitle;
      const contactLine = sectionContent[0];
      if (contactLine) {
        const [email, phone] = contactLine.split('|').map(s => s.trim());
        data.contact.email = email;
        data.contact.phone = phone;
      }
    }
    // Handle Professional Summary
    else if (sectionTitle.includes('professional summary')) {
      data.sections.summary = sectionContent.join(' ').trim();

      // Try to extract title from summary
      const titleMatch = data.sections.summary.match(/(?:experienced|senior)\s+([^.]+?)(?:\s+with|\.)/i);
      if (titleMatch) {
        data.title = titleMatch[1].trim();
      }
    }
    // Handle Professional Experience
    else if (sectionTitle.includes('professional experience')) {
      let currentExp = null;

      sectionContent.forEach(line => {
        line = line.trim();
        if (line.startsWith('###')) {
          // Company and location
          const [company, location] = line.replace('###', '').trim().split('|').map(s => s.trim());
          currentExp = {
            company,
            location,
            title: '',
            period: '',
            points: []
          };
          data.sections.experience.push(currentExp);
        } else if (line.startsWith('**')) {
          // Job title and period
          if (currentExp) {
            const titlePeriod = line.replace(/\*\*/g, '').trim();
            const [title, period] = titlePeriod.split('|').map(s => s.trim());
            currentExp.title = title;
            currentExp.period = period;
          }
        } else if (line.startsWith('-') && currentExp) {
          // Add bullet point
          currentExp.points.push(line.substring(1).trim());
        }
      });
    }
    // Handle Education
    else if (sectionTitle.includes('education')) {
      let currentEdu = null;

      sectionContent.forEach(line => {
        line = line.trim();
        if (line.startsWith('###')) {
          // Degree and year
          const [degree, year] = line.replace('###', '').trim().split('|').map(s => s.trim());
          currentEdu = {
            degree,
            year: year || '',
            school: '',
            location: ''
          };
          data.sections.education.push(currentEdu);
        } else if (line.startsWith('**') && currentEdu) {
          // School and location
          const schoolLocation = line.replace(/\*\*/g, '').trim();
          const [school, location] = schoolLocation.split('-').map(s => s.trim());
          currentEdu.school = school;
          currentEdu.location = location;
        }
      });
    }
    // Handle Skills
    else if (sectionTitle.includes('skills')) {
      let currentSkillSection = '';
      const allSkills = [];

      sectionContent.forEach(line => {
        line = line.trim();
        if (line.startsWith('###')) {
          currentSkillSection = line.replace('###', '').trim();
        } else if (line.startsWith('-')) {
          allSkills.push(line.substring(1).trim());
        }
      });

      data.sections.skills = allSkills;
    }
  });

  return data;
}
