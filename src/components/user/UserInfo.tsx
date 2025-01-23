'use client';

// eslint-disable-next-line
export async function getServerSideProps(context: any) {
  const headers = await context.res.headers;

  return {
    props: {
      headers, // pass headers to the client component
    },
  };
}

// eslint-disable-next-line
export default function UserInfo({ headers }: any) {
  return (
    <div>
      <h1>Headers from Server</h1>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
    </div>
  );
}
