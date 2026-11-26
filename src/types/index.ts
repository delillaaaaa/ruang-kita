export type Category = 'Kuliner' | 'Trip' | 'Aktivitas' | 'Lainnya';

export type UserRole = 'Januar' | 'Adel';

export interface JournalEntry {
  id: string;
  title: string;
  placeName: string;
  location?: string;
  date: string; // YYYY-MM-DD
  category: Category;
  photos: string[]; // URLs or base64 data URIs
  story: string;
  ratingJanuar: number; // 1 to 5
  verdictJanuar: string;
  ratingAdel: number; // 1 to 5
  verdictAdel: string;
  costEstimate?: string;
  pinned?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  placeName?: string;
  category: Category;
  budgetEstimate?: string;
  notes?: string;
  status: 'wishlist' | 'done';
  completedAt?: string;
  linkedJournalId?: string;
  createdAt: string;
}

export interface StatsData {
  totalPlacesVisited: number;
  totalBucketList: number;
  bucketListAchieved: number;
  bucketListPending: number;
  totalStories: number;
  averageRatingJanuar: number;
  averageRatingAdel: number;
}
