export interface Notice {
  id: string;
  title: string;
  date: string;
  tag: "Urgent" | "Notice" | "Admission" | "Academic";
  content: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  summary: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  year: string;
  achievement: string;
}

export interface Program {
  id: string;
  title: string;
  duration: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  eligibility: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Academics" | "Athletics" | "Events";
  imageUrl: string;
  description: string;
}
