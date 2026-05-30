export type LionPart = 'Frontend' | 'Backend' | 'Design';
export type PartFilter = '전체' | LionPart;
export type SortOrder = 'latest' | 'name';
export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Lion {
  id: string;
  name: string;
  part: LionPart;
  skills: string[];
  intro: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  motto: string;
  image: string;
  isMe: boolean;
}

export interface ViewOptions {
  part: PartFilter;
  sort: SortOrder;
  search: string;
}

export interface LionFormData {
  name: string;
  part: LionPart;
  skills: string;
  intro: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  motto: string;
}

export interface RandomUserResult {
  name: { first: string; last: string };
  location: { city: string; country: string };
  email: string;
  phone: string;
  login: { username: string };
  picture: { large: string };
}

export interface RandomUserResponse {
  results: RandomUserResult[];
}