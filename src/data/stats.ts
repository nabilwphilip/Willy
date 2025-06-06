
import { StatType } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';

export const defaultStats: StatType[] = [
  {
    id: uuidv4(),
    label: 'Projects Completed',
    value: 87,
    icon: 'CheckCircle'
  },
  {
    id: uuidv4(),
    label: 'Satisfied Clients',
    value: 52,
    icon: 'Users'
  },
  {
    id: uuidv4(),
    label: 'Years Experience',
    value: 6,
    icon: 'Calendar'
  }
];
