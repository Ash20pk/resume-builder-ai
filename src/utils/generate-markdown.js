export const generateMarkdown = (formData) => {
  if (!formData) return '';

  const {
    fullName,
    email,
    phone,
    location,
    objective,
    experience,
    education,
    skills
  } = formData;

  // Generate contact section
  const contactSection = [
    `# ${fullName || '[Full Name]'}`,
    `${email || '[Email]'} | ${phone || '[Phone]'}${location ? ` | ${location}` : ''}`
  ].join('\n');

  // Generate professional summary
  const summarySection = [
    '\n## Professional Summary',
    objective || '[Your professional summary]'
  ].join('\n');

  // Generate experience section
  const experienceSection = [
    '\n## Professional Experience',
    ...(experience || []).map(exp => [
      `### ${exp.company || '[Company Name]'}`,
      `**${exp.position || '[Position]'}** | ${exp.startDate || '[Start Date]'} - ${exp.endDate || '[End Date]'}`,
      exp.description || '[Job description and achievements]'
    ].join('\n'))
  ].join('\n');

  // Generate education section
  const educationSection = [
    '\n## Education',
    ...(education || []).map(edu => [
      `### ${edu.institution || '[Institution]'}`,
      `**${edu.degree || '[Degree]'}** | ${edu.startDate || '[Start Date]'} - ${edu.endDate || '[End Date]'}`,
      edu.description || '[Education details]'
    ].join('\n'))
  ].join('\n');

  // Generate skills section
  const skillsSection = [
    '\n## Skills',
    (skills || []).join(', ') || '[Your skills]'
  ].join('\n');

  // Combine all sections
  return [
    contactSection,
    summarySection,
    experienceSection,
    educationSection,
    skillsSection
  ].join('\n\n');
};
