export interface TransactionNode {
  id: string;
  timestamp: string;
  signature: string;
  tags: { name: string; value: string }[];
  owner?: string;
  address?: string;
  size?: number;
};

export interface DataNodeType {
  node: {
    id: string;
    address: string;
    size: number;
    timestamp: number | Date;
    position: [number, number, number];
    tags: Array<{ name: string; value: string }>;
    signature?: string;
  };
}

export interface DataNodeInfoType {
  id: string;
  address: string;
  size: number;
  timestamp: number | Date;
  position: [number, number, number];
  tags: Array<{ name: string; value: string }>;
  signature?: string;
};