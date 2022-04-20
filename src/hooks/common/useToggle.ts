import { useCallback, useState } from 'react';

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(defaultValue);
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const result: [boolean, VoidFunction] = [value, toggle];
  return result;
}
