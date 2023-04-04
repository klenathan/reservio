import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import Picture from "../Picture";

const DropZone = () => {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/png': [],
            'image/jpeg': [],
        },
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))
        }
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
    }, [])
    return (
        <section className="container h-fit w-80 mx-auto hover:bg-gray-100">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <div className={"relative w-36 h-36 mx-auto"}>
                    {thumbs.length === 0 ? (
                            <div className={"flex flex-col h-auto"}>
                                <Picture src={"/assets/sbcf-default-avatar.png"}/>
                            </div>
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