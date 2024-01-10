import MaxWidthWrapper from './components/max-width-wrapper.tsx';
import FeedbackList from './components/main-content/feedback/feedback-list.tsx';
import { useEffect } from 'react';
import { useFeedbackItemsStore } from './stores/feedback-items-store.ts';
import Header from './components/main-content/header/header.tsx';
import HashtagList from './components/hashtag/hashtag-list.tsx';

function App() {
    const { fetchFeedbackItems } = useFeedbackItemsStore();

    useEffect(() => {
        fetchFeedbackItems();
    }, [fetchFeedbackItems]);

    return (
        <MaxWidthWrapper className="my-8 grid items-start gap-4 md:grid-cols-[1fr_120px]">
            <div>
                <Header />
                <FeedbackList />
            </div>

            <HashtagList className="hidden md:grid" />
        </MaxWidthWrapper>
    );
}

export default App;
