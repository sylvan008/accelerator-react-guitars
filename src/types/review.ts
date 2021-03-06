export type Review = {
  advantage: string,
  comment: string,
  createAt: Date,
  disadvantage: string,
  guitarId: number,
  id: string,
  rating: number,
  userName: string,
};

export type ReviewPost = Omit<Review, 'id' | 'createAt'>;

export type ReviewServer = Omit<Review, 'createAt'> & {createAt: string};
