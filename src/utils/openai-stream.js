const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function* OpenAIStream(response) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  for await (const chunk of response) {
    counter++;
    const content = chunk.choices[0]?.delta?.content || '';
    
    if (content) {
      // Add a small delay for typewriter effect
      // Delay less for punctuation and spaces
      const delay = content.match(/[.,!? ]/) ? 10 : 30;
      await sleep(delay);
      
      yield encoder.encode(content);
    }
  }
}
