import { useCallback, useContext } from 'react';
import { SocketContext } from 'utils/SocketProvider';

export default function useUpdateEvent(): {
  updateEvent: (event: string) => void;
  updatePage: (page: string) => void;
} {
  const socket = useContext(SocketContext);

  const updateEvent = useCallback(
    (event) => {
      const lastEvent = localStorage.getItem('event') || '';
      if (event !== lastEvent) {
        const date = new Date();
        const userId = localStorage.getItem('userId');
        localStorage.setItem('event', event);
        localStorage.setItem('eventDate', date.toISOString());
        socket?.emit('addActivity', {
          userId,
          event,
          page: localStorage.getItem('page'),
          eventDate: localStorage.getItem('eventDate'),
        });
        socket?.emit('updateStatus', { userId, date });
      }
    },
    [socket]
  );

  const updatePage = useCallback(
    (page) => {
      if (!page) return;
      const date = new Date();
      const userId = localStorage.getItem('userId');
      localStorage.setItem('page', page);
      localStorage.setItem('event', `Przeniósł/-a się do zakładki ${page}`);
      localStorage.setItem('eventDate', date.toISOString());

      socket?.emit('addActivity', {
        userId,
        event: localStorage.getItem('event'),
        page,
        eventDate: localStorage.getItem('eventDate'),
      });
      socket?.emit('updateStatus', { userId, date });
    },
    [socket]
  );

  return {
    updateEvent,
    updatePage,
  };
}
