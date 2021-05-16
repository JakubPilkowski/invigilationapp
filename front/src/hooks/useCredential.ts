import { useEffect, useState } from 'react';
import matcher from 'utils/matcher';

type useCredentialProps = {
  value: string;
  error: boolean;
  onChange: (val: string) => void;
};

export default function useCredential(
  value: string,
  regex: RegExp | string,
  onError: (err: boolean) => void
): useCredentialProps {
  const [isError, setIsError] = useState<boolean>(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    onError(isError);
  }, [isError, onError]);

  const onChange = (val: string) => {
    setText(val);
    setIsError(!matcher(regex, val));
  };

  return { value: text, onChange, error: isError };
}
