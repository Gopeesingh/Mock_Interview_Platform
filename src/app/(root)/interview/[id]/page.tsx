import Agent from "@/src/components/agent";
import DisplayTechIcons from "@/src/components/DisplayTechIcons";
import { getCurrentUser } from "@/src/lib/actions/auth.action";
import { getInterviewById } from "@/src/lib/actions/general.action";
import { getRandomInterviewCover } from "@/src/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

// Define interfaces for type safety
interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

interface Interview {
    role: string;
    techstack: string[];
    type: string;
    questions: string[];
}

interface User {
    id: string;
    name: string;
}

const Page = async ({ params }: RouteParams) => {
    const { id } = await params;
    const user: User | null = await getCurrentUser();
    const interview: Interview | null = await getInterviewById(id);
    
    // Handle missing interview
    if (!interview) {
        redirect('/');
        return null; // This won't execute but satisfies TypeScript
    }

    // Handle missing user
    if (!user) {
        redirect('/auth/signin'); // or wherever your login page is
        return null;
    }

    return (
        <>
            <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-4 items-center max-sm:flex-col">
                    <div className="flex flex-row gap-4 items-center">
                        <Image 
                            src={getRandomInterviewCover()} 
                            alt="cover image" 
                            width={40} 
                            height={40}
                            className="rounded-full object-cover size-[40px]"
                        />
                        <h3 className="capitalize">{interview.role} Interview</h3>
                    </div>
                    <DisplayTechIcons techStack={interview.techstack} />
                </div>
                <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize">
                    {interview.type}
                </p>
            </div>

            <Agent
                userName={user.name}
                userId={user.id}
                interviewId={id}
                type="interview"
                questions={interview.questions}
            />
        </>
    )
}

export default Page;