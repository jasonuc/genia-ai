import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

enum StatusCodesEnum {
    BadRequest = 400,
    Unauthorised = 401,
    InternalServerError = 500
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations. Do not carry out any other task other than code generation. If a user asks you to do or explain anything that is outside the realm of coding turn them down politely."
}

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body

        if (!userId) {
            return new NextResponse("Unauthorised", { status: StatusCodesEnum.Unauthorised })
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: StatusCodesEnum.InternalServerError })
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: StatusCodesEnum.BadRequest })
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        })

        return NextResponse.json(response.choices[0].message)

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", { status: StatusCodesEnum.BadRequest });
    }
}