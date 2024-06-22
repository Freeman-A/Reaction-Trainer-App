import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { api } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    dob: '',
    password: '',
  });

  const register = api.register.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await register.mutateAsync(formData);

      if (data) {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <Stack display="flex">
        <Heading
          as={'h2'}
          fontSize={'3xl'}
          lineHeight={'2.375rem'}
          fontWeight={'bold'}
          textAlign={'center'}
        >
          Register a new account
        </Heading>
        <Text
          color={'#4A5568'}
          display={'block'}
          textAlign={'center'}
          lineHeight={'1.5'}
        >
          Your journey begins here
        </Text>

        <Stack justifySelf={'center'}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired={true}>
              <FormLabel marginTop={4}>Username</FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="username1"
                id="username"
                onChange={handleChange}
              ></Input>

              <FormLabel marginTop={4}> Email</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="examplemail@gmail.com"
                onChange={handleChange}
              ></Input>

              <FormLabel marginTop={4}> Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                placeholder="dd-mm-yyyy"
                id="dob"
                onChange={handleChange}
              ></Input>

              <FormLabel marginTop={4}> Password</FormLabel>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                onChange={handleChange}
              ></Input>
            </FormControl>
            <Stack
              flex-direction={'column'}
              display={'flex'}
              align={'center'}
              marginTop={4}
            >
              <Button
                display={'inline-flex'}
                position={'relative'}
                width={'50%'}
                bgColor={'#3182ce'}
                color={'white'}
                borderWidth={'1px'}
                whiteSpace={'nowrap'}
                fontSize={'sm'}
                overflow={'visible'}
                minWidth={'2.5rem'}
                type="submit"
                _hover={{ bg: 'blue.600' }}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Register;
