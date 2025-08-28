import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModuleTestProps {
  modulePath: string;
  displayName: string;
}

const ModuleLoadTest: React.FC<ModuleTestProps> = ({ modulePath, displayName }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<Error | null>(null);
  const [loadTime, setLoadTime] = useState<number>(0);

  const testModule = async () => {
    const startTime = performance.now();
    setStatus('loading');
    setError(null);
    
    try {
      console.log(`🧪 Testing module: ${modulePath}`);
      
      // Test dynamic import
      const module = await import(modulePath);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      setLoadTime(duration);
      
      console.log(`✅ Module ${displayName} loaded in ${duration.toFixed(2)}ms:`, module);
      
      // Validate module structure
      if (!module.default) {
        throw new Error('Module does not have a default export');
      }
      
      if (typeof module.default !== 'function' && typeof module.default !== 'object') {
        throw new Error('Default export is not a valid React component');
      }
      
      setStatus('success');
    } catch (err) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      setLoadTime(duration);
      
      console.error(`❌ Module ${displayName} failed to load after ${duration.toFixed(2)}ms:`, err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setStatus('error');
    }
  };

  useEffect(() => {
    testModule();
  }, [modulePath]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <span className="font-medium">{displayName}</span>
        </div>
        <span className="text-sm text-gray-500">
          {loadTime > 0 && `${loadTime.toFixed(2)}ms`}
        </span>
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{modulePath}</code>
      </div>
      
      {status === 'error' && error && (
        <div className="space-y-2">
          <p className="text-sm text-red-600 font-medium">{error.message}</p>
          <details className="text-xs">
            <summary className="cursor-pointer text-red-500">Stack Trace</summary>
            <pre className="mt-1 p-2 bg-red-100 rounded overflow-auto">
              {error.stack}
            </pre>
          </details>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={testModule}
            className="text-xs"
          >
            Retry
          </Button>
        </div>
      )}
      
      {status === 'success' && (
        <p className="text-sm text-green-600">✅ Module loaded successfully</p>
      )}
    </div>
  );
};

export default ModuleLoadTest;