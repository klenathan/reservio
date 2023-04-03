import {useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";
import Image from "next/image";

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

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                <Image src={file.preview} alt={"filePreview"} width={200} height={200} onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                }}/>
            </div>
        </div>
    ))

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [])
    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag  drop some files here, or click to select files</p>
            </div>
            <aside >
                {thumbs}
            </aside>
        </section>
    );
}

export default DropZone;