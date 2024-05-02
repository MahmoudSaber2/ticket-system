import Button from "../Buttons";

const TableHeader = ({ onClick, buttonName, dataLength, ListName }) => {
    return (
        <div className="flex flex-wrap items-center justify-between py-5">
            {buttonName && (
                <Button
                    type="primary"
                    onClick={onClick}
                    size="large">
                    {buttonName}
                </Button>
            )}

            <h1 className="text-xl font-bold">
                {dataLength} {ListName}
            </h1>
        </div>
    );
};

export default TableHeader;
