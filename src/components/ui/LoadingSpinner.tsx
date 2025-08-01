import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = 'md', fullScreen = false }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className={cn(
          'animate-spin rounded-full border-t-transparent border-primary-600',
          sizeClasses[size]
        )} />
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4">
      <div className={cn(
        'animate-spin rounded-full border-t-transparent border-primary-600',
        sizeClasses[size]
      )} />
    </div>
  );
};

export default LoadingSpinner;