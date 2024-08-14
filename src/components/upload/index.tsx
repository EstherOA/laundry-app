import { Flex, Image, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import CloudUpload from "../../assets/upload.svg";

const FileUpload = (props: any) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 52428800,
    accept: { "image/*": [], "text/*": [] },
  });

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      {...getRootProps({ className: "dropzone" })}
      border="1px #B3B4B8 dashed"
      py={2}
      borderRadius="4px"
    >
      <input {...getInputProps()} {...props} />
      <Image src={CloudUpload} />
      {acceptedFiles.length ? (
        <Text fontSize="14px">{acceptedFiles[0].name}</Text>
      ) : (
        <Text fontSize="14px">Drop file or click to upload</Text>
      )}
    </Flex>
  );
};

export default FileUpload;
