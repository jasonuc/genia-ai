import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiUseCount, checkApiUseCount } from "@/lib/api-limit";

enum StatusCodesEnum {
    BadRequest = 400,
    Unauthorised = 401,
    InternalServerError = 500
}

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body

        if (!userId) {
            return new NextResponse("Unauthorised", { status: StatusCodesEnum.Unauthorised })
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: StatusCodesEnum.BadRequest })
        }


        const freeTrial = await checkApiUseCount();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        await increaseApiUseCount();

        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt,
                }
            }
        );

        return NextResponse.json(response)

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: StatusCodesEnum.BadRequest });
    }
}