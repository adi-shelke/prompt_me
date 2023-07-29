import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDb();
    console.log("Inside the fethch and mongo connected");
    const prompts = await Prompt.find({}).populate("creator");
    console.log("printing prompts ", prompts);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
