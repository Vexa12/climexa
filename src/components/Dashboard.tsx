import { useState } from 'react';
import { User } from '../types';
import Sidebar from './Sidebar';
import HomeSection from './sections/HomeSection';
import EventPlanningSection from './sections/EventPlanningSection';
import RecommenderSection from './sections/RecommenderSection';
import AstronomySection from './sections/AstronomySection';
import AlertsSection from './sections/AlertsSection';
import CommunitySection from './sections/CommunitySection';
import StatisticsSection from './sections/StatisticsSection';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection user={user} />;
      case 'events':
        return <EventPlanningSection user={user} />;
      case 'recommender':
        return <RecommenderSection />;
      case 'astronomy':
        return <AstronomySection />;
      case 'alerts':
        return <AlertsSection />;
      case 'community':
        return <CommunitySection user={user} />;
      case 'statistics':
        return <StatisticsSection />;
      default:
        return <HomeSection user={user} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
        userName={user.name}
      />

      <div className="ml-64 flex-1 p-8">
        {renderSection()}
      </div>
    </div>
  );
}
