import Agent from "@/src/components/agent"
import { getCurrentUser } from "@/src/lib/actions/auth.action"
import { redirect } from "next/navigation"

const Page = async () => {
    const user = await getCurrentUser();
    
    // Handle case where user is not authenticated
    if (!user) {
        redirect('/auth/signin'); // or your login page
        return null;
    }
    
    return (
        <>
            <h3>Interview Generation</h3>

            <Agent 
                userName={user.name} 
                userId={user.id} 
                type="generate"
            />
        </>
    )
}

export default Page