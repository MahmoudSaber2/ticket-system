import { BeatLoader } from "react-spinners";

const UiContainer = ({ containerClass, bodyClass, customTitle, loading, children }) => {
    return (
        <div className={`relative rounded-xl border border-slate-200 bg-white shadow-sm ${containerClass}`}>
            {customTitle && customTitle?.()}
            <div className={`p-4 sm:p-6 ${bodyClass}`}>{children}</div>
            {loading && children && (
                <div className="absolute inset-0 z-10 flex size-full items-center justify-center">
                    <div className="absolute inset-0 bg-white opacity-80"></div>
                    <BeatLoader />
                </div>
            )}
        </div>
    );
};

export default UiContainer;
