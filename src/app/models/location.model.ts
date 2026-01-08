export interface LocationInterface {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export interface ResponseInterface {
  info: any;
  results: LocationInterface[];
}
