import { useEffect, useState } from 'react';

export function usePerformance() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    isLoading: true
  });

  useEffect(() => {
    const startTime = performance.now();

    // Measure initial load time
    const measureLoadTime = () => {
      const loadTime = performance.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        loadTime,
        isLoading: false
      }));
    };

    // Measure when all resources are loaded
    if (document.readyState === 'complete') {
      measureLoadTime();
    } else {
      window.addEventListener('load', measureLoadTime);
    }

    // Measure render time
    const measureRenderTime = () => {
      const renderTime = performance.now() - startTime;
      setMetrics(prev => ({
        ...prev,
        renderTime
      }));
    };

    // Use requestAnimationFrame to measure when rendering is complete
    requestAnimationFrame(measureRenderTime);

    return () => {
      window.removeEventListener('load', measureLoadTime);
    };
  }, []);

  // Report performance to analytics (optional)
  useEffect(() => {
    if (!metrics.isLoading && metrics.loadTime > 0) {
      // You can send metrics to your analytics service here
      console.log('Performance Metrics:', {
        loadTime: `${metrics.loadTime.toFixed(2)}ms`,
        renderTime: `${metrics.renderTime.toFixed(2)}ms`
      });
    }
  }, [metrics]);

  return metrics;
}