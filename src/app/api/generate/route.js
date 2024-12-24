import { OpenAI } from 'openai';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are a professional resume writer. Create concise, impactful resumes using markdown formatting. Keep responses focused and brief. Format with ## for sections and * for bullet points.`;

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'objective'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return new Response('## Not Found ##', { status: 200 });
    }

    const systemPrompt = `You are an expert resume writer. Generate a professional resume in markdown format that highlights the candidate's qualifications effectively. Use this exact markdown structure:

# [Full Name]
[Email] | [Phone] | [Location]

## Professional Summary
[A compelling summary highlighting key qualifications and career goals]

## Professional Experience
### [Company Name]
**[Job Title]** | [Start Date] - [End Date]
- [Achievement or responsibility]
- [Achievement or responsibility]

## Education
### [Institution Name]
**[Degree]** | [Start Date] - [End Date]
- [Description or achievements]

## Skills
[List of relevant skills]

Follow these guidelines:
- Keep content clear and concise
- Use action verbs
- Include measurable achievements
- Make it ATS-friendly
- Ensure proper markdown formatting`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const stream = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(data) }
      ],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    // Create a readable stream from the OpenAI response
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || '';
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Error generating resume:', error);
    return new Response('Error generating resume', { status: 500 });
  }
}
