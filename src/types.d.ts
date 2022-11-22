export interface Sub {
  id?: number;
  nick: string;
  subMonths: number;
  avatar: string;
  desc?: string;
}

export type SubsResponseFromApi = Array<{
  id?: number;
  nick: string;
  subMonths: number;
  avatar: string;
  desc?: string;
}>
