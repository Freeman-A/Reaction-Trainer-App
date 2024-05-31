import { signIn, useSession } from 'next-auth/react';

const Home = () => {
  const session = useSession();
  console.log(session.data);

  if (session.status === 'loading') return <p>Loading...</p>;

  if (session.status == 'unauthenticated') {
    return (
      <>
        <button
          onClick={async () => {
            await signIn('discord');
          }}
        >
          LOGIN!
        </button>
      </>
    );
  }
  return (
    <>
      <>You are logged in {session.data?.user.name}</>
    </>
  );
};

export default Home;
