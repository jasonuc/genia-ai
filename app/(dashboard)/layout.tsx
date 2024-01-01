import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full relative">


            <div className="hidden md:flex md:w-72 h-full md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>

            <main className="md:ml-72 p-2">
                <Navbar />
                { children }
            </main>

        </div>
    )
}