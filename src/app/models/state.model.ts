export interface StateInterface<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}
