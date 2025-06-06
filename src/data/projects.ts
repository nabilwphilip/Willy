import { ProjectType } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';

export const defaultProjects: ProjectType[] = [
  {
    id: uuidv4(),
    title: 'Fashion Influencer Campaign',
    description: 'Managed a high-impact fashion campaign with 15 top-tier influencers for a luxury clothing brand, resulting in 5M+ organic impressions and 25% increase in website traffic.',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Fashion', 'Campaign Management', 'ROI Tracking', 'Content Strategy'],
    demoUrl: 'https://example.com/fashion-campaign',
    category: 'Fashion',
    campaignDuration: '4 weeks',
    completionDate: 'June 2023',
    engagementRate: '8.7%',
    reach: '2.4M',
    conversion: '3.2%',
    campaignStrategy: 'This campaign was developed with a focus on audience engagement and brand authenticity. We used modern marketing strategies and analytics tools to ensure the campaign reached the target demographic effectively and created measurable results for the client.',
    campaignHighlights: [
      'Carefully selected influencer partnerships aligned with brand values',
      'Data-driven content strategy optimized for engagement',
      'Multi-platform approach for maximum reach',
      'Authentic storytelling that resonated with target audiences',
      'Comprehensive performance tracking and ROI measurement'
    ]
  },
  {
    id: uuidv4(),
    title: 'Cosmetics Brand Launch',
    description: 'Orchestrated the launch of a new cosmetics product line by coordinating with 25 beauty influencers for synchronized content release, achieving 200% of projected sales targets in first month.',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Cosmetics', 'Product Launch', 'Beauty Influencers', 'Content Creation'],
    demoUrl: 'https://example.com/cosmetics-launch',
    category: 'Cosmetics',
    campaignDuration: '6 weeks',
    completionDate: 'March 2023',
    engagementRate: '10.2%',
    reach: '3.7M',
    conversion: '4.5%',
    campaignStrategy: 'This campaign focused on creating excitement and anticipation around the product launch through coordinated teasers and influencer reveals.',
    campaignHighlights: [
      'Synchronized product reveal across 25 beauty influencers',
      'Staged content rollout building anticipation',
      'User-generated content contest to boost organic reach',
      'Strategic timing aligned with seasonal trends',
      'Exclusive discount codes for performance tracking'
    ]
  },
  {
    id: uuidv4(),
    title: 'Athlete Endorsement Program',
    description: 'Developed and implemented a year-long endorsement program between a sports nutrition brand and 8 professional athletes across different sports, increasing brand credibility and market share by 15%.',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Athletes', 'Endorsements', 'Sports Marketing', 'Sponsorships'],
    demoUrl: 'https://example.com/athlete-program',
    category: 'Athlete'
  },
  {
    id: uuidv4(),
    title: 'Food Delivery App Promotion',
    description: 'Coordinated with 30+ food bloggers and culinary influencers to promote a food delivery app, resulting in 50,000+ app downloads and a 40% increase in daily active users.',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg'],
    tags: ['Food', 'App Promotion', 'Culinary Influencers', 'User Acquisition'],
    demoUrl: 'https://example.com/food-app-promo',
    category: 'Food'
  },
  {
    id: uuidv4(),
    title: 'Lifestyle Blogger Collaboration',
    description: 'Managed a multi-channel collaboration with top lifestyle bloggers for a home decor brand, generating over 3M impressions and 150K+ engagement actions across platforms.',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Blogging', 'Lifestyle', 'Content Creation', 'Brand Partnerships'],
    demoUrl: 'https://example.com/blogger-collab',
    category: 'Blogging'
  },
  {
    id: uuidv4(),
    title: 'Content Creator Workshop',
    description: 'Organized and facilitated a virtual workshop series connecting emerging content creators with brands, resulting in 25+ successful partnerships and ongoing collaborations.',
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    tags: ['Content Creation', 'Networking', 'Workshops', 'Brand Deals'],
    demoUrl: 'https://example.com/creator-workshop',
    category: 'Content Creator'
  }
];
