"use client"

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type TestimonialType = {
    name: string;
    avatar: string;
    title: string;
    description: string;
}

const testimonials: TestimonialType[] = [
    {
        name: "John Doe",
        avatar: "JD",
        title: "Software Engineer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        name: "Jane Smith",
        avatar: "JS",
        title: "Product Manager",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "Michael Johnson",
        avatar: "MJ",
        title: "UX Designer",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        name: "Emily Davis",
        avatar: "ED",
        title: "Data Analyst",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        name: "David Wilson",
        avatar: "DW",
        title: "Marketing Specialist",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Sarah Thompson",
        avatar: "ST",
        title: "Graphic Designer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        name: "Robert Anderson",
        avatar: "RA",
        title: "Project Manager",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    },
    {
        name: "Olivia Martinez",
        avatar: "OM",
        title: "Software Developer",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
    }
];

export default function LandingContent() {
  return (
    <div className="px-10 pb-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2">
                            <Avatar>
                                <AvatarFallback className="text-primary text-sm">{testimonial.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-lg">{testimonial.name}</p>
                                <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                            { testimonial.description }
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>
  )
}