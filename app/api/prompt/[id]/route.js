import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

//for GET request
export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to load the prompts", {
      status: 500,
    });
  }
};

//for PATCH request
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const currentPrompt = await Prompt.findById(params.id);

    if (!currentPrompt)
      return new Response("Prompt not found", { status: 404 });

    currentPrompt.prompt = prompt;
    currentPrompt.tag = tag;
    await currentPrompt.save();

    return new Response(JSON.stringify(currentPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//for DELETE request

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
  y;
};
