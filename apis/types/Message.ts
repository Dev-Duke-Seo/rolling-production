import { ColorchipColors } from '@constants/COLORS';

import { Relationship } from '@components/Badge';

import { UrlString } from './Recipient';

export type Font = 'Noto Sans' | 'Pretendard' | '나눔명조' | '나눔손글씨 손편지체';

export interface Message {
  id: number;
  recipientId: number;
  sender: string;
  profileImageURL: UrlString | null;
  backgroundColor: ColorchipColors | null;
  relationship: Relationship;
  content: string;
  font: Font;
  createdAt: Date;
}

export type PostMessageRequest = Omit<Message, 'id' | 'createdAt'>;
