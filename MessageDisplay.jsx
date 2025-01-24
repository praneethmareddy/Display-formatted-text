import React from 'react';
import { Box, Button, Code, useClipboard, VStack, useColorMode, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { CopyIcon } from '@chakra-ui/icons';

const MessageDisplay = ({ message }) => {
  const { hasCopied, onCopy } = useClipboard('');
  const { colorMode } = useColorMode(); // Access light or dark mode
  
  const renderMarkdown = (text) => {
    return (
      <ReactMarkdown
        children={text}
        components={{
          code({ inline, children, ...props }) {
            return inline ? (
              <Code {...props} fontSize="sm" fontFamily="monospace" borderRadius="md">
                {children}
              </Code>
            ) : (
              <Box position="relative" mb={4} p={4} bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'} borderRadius="md">
                <Code as="pre" fontFamily="monospace" fontSize="sm" overflowX="auto" whiteSpace="pre-wrap">
                  {children}
                </Code>
                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  size="sm"
                  onClick={() => { onCopy(children); }}
                  leftIcon={<CopyIcon />}
                  variant="outline"
                  colorScheme="teal"
                >
                  {hasCopied ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
            );
          },
        }}
      />
    );
  };

  return (
    <VStack align="start" spacing={4} p={4} border="1px solid #ddd" borderRadius="md" bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}>
      {/* Display the formatted message */}
      {renderMarkdown(message)}
    </VStack>
  );
};

export default MessageDisplay;
