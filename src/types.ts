export interface ICompatibilityItem {
  icon: string;
  title: string;
  url: string;
}

export interface IFeatureItem {
  description: string;
  icon: string;
  title: string;
}

export interface IFooterLink {
  description: string;
  icon: string;
  url: string;
}

export interface INavItem {
  title: string;
  url: string;
}

export interface ICryptoPair {
  crypto: string;
  fiat: string;
}

export interface ICurrencyRate {
  exchangeSlug: string;
  exchangeName: string;
  buy: number;
  sell: number;
  opening: number;
  closing: number;
  startActivityHour: string;
  endActivityHour: string;
  historical: number;
  updatedAt: string;
}
