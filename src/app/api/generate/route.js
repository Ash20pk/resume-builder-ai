import { OpenAIStream } from '@/utils/openai-stream';
import { OpenAI } from 'openai';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are a professional resume writer. Create concise, impactful resumes using markdown formatting. Keep responses focused and brief. Format with ## for sections and * for bullet points.`;

export async function POST(req) {
  try {
    const { fullName, email, phone, experience, education, skills, objective } = await req.json();

    const prompt = `# Professional Resume Generator

Please create a polished, ATS-friendly resume using the following information and format structure:

## Input Information
- Full Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Career Objective: ${objective}
- Professional Experience: ${experience}
- Educational Background: ${education}
- Technical & Soft Skills: ${skills}

## Required Format Structure

\`\`\`markdown
# ${fullName}
${email} | ${phone}

## Professional Summary
[Generate 3-4 sentences highlighting key qualifications, years of experience, and notable achievements aligned with career objective]

## Professional Experience
### [Company Name] | [Location]
**[Job Title]** | [Start Date] - [End Date]
- [Achievement-focused bullet point starting with action verb]
- [Quantifiable result or impact]
- [Key responsibility or project]

[Repeat format for each position]

## Education
### [Degree Name] | [Graduation Date]
**[Institution Name]** - [Location]
- [Relevant coursework, honors, or GPA if above 3.5]
- [Academic achievements or leadership roles]

## Skills
### Technical Skills
- [Group related technical skills, 3-4 per bullet]

### Industry Knowledge
- [Relevant industry-specific skills and tools]

### Soft Skills
- [Key professional competencies]
\`\`\`

## Formatting Guidelines
1. Professional Summary:
   - Highlight key achievements
   - Focus on relevant experience
   - Include years of experience
   - Align with career objective

2. Experience Bullets:
   - Start with strong action verbs
   - Include metrics where possible (%, $, etc.)
   - Focus on achievements over responsibilities
   - Use present tense for current roles
   - Use past tense for previous roles

3. Skills Organization:
   - Group similar skills together
   - List most relevant skills first
   - Include proficiency levels if specified
   - Align skills with job objective

4. Overall Requirements:
   - Maximum 2 pages
   - Consistent formatting throughout
   - Clear section hierarchy
   - Professional spacing
   - ATS-friendly formatting

Please generate a resume following this exact structure while adapting the content to best highlight the candidate's qualifications.`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',  
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,  // Limiting response length
      presence_penalty: 0,
      frequency_penalty: 0,
    });

    // Create a TransformStream to handle the streaming response
    const transformStream = new TransformStream();
    const writer = transformStream.writable.getWriter();

    // Process the stream
    (async () => {
      try {
        for await (const chunk of OpenAIStream(response)) {
          await writer.write(chunk);
        }
        await writer.close();
      } catch (error) {
        console.error('Stream processing error:', error);
        await writer.abort(error);
      }
    })();

    return new Response(transformStream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
