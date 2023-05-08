import {ReactNode, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import Picture from "../Picture";
import Image from "next/image";

interface IDropZone {
    multiple: boolean;
    onChange: any
    avatar?: boolean
    children?: ReactNode
}

const DropZone = (props: IDropZone, {...rest}) => {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            "image/png": [],
            "image/jpeg": [],
        },
        multiple: props.multiple,
        onDrop: (acceptedFiles) => {
            if (props.multiple) {
                setFiles(prevFiles => [
                    ...prevFiles,
                    ...acceptedFiles.filter(file => !prevFiles.find(prevFile => prevFile.name === file.name))
                        .map((file) =>
                            Object.assign(file, {
                                preview: URL.createObjectURL(file),
                            })
                        )
                ]);
            } else {
                setFiles(
                    acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )
                );
            }
        },
        onDropAccepted: (data) => {
            props.onChange([...data, ...files])
        },
    });

    const removeFile = (file: any) => {
        const newFiles = files.filter((f) => f !== file);
        setFiles(newFiles);
        props.onChange(newFiles)
    };

    const thumbsAvatar = files.map((file) => {
        return (
            <div key={file.name}>
                <Picture
                    src={file.preview}
                    event={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        );
    });

    const thumbs = files.map((file) => {
        return (
            <div
                className={'flex flex-col items-center'}
                key={file.name}>
                <div className={'relative w-36 h-36 md:w-60 md:h-52'}>
                    <Image
                        src={file.preview}
                        alt={file.name}
                        fill={true}
                        className={'object-contain'}
                    />
                </div>
                <button
                    className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                    onClick={() => removeFile(file)}>Remove
                </button>
            </div>)
    })

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    if (props.avatar) {
        return (
            <section className="container h-fit w-80 mx-auto hover:bg-gray-100 overflow-hidden">
                <div {...getRootProps({className: "dropzone"})}>
                    <input {...getInputProps()} />
                    <div className={"relative w-36 h-36 mx-auto"}>
                        {thumbs.length === 0 ? (
                            <Picture src={"/assets/sbcf-default-avatar.png"}/>
                        ) : (
                            <div>{thumbsAvatar}</div>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="container h-fit w-full mx-auto">
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()} />
                {props.children}
            </div>
            <div className={'w-full grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 justify-items-center'}>
                {thumbs}
            </div>
        </section>
    )

};

export default DropZone;
