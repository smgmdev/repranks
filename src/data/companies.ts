export type Company = {
  rank: number;
  slug: string;
  name: string;
  industry: string;
  country: string;
  reputationScore: number;
  newsMediaScore: number;
  socialScore: number;
  consumerReviewScore: number;
  investigationScore: number;
  employeeSentiment: number;
  trend: "up" | "down" | "stable";
  tag: "excellent" | "good" | "average" | "poor" | "terrible";
};

function getTag(score: number): Company["tag"] {
  if (score >= 85) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "average";
  if (score >= 30) return "poor";
  return "terrible";
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Score = News(0.30) + Social(0.25) + Reviews(0.20) + Investigations(0.15) + Employee(0.10)
function calcScore(n: number, s: number, r: number, i: number, e: number) {
  return Math.round(n * 0.3 + s * 0.25 + r * 0.2 + i * 0.15 + e * 0.1);
}

const raw: Omit<Company, "rank" | "tag" | "slug" | "reputationScore">[] = [
  { name: "Costco Wholesale", industry: "Retail", country: "United States", newsMediaScore: 94, socialScore: 96, consumerReviewScore: 97, investigationScore: 95, employeeSentiment: 93, trend: "up" },
  { name: "Patagonia", industry: "Apparel", country: "United States", newsMediaScore: 97, socialScore: 95, consumerReviewScore: 93, investigationScore: 98, employeeSentiment: 92, trend: "up" },
  { name: "Nintendo", industry: "Technology", country: "Japan", newsMediaScore: 90, socialScore: 95, consumerReviewScore: 92, investigationScore: 93, employeeSentiment: 88, trend: "stable" },
  { name: "LEGO Group", industry: "Consumer Goods", country: "Denmark", newsMediaScore: 93, socialScore: 94, consumerReviewScore: 95, investigationScore: 90, employeeSentiment: 90, trend: "up" },
  { name: "Microsoft", industry: "Technology", country: "United States", newsMediaScore: 88, socialScore: 85, consumerReviewScore: 86, investigationScore: 82, employeeSentiment: 90, trend: "up" },
  { name: "Apple", industry: "Technology", country: "United States", newsMediaScore: 87, socialScore: 88, consumerReviewScore: 90, investigationScore: 78, employeeSentiment: 85, trend: "stable" },
  { name: "Toyota Motor", industry: "Automotive", country: "Japan", newsMediaScore: 88, socialScore: 84, consumerReviewScore: 89, investigationScore: 90, employeeSentiment: 86, trend: "stable" },
  { name: "Samsung Electronics", industry: "Technology", country: "South Korea", newsMediaScore: 86, socialScore: 87, consumerReviewScore: 85, investigationScore: 80, employeeSentiment: 82, trend: "up" },
  { name: "Johnson & Johnson", industry: "Healthcare", country: "United States", newsMediaScore: 78, socialScore: 75, consumerReviewScore: 82, investigationScore: 65, employeeSentiment: 85, trend: "down" },
  { name: "IKEA", industry: "Retail", country: "Sweden", newsMediaScore: 85, socialScore: 88, consumerReviewScore: 87, investigationScore: 84, employeeSentiment: 80, trend: "up" },
  { name: "Google (Alphabet)", industry: "Technology", country: "United States", newsMediaScore: 78, socialScore: 72, consumerReviewScore: 83, investigationScore: 68, employeeSentiment: 88, trend: "down" },
  { name: "BMW Group", industry: "Automotive", country: "Germany", newsMediaScore: 84, socialScore: 82, consumerReviewScore: 85, investigationScore: 80, employeeSentiment: 83, trend: "stable" },
  { name: "Novo Nordisk", industry: "Healthcare", country: "Denmark", newsMediaScore: 86, socialScore: 78, consumerReviewScore: 80, investigationScore: 88, employeeSentiment: 87, trend: "up" },
  { name: "Trader Joe's", industry: "Retail", country: "United States", newsMediaScore: 90, socialScore: 94, consumerReviewScore: 95, investigationScore: 88, employeeSentiment: 90, trend: "up" },
  { name: "Salesforce", industry: "Technology", country: "United States", newsMediaScore: 80, socialScore: 78, consumerReviewScore: 79, investigationScore: 82, employeeSentiment: 85, trend: "stable" },
  { name: "Adobe", industry: "Technology", country: "United States", newsMediaScore: 79, socialScore: 76, consumerReviewScore: 78, investigationScore: 83, employeeSentiment: 86, trend: "stable" },
  { name: "Unilever", industry: "Consumer Goods", country: "United Kingdom", newsMediaScore: 82, socialScore: 77, consumerReviewScore: 78, investigationScore: 80, employeeSentiment: 79, trend: "stable" },
  { name: "Netflix", industry: "Entertainment", country: "United States", newsMediaScore: 75, socialScore: 80, consumerReviewScore: 82, investigationScore: 72, employeeSentiment: 78, trend: "down" },
  { name: "Spotify", industry: "Entertainment", country: "Sweden", newsMediaScore: 76, socialScore: 82, consumerReviewScore: 80, investigationScore: 74, employeeSentiment: 77, trend: "stable" },
  { name: "Tesla", industry: "Automotive", country: "United States", newsMediaScore: 55, socialScore: 68, consumerReviewScore: 75, investigationScore: 52, employeeSentiment: 58, trend: "down" },
  { name: "Amazon", industry: "Technology", country: "United States", newsMediaScore: 58, socialScore: 55, consumerReviewScore: 80, investigationScore: 45, employeeSentiment: 50, trend: "down" },
  { name: "Walmart", industry: "Retail", country: "United States", newsMediaScore: 55, socialScore: 52, consumerReviewScore: 65, investigationScore: 58, employeeSentiment: 48, trend: "stable" },
  { name: "Nestlé", industry: "Consumer Goods", country: "Switzerland", newsMediaScore: 42, socialScore: 40, consumerReviewScore: 55, investigationScore: 35, employeeSentiment: 60, trend: "down" },
  { name: "JPMorgan Chase", industry: "Financial Services", country: "United States", newsMediaScore: 72, socialScore: 65, consumerReviewScore: 70, investigationScore: 60, employeeSentiment: 78, trend: "stable" },
  { name: "Goldman Sachs", industry: "Financial Services", country: "United States", newsMediaScore: 62, socialScore: 55, consumerReviewScore: 58, investigationScore: 52, employeeSentiment: 75, trend: "stable" },
  { name: "ExxonMobil", industry: "Energy", country: "United States", newsMediaScore: 30, socialScore: 28, consumerReviewScore: 45, investigationScore: 22, employeeSentiment: 62, trend: "down" },
  { name: "Meta Platforms", industry: "Technology", country: "United States", newsMediaScore: 28, socialScore: 25, consumerReviewScore: 42, investigationScore: 20, employeeSentiment: 72, trend: "down" },
  { name: "TikTok (ByteDance)", industry: "Technology", country: "China", newsMediaScore: 25, socialScore: 45, consumerReviewScore: 50, investigationScore: 15, employeeSentiment: 65, trend: "down" },
  { name: "Purdue Pharma", industry: "Healthcare", country: "United States", newsMediaScore: 5, socialScore: 8, consumerReviewScore: 10, investigationScore: 3, employeeSentiment: 25, trend: "down" },
  { name: "Philip Morris", industry: "Tobacco", country: "United States", newsMediaScore: 15, socialScore: 18, consumerReviewScore: 25, investigationScore: 10, employeeSentiment: 55, trend: "down" },
  { name: "Monsanto (Bayer)", industry: "Agriculture", country: "Germany", newsMediaScore: 12, socialScore: 15, consumerReviewScore: 20, investigationScore: 8, employeeSentiment: 50, trend: "down" },
  { name: "Wells Fargo", industry: "Financial Services", country: "United States", newsMediaScore: 32, socialScore: 30, consumerReviewScore: 40, investigationScore: 25, employeeSentiment: 55, trend: "down" },
  { name: "Uber Technologies", industry: "Technology", country: "United States", newsMediaScore: 48, socialScore: 55, consumerReviewScore: 60, investigationScore: 40, employeeSentiment: 52, trend: "up" },
  { name: "Airbnb", industry: "Technology", country: "United States", newsMediaScore: 72, socialScore: 76, consumerReviewScore: 74, investigationScore: 68, employeeSentiment: 78, trend: "stable" },
  { name: "Visa", industry: "Financial Services", country: "United States", newsMediaScore: 82, socialScore: 78, consumerReviewScore: 80, investigationScore: 80, employeeSentiment: 85, trend: "stable" },
  { name: "Mastercard", industry: "Financial Services", country: "United States", newsMediaScore: 80, socialScore: 78, consumerReviewScore: 79, investigationScore: 78, employeeSentiment: 84, trend: "stable" },
  { name: "Nike", industry: "Apparel", country: "United States", newsMediaScore: 65, socialScore: 72, consumerReviewScore: 78, investigationScore: 55, employeeSentiment: 68, trend: "down" },
  { name: "Starbucks", industry: "Food & Beverage", country: "United States", newsMediaScore: 58, socialScore: 60, consumerReviewScore: 72, investigationScore: 52, employeeSentiment: 55, trend: "down" },
  { name: "The Walt Disney Company", industry: "Entertainment", country: "United States", newsMediaScore: 72, socialScore: 75, consumerReviewScore: 78, investigationScore: 68, employeeSentiment: 72, trend: "down" },
  { name: "Sony Group", industry: "Technology", country: "Japan", newsMediaScore: 82, socialScore: 84, consumerReviewScore: 83, investigationScore: 80, employeeSentiment: 80, trend: "stable" },
  { name: "Siemens", industry: "Industrial", country: "Germany", newsMediaScore: 82, socialScore: 75, consumerReviewScore: 78, investigationScore: 82, employeeSentiment: 80, trend: "stable" },
  { name: "NVIDIA", industry: "Technology", country: "United States", newsMediaScore: 90, socialScore: 92, consumerReviewScore: 88, investigationScore: 82, employeeSentiment: 90, trend: "up" },
  { name: "Berkshire Hathaway", industry: "Financial Services", country: "United States", newsMediaScore: 85, socialScore: 78, consumerReviewScore: 80, investigationScore: 84, employeeSentiment: 80, trend: "stable" },
  { name: "3M Company", industry: "Industrial", country: "United States", newsMediaScore: 48, socialScore: 50, consumerReviewScore: 62, investigationScore: 38, employeeSentiment: 60, trend: "down" },
  { name: "Boeing", industry: "Aerospace", country: "United States", newsMediaScore: 20, socialScore: 25, consumerReviewScore: 35, investigationScore: 15, employeeSentiment: 58, trend: "down" },
  { name: "Volkswagen Group", industry: "Automotive", country: "Germany", newsMediaScore: 48, socialScore: 50, consumerReviewScore: 60, investigationScore: 38, employeeSentiment: 62, trend: "down" },
  { name: "HSBC Holdings", industry: "Financial Services", country: "United Kingdom", newsMediaScore: 55, socialScore: 52, consumerReviewScore: 58, investigationScore: 50, employeeSentiment: 62, trend: "stable" },
  { name: "L'Oréal", industry: "Consumer Goods", country: "France", newsMediaScore: 76, socialScore: 78, consumerReviewScore: 80, investigationScore: 72, employeeSentiment: 76, trend: "stable" },
  { name: "Cisco Systems", industry: "Technology", country: "United States", newsMediaScore: 78, socialScore: 76, consumerReviewScore: 78, investigationScore: 80, employeeSentiment: 82, trend: "stable" },
  { name: "Alibaba Group", industry: "Technology", country: "China", newsMediaScore: 38, socialScore: 42, consumerReviewScore: 55, investigationScore: 30, employeeSentiment: 58, trend: "down" },
  { name: "Intel Corporation", industry: "Technology", country: "United States", newsMediaScore: 62, socialScore: 58, consumerReviewScore: 68, investigationScore: 65, employeeSentiment: 70, trend: "down" },
  { name: "Oracle Corporation", industry: "Technology", country: "United States", newsMediaScore: 70, socialScore: 65, consumerReviewScore: 67, investigationScore: 72, employeeSentiment: 68, trend: "stable" },
  { name: "SAP SE", industry: "Technology", country: "Germany", newsMediaScore: 75, socialScore: 70, consumerReviewScore: 72, investigationScore: 78, employeeSentiment: 76, trend: "stable" },
  { name: "IBM", industry: "Technology", country: "United States", newsMediaScore: 72, socialScore: 65, consumerReviewScore: 68, investigationScore: 75, employeeSentiment: 72, trend: "stable" },
  { name: "Procter & Gamble", industry: "Consumer Goods", country: "United States", newsMediaScore: 80, socialScore: 76, consumerReviewScore: 82, investigationScore: 78, employeeSentiment: 77, trend: "stable" },
  { name: "PepsiCo", industry: "Food & Beverage", country: "United States", newsMediaScore: 72, socialScore: 74, consumerReviewScore: 76, investigationScore: 68, employeeSentiment: 72, trend: "stable" },
  { name: "Coca-Cola Company", industry: "Food & Beverage", country: "United States", newsMediaScore: 75, socialScore: 78, consumerReviewScore: 80, investigationScore: 65, employeeSentiment: 74, trend: "stable" },
  { name: "McDonald's", industry: "Food & Beverage", country: "United States", newsMediaScore: 60, socialScore: 65, consumerReviewScore: 70, investigationScore: 55, employeeSentiment: 50, trend: "down" },
  { name: "Pfizer", industry: "Healthcare", country: "United States", newsMediaScore: 65, socialScore: 55, consumerReviewScore: 62, investigationScore: 60, employeeSentiment: 72, trend: "down" },
  { name: "AstraZeneca", industry: "Healthcare", country: "United Kingdom", newsMediaScore: 70, socialScore: 62, consumerReviewScore: 65, investigationScore: 68, employeeSentiment: 75, trend: "stable" },
  { name: "Roche Holding", industry: "Healthcare", country: "Switzerland", newsMediaScore: 78, socialScore: 70, consumerReviewScore: 72, investigationScore: 80, employeeSentiment: 78, trend: "up" },
  { name: "LVMH", industry: "Consumer Goods", country: "France", newsMediaScore: 82, socialScore: 85, consumerReviewScore: 78, investigationScore: 75, employeeSentiment: 74, trend: "up" },
  { name: "Hermès", industry: "Consumer Goods", country: "France", newsMediaScore: 85, socialScore: 88, consumerReviewScore: 82, investigationScore: 86, employeeSentiment: 80, trend: "up" },
  { name: "Adidas", industry: "Apparel", country: "Germany", newsMediaScore: 62, socialScore: 68, consumerReviewScore: 72, investigationScore: 58, employeeSentiment: 65, trend: "down" },
  { name: "Tencent Holdings", industry: "Technology", country: "China", newsMediaScore: 40, socialScore: 48, consumerReviewScore: 58, investigationScore: 28, employeeSentiment: 65, trend: "down" },
  { name: "Baidu", industry: "Technology", country: "China", newsMediaScore: 35, socialScore: 38, consumerReviewScore: 48, investigationScore: 25, employeeSentiment: 58, trend: "down" },
  { name: "Shell plc", industry: "Energy", country: "United Kingdom", newsMediaScore: 35, socialScore: 30, consumerReviewScore: 48, investigationScore: 25, employeeSentiment: 65, trend: "down" },
  { name: "Chevron Corporation", industry: "Energy", country: "United States", newsMediaScore: 32, socialScore: 28, consumerReviewScore: 45, investigationScore: 22, employeeSentiment: 65, trend: "down" },
  { name: "BP plc", industry: "Energy", country: "United Kingdom", newsMediaScore: 30, socialScore: 25, consumerReviewScore: 42, investigationScore: 20, employeeSentiment: 60, trend: "down" },
  { name: "Lockheed Martin", industry: "Aerospace", country: "United States", newsMediaScore: 58, socialScore: 45, consumerReviewScore: 55, investigationScore: 50, employeeSentiment: 78, trend: "stable" },
  { name: "Raytheon Technologies", industry: "Aerospace", country: "United States", newsMediaScore: 52, socialScore: 42, consumerReviewScore: 50, investigationScore: 45, employeeSentiment: 72, trend: "stable" },
  { name: "General Motors", industry: "Automotive", country: "United States", newsMediaScore: 62, socialScore: 58, consumerReviewScore: 65, investigationScore: 55, employeeSentiment: 64, trend: "stable" },
  { name: "Ford Motor Company", industry: "Automotive", country: "United States", newsMediaScore: 60, socialScore: 62, consumerReviewScore: 68, investigationScore: 55, employeeSentiment: 62, trend: "stable" },
  { name: "Hyundai Motor", industry: "Automotive", country: "South Korea", newsMediaScore: 72, socialScore: 74, consumerReviewScore: 76, investigationScore: 70, employeeSentiment: 68, trend: "up" },
  { name: "PayPal Holdings", industry: "Financial Services", country: "United States", newsMediaScore: 60, socialScore: 55, consumerReviewScore: 62, investigationScore: 58, employeeSentiment: 65, trend: "down" },
  { name: "Square (Block)", industry: "Financial Services", country: "United States", newsMediaScore: 65, socialScore: 68, consumerReviewScore: 70, investigationScore: 62, employeeSentiment: 72, trend: "stable" },
  { name: "Shopify", industry: "Technology", country: "Canada", newsMediaScore: 78, socialScore: 80, consumerReviewScore: 75, investigationScore: 82, employeeSentiment: 78, trend: "up" },
  { name: "Zoom Video", industry: "Technology", country: "United States", newsMediaScore: 65, socialScore: 62, consumerReviewScore: 72, investigationScore: 70, employeeSentiment: 74, trend: "down" },
  { name: "Snap Inc.", industry: "Technology", country: "United States", newsMediaScore: 50, socialScore: 58, consumerReviewScore: 55, investigationScore: 48, employeeSentiment: 62, trend: "down" },
  { name: "Pinterest", industry: "Technology", country: "United States", newsMediaScore: 68, socialScore: 72, consumerReviewScore: 70, investigationScore: 75, employeeSentiment: 76, trend: "stable" },
  { name: "Dyson", industry: "Consumer Goods", country: "United Kingdom", newsMediaScore: 80, socialScore: 82, consumerReviewScore: 85, investigationScore: 78, employeeSentiment: 72, trend: "stable" },
  { name: "Rolex", industry: "Consumer Goods", country: "Switzerland", newsMediaScore: 88, socialScore: 90, consumerReviewScore: 92, investigationScore: 90, employeeSentiment: 82, trend: "up" },
  { name: "TSMC", industry: "Technology", country: "Taiwan", newsMediaScore: 82, socialScore: 75, consumerReviewScore: 78, investigationScore: 85, employeeSentiment: 76, trend: "up" },
  { name: "Deutsche Bank", industry: "Financial Services", country: "Germany", newsMediaScore: 42, socialScore: 38, consumerReviewScore: 45, investigationScore: 30, employeeSentiment: 55, trend: "down" },
  { name: "Credit Suisse (UBS)", industry: "Financial Services", country: "Switzerland", newsMediaScore: 28, socialScore: 25, consumerReviewScore: 35, investigationScore: 18, employeeSentiment: 45, trend: "down" },
  { name: "Robinhood", industry: "Financial Services", country: "United States", newsMediaScore: 35, socialScore: 40, consumerReviewScore: 45, investigationScore: 28, employeeSentiment: 55, trend: "down" },
  { name: "Palantir Technologies", industry: "Technology", country: "United States", newsMediaScore: 55, socialScore: 52, consumerReviewScore: 58, investigationScore: 45, employeeSentiment: 70, trend: "stable" },
  { name: "Rivian Automotive", industry: "Automotive", country: "United States", newsMediaScore: 68, socialScore: 72, consumerReviewScore: 65, investigationScore: 72, employeeSentiment: 70, trend: "up" },
  { name: "BYD Company", industry: "Automotive", country: "China", newsMediaScore: 65, socialScore: 62, consumerReviewScore: 68, investigationScore: 55, employeeSentiment: 60, trend: "up" },
  { name: "Whole Foods (Amazon)", industry: "Retail", country: "United States", newsMediaScore: 62, socialScore: 68, consumerReviewScore: 75, investigationScore: 58, employeeSentiment: 55, trend: "stable" },
  { name: "Target Corporation", industry: "Retail", country: "United States", newsMediaScore: 65, socialScore: 62, consumerReviewScore: 72, investigationScore: 60, employeeSentiment: 58, trend: "down" },
  { name: "Home Depot", industry: "Retail", country: "United States", newsMediaScore: 72, socialScore: 70, consumerReviewScore: 78, investigationScore: 68, employeeSentiment: 65, trend: "stable" },
  { name: "Zara (Inditex)", industry: "Apparel", country: "Spain", newsMediaScore: 60, socialScore: 72, consumerReviewScore: 70, investigationScore: 48, employeeSentiment: 55, trend: "stable" },
  { name: "H&M Group", industry: "Apparel", country: "Sweden", newsMediaScore: 55, socialScore: 58, consumerReviewScore: 62, investigationScore: 45, employeeSentiment: 52, trend: "down" },
  { name: "Moderna", industry: "Healthcare", country: "United States", newsMediaScore: 62, socialScore: 50, consumerReviewScore: 58, investigationScore: 65, employeeSentiment: 75, trend: "down" },
  { name: "Spotify (Daniel Ek)", industry: "Entertainment", country: "Sweden", newsMediaScore: 70, socialScore: 75, consumerReviewScore: 78, investigationScore: 72, employeeSentiment: 74, trend: "stable" },
  { name: "Epic Games", industry: "Entertainment", country: "United States", newsMediaScore: 72, socialScore: 78, consumerReviewScore: 75, investigationScore: 68, employeeSentiment: 72, trend: "up" },
  { name: "Valve Corporation", industry: "Entertainment", country: "United States", newsMediaScore: 80, socialScore: 90, consumerReviewScore: 88, investigationScore: 85, employeeSentiment: 88, trend: "up" },
  { name: "SpaceX", industry: "Aerospace", country: "United States", newsMediaScore: 75, socialScore: 82, consumerReviewScore: 70, investigationScore: 60, employeeSentiment: 58, trend: "up" },
  { name: "Wegmans Food Markets", industry: "Retail", country: "United States", newsMediaScore: 90, socialScore: 92, consumerReviewScore: 95, investigationScore: 88, employeeSentiment: 94, trend: "up" },
  { name: "REI Co-op", industry: "Retail", country: "United States", newsMediaScore: 88, socialScore: 90, consumerReviewScore: 92, investigationScore: 90, employeeSentiment: 88, trend: "up" },
  { name: "Chick-fil-A", industry: "Food & Beverage", country: "United States", newsMediaScore: 78, socialScore: 82, consumerReviewScore: 92, investigationScore: 72, employeeSentiment: 85, trend: "stable" },
  { name: "In-N-Out Burger", industry: "Food & Beverage", country: "United States", newsMediaScore: 85, socialScore: 92, consumerReviewScore: 95, investigationScore: 88, employeeSentiment: 90, trend: "up" },
  { name: "Aldi", industry: "Retail", country: "Germany", newsMediaScore: 82, socialScore: 85, consumerReviewScore: 88, investigationScore: 80, employeeSentiment: 78, trend: "up" },
  { name: "John Deere", industry: "Industrial", country: "United States", newsMediaScore: 78, socialScore: 75, consumerReviewScore: 82, investigationScore: 80, employeeSentiment: 76, trend: "stable" },
  { name: "Bosch Group", industry: "Industrial", country: "Germany", newsMediaScore: 82, socialScore: 78, consumerReviewScore: 84, investigationScore: 85, employeeSentiment: 80, trend: "stable" },
  { name: "Michelin", industry: "Automotive", country: "France", newsMediaScore: 84, socialScore: 80, consumerReviewScore: 88, investigationScore: 86, employeeSentiment: 82, trend: "stable" },
  { name: "Volvo Group", industry: "Automotive", country: "Sweden", newsMediaScore: 86, socialScore: 82, consumerReviewScore: 88, investigationScore: 88, employeeSentiment: 84, trend: "up" },
  { name: "Swiss Re", industry: "Financial Services", country: "Switzerland", newsMediaScore: 80, socialScore: 72, consumerReviewScore: 76, investigationScore: 85, employeeSentiment: 82, trend: "stable" },
  { name: "Zurich Insurance", industry: "Financial Services", country: "Switzerland", newsMediaScore: 78, socialScore: 74, consumerReviewScore: 78, investigationScore: 82, employeeSentiment: 80, trend: "stable" },
  { name: "USAA", industry: "Financial Services", country: "United States", newsMediaScore: 88, socialScore: 90, consumerReviewScore: 94, investigationScore: 90, employeeSentiment: 88, trend: "up" },
  { name: "Vanguard Group", industry: "Financial Services", country: "United States", newsMediaScore: 85, socialScore: 82, consumerReviewScore: 88, investigationScore: 88, employeeSentiment: 84, trend: "stable" },
  { name: "ASUS", industry: "Technology", country: "Taiwan", newsMediaScore: 78, socialScore: 80, consumerReviewScore: 82, investigationScore: 78, employeeSentiment: 74, trend: "stable" },
  { name: "Bandai Namco", industry: "Entertainment", country: "Japan", newsMediaScore: 80, socialScore: 84, consumerReviewScore: 82, investigationScore: 82, employeeSentiment: 78, trend: "stable" },
  { name: "Studio Ghibli", industry: "Entertainment", country: "Japan", newsMediaScore: 92, socialScore: 95, consumerReviewScore: 96, investigationScore: 94, employeeSentiment: 85, trend: "up" },
  { name: "Patek Philippe", industry: "Consumer Goods", country: "Switzerland", newsMediaScore: 88, socialScore: 85, consumerReviewScore: 92, investigationScore: 90, employeeSentiment: 84, trend: "stable" },
  { name: "Lush Cosmetics", industry: "Consumer Goods", country: "United Kingdom", newsMediaScore: 82, socialScore: 85, consumerReviewScore: 84, investigationScore: 86, employeeSentiment: 78, trend: "up" },
  { name: "Ben & Jerry's", industry: "Food & Beverage", country: "United States", newsMediaScore: 78, socialScore: 82, consumerReviewScore: 88, investigationScore: 80, employeeSentiment: 80, trend: "stable" },
  { name: "Subaru", industry: "Automotive", country: "Japan", newsMediaScore: 82, socialScore: 84, consumerReviewScore: 88, investigationScore: 84, employeeSentiment: 78, trend: "stable" },
  { name: "Honda Motor", industry: "Automotive", country: "Japan", newsMediaScore: 84, socialScore: 82, consumerReviewScore: 86, investigationScore: 86, employeeSentiment: 80, trend: "stable" },
  { name: "Daikin Industries", industry: "Industrial", country: "Japan", newsMediaScore: 80, socialScore: 76, consumerReviewScore: 82, investigationScore: 84, employeeSentiment: 80, trend: "stable" },
  { name: "Hilton Worldwide", industry: "Hospitality", country: "United States", newsMediaScore: 80, socialScore: 78, consumerReviewScore: 82, investigationScore: 78, employeeSentiment: 82, trend: "stable" },
  { name: "Marriott International", industry: "Hospitality", country: "United States", newsMediaScore: 78, socialScore: 76, consumerReviewScore: 80, investigationScore: 75, employeeSentiment: 78, trend: "stable" },
  { name: "Singapore Airlines", industry: "Aviation", country: "Singapore", newsMediaScore: 90, socialScore: 92, consumerReviewScore: 94, investigationScore: 90, employeeSentiment: 86, trend: "up" },
  { name: "Emirates", industry: "Aviation", country: "UAE", newsMediaScore: 86, socialScore: 88, consumerReviewScore: 90, investigationScore: 82, employeeSentiment: 78, trend: "stable" },
  { name: "Bose Corporation", industry: "Technology", country: "United States", newsMediaScore: 82, socialScore: 85, consumerReviewScore: 88, investigationScore: 84, employeeSentiment: 80, trend: "stable" },
  { name: "Sonos", industry: "Technology", country: "United States", newsMediaScore: 76, socialScore: 78, consumerReviewScore: 80, investigationScore: 78, employeeSentiment: 76, trend: "stable" },
  { name: "Canva", industry: "Technology", country: "Australia", newsMediaScore: 85, socialScore: 88, consumerReviewScore: 90, investigationScore: 86, employeeSentiment: 90, trend: "up" },
  { name: "Notion Labs", industry: "Technology", country: "United States", newsMediaScore: 82, socialScore: 88, consumerReviewScore: 86, investigationScore: 85, employeeSentiment: 88, trend: "up" },
  { name: "Figma", industry: "Technology", country: "United States", newsMediaScore: 84, socialScore: 90, consumerReviewScore: 88, investigationScore: 86, employeeSentiment: 90, trend: "up" },
  { name: "Stripe", industry: "Financial Services", country: "United States", newsMediaScore: 86, socialScore: 88, consumerReviewScore: 84, investigationScore: 88, employeeSentiment: 88, trend: "up" },
  { name: "Cloudflare", industry: "Technology", country: "United States", newsMediaScore: 82, socialScore: 85, consumerReviewScore: 80, investigationScore: 82, employeeSentiment: 84, trend: "up" },
  { name: "Atlassian", industry: "Technology", country: "Australia", newsMediaScore: 80, socialScore: 82, consumerReviewScore: 78, investigationScore: 84, employeeSentiment: 86, trend: "stable" },
  { name: "HubSpot", industry: "Technology", country: "United States", newsMediaScore: 82, socialScore: 84, consumerReviewScore: 82, investigationScore: 84, employeeSentiment: 88, trend: "up" },
  { name: "Datadog", industry: "Technology", country: "United States", newsMediaScore: 80, socialScore: 82, consumerReviewScore: 78, investigationScore: 82, employeeSentiment: 84, trend: "stable" },
  { name: "GitLab", industry: "Technology", country: "United States", newsMediaScore: 78, socialScore: 82, consumerReviewScore: 80, investigationScore: 82, employeeSentiment: 86, trend: "up" },
  { name: "Warby Parker", industry: "Consumer Goods", country: "United States", newsMediaScore: 80, socialScore: 84, consumerReviewScore: 86, investigationScore: 82, employeeSentiment: 80, trend: "stable" },
  { name: "Allbirds", industry: "Apparel", country: "United States", newsMediaScore: 78, socialScore: 80, consumerReviewScore: 82, investigationScore: 80, employeeSentiment: 78, trend: "stable" },
  { name: "Rivian Automotive", industry: "Automotive", country: "United States", newsMediaScore: 78, socialScore: 80, consumerReviewScore: 76, investigationScore: 78, employeeSentiment: 76, trend: "up" },
  { name: "Lucid Motors", industry: "Automotive", country: "United States", newsMediaScore: 76, socialScore: 78, consumerReviewScore: 80, investigationScore: 76, employeeSentiment: 74, trend: "up" },
  { name: "Brompton Bicycle", industry: "Consumer Goods", country: "United Kingdom", newsMediaScore: 82, socialScore: 86, consumerReviewScore: 90, investigationScore: 88, employeeSentiment: 82, trend: "up" },
  { name: "Fjällräven", industry: "Apparel", country: "Sweden", newsMediaScore: 80, socialScore: 84, consumerReviewScore: 88, investigationScore: 86, employeeSentiment: 80, trend: "stable" },
  { name: "Dr. Bronner's", industry: "Consumer Goods", country: "United States", newsMediaScore: 85, socialScore: 88, consumerReviewScore: 92, investigationScore: 90, employeeSentiment: 88, trend: "up" },
  { name: "Eileen Fisher", industry: "Apparel", country: "United States", newsMediaScore: 80, socialScore: 78, consumerReviewScore: 84, investigationScore: 86, employeeSentiment: 82, trend: "stable" },
  { name: "W.L. Gore & Associates", industry: "Industrial", country: "United States", newsMediaScore: 82, socialScore: 78, consumerReviewScore: 84, investigationScore: 86, employeeSentiment: 90, trend: "stable" },
  { name: "SAS Institute", industry: "Technology", country: "United States", newsMediaScore: 80, socialScore: 76, consumerReviewScore: 82, investigationScore: 84, employeeSentiment: 90, trend: "stable" },
  { name: "Mayo Clinic", industry: "Healthcare", country: "United States", newsMediaScore: 92, socialScore: 90, consumerReviewScore: 94, investigationScore: 92, employeeSentiment: 88, trend: "up" },
  { name: "Cleveland Clinic", industry: "Healthcare", country: "United States", newsMediaScore: 88, socialScore: 86, consumerReviewScore: 90, investigationScore: 90, employeeSentiment: 86, trend: "stable" },
  { name: "Johns Hopkins Medicine", industry: "Healthcare", country: "United States", newsMediaScore: 90, socialScore: 85, consumerReviewScore: 88, investigationScore: 92, employeeSentiment: 84, trend: "stable" },
  { name: "Mercadona", industry: "Retail", country: "Spain", newsMediaScore: 82, socialScore: 84, consumerReviewScore: 88, investigationScore: 82, employeeSentiment: 80, trend: "up" },
  { name: "Zeiss Group", industry: "Technology", country: "Germany", newsMediaScore: 82, socialScore: 78, consumerReviewScore: 86, investigationScore: 84, employeeSentiment: 82, trend: "stable" },
];

export const companies: Company[] = raw
  .map((c) => ({
    ...c,
    slug: slugify(c.name),
    reputationScore: calcScore(c.newsMediaScore, c.socialScore, c.consumerReviewScore, c.investigationScore, c.employeeSentiment),
    rank: 0,
    tag: "average" as Company["tag"],
  }))
  .sort((a, b) => b.reputationScore - a.reputationScore)
  .map((c, i) => ({ ...c, rank: i + 1, tag: getTag(c.reputationScore) }));

export const industries = [...new Set(raw.map((c) => c.industry))].sort();
export const countries = [...new Set(raw.map((c) => c.country))].sort();
