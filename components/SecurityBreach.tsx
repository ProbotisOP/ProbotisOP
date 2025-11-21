import React, { useEffect, useState } from 'react';

export const SecurityBreach: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[10001] bg-red-950 flex flex-col items-center justify-center font-mono text-center overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      {/* Flashing Overlay */}
      <div className="absolute inset-0 bg-red-600/20 animate-pulse"></div>

      <div className="relative z-10 border-8 border-red-600 p-8 bg-black/90 shadow-[0_0_100px_rgba(220,38,38,0.5)] transform scale-110 animate-[shake_0.5s_ease-in-out_infinite]">
        <div className="text-6xl md:text-9xl font-black text-red-500 tracking-tighter mb-4 animate-pulse drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
          ACCESS DENIED
        </div>
        
        <div className="text-white space-y-2 font-bold text-xl tracking-widest border-t-2 border-red-800 pt-4">
            <p className="text-red-400">⚠ SECURITY PROTOCOL VIOLATION ⚠</p>
            <p>SYSTEM LOCKDOWN INITIATED</p>
            <p>TRACING IP ADDRESS... <span className="animate-pulse">[{192 + (count % 50)}.{168 + (count % 20)}.1.{count % 255}]</span></p>
        </div>

        <div className="mt-6 w-full bg-red-900/30 h-4 border border-red-600 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-red-600 animate-[loading_2s_linear_infinite]" style={{ width: '100%' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-5px, 5px) scale(1.01); }
          50% { transform: translate(5px, -5px) scale(0.99); }
          75% { transform: translate(-5px, -5px) scale(1.01); }
        }
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};