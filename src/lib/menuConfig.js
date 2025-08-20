import { 
  Home, 
  Music, 
  Users, 
  Lightbulb, 
  BarChart3, 
  FileText, 
  Shield, 
  Split 
} from 'lucide-react';

// הגדרות התפריט הראשי
export const menuItems = [
  { id: 'dashboard', key: 'dashboard', label: 'dashboard', icon: Home },
  { id: 'sketches', key: 'sketches', label: 'sketches', icon: Music },
  { id: 'sessions', key: 'sessions', label: 'sessions', icon: Users },
  { id: 'productionRecommendations', key: 'productionRecommendations', label: 'productionRecommendations', icon: Lightbulb },
  { id: 'export', key: 'export', label: 'exportVersions', icon: BarChart3 },
  { id: 'credits', key: 'credits', label: 'creditsContracts', icon: FileText },
  { id: 'verification', key: 'verification', label: 'userVerification', icon: Shield },
  { id: 'audio-separation', key: 'audio-separation', label: 'הפרדת אודיו', icon: Split },
];

// הגדרות נוספות לתפריט
export const menuConfig = {
  productionTools: 'productionTools',
  quickStats: 'quickStats',
  activeProjects: 'activeProjects',
  weeklyAnalyses: 'weeklyAnalyses',
  sketchesCreated: 'sketchesCreated',
  premiumActive: 'premiumActive'
};
