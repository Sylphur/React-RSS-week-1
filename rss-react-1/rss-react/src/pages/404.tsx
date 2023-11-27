import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();
  console.log(router);

  return (
    <>
      <h2>404: Not Found</h2>
      <p>The page you want to accept is not exist :(</p>
    </>
  );
}
