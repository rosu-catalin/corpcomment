import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import { FeedbackProps } from './types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function firstLetterUppercase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function buildFeedback(text: string) {
    const company = firstLetterUppercase(text.split('#')[1].split(' ')[0]).replace(',', '');
    const badgeLetter = company.charAt(0);

    const feedback = {
        id: new Date().getTime(),
        company,
        badgeLetter,
        upvoteCount: 0,
        daysAgo: 0,
        text
    };

    return feedback as FeedbackProps;
}
