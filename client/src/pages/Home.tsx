import useAuth from '../hooks/useAuth';
import RootLayout from './RootLayout';

const Home = () => {
  const { auth } = useAuth();
  const img =
    'https://miro.medium.com/v2/resize:fit:4800/format:webp/1*UzDDbYu196vcVXmn8HnrEw.jpeg';

  return (
    <RootLayout>
      <div className="">
        <img src={img} alt="" />
      </div>
    </RootLayout>
  );
};

export default Home;
