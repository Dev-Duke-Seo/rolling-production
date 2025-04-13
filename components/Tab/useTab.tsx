import { useState } from 'react';

export function useTab(initialTab: string = '') {
  const [selectedTab, setSelectedTab] = useState<string>(initialTab);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return { selectedTab, handleTabChange };
}
