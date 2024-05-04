export interface IMyFreeAlert {
  campsiteName: string;
  address: string;
  date: string;
  people: number;
  area: string;
  price: number;
  images: string[];
}

export interface IMyFreeAlertList {
  totalMyAlerts: number;
  alerts: IMyFreeAlert[];
}
