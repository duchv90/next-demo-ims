import { Flex } from 'antd';

export default function NotFound() {
  return (
    <Flex
      vertical={true}
      justify="center"
      align="center"
      style={{ height: '100vh' }}
    >
      <div className="text-3xl font-bold">404 - NOT FOUND</div>
      <p>Mockup</p>
    </Flex>
  );
}
