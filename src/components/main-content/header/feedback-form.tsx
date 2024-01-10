import { useState } from 'react';
import { buildFeedback, cn } from '../../../../lib/utils.ts';
import { useFeedbackItemsStore } from '../../../stores/feedback-items-store.ts';

export default function FeedbackForm() {
    const { addFeedbackItem, isLoading } = useFeedbackItemsStore();

    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const charactersLeft = 150 - feedback.length;

    const handleFeedback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (charactersLeft >= 0 && error) {
            setError('');
        }

        setFeedback(e.target.value);
    };

    const canFeedbackBeSubmitted = (feedback: string) => {
        if (feedback.length > 150) {
            setError('Your feedback is too long!');
            return false;
        }

        if (feedback.length === 0) {
            setError('Your feedback is empty!');
            return false;
        }

        if (!feedback.includes('#')) {
            setError('Your feedback must include a hashtag!');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!canFeedbackBeSubmitted(feedback)) return;

        // Simulate 1s delay
        setStatus('loading');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        addFeedbackItem(buildFeedback(feedback));

        setStatus('success');
        setError('');
        setFeedback('');

        setTimeout(() => {
            setStatus('idle');
        }, 2000);
    };

    return (
        <form
            className={cn(
                'mt-8 w-full max-w-[650px] rounded-md border-2 border-background-700 bg-background-800 p-4',
                error && 'border-red-400'
            )}
            onSubmit={handleSubmit}
        >
            {error && <p className="mb-2 text-sm italic text-red-400">{error}</p>}
            {status === 'success' && (
                <p className="mb-2 text-sm italic text-green-400">Feedback submitted!</p>
            )}
            <textarea
                value={feedback}
                onChange={handleFeedback}
                name="feedback"
                id="feedback"
                className="h-24 w-full resize-none rounded-md border-0 bg-inherit text-gray-200 placeholder-background-50 ring-0 focus:outline-none focus:ring-0 md:text-lg"
                placeholder="Enter your feedback here, remember to #hashtag the company"
            ></textarea>
            <div className="flex items-center justify-between">
                <p
                    className={`${
                        charactersLeft >= 0 ? 'text-background-50' : 'text-red-400'
                    } italic`}
                >
                    {charactersLeft} <span className="sr-only">characters</span>
                </p>

                <button
                    className={cn(
                        'rounded-full bg-white px-4 py-2 text-sm font-bold uppercase text-gray-800 transition-all hover:scale-95',
                        (status === 'loading' || isLoading) && 'cursor-not-allowed opacity-60'
                    )}
                    disabled={status === 'loading' || isLoading}
                    type="submit"
                >
                    {status === 'loading' ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}
