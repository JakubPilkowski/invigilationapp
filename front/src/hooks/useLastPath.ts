import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export default function useLastPath(): { lastPath: string } {
  const location = useLocation();
  const [lastPath, setLastPath] = useState<string>('');

  useEffect(() => {
    const path = <string>location.pathname.split('/').pop();
    setLastPath(path || 'main');
  }, [location]);

  return { lastPath };
}
