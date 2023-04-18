import React, {useEffect} from 'react';

interface ModalProps {
    children:React.ReactNode;
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
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [props.isOpen, props.onClose]);

    if (!props.isOpen) return null;

    return (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center  ">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className=" z-10 overflow-auto">
                <div className="modal-content bg-white rounded-lg p-6 max-w-screen-xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{props.nameModal}</h2>
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