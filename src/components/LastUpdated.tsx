import React from 'react';

type LastUpdatedProps = {
  date: string;
  className?: string;
};

const LastUpdated: React.FC<LastUpdatedProps> = ({ date, className }) => {
  const baseClass = 'text-xs text-muted-foreground mt-8';
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <p className={combinedClass}>
      Last updated: {date}
    </p>
  );
};

export default LastUpdated;

