
import { EducationType } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';

export const defaultEducation: EducationType[] = [
  {
    id: uuidv4(),
    degree: 'Master of Business Administration',
    institution: 'Columbia Business School',
    location: 'New York, NY',
    startDate: '2015-09-01',
    endDate: '2017-06-30',
    description: 'Specialized in Digital Marketing and Brand Management with focus on emerging social media platforms. Completed thesis on "The Evolution of Influencer Marketing ROI Measurement" that was published in the Journal of Digital Marketing.'
  },
  {
    id: uuidv4(),
    degree: 'Bachelor of Science in Marketing',
    institution: 'University of Southern California',
    location: 'Los Angeles, CA',
    startDate: '2011-09-01',
    endDate: '2015-05-31',
    description: 'Graduated with honors. Active member of Digital Marketing Association and Social Media Club. Completed internships with major entertainment and consumer goods companies focusing on digital audience development and engagement strategies.'
  }
];
