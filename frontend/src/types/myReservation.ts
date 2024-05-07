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
  camInduty: string;
  price: number;
  address: string;
}
