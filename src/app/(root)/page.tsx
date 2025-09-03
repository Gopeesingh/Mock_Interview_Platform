

import InterviewCard from '@/src/components/InterviewCard';
import SignOutButton from '@/src/components/SignOutButton';

import { Button } from '@/src/components/ui/button';
import { getCurrentUser } from '@/src/lib/actions/auth.action';
import { getInteviewsByUserId, getLatestInterviews} from '@/src/lib/actions/general.action'
import Link from 'next/link';
import React from 'react';


const Page = async () => {
    const user = await getCurrentUser();

    const [userInterviews, latestInterviews] = await Promise.all([
        await getInteviewsByUserId(user?.id!),
        await getLatestInterviews({ userId: user?.id! })
    ]);

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterViews = latestInterviews?.length > 0
    return(
        <>
        
        <div className="w-full shadow-md px-6 py-4 flex justify-end items-center">
        <SignOutButton />
    </div>

        <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
            <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
            <p className='text-lg'>
                Practice on real interview question & get instant feedback
            </p>
            <Button asChild className='btn-primary max-sm:w-full'>
                <Link href="/interview">Start an Interview</Link>
            </Button>
        </div>
        </section>

        <section className='flex flex-col gap-6 mt-8'>
            <h2>Your Interview</h2>
            <div className='interviews-section'>
                {
                    hasPastInterviews ? (
                        userInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))) : (
                            <p>You haven&apos;t taken any interviews yet</p>
                    )}
            </div>
        </section>

        <section className='flex flex-col gap-6 mt-8'>
            <h2>Take an Interview</h2>
            <div className='interviews-section'>
            {
                    hasUpcomingInterViews ? (
                        latestInterviews?.map((interview) => (
                            <InterviewCard {...interview}
                            key={interview.id}/>
                        ))) : (
                            <p>There are no new interview available</p>
                    )}
            </div>
        </section>
        
        
        </>
    )
}
export default Page;

