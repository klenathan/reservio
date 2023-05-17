import { ReactNode, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Picture from "../Picture";
import Image from "next/image";
import Resizer from "react-image-file-resizer";

interface IDropZone {
  multiple: boolean;
  onChange: any;
  avatar?: boolean;
  children?: ReactNode;
  classname?: string;
}

function DropZone(props: IDropZone, { ...rest }) {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
    useFsAccessApi: true,
    multiple: props.multiple,
    onDrop: (acceptedFiles) => {
      if (props.multiple) {
        const newFiles = acceptedFiles.filter(
          (file) => !files.find((prevFile) => prevFile.name === file.name)
        );
        newFiles.forEach((file) => {
          resizeImage(file, file.name, (resizedFile) => {
            setFiles((prevFiles: any) => [...prevFiles, resizedFile]);
          });
        });
      } else {
        resizeImage(
          acceptedFiles[0],
          acceptedFiles[0].name,
          (resizedFile: any) => {
            setFiles([resizedFile]);
          }
        );
      }
    },
  });

  const removeFile = (file: any) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    props.onChange(newFiles);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  useEffect(() => {
    console.log(files);
    props.onChange([...files]);
  }, [files]);

  function resizeImage(
    file: File,
    name: string,
    callback: (resizedFile: File) => void
  ) {
    Resizer.imageFileResizer(
      file,
      1920, // maximum width
      1080, // maximum height
      "WEBP", // output format
      50, // quality
      0, // rotation
      (resizedFile: any) => {
        const newFile: any = new File([resizedFile], name, {
          type: resizedFile.type,
          lastModified: Date.now(),
        });
        // Set the path property of the new file to match the original file
        Object.defineProperty(newFile, "path", {
          value: name,
          writable: false,
          enumerable: true,
          configurable: false,
        });
        newFile.preview = URL.createObjectURL(resizedFile); // Add the preview URL to the new file
        callback(newFile);
      },
      "blob" // output type
    );
  }

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
        className={"flex flex-col items-center justify-center"}
        key={file.name}
      >
        <div className={"relative w-36 h-36 md:w-60 md:h-52"}>
          <Image
            src={file.preview}
            alt={file.name}
            fill={true}
            className={"object-contain"}
          />
        </div>
        <button
          className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
          onClick={() => removeFile(file)}
        >
          Remove
        </button>
      </div>
    );
  });

  if (props.avatar) {
    return (
      <section className="container h-fit w-80 mx-auto hover:bg-gray-100 overflow-hidden">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className={"relative w-36 h-36 mx-auto"}>
            {thumbs.length === 0 ? (
              <Picture src={"/assets/sbcf-default-avatar.png"} />
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
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {props.children}
      </div>
      <div
        className={`w-full grid grid-cols-1 ${props.classname} gap-2 mt-4 md:gap-3 justify-items-center`}
      >
        {thumbs}
      </div>
    </section>
  );
}

export default DropZone;
