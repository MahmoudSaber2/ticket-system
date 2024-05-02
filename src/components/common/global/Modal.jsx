import { Modal } from "antd";

const DefModal = ({ title, isModalOpen, onClose, children, ...props }) => {
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={onClose}
            footer={false}
            {...props}>
            {children}
        </Modal>
    );
};

export default DefModal;
