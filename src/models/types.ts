
export interface Program {
  id: string;
  title: string;
  university: string;
  location: string;
  discipline: string;
  degree: string;
  duration: string;
  tuition: string;
  description: string;
  imageUrl: string;
  deadline?: string;
  language?: string;
  requirements?: string[];
  applicationFee?: string;
  scholarships?: boolean;
  ranking?: number;
}
