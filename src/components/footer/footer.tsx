import React from 'react';
import { Text, Box, Container, Stack, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { __VER__ } from '@utils/constants';
import MechaTypeLogoName from '@components/branding/mechatype-logo-name';
import { FaInstagram, FaTwitter, FaYoutube } from '@meronex/icons/fa';
import FooterSocialButton from './footer-social-button';
import Link from 'next/link';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      as="footer"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      height="18m"
      width="100%"
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <MechaTypeLogoName color={useColorModeValue('black', 'white')} />
              0.4.2
            </Box>
            <Text fontSize={'sm'}>© 2022 Conkis Studios. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <FooterSocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </FooterSocialButton>
              <FooterSocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </FooterSocialButton>
              <FooterSocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </FooterSocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'xl'} mb={2}>
              Company
            </Text>
            <Link href={'#'}>About us</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Contact us</Link>
            <Link href={'#'}>Pricing</Link>
            <Link href={'#'}>Testimonials</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'xl'} mb={2}>
              Support
            </Text>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Satus</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
