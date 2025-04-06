
// import { isAuthenticated } from "@/src/lib/actions/auth.action";
// import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({children} : {children:ReactNode}) => {

    // if they have authenticated they do not need to login redirect to home page
    // const isUserAuthenticated = await isAuthenticated();
    //     if(isUserAuthenticated) redirect("/");

    return(
        <div className="auth-layout">{children}</div>
    )
}
export default AuthLayout