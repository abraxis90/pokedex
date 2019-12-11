interface FetchResult {
  name: string;
  url: string;
}

export interface BulkFetchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: FetchResult[];
}

