
import { SkillType } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';

export const defaultSkills: SkillType[] = [
  {
    id: uuidv4(),
    name: 'Operations Management',
    percentage: 90,
    category: 'Management'
  },
  {
    id: uuidv4(),
    name: 'Process Optimization',
    percentage: 85,
    category: 'Management'
  },
  {
    id: uuidv4(),
    name: 'UiPath RPA',
    percentage: 80,
    category: 'Automation'
  },
  {
    id: uuidv4(),
    name: 'Team Leadership',
    percentage: 85,
    category: 'Management'
  },
  {
    id: uuidv4(),
    name: 'Project Management',
    percentage: 80,
    category: 'Management'
  },
  {
    id: uuidv4(),
    name: 'Data Analysis',
    percentage: 75,
    category: 'Analytics'
  },
  {
    id: uuidv4(),
    name: 'SQL',
    percentage: 70,
    category: 'Analytics'
  },
  {
    id: uuidv4(),
    name: 'Business Intelligence',
    percentage: 75,
    category: 'Analytics'
  },
  {
    id: uuidv4(),
    name: 'Stakeholder Management',
    percentage: 80,
    category: 'Management'
  },
  {
    id: uuidv4(),
    name: 'Change Management',
    percentage: 75,
    category: 'Management'
  }
];
