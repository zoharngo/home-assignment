

export interface IDaoBase {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
} 