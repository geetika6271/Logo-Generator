// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI,} from '@google/genai';

export async function AiDesignIdeas(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : StreetStar with description: Indian Street Food Restaurant and referring to prompt:A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format the   logo ideas.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "logo_ideas": [
    "Animated Chef with Samosa",
    "Smiling Boy with Dosa",
    "Cartoon Girl Holding Pani Puri",
    "Friendly Tiger Eats Chaat",
    "Winking Elephant Serving Bhel"
  ]
}
\`\`\`
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];


  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });


  let fullText = '';
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return fullText;
}

 export async function AILogoPrompt(prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate a text prompt to create Logo for Logo Title/Brand name : Indian Spice,with description: Indian Restaurant, with Color combination of Sunset Warmth, also include the Hand-Drawn Curry Pot and include Vintage Logo Designs With Text & Icon design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.  Give me result in JSON portal with prompt field only`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "prompt": "Create a vintage-inspired logo for \\"Indian Spice\\", an Indian Restaurant. The logo should evoke a sense of warmth and authenticity, using a color palette of Sunset Warmth (think oranges, reds, and yellows). Feature a hand-drawn illustration of a curry pot as the primary icon. The design should be reminiscent of classic vintage logo designs, incorporating bold typography and intricate details. Aim for a retro aesthetic that feels hand-crafted and inviting. The overall feel should be artistic and suitable for a restaurant setting, emphasizing the rich flavors and traditions of Indian cuisine. Style should be similar to the provided reference: vintage-inspired logos with a hand-drawn, artistic style, bold typography, intricate details, and a retro aesthetic suitable for diverse brands or businesses, especially food-related brands."
}
\`\`\`
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullText = '';
  for await (const chunk of response) {
    fullText += chunk.text;
  }

  return fullText;
}

