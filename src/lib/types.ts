export interface NavItem {
  title: string;
  href: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  imageHint: string;
  url: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  url: string;
}
