import Logo from './logo.tsx';
import FeedbackForm from './feedback-form.tsx';
import HashtagList from '../../hashtag/hashtag-list.tsx';

export default function Header() {

    return (
        <header
            className='flex w-full flex-col
        items-center
            justify-center rounded-t-md bg-background-950 bg-[url("/pattern.svg")] bg-[size:100%]
            bg-top bg-no-repeat p-10 [background-position-y:-30px]
        '
        >
            <Logo />
            <h1 className="mt-2 text-center text-5xl font-bold text-white">
                Give Feedback. <span className="italic text-gray-300">Publicly.</span>
            </h1>
            <FeedbackForm />
            <HashtagList className="mt-8 flex flex-wrap items-center justify-center md:hidden" />
        </header>
    );
}
