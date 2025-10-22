interface IFullTransaction {
  paidBy: string[];
  amount: number;
  splitAmong: string[];
  groupId: string;
  image: string;
  slug: string;
  name: string;
  description: string;
  createdAt: Date;
  lastEditAt: Date;
  deletedAt: Date;
  createdBy: string;
  active: boolean;
}

export { IFullTransaction };
