import Hashtag from './hashtag.tsx';
import { cn } from '../../../lib/utils.ts';
import { FeedbackProps } from '../../../lib/types.ts';
import { useFeedbackItemsStore } from '../../stores/feedback-items-store.ts';

type HashtagListProps = {
    className?: string;
};

export default function HashtagList({ className }: HashtagListProps) {
    const { feedbackItems, selectHashtag } = useFeedbackItemsStore();

    const uniqueHashtags: FeedbackProps[] = feedbackItems?.filter(
        (feedback, index, self) => index === self.findIndex((t) => t.company === feedback.company)
    );

    return (
        <div className={cn('grid gap-2', className)}>
            {uniqueHashtags?.map((feedback) => (
                <Hashtag
                    onSelectHashtag={selectHashtag}
                    key={feedback.id}
                    hashtag={feedback.company}
                />
            ))}
        </div>
    );
}
