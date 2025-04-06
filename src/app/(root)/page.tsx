

import InterviewCard from '@/src/components/InterviewCard';
import { Button } from '@/src/components/ui/button';
import { dummyInterviews } from '@/src/constants';
import Link from 'next/link';
import React from 'react';


const Page = () => {
    return(
        <>
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
                    dummyInterviews.map((interview) => (
                    <InterviewCard {...interview} key={interview.id}/>
                    ))}
            </div>
        </section>

        <section className='flex flex-col gap-6 mt-8'>
            <h2>Take an Interview</h2>
            <div className='interviews-section'>
            {
                    dummyInterviews.map((interview) => (
                    <InterviewCard {...interview} key={interview.id}/>
                    ))}
            </div>
        </section>
        </>
    )
}
export default Page;