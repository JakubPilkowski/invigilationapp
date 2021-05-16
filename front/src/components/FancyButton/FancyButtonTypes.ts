export type FancyButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
};
