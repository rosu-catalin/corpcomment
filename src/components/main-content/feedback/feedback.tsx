import { ArrowBigUp } from 'lucide-react';
import { FeedbackProps } from '../../../../lib/types.ts';
import { useState } from 'react';

export default function Feedback({ feedback }: { feedback: FeedbackProps }) {
    const truncatedFeedback = feedback.text.substring(0, 150) + '...';

    const [upvoteCount, setUpvoteCount] = useState<number>(feedback.upvoteCount);

    const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUpvoteCount(upvoteCount + 1);

        const currentTarget = e.currentTarget;

        currentTarget.disabled = true;
        currentTarget.style.color = 'green';
    };

    return (
        <div className="relative flex items-center justify-between border-b border-gray-200 border-l-gray-400 px-6 py-4 transition-all last-of-type:border-b-0 hover:border-l-4">
            <div className="flex items-start gap-4">
                <div className="flex items-center gap-4">
                    <button
                        aria-label="Upvote"
                        className="group/button flex min-w-[50px] flex-col items-center rounded-md p-2 text-gray-500 transition-all"
                        onClick={handleUpvote}
                    >
                        <ArrowBigUp className="transition-all group-hover/button:-translate-y-1 group-hover:scale-95" />
                        {upvoteCount}
                    </button>
                    <div
                        className={`size-10 md:size-14 flex items-center justify-center rounded-md bg-blue-400 text-2xl font-bold [:nth-of-type(2n)_&]:bg-purple-400 [:nth-of-type(3n)_&]:bg-red-400
                        `}
                    >
                        {feedback.badgeLetter}
                    </div>
                </div>
                <div>
                    <h2 className="text-sm font-bold">{feedback.company}</h2>
                    <p className="text-pretty pr-4 text-gray-600">{truncatedFeedback}</p>
                </div>
            </div>
            <p className="text-gray-500">
                <span className="sr-only">Posted</span>
                {feedback.daysAgo !== 0 ? `${feedback.daysAgo}d` : 'Now'}
            </p>
        </div>
    );
}
