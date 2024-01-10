import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FeedbackProps } from '../../lib/types';

type FeedbackItemsContextProps = {
    feedbackItems: FeedbackProps[];
    selectedHashtag: string;
    isLoading: boolean;
    filteredFeedbackItems: FeedbackProps[];
    handleAddToFeedbackItems: (feedbackItem: FeedbackProps) => void;
    handleSelectHashtag: (hashtag: string) => void;
};

export const FeedbackItemsContext = createContext<FeedbackItemsContextProps | null>(null);

export default function FeedbackItemsContextProvider({ children }: { children: React.ReactNode }) {
    const [feedbackItems, setFeedbackItems] = useState<FeedbackProps[]>([]);
    const [selectedHashtag, setSelectedHashtag] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const filteredFeedbackItems = useMemo(() => {
        if (!selectedHashtag) {
            return feedbackItems;
        }
        return feedbackItems.filter((feedback) => feedback.company === selectedHashtag);
    }, [selectedHashtag, feedbackItems]);

    const handleAddToFeedbackItems = async (feedbackItem: FeedbackProps) => {
        setFeedbackItems([...feedbackItems, feedbackItem]);

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
    };

    const handleSelectHashtag = (hashtag: string) => {
        setSelectedHashtag(hashtag);
    };

    useEffect(() => {
        setIsLoading(true);

        async function fetchFeedback() {
            try {
                const response = await fetch(
                    'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
                );

                setIsLoading(false);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const { feedbacks } = data;

                console.log(feedbacks);

                setFeedbackItems(feedbacks);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFeedback();
    }, []);

    return (
        <FeedbackItemsContext.Provider
            value={{
                feedbackItems,
                selectedHashtag,
                isLoading,
                filteredFeedbackItems,
                handleAddToFeedbackItems,
                handleSelectHashtag
            }}
        >
            {children}
        </FeedbackItemsContext.Provider>
    );
}

export function useFeedbackItemsContext() {
    const context = useContext(FeedbackItemsContext);

    if (!context) {
        throw new Error('FeedbackItemsContext is null');
    }

    return context;
}
