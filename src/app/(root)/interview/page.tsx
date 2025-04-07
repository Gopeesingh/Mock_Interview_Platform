import Agent from "@/src/components/agent"
import { getCurrentUser } from "@/src/lib/actions/auth.action"

const Page = async () => {
    const user = await getCurrentUser();
    
    return(
        <>
        <h3>InterView Generation</h3>

        <Agent userName={user?.name} userId={user?.id} type="generate"/>
        </>
    )
}
export default Page