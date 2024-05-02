export interface IDetailProps {
  titleLeft: string;
  contentLeft: string;
  titleRight: string;
  contentRight: string;
}

export interface IReservationProps {
  campName: string;
  area: string;
  date: string;
  nights: number;
  details: IDetailProps[];
  people: number;
  environment: string;
  price: string;
  address: string;
}
