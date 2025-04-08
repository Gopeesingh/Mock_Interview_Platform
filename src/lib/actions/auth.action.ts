'use server'

import { cookies } from "next/headers";
import { auth, db } from "../../../firebase/admin";

const ONE_WEEK = 60 *60 * 24 * 7;

export async function signUp(params : SignUpParams){
    const{ uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return{
                success: false,
                message: 'User already exists. Please sign in.'
            }
        }
        await db.collection('users').doc(uid).set({
            name, email
        })
        return{
            success: true,
            message: 'Account create successfully. please Sign in.'
        }
    } catch (e : any) {
        console.error('Error creating a user', e);
        if(e.code === 'auth/email-already-exists'){
            return{
                success: false,
                message: 'This email is already in use.'
            }
        }
        return{
            success: false,
            message: 'Failed to create an account'
        }
    }
}

export async function signIn(params : SignInParams){
    const {email, idToken} = params;
    
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord)
            return {
                success : false,
                message : "User does not exits. create an account instead.",
            }
            await setSessionCookies(idToken);
            
        }catch (e) {
        console.log(e);

        return {
            success: false,
            message: "Failed to log into account. Please try again."
        }
    }
}

export async function setSessionCookies(idToken: string){
  console.log("idToken", idToken)
    const cookiesStore = await cookies();

    const sessionCookies = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    })


    cookiesStore.set('session', sessionCookies, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        sameSite: 'lax'
    })
}



export async function getCurrentUser(): Promise<User | null> {
  
    const cookiesStore = await cookies();

    const sessionCookies = cookiesStore.get('session')?.value;
    
    console.log("Found session cookie:", sessionCookies); // Add this line
    if(!sessionCookies) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookies, true);
        console.log("Decoded claims:", decodedClaims); // Add this line
        const userRecord = await db.
        collection('users')
        .doc(decodedClaims.uid)
        .get();

        if(!userRecord.exists) return null;

        return{
            ...userRecord.data(),
            id: userRecord.id,
        } as User;

    } catch (e) {
        console.log(e)
        return null;
    }
}
// check if user is authenticated
export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user;
}

export async function getInteviewsByUserId(userId : string): Promise<Interview[] | null>{
    const interviews = await db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();
    
    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getLatestInterviews(params : GetLatestInterviewsParams): Promise<Interview[] | null>{
    const {userId, limit = 20 } = params;

    const interviews = await db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get();
    
    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}
