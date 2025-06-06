
import { TestimonialType } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';

export const defaultTestimonials: TestimonialType[] = [
  {
    id: uuidv4(),
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Fashion Brands Inc.',
    content: "Working with Nabil on our influencer campaign was a fantastic experience. He delivered exceptional results that exceeded our expectations, with a 40% increase in engagement across all our social platforms.",
    avatar: '/placeholder.svg',
    rating: 5
  },
  {
    id: uuidv4(),
    name: 'Michael Chen',
    role: 'CEO',
    company: 'BeautyBox',
    content: "We hired Nabil to manage our cosmetics launch campaign with influencers, and the results were remarkable. His strategic approach and industry connections helped us reach markets we hadn't previously accessed.",
    avatar: '/placeholder.svg',
    rating: 5
  },
  {
    id: uuidv4(),
    name: 'Emily Rodriguez',
    role: 'Brand Manager',
    company: 'Global Foods Co.',
    content: "The influencer strategy Nabil designed for our food brand increased our conversion rate by 35% in just two months. His understanding of food content creators and audience engagement was impressive.",
    avatar: '/placeholder.svg',
    rating: 4
  },
  {
    id: uuidv4(),
    name: 'David Wilson',
    role: 'Founder',
    company: 'EduTech Solutions',
    content: "As a non-technical founder, I appreciated how this developer explained complex concepts in simple terms and helped guide our product decisions. The resulting application has been crucial to our startup's success.",
    avatar: '/placeholder.svg',
    rating: 5
  },
  {
    id: uuidv4(),
    name: 'Olivia Kim',
    role: 'Content Creator',
    company: 'Lifestyle Influence',
    content: "From the creator perspective, Nabil is the kind of manager every influencer wants to work with. He understands both brand objectives and creator needs, making the collaboration process smooth and mutually beneficial.",
    avatar: '/placeholder.svg',
    rating: 5
  }
];
