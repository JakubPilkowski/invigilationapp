import React, { memo } from 'react';
import classnames from 'classnames';
import { FancyHeadingProps } from './FancyHeadingTypes';
import useStyles from './useStyles';

const FancyHeading = ({
  title = '',
  colorPrimary = 'primary',
  colorSecondary = 'secondary',
  className = '',
}: FancyHeadingProps) => {
  const styles = useStyles({ colorPrimary, colorSecondary });

  const classes = classnames(styles.Heading, className);

  return <span className={classes}>{title}</span>;
};

export default memo(FancyHeading);
