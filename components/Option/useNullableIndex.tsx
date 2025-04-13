import { useState } from 'react';

export function useNullableIndex(index: number | null = null) {
  const [nullableIndex, setNullableIndex] = useState<number | null>(index);

  const handleIndexChange = (index: number) => {
    if (nullableIndex !== null && index === nullableIndex) {
      setNullableIndex(null);

      return;
    }

    setNullableIndex(index);
  };

  const resetIndex = () => {
    setNullableIndex(null);
  };

  return { nullableIndex, handleIndexChange, resetIndex };
}
