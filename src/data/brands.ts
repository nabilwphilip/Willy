
import { BrandType } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';

// Create fixed IDs for default brands to ensure consistency
const brandIds = {
  grandCommunity: uuidv4(),
  matoqa: uuidv4(),
  tagWinner: uuidv4(),
  sSoftware: uuidv4(),
  iti: uuidv4()
};

export const defaultBrands: BrandType[] = [
  {
    id: brandIds.grandCommunity,
    name: 'Grand Community',
    logo: '/lovable-uploads/76be955e-65e7-43a1-83bb-3582a58277e3.png'
  },
  {
    id: brandIds.matoqa,
    name: 'Matoqa Software House',
    logo: '/lovable-uploads/7e18027a-8fd3-41ab-8139-da3589e2355f.png'
  },
  {
    id: brandIds.tagWinner,
    name: 'TAG Winner Winner',
    logo: '/lovable-uploads/727a1670-931c-43ce-b407-fd556eea1ce6.png'
  },
  {
    id: brandIds.sSoftware,
    name: 'S Software Solutions',
    logo: '/lovable-uploads/4d6c3ac6-f4b3-4426-b58c-95c8bc30e15f.png'
  },
  {
    id: brandIds.iti,
    name: 'ITI',
    logo: '/lovable-uploads/faa44b5e-fbd3-4ebf-bc23-048c4ff0d6e3.png'
  }
];
