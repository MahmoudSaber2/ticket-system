import { Modal } from "antd";

const DefModal = ({ title, isModalOpen, onClose, children, ...props }) => {
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={onClose}
            footer={false}
            {...props}
        >
            <div className="max-h-[80vh] overflow-y-auto">{children}</div>
        </Modal>
    );
};

export default DefModal;
