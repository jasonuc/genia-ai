import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiUseCount, checkApiUseCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscriptions";

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
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        if (!isPro) {
            await increaseApiUseCount();
        }


        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt,
              }
            }
          );

        return NextResponse.json(response)

    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal Error", { status: StatusCodesEnum.BadRequest });
    }
}