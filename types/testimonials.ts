export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  helpful: number;
  category: string;
  avatar: string;
  source: string;
}

export interface TestimonialStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    [key: number]: number;
  };
  topCategories: string[];
  lastUpdated: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
  stats: TestimonialStats;
}
