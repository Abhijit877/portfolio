export const config = {
    runtime: 'edge',
};

const SYSTEM_PROMPT = `You are Abhijit Behera's professional portfolio assistant. Answer all questions strictly based on the provided context of his skills, projects, and case studies. Do not generate information outside of this professional scope.

Context:
Abhijit Behera is a Full Stack Developer.
(This context should be dynamically populated or expanded with data from the portfolio)
`;

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { messages } = await req.json();
        const latestMessage = messages[messages.length - 1]?.content;

        if (!latestMessage) {
            return new Response('No message provided', { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            // Mock response if no API key is present (for demo/local dev without key)
            const encoder = new TextEncoder();
            const mockStream = new ReadableStream({
                async start(controller) {
                    const text = "I am a demo AI assistant. To make me fully functional, please add your OPENAI_API_KEY to the environment variables. I can tell you about Abhijit's skills and projects!";
                    for (const char of text.split('')) {
                        controller.enqueue(encoder.encode(char));
                        await new Promise(r => setTimeout(r, 20));
                    }
                    controller.close();
                },
            });
            return new Response(mockStream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
        }

        // Direct fetch to OpenAI to control streaming easily in Edge
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages,
                ],
                stream: true,
            }),
        });

        if (!response.ok) {
            return new Response(await response.text(), { status: response.status });
        }

        // Transform the SSE stream to plain text stream for the client (simplification)
        // Or just proxy the SSE. Let's proxy the SSE but maybe clean it up?
        // For simplicity in the client, I'll just pipe the OpenAI response directly
        // and handle the SSE parsing in the client (openai library or manual).
        // Actually, manual SSE parsing in client is safer if I don't want to bring the whole SDK to client.

        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error(error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
