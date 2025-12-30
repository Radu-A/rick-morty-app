export interface CharacterInterface {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
    url: string;
  };
  image: string;
}

export interface ResponseInterface {
  info: any;
  results: CharacterInterface[];
}
