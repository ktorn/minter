import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { useSelector, useDispatch } from '../../reducer';
import { ipfsUriToGatewayUrl } from '../../lib/util/ipfs';
import { readFileAsDataUrlAction } from '../../reducer/async/actions';

export default function FileUpload() {
  const state = useSelector(s => s.createNft);
  const network = useSelector(s => s.system.config.network);
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (files: File[]) => {
      dispatch(readFileAsDataUrlAction({ ns: 'createNft', file: files[0] }));
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 30 * 1024 * 1024,
    accept: 'image/*'
  });

  return (
    <Flex align="center" flexDir="column" width="100%" flex="1" pt={28}>
      <Heading size="lg" paddingBottom={8} textAlign="center">
        Upload your file
      </Heading>
      <Text
        fontSize="xs"
        color="brand.blue"
        fontFamily="mono"
        textAlign="center"
        pb={4}
      >
        JPG, PNG, GIF, WEBP, SVG. Max size 30mb
      </Text>
      <Flex
        borderStyle="dashed"
        borderWidth="2px"
        borderColor="brand.lightBlue"
        borderRadius="3px"
        width="100%"
        justify="center"
        align="center"
        {...getRootProps()}
      >
        <Box as="input" {...getInputProps()} />
        {state.selectedFile?.objectUrl ? (
          <Image
            p={4}
            maxWidth="400px"
            maxHeight="400px"
            src={ipfsUriToGatewayUrl(network, state.selectedFile.objectUrl)}
          />
        ) : (
          <Flex
            borderColor="white"
            borderWidth="1px"
            flexDir="column"
            align="center"
            py={10}
            bg="brand.brightGray"
            flex="1"
          >
            <Text fontSize={20}>Click or drag file to this area to upload</Text>
            <Text fontSize={18} color="brand.gray">
              Support for single file
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}