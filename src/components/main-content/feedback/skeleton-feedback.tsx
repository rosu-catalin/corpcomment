export default function SkeletonFeedback() {
    return (
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 last-of-type:border-b-0">
            <div className="flex w-full animate-pulse items-start gap-4">
                <div className="flex items-center gap-4">
                    <div
                        className={`flex h-[40px] w-[40px] items-center justify-center rounded-md bg-gray-400 text-2xl font-bold md:h-[60px]
                        md:w-[60px]
                        `}
                    ></div>
                </div>
                <div className="grid w-full gap-2">
                    <div className="h-3 w-full rounded bg-gray-300"></div>
                    <div className="h-3 w-1/2 rounded bg-gray-300"></div>
                </div>
                <div className="grid w-10 gap-2">
                    <div className="h-3 w-full rounded bg-gray-400"></div>
                </div>
            </div>
        </div>
    );
}
