import React, { useEffect, useRef } from 'react';

const WorkerAnimation = () => {
  const workerRef = useRef(null);
  const userRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const worker = workerRef.current;
    const user = userRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    
    if (!worker || !user || !path || !dot) return;

    // Reset positions
    worker.style.left = '15%';
    worker.style.top = '70%';
    worker.style.opacity = '1';
    
    user.style.right = '15%';
    user.style.top = '30%';
    user.style.opacity = '1';

    // Draw path
    const drawPath = () => {
      const workerRect = worker.getBoundingClientRect();
      const userRect = user.getBoundingClientRect();
      
      const startX = workerRect.left + workerRect.width / 2;
      const startY = workerRect.top + workerRect.height / 2;
      const endX = userRect.left + userRect.width / 2;
      const endY = userRect.top + userRect.height / 2;
      
      // Create a curved path
      const cp1x = startX + (endX - startX) / 3;
      const cp1y = startY - 100;
      const cp2x = startX + (endX - startX) * 2/3;
      const cp2y = endY - 50;
      
      const pathData = `M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`;
      path.setAttribute('d', pathData);
      
      // Animate dot along the path
      let progress = 0;
      const duration = 3000; // 3 seconds
      const startTime = performance.now();
      
      const animateDot = (timestamp) => {
        if (!startTime) return;
        
        const elapsed = timestamp - startTime;
        progress = Math.min(elapsed / duration, 1);
        
        // Calculate position along the curve
        const t = progress;
        const x = Math.pow(1-t, 3) * startX + 
                 3 * Math.pow(1-t, 2) * t * cp1x + 
                 3 * (1-t) * t * t * cp2x + 
                 t * t * t * endX;
        const y = Math.pow(1-t, 3) * startY + 
                 3 * Math.pow(1-t, 2) * t * cp1y + 
                 3 * (1-t) * t * t * cp2y + 
                 t * t * t * endY;
        
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateDot);
        } else {
          // Reset and restart animation
          setTimeout(() => {
            dot.style.display = 'none';
            setTimeout(() => {
              dot.style.display = 'block';
              dot.style.left = `${startX}px`;
              dot.style.top = `${startY}px`;
              animationRef.current = requestAnimationFrame(animateDot);
            }, 500);
          }, 500);
        }
      };
      
      // Start animation
      dot.style.left = `${startX}px`;
      dot.style.top = `${startY}px`;
      dot.style.display = 'block';
      animationRef.current = requestAnimationFrame(animateDot);
    };
    
    // Start animation after a short delay
    const timer = setTimeout(drawPath, 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Worker */}
      <div 
        ref={workerRef}
        className="absolute w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl z-20 shadow-lg"
        style={{ left: '15%', top: '70%', transform: 'translate(-50%, -50%)' }}
      >
        👷
      </div>
      
      {/* User */}
      <div 
        ref={userRef}
        className="absolute w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl z-20 shadow-lg"
        style={{ right: '15%', top: '30%', transform: 'translate(50%, -50%)' }}
      >
        👤
      </div>
      
      {/* Animated path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
        <path 
          ref={pathRef} 
          fill="none" 
          stroke="#FBBF24" 
          strokeWidth="2" 
          strokeDasharray="5,5"
          className="opacity-50"
        />
      </svg>
      
      {/* Moving dot */}
      <div 
        ref={dotRef}
        className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg z-30 transform -translate-x-1/2 -translate-y-1/2"
        style={{ display: 'none' }}
      ></div>
      
      {/* Labels */}
      <div className="absolute left-[15%] top-[calc(70%+30px)] transform -translate-x-1/2 text-center z-20">
        <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">Worker</div>
      </div>
      <div className="absolute right-[15%] top-[calc(30%+30px)] transform translate-x-1/2 text-center z-20">
        <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">You</div>
      </div>
    </div>
  );
};

export default WorkerAnimation;
