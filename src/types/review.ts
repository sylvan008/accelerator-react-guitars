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

export type ReviewServer = Omit<Review, 'createAt'> & {createAt: string};
