export interface CharacterInterface {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: object;
  image: string;
}

export interface ResponseInterface {
  info: any;
  results: CharacterInterface[];
}
