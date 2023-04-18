import React, {useEffect} from 'react';

interface ModalProps {
    children: React.ReactNode;
    nameModal: string;
    isOpen: boolean;
    onClose: () => void;
}

// TODO: [Fix] the scrollable of the modal is not working
const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                props.onClose();
            }
        };
        const handleClickOutside = (event: MouseEvent) => {
            const modal = document.querySelector('.modal') as HTMLElement;
            const modalContent = document.querySelector('.modal-content') as HTMLElement;
            if (modal && !modalContent.contains(event.target as HTMLElement)) {
                props.onClose();
            }
        };
        if (props.isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [props.isOpen, props.onClose]);

    if (!props.isOpen) return null;

    return (
        <div
            className="modal flex fixed inset-0 z-50 justify-center bg-neutral-200 bg-opacity-50 ">
            <div className="z-10  overflow-auto">
                <div
                    className="modal-content bg-white rounded-lg p-6 max-w-screen-md mx-auto ">
                    <div className="flex  items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold w-full text-center">{props.nameModal}</h2>
                        <button onClick={props.onClose}>
                            X
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Modal;