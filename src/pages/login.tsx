import {
  signIn,
  getProviders,
  ClientSafeProvider,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Login = () => {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'authenticated') {
    return null; // Return null while redirecting
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        <h1>Login</h1>
        {providers &&
          Object.values(providers).map((provider) => (
            <button key={provider.id} onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          ))}
      </div>
    );
  }
};

export default Login;
