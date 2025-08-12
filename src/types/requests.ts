export interface TransactionNode {
  id: string;
  timestamp: string;
  signature: string;
  tags: { name: string; value: string }[];
  owner?: string;
  address?: string;
  size?: number;
};