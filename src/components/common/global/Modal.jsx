import { Modal } from "antd";

const DefModal = ({ title, isModalOpen, onClose, children, ...props }) => {
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={onClose}
            footer={false}
            {...props}>
            <div className="h-[60vh] overflow-y-auto">{children}</div>
        </Modal>
    );
};

export default DefModal;
