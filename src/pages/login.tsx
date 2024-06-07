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
} from '@chakra-ui/react';
import {
  signIn,
  getProviders,
  ClientSafeProvider,
  useSession,
} from 'next-auth/react';
import { useState, useEffect } from 'react';

import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react';

const Login = () => {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const session = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (session.status === 'unauthenticated') {
    return (
      <Container
        paddingStart={8}
        paddingEnd={8}
        paddingTop={24}
        paddingBottom={24}
        width={'100%'}
        marginInline={'auto'}
        maxW={'container.md'}
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
                  ></Input>
                </FormControl>
                <Stack
                  direction="row"
                  align="center"
                  justifyContent={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Button type="button">Forgot password</Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    );
  }
};

export default Login;
