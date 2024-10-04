import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalComp = ({title, tittleButton, content}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {tittleButton}
            </Button>
            <Modal
                title={title}
                open={isModalOpen}
                onCancel={handleClose}
                centered
                footer={null}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    {content}
                </div>
            </Modal>
        </>
    );
};

export default ModalComp;