export interface PriceChange {
  "24h": string;
  "7d": string;
  "30d": string;
}

export interface MarketMetrics {
  volatilityScore: number;
  marketCapToVolumeRatio: number;
  priceToAthRatio: number;
  marketScore: number;
}

export interface Analysis {
  priceAction: string;
  signal: string;
  riskRating: string;
  recommendation: string;
  investmentStrategy: string;
}

export interface CryptoData {
  coin: string;
  symbol: string;
  currentPrice: string;
  marketCap: string;
  volume24h: string;
  priceChanges: PriceChange;
  marketMetrics: MarketMetrics;
  analysis: Analysis;
  timestamp: string;
}
export interface ApiResponse {
  status: string;
  source: string;
  data: CryptoData[];
}