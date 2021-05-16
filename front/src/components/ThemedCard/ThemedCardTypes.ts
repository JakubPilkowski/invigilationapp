import { ThemedColor } from 'globals/theme';

export type ThemedCardProps = {
  variant?: 'outlined' | 'contained';
  children: React.ReactNode;
  color?: ThemedColor;
  className?: string;
};
