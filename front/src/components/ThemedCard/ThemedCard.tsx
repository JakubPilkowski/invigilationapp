import React, { memo } from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';
import { ThemedCardProps } from './ThemedCardTypes';

const ThemedCard = ({
  variant = 'outlined',
  children,
  className,
  color = 'primary',
}: ThemedCardProps) => {
  const cardStyles = useStyles({ color });

  const classes = classnames(
    cardStyles.ThemedCard,
    {
      [cardStyles.ThemedCard__contained]: variant === 'contained',
      [cardStyles.ThemedCard__outlined]: variant === 'outlined',
    },
    className
  );

  return <div className={classes}>{children}</div>;
};

export default memo(ThemedCard);
