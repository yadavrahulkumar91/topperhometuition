import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
});

const response = openai.responses.create({
  model: "gpt-5-nano",
  input: "write a haiku about ai",
  store: true,
});

response.then((result) => console.log(result.output_text));
