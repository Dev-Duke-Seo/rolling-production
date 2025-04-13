import { ColorchipColors } from '@constants/COLORS';

export type UrlString = `https://${string}` | `http://${string}`;

// 순환 참조를 방지하기 위한 최소 타입 정의
export type MessagePreview = {
  id: number;
  sender: string;
  content: string;
  createdAt: string;
  profileImageURL: UrlString | null;
  relationship?: string;
};

export type ReactionPreview = {
  id: number;
  emoji: string;
  count: number;
};

export interface Recipient {
  id: number;
  name: string;
  backgroundColor: ColorchipColors | null;
  backgroundImageURL: UrlString | null;
  createdAt: Date;
  messageCount: number;
  recentMessages: MessagePreview[];
  reactionCount: number;
  topReactions: ReactionPreview[];
}
