import { useState } from 'react';

function useSelect() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const select = (item: string) => {
    setSelectedOption(item);
  };

  const clearSelection = () => {
    setSelectedOption(null);
  };

  return {
    selectedOption,
    select,
    clearSelection,
  };
}

export default useSelect;
