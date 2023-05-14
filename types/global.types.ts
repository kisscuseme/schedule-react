export interface AlertType {
  title: string;
  content: React.ReactNode;
  callback?: () => void;
  confirm?: () => void;
  show: boolean;
}