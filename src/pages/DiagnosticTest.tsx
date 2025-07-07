import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import Button from '@/components/Button';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
  error?: Error;
}

const DiagnosticTest = () => {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'PorcelainVeneers Module Load', status: 'pending' },
    { name: 'VideoHero Component', status: 'pending' },
    { name: 'OptimizedImage Component', status: 'pending' },
    { name: 'Button Component', status: 'pending' },
    { name: 'Asset Loading', status: 'pending' },
  ]);

  const updateTest = (name: string, status: TestResult['status'], message?: string, error?: Error) => {
    setTests(prev => prev.map(test => 
      test.name === name ? { ...test, status, message, error } : test
    ));
  };

  const runDiagnostics = async () => {
    console.log('🔍 Starting diagnostic tests...');
    
    // Reset all tests
    setTests(prev => prev.map(test => ({ ...test, status: 'pending' })));

    // Test 1: PorcelainVeneers module loading
    try {
      console.log('Testing PorcelainVeneers module load...');
      const module = await import('@/pages/PorcelainVeneers');
      console.log('✅ PorcelainVeneers module loaded:', module);
      updateTest('PorcelainVeneers Module Load', 'success', 'Module loaded successfully');
    } catch (error) {
      console.error('❌ PorcelainVeneers module load failed:', error);
      updateTest('PorcelainVeneers Module Load', 'error', error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error : undefined);
    }

    // Test 2: VideoHero component
    try {
      console.log('Testing VideoHero component...');
      const module = await import('@/components/VideoHero');
      console.log('✅ VideoHero component loaded:', module);
      updateTest('VideoHero Component', 'success', 'Component loaded successfully');
    } catch (error) {
      console.error('❌ VideoHero component load failed:', error);
      updateTest('VideoHero Component', 'error', error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error : undefined);
    }

    // Test 3: OptimizedImage component
    try {
      console.log('Testing OptimizedImage component...');
      const module = await import('@/components/OptimizedImage');
      console.log('✅ OptimizedImage component loaded:', module);
      updateTest('OptimizedImage Component', 'success', 'Component loaded successfully');
    } catch (error) {
      console.error('❌ OptimizedImage component load failed:', error);
      updateTest('OptimizedImage Component', 'error', error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error : undefined);
    }

    // Test 4: Button component
    try {
      console.log('Testing Button component...');
      const module = await import('@/components/Button');
      console.log('✅ Button component loaded:', module);
      updateTest('Button Component', 'success', 'Component loaded successfully');
    } catch (error) {
      console.error('❌ Button component load failed:', error);
      updateTest('Button Component', 'error', error instanceof Error ? error.message : 'Unknown error', error instanceof Error ? error : undefined);
    }

    // Test 5: Asset loading
    try {
      console.log('Testing asset loading...');
      const testImage = new Image();
      await new Promise((resolve, reject) => {
        testImage.onload = resolve;
        testImage.onerror = reject;
        testImage.src = '/lovable-uploads/33335962-b99c-4063-aa3c-96dfaf5215bb.png';
      });
      console.log('✅ Asset loading test passed');
      updateTest('Asset Loading', 'success', 'Assets load correctly');
    } catch (error) {
      console.error('❌ Asset loading test failed:', error);
      updateTest('Asset Loading', 'error', 'Failed to load test asset', error instanceof Error ? error : undefined);
    }

    console.log('🏁 Diagnostic tests completed');
  };

  useEffect(() => {
    // Auto-run diagnostics on component mount
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <AlertTriangle className="h-12 w-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnostic Test Page</h1>
          <p className="text-gray-600">Testing PorcelainVeneers page dependencies and module loading</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Test Results</h2>
            <Button onClick={runDiagnostics}>
              Re-run Tests
            </Button>
          </div>

          <div className="space-y-4">
            {tests.map((test) => (
              <div key={test.name} className="flex items-start space-x-3 p-4 border rounded-lg">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{test.name}</h3>
                  {test.message && (
                    <p className={`text-sm ${test.status === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
                      {test.message}
                    </p>
                  )}
                  {test.error && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-500 cursor-pointer">Error Details</summary>
                      <pre className="text-xs text-red-600 mt-1 bg-red-50 p-2 rounded overflow-auto">
                        {test.error.stack || test.error.message}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Debugging Information</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
            <p><strong>User Agent:</strong> {navigator.userAgent}</p>
            <p><strong>Current URL:</strong> {window.location.href}</p>
            <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTest;