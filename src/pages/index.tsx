import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BarLoader } from 'react-spinners';

const Home = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'loading') return <BarLoader color="#36d7b7" />;

  if (session.status == 'unauthenticated') {
    router.push('/login');
    console.log('Redirecting to login');
    return;
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
