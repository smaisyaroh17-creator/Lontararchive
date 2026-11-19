export type Project = {
  id: number;
  created_at: string;
  name: string;
  teknologi: unknown;
  deskripsi: string;
  url: string | null;
  komentar: string | null;
};

export type Comment = {
  id: number;
  author: string;
  content: string;
};