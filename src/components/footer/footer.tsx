import React from 'react';
import { VStack, Text, Flex } from '@chakra-ui/react';
import { __VER__ } from '@utils/constants';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      flexDir="column"
      height="10rem"
      justifyContent="center"
      alignContent="center"
      backgroundColor="#111827"
      py="8"
      px={{ base: '4', md: '6' }}
    >
      <VStack>
        <Flex flexDir="column" width="100%" mx="auto" justifyContent="center" alignItems="center">
          <Text as="h2" color="#fff" fontSize={['xl', 'xl', 'lg', '3xl']} fontWeight={700} textAlign="center">
            Mecha Type
          </Text>
          <Text as="span" fontWeight={600}>
            0.3.3
          </Text>
        </Flex>
        <Flex flexDir="column" width="100%" mx="auto" justifyContent="center" alignItems="center">
          <Text
            as="p"
            color="#fff"
            fontSize={['md', 'lg', 'xl', 'xl']}
            wordBreak="break-word"
            fontWeight={500}
            textAlign="center"
          >
            Made with ❤️ on 🇦🇷 by
            <Text as="a" href="https://github.com/faustinozanetto" target="_blank">
              Faustino Zanetto
            </Text>
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Footer;
