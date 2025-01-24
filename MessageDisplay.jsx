import React from 'react';
import { Box, Button, Code, Text, useClipboard, VStack } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { CopyIcon } from '@chakra-ui/icons';

const MessageDisplay = ({ message }) => {
  const { hasCopied, onCopy } = useClipboard(message);

  const renderMarkdown = (text) => {
    return (
      <ReactMarkdown
        children={text}
        components={{
          // Customize how code blocks are displayed
          code({ inline, children, className, ...props }) {
            return inline ? (
              <Code {...props} fontSize="sm" fontFamily="monospace">
                {children}
              </Code>
            ) : (
              <Box position="relative" mb={4}>
                <Code as="pre" p={4} fontFamily="monospace" fontSize="sm" overflowX="auto" whiteSpace="pre-wrap">
                  {children}
                </Code>
                <Button
                  position="absolute"
                  top={2}
                  right={2}
                  size="sm"
                  onClick={onCopy}
                  leftIcon={<CopyIcon />}
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
    <VStack align="start" spacing={4} p={4} border="1px solid #ddd" borderRadius="md" bg="gray.50">
      {/* Display formatted message with Markdown parsing */}
      <Text whiteSpace="pre-wrap" fontFamily="monospace" fontSize="md">
        {renderMarkdown(message)}
      </Text>
    </VStack>
  );
};

export default MessageDisplay;
