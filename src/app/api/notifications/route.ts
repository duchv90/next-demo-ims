import { notifications } from './mock';
import { ApiResponseJson } from '@/types/api';

export async function GET() {
  const data: ApiResponseJson<object[]> = {
    data: notifications
  }

  return Response.json(data);
}
