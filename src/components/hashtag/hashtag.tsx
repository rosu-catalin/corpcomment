import { cn } from '../../../lib/utils';
import { useFeedbackItemsStore } from '../../stores/feedback-items-store';

type HashtagProps = {
    hashtag: string;
    onSelectHashtag: (hashtag: string) => void;
};

export default function Hashtag({ hashtag, onSelectHashtag }: HashtagProps) {
    const { selectedHashtag } = useFeedbackItemsStore();

    return (
        <button
            onClick={() => onSelectHashtag(hashtag)}
            className={cn(
                'w-max rounded-full bg-white/10 px-4 py-2 text-sm text-white text-white/80 transition-all hover:bg-white/20 hover:text-white md:text-base',
                selectedHashtag === hashtag && 'bg-white/20 text-white/100'
            )}
        >
            #{hashtag}
        </button>
    );
}
