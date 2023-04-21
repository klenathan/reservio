import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import Picture from "../Picture";


interface IDropZone {
    multiple: boolean;
    onChange: (files: File[]) => void;
}

const DropZone = (props: IDropZone, {...rest}) => {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': [],
            'image/jpeg': [],
        },
        multiple: props.multiple,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        },
        onDropAccepted: files => props.onChange(files)
    })
    const thumbs = files.map(file => {
            return (
                <div key={file.name}>
                    <Picture
                        src={file.preview}
                        event={
                            () => {
                                URL.revokeObjectURL(file.preview)
                            }
                        }
                    />
                </div>
            )
        }
    )

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])
    return (
        <section className="container h-fit w-80 mx-auto hover:bg-gray-100">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div className={"relative w-36 h-36 mx-auto"}>
                    {thumbs.length === 0 ? (
                            <Picture src={"/assets/sbcf-default-avatar.png"}/>
                        ) :
                        (<div>{thumbs}</div>
                        )
                    }
                </div>
            </div>
        </section>
    )
        ;
}

export default DropZone;