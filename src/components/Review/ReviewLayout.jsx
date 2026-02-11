import ReviewContent from "./ReviewContent";

const ReviewLayout = () => {
    return (
        <div className="flex min-h-screen justify-center bg-slate-100 px-4 py-8">
            <div className="w-full max-w-5xl">
                <ReviewContent />
            </div>
        </div>
    );
};

export default ReviewLayout;
