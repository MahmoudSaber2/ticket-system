import { Modal } from "antd";

const DefModal = ({ title, isModalOpen, onClose, children, ...props }) => {
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={onClose}
            footer={false}
            width={{
                xs: "90%",
                sm: "90%",
                md: "80%",
                lg: "70%",
                xl: "60%",
                xxl: "50%",
            }}
            {...props}
        >
            <div className="h-[60vh] overflow-y-auto">{children}</div>
        </Modal>
    );
};

export default DefModal;
