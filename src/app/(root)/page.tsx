import InterviewCard from '@/src/components/InterviewCard';
import { Button } from '@/src/components/ui/button';
import { getCurrentUser } from '@/src/lib/actions/auth.action';
import { getInteviewsByUserId, getLatestInterviews, fixPlaceholderUserIds} from '@/src/lib/actions/general.action'
import Link from 'next/link';
import React from 'react';
import { redirect } from 'next/navigation';

const Page = async () => {
    const user = await getCurrentUser();

    // Handle unauthenticated user
    if (!user) {
        redirect('/auth/signin');
        return null;
    }
     await fixPlaceholderUserIds(user.id);



    const [userInterviews, latestInterviews] = await Promise.all([
        getInteviewsByUserId(user.id),
        getLatestInterviews({ userId: user.id })
    ]);



    const hasPastInterviews = userInterviews && userInterviews.length > 0;
    const hasUpcomingInterviews = latestInterviews && latestInterviews.length > 0;

    return (
        <>
            <section className='card-cta'>
                <div className='flex flex-col gap-6 max-w-lg'>
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className='text-lg'>
                        Practice on real interview questions & get instant feedback
                    </p>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
            </section>

            <section className='flex flex-col gap-6 mt-8'>
                <h2>Your Interviews</h2>
                <div className='interviews-section'>
                    {hasPastInterviews ? (
                        userInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))
                    ) : (
                        <p>You haven&apos;t taken any interviews yet</p>
                    )}
                </div>
            </section>

            <section className='flex flex-col gap-6 mt-8'>
                <h2>Take an Interview</h2>
                {/* Add debug info */}
                <p>Debug: Found {latestInterviews?.length || 0} latest interviews</p>
                <div className='interviews-section'>
                    {hasUpcomingInterviews ? (
                        latestInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id}/>
                        ))
                    ) : (
                        <p>There are no new interviews available</p>
                    )}
                </div>
            </section>
        </>
    )
}

export default Page;