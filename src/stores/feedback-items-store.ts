import { create } from 'zustand';
import { FeedbackProps } from '../../lib/types';

type FeedbackItemsStore = {
    feedbackItems: FeedbackProps[];
    isLoading: boolean;
    selectedHashtag: string;
    selectedHashtags: string[];
    addFeedbackItem: (feedbackItem: FeedbackProps) => Promise<void>;
    selectHashtag: (hashtag: string) => void;
    getCompanyList: () => string[];
    getFilteredFeedbackItems: () => FeedbackProps[];
    fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<FeedbackItemsStore>((set, get) => ({
    feedbackItems: [],
    isLoading: false,
    selectedHashtag: '',
    selectedHashtags: [],
    getFilteredFeedbackItems: () => {
        const { feedbackItems, selectedHashtag } = get();

        if (selectedHashtag === '') {
            return feedbackItems;
        }

        return feedbackItems.filter((item) => item.company === selectedHashtag);
    },
    getCompanyList: () => {
        return get()
            .feedbackItems.map((item) => item.company)
            .filter((value, index, self) => self.indexOf(value) === index);
    },
    addFeedbackItem: async (feedbackItem: FeedbackProps) => {
        set((state) => ({
            feedbackItems: [...state.feedbackItems, feedbackItem]
        }));

        try {
            const response = await fetch(
                'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(feedbackItem)
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Posted feedback', feedbackItem);
        } catch (e) {
            console.error(e);
        }
    },
    selectHashtag: (hashtag: string) => {
        set(() => ({
            selectedHashtag: hashtag
        }));
    },
    fetchFeedbackItems: async () => {
        set(() => ({
            isLoading: true
        }));

        try {
            const response = await fetch(
                'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const feedbacks = data.feedbacks as FeedbackProps[];

            set(() => ({
                feedbackItems: feedbacks
            }));
        } catch (e) {
            console.error(e);
        }

        set(() => ({
            isLoading: false
        }));
    }
}));
