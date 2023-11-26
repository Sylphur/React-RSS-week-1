import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();
  console.log(router);

  return (
    <>
      <p>Page is not found!</p>
    </>
  );
}
