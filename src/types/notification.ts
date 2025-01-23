export interface Notification<T> {
  id?: string;
  isRead: boolean;
  title: string;
  body?: string;
  type?: string;
  timestamp?: string;
  created?: string;
  metadata: T;
}
