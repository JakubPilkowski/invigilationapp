import { useState } from 'react';

export default function useToggle(val: boolean): [value: boolean, toggle: () => void] {
  const [value, setValue] = useState<boolean>(val);

  const toggle = () => {
    setValue((_val) => !_val);
  };

  return [value, toggle];
}
