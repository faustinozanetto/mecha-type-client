import React from 'react';
import { VStack, Text, Flex, Heading } from '@chakra-ui/react';
import { __VER__ } from '@utils/constants';
import MechaTypeLogoName from '@components/branding/mechatype-logo-name';

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
          <MechaTypeLogoName />
          <Heading as="span" fontSize="md" color="white">
            0.3.7
          </Heading>
        </Flex>
        <Flex flexDir="column" width="100%" mx="auto" justifyContent="center" alignItems="center">
          <Text
            as="p"
            color="#dfdfdfd4"
            fontSize={['md', 'lg', 'xl', 'xl']}
            wordBreak="break-word"
            fontWeight={600}
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
