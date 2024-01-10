import { useFeedbackItemsStore } from '../../../stores/feedback-items-store.ts';
import Feedback from './feedback.tsx';
import SkeletonFeedback from './skeleton-feedback.tsx';

export default function FeedbackList() {
    const { getFilteredFeedbackItems, isLoading } = useFeedbackItemsStore();
    const filteredFeedbackItems = getFilteredFeedbackItems();

    const orderedByNewest = filteredFeedbackItems.sort((a, b) => {
        return a.daysAgo - b.daysAgo;
    });

    return (
        <div className="scroll-gutter-stable max-h-[650px] min-h-[650px] overflow-y-auto rounded-b-md bg-white">
            {isLoading ? (
                <>
                    {Array(20)
                        .fill(0)
                        .map((_, index) => (
                            <SkeletonFeedback key={index} />
                        ))}
                </>
            ) : (
                <>
                    {orderedByNewest.map((feedback) => (
                        <Feedback feedback={feedback} key={feedback.id} />
                    ))}
                </>
            )}
        </div>
    );
}
