import React, { memo, useCallback, useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { CSSTransition } from 'react-transition-group';

import { ActivityType } from '../UserTypes';

import { socketServer } from 'utils/SocketProvider';

import parseActivities from './parseActivities';

import './Activities.scss';

const Activities = ({ id, isExpanded }: { id: number; isExpanded: boolean }) => {
  const socket = socketIOClient(socketServer);
  const [client, setClient] = useState<string>();

  const [activities, setActivities] = useState<ActivityType[]>([]);

  const handleUpdateActivities = useCallback((resp: { client: string; rows: ActivityType[] }) => {
    if (resp.client) {
      setClient(resp.client);
    }
    setActivities(parseActivities(resp?.rows));
  }, []);

  useEffect(() => {
    socket?.on('getActivities', handleUpdateActivities);
    if (isExpanded) {
      socket?.emit('fetchActivities', id);
    } else if (id && client) {
      socket?.emit('leaveActivities', { id, client });
      setActivities([]);
    }
  }, [isExpanded]);

  return (
    <CSSTransition in={isExpanded} timeout={300} classNames="Activities-anim">
      <div className="Activities">
        {activities?.length > 0 && (
          <>
            <header className="Activities__titles">
              <h3>Strona</h3>
              <h3>Aktywność</h3>
              <h3>Godzina</h3>
            </header>
            {activities?.map((activity: ActivityType) => (
              <div key={activity.id} className="Activities__activity">
                <h4>{activity.page}</h4>
                <h4>{activity.event}</h4>
                <h4>{activity.date}</h4>
              </div>
            ))}
          </>
        )}
      </div>
    </CSSTransition>
  );
};

export default memo(Activities);
