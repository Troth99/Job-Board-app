
export interface Category {
    _id: string;
    name: string;
    shortName: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  category: Category;
  company?: { name: string };
}