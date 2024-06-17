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

const Register = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        username: formData.get('username'),
        dob: formData.get('dob'),
        password: formData.get('password'),
      }),
    });

    const data = await res.json();

    if (!data.user) return console.error(data.error);

    signIn('credentials', {
      email: data.user.email,
      password: data.user.password,
      callbackUrl: '/login',
    });
  }

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
              ></Input>

              <FormLabel marginTop={4}> Email</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="examplemail@gmail.com"
              ></Input>

              <FormLabel marginTop={4}> Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                placeholder="dd-mm-yyyy"
                id="dob"
              ></Input>

              <FormLabel marginTop={4}> Password</FormLabel>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
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
