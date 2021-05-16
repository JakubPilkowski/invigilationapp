import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { SocketContext } from 'utils/SocketProvider';
import { ActivityType } from '../UserTypes';

import './Activities.scss';
import parseActivities from './parseActivities';

const Activities = ({ id, isExpanded }: { id: string; isExpanded: boolean }) => {
  const socket = useContext(SocketContext);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const handleUpdateActivities = useCallback((resp) => {
    console.log(resp);
    setActivities(parseActivities(resp));
  }, []);

  const handleAddActivity = useCallback((resp) => {
    console.log(resp);
    setActivities((lastActivities) => [resp, ...lastActivities.slice(-1)]);
  }, []);

  // useEffect(() => {
  //   if (isExpanded) {
  //     socket?.emit('activities', id);
  //     socket?.on('get_activities', handleUpdateActivities);
  //     socket?.on('add_activity', handleAddActivity);
  //   } else {
  //     socket?.off('get_activities', handleUpdateActivities);
  //     socket?.off('add_activity', handleAddActivity);
  //     setActivities([]);
  //   }
  // }, [isExpanded]);

  return (
    <CSSTransition in={isExpanded} timeout={300} classNames="Activities-anim">
      <div className="Activities">
        {activities?.length > 0 &&
          activities?.map((activity: ActivityType) => (
            <div key={activity.id} className="Activities__activity">
              <h4>P{activity.page}</h4>
              <h4>E{activity.event}</h4>
              <h4>D{activity.eventDate}</h4>
            </div>
          ))}
      </div>
    </CSSTransition>
  );
};

export default memo(Activities);
