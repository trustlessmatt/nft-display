export interface NftListings {
  results: Result[];
  paginationInfo?: PaginationInfo;
}

export interface Result {
  mintAddress: string;
  supply: number;
  title: string;
  content: string;
  primarySaleHappened: boolean;
  updateAuthority: string;
  onChainCollection: string;
  sellerFeeBasisPoints: number;
  creators: string[];
  price: number;
  escrowPubkey: string;
  owner: string;
  v2: any;
  id: string;
  tokenDelegateValid: boolean;
  isFrozen: boolean;
  tokenStandard: number;
  img: string;
  attributes: Attribute[];
  properties?: Properties;
  propertyCategory: string;
  externalURL: string;
  collectionName: string;
  collectionTitle: string;
  isTradeable: boolean;
  rarity?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Properties {
  files: File[];
  category: string;
  creators: PropertiesCreator[];
}

export interface PropertiesCreator {
  share: number;
  address: string;
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface V2 {
  auctionHouseKey: string;
  sellerReferral: string[];
  expiry: number;
}

export interface PaginationInfo {
  currentPageNumber: number;
  currentPageSize: number;
  hasNextPage: boolean;
  totalPageNumber: number;
}
