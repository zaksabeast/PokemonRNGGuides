import React from "react";
import { Button } from "./button";

const readAsArrayBuffer = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      resolve(new Uint8Array(arrayBuffer));
    };
    reader.onerror = (event) => {
      reject(event);
    };
    reader.readAsArrayBuffer(file);
  });
};

type Props = {
  id: string;
  accept?: string;
  onUpload: (files: Uint8Array[]) => void;
};

export const FileUpload = ({ id, accept, onUpload }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files == null) {
      return;
    }
    const promises = Array.from(files).map(readAsArrayBuffer);
    const result = await Promise.all(promises);
    onUpload(result);
  };

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        multiple
        hidden
        onChange={onFileChange}
      />
      <Button
        type="primary"
        trackerId={`upload_${id}`}
        onClick={() => inputRef.current?.click()}
      >
        Upload!
      </Button>
    </>
  );
};
