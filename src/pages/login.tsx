import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  SimpleGrid,
  Stack,
  transition,
  Checkbox,
  CheckboxGroup,
  Link,
} from '@chakra-ui/react';
import {
  signIn,
  getProviders,
  ClientSafeProvider,
  useSession,
} from 'next-auth/react';
import { useState, useEffect } from 'react';

import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react';
import { sign } from 'crypto';

const Login = () => {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const session = useSession();

  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signInWithCredentials = async () => {};

  if (session.status === 'unauthenticated') {
    return (
      <Container
        paddingStart={8}
        paddingEnd={8}
        paddingTop={24}
        paddingBottom={24}
        width={'100%'}
        marginInline={'auto'}
        maxW={'container.sm'}
        borderStyle={'solid'}
        display={'block'}
        height={'100vh'}
      >
        <Stack
          display={'flex'}
          flexDir={'column'}
          gap={8}
          borderWidth={'0px'}
          borderStyle={'solid'}
          boxSizing={'border-box'}
          overflowWrap={'break-word'}
        >
          <Stack gap={8}>
            <Stack gap={3} textAlign={'center'}>
              <Heading
                as={'h2'}
                fontSize={'3xl'}
                lineHeight={'2.375rem'}
                fontWeight={'bold'}
              >
                Login to your account
              </Heading>
              <Text
                color={'#4A5568'}
                display={'block'}
                marginStart={'1em'}
                marginEnd={'1em'}
                marginInlineStart={'0px'}
                marginInlineEnd={'0px'}
                textAlign={'center'}
                lineHeight={'1.5'}
              >
                Your journey starts here
              </Text>
            </Stack>
            <Stack display={'flex'} direction={'column'}>
              <Stack
                display={'flex'}
                direction={'column'}
                color={'#171923'}
                gap={5}
              >
                <FormControl
                  width={'100%'}
                  position={'relative'}
                  display={'block'}
                >
                  <FormLabel
                    display={'block'}
                    textAlign={'start'}
                    fontSize={'1sm'}
                    marginInlineEnd={3}
                    marginBottom={'0.375rem'}
                    fontWeight={'medium'}
                    opacity={1}
                    color={'#2D3748'}
                  >
                    Email
                  </FormLabel>
                  <Input
                    width={'100%'}
                    height={10}
                    fontSize={'md'}
                    paddingInlineStart={'0.75rem'}
                    paddingInlineEnd={'0.75rem'}
                    borderRadius={'0.5rem'}
                    min-width={'0px'}
                    outline={'transparent solid 2px'}
                    outlineOffset={'2px'}
                    position={'relative'}
                    appearance={'none'}
                    borderWidth={'1px'}
                    borderStyle={'solid'}
                    borderColor={'#CBD5E0'}
                    background={'white'}
                    padding={'10px'}
                    lineHeight={'inherit'}
                    color={'inherit'}
                    overflow={'visible'}
                    marginX={'0px'}
                    paddingBlock={'1px'}
                    placeholder="Enter your email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    _hover={{ borderColor: 'gray.400' }}
                  ></Input>
                </FormControl>
                <FormControl
                  width={'100%'}
                  position={'relative'}
                  display={'block'}
                >
                  <FormLabel
                    display={'block'}
                    textAlign={'start'}
                    fontSize={'1sm'}
                    marginInlineEnd={3}
                    fontWeight={'medium'}
                    opacity={1}
                    color={'#2D3748'}
                  >
                    Password
                  </FormLabel>
                  <Input
                    width={'100%'}
                    height={10}
                    fontSize={'md'}
                    paddingInlineStart={'0.75rem'}
                    paddingInlineEnd={'0.75rem'}
                    borderRadius={'0.5rem'}
                    min-width={'0px'}
                    outline={'transparent solid 2px'}
                    outlineOffset={'2px'}
                    position={'relative'}
                    appearance={'none'}
                    borderWidth={'1px'}
                    borderStyle={'solid'}
                    borderColor={'#CBD5E0'}
                    background={'white'}
                    padding={'10px'}
                    lineHeight={'inherit'}
                    color={'inherit'}
                    overflow={'visible'}
                    marginX={'0px'}
                    paddingBlock={'1px'}
                    placeholder="********"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    _hover={{ borderColor: 'gray.400' }}
                  ></Input>
                </FormControl>
                <Stack
                  direction="row"
                  align="center"
                  justifyContent={'space-between'}
                >
                  <Checkbox
                    _hover={{ textDecoration: 'underline' }}
                    _active={{
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link
                    userSelect={'none'}
                    color={'blue'}
                    _hover={{ textDecoration: 'underline' }}
                    _active={{
                      transform: 'scale(0.98)',
                      borderColor: '#bec3c9',
                    }}
                    _focus={{
                      boxShadow:
                        '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
                  >
                    Forgot password
                  </Link>
                </Stack>
                <Stack
                  gap={4}
                  flex-direction={'column'}
                  display={'flex'}
                  justify={'center'}
                  align={'center'}
                >
                  <Button
                    display={'inline-flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    verticalAlign={'middle'}
                    position={'relative'}
                    width={'50%'}
                    bgColor={'#3182ce'}
                    color={'white'}
                    borderWidth={'1px'}
                    whiteSpace={'nowrap'}
                    fontSize={'sm'}
                    outlineOffset={'2px'}
                    lineHeight={'1.25rem'}
                    overflow={'visible'}
                    paddingInlineStart={'1rem'}
                    paddingInlineEnd={'1rem'}
                    minWidth={'2.5rem'}
                    _hover={{ bg: 'blue.600' }}
                    onClick={signInWithCredentials}
                  >
                    Sign In
                  </Button>
                  <Button
                    display={'inline-flex'}
                    position={'relative'}
                    justifyContent={'center'}
                    verticalAlign={'middle'}
                    alignItems={'center'}
                    width={'50%'}
                    overflow={'visible'}
                    paddingInlineStart={'1rem'}
                    paddingInlineEnd={'1rem'}
                    borderWidth={'1px'}
                    borderColor={'gray.400'}
                    whiteSpace={'nowrap'}
                    outlineOffset={'2px'}
                    lineHeight={'1.25rem'}
                    fontSize={'sm'}
                    minWidth={'2.5rem'}
                    _hover={{ bg: 'gray.200' }}
                    onClick={() => {
                      signIn('google');
                    }}
                  >
                    Sign in with Google
                  </Button>
                  <Button
                    justifyContent={'center'}
                    display={'inline-flex'}
                    verticalAlign={'middle'}
                    outline={'transparent solid 2px'}
                    position={'relative'}
                    alignItems={'center'}
                    overflow={'visible'}
                    width={'50%'}
                    borderWidth={'1px'}
                    outlineOffset={'2px'}
                    lineHeight={'1.25rem'}
                    whiteSpace={'nowrap'}
                    paddingInlineStart={'1rem'}
                    paddingInlineEnd={'1rem'}
                    minWidth={'2.5rem'}
                    borderColor={'gray.400'}
                    fontSize={'sm'}
                    _hover={{ bg: 'gray.200' }}
                    onClick={() => {
                      signIn('discord');
                    }}
                  >
                    Sign in with Discord
                  </Button>
                </Stack>
                <Text
                  fontSize={'md'}
                  lineHeight={'1.25rem'}
                  color={'#4A5568'}
                  marginBlockEnd={'1em'}
                  margin={'0px'}
                >
                  Don't have an account?
                  {
                    <Link
                      href="/register"
                      color={'blue'}
                      position={'relative'}
                      outline={'transparent solid 2px;'}
                      outlineOffset={'2px'}
                      margin={'2px'}
                    >
                      Sign up
                    </Link>
                  }
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    );
  }
};

export default Login;
