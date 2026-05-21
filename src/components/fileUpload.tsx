import React from "react";
import { Button } from "./button";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";

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
  flex?: number;
  onUpload: (files: Uint8Array[]) => void;
};

export const FileUpload = ({ id, accept, flex, onUpload }: Props) => {
  const t = useActiveRouteTranslations();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files == null) {
      setFileName(null);
      return;
    }
    const promises = Array.from(files).map(readAsArrayBuffer);
    const result = await Promise.all(promises);
    onUpload(result);
    setFileName(files[0].name);
    if (inputRef.current != null) {
      // Clear the file input value to allow re-uploading the same file
      inputRef.current.value = "";
    }
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
        flex={flex}
        trackerId={`upload_${id}`}
        onClick={() => inputRef.current?.click()}
      >
        {fileName ?? t["Upload!"]}
      </Button>
    </>
  );
};
