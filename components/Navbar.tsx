import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components//MobileSidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscriptions";

export default async function Navbar() {

  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()

  return (
    <div className="flex items-center p-4">
        <MobileSidebar apiLimitCount={apiLimitCount} isPro />

        <div className="flex w-full justify-end">
            <UserButton afterSignOutUrl="/" />
        </div>
    </div>
  )
}