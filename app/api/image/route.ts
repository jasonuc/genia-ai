import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { StatusCodesEnum } from "@/app/api/conversation/route";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = "1", resolution = "512x512" } = body

        if (!userId) {
            return new NextResponse("Unauthorised", { status: StatusCodesEnum.Unauthorised })
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: StatusCodesEnum.InternalServerError })
        }

        if (!prompt) {
            return new NextResponse("Prompt are required", { status: StatusCodesEnum.BadRequest })
        }

        if (!amount) {
            return new NextResponse("Amount are required", { status: StatusCodesEnum.BadRequest })
        }

        if (!resolution) {
            return new NextResponse("Resolution are required", { status: StatusCodesEnum.BadRequest })
        }

        const response = await openai.images.generate({
            prompt,
            size: resolution,
            n: parseInt(amount, 10),
        })

        return NextResponse.json(response.data)

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Error", { status: StatusCodesEnum.BadRequest });
    }
}