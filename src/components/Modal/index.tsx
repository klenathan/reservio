import React, {useEffect, useRef} from "react";
import {AiOutlineClose} from "react-icons/ai";
import FormHeader from "../Form/FormHeader";

interface ModalProps {
    children?: React.ReactNode ;
    nameModal: string;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const modal = useRef<any>()


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                props.onClose();
            }
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (modal.current && !modal.current.contains(event.target as HTMLElement)) {
                props.onClose();
            }
        };
        if (props.isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props, props.isOpen, props.onClose]);

    if (!props.isOpen) return null;

    return (
        <div className="modal flex fixed inset-0 z-50 justify-center items-center bg-neutral-700 bg-opacity-50">
            <div className="h-3/4 w-full lg:w-max z-50">
                <div ref={modal} className="modal-content bg-white rounded-lg max-w-screen-lg mx-auto ">
                    <div
                        className="flex shadow-xl sticky top-0 bg-white z-10 px-6 py-6 rounded-t-lg items-center justify-between w-full ">
                        <FormHeader name={props.nameModal}/>
                        <button className="ml-4" onClick={props.onClose}>
                            <AiOutlineClose size={30}/>
                        </button>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
