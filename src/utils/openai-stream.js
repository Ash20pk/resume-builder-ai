export async function* OpenAIStream(response) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let buffer = '';
  for await (const chunk of response) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      buffer += content;
      
      // Flush the buffer when we have a complete sentence or enough characters
      if (buffer.includes('.') || buffer.includes('\n') || buffer.length > 100) {
        yield encoder.encode(buffer);
        buffer = '';
      }
    }
  }
  
  // Flush any remaining content
  if (buffer) {
    yield encoder.encode(buffer);
  }
}
