import {useEffect, useState} from "react";

export default function useFilePreview(file) {
    const [preview, setPreview] = useState<string>();

    useEffect(() => {
        if (file?.length) {
            updatePreview(file[0]);
        }
    }, [file]);

    const updatePreview = (file: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
    };

    return [preview, setPreview];
}


