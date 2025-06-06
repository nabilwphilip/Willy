
import { ExperienceType } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';

export const defaultExperiences: ExperienceType[] = [
  {
    id: uuidv4(),
    title: 'Operations Manager - Influencer Marketing',
    company: 'Global Influence Agency',
    location: 'New York, NY',
    startDate: '2021-06-01',
    endDate: null,
    description: 'Leading a team of 10 campaign managers overseeing 100+ influencer collaborations monthly. Developed standardized processes that increased campaign efficiency by 35% and improved client satisfaction scores by 28%. Implemented new analytics framework that provides comprehensive ROI reporting across all platforms.',
    isCurrently: true
  },
  {
    id: uuidv4(),
    title: 'Senior Campaign Manager',
    company: 'Creator Connect',
    location: 'Los Angeles, CA',
    startDate: '2019-03-15',
    endDate: '2021-05-30',
    description: 'Managed influencer relationships and campaign execution for major fashion and lifestyle brands. Coordinated 50+ influencer campaigns with budgets ranging from $50K to $500K, consistently exceeding engagement KPIs by an average of 25%. Developed a creator vetting system that reduced campaign risks and improved content quality.',
    isCurrently: false
  },
  {
    id: uuidv4(),
    title: 'Influencer Marketing Specialist',
    company: 'Digital Brand Solutions',
    location: 'Remote',
    startDate: '2017-09-01',
    endDate: '2019-02-28',
    description: 'Identified and recruited appropriate influencers for client campaigns across beauty, fashion, and lifestyle verticals. Negotiated partnerships and contracts, managed content approval processes, and tracked campaign performance. Grew the influencer network from 50 to 500+ verified creators.',
    isCurrently: false
  }
];
