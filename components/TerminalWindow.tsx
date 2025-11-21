import React, { useRef, useState, useEffect } from 'react';

interface TerminalWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  isClosing?: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  initialPosition?: { x: number; y: number };
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  id,
  title,
  children,
  isMinimized,
  isClosing = false,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  initialPosition = { x: 100, y: 50 },
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Window State
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Trigger Mount Animation
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Adjust initial size for mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setSize({ 
        width: window.innerWidth - 10, 
        height: window.innerHeight - 120 
      });
      setPosition({ x: 5, y: 60 });
    }
  }, []);

  // 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panelRef.current || isDragging || isResizing || isMinimized || isClosing) return;

    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 2; // Reduced rotation for usability
    const rotateX = ((centerY - y) / centerY) * 2;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Drag Logic - Disabled on mobile
  const startDrag = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // Disable dragging on mobile
    e.preventDefault();
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    setRotation({ x: 0, y: 0 }); // Reset rotation when dragging starts
  };

  // Resize Logic - Disabled on mobile
  const startResize = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return; // Disable resizing on mobile
    e.preventDefault();
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
  };

  // Global Mouse Events for Drag/Resize
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
      if (isResizing) {
        setSize({
          width: Math.max(300, e.clientX - position.x),
          height: Math.max(200, e.clientY - position.y)
        });
      }
    };

    const handleGlobalUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleGlobalMove);
      window.addEventListener('mouseup', handleGlobalUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
    };
  }, [isDragging, isResizing, dragOffset, position]);

  if (isMinimized) {
    return null;
  }

  // Visual State Helpers
  const getAnimationClass = () => {
    if (isClosing) return 'opacity-0 scale-90 blur-sm translate-y-4';
    if (!isMounted) return 'opacity-0 scale-95 blur-sm';
    return 'opacity-100 scale-100 blur-0 translate-y-0';
  };

  const getDraggingClass = () => {
    if (isDragging) return 'shadow-[0_0_40px_rgba(34,197,94,0.4)] border-green-400 opacity-95 scale-[1.01] cursor-grabbing';
    return 'shadow-2xl border-rgba(48, 54, 61, 0.6) opacity-100 scale-100';
  };

  return (
    <div
      className={`absolute`}
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex: zIndex,
        perspective: '1000px',
        pointerEvents: 'auto'
      }}
      onMouseDown={onFocus}
    >
      <div className={`w-full h-full transition-all duration-300 ease-out transform ${getAnimationClass()}`}>
        <div 
          ref={panelRef}
          className={`
            w-full h-full flex flex-col 
            glass-panel rounded-lg overflow-hidden
            transition-all duration-200
            ${getDraggingClass()}
          `}
          style={{
            transform: isDragging ? 'none' : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Window Header */}
          <div 
            className={`
              bg-[#161b22] px-3 md:px-4 py-2 flex items-center justify-between border-b 
              ${isDragging ? 'border-green-400 bg-green-900/20' : 'border-[#30363d]'}
              md:cursor-grab md:active:cursor-grabbing select-none transition-colors duration-200
            `}
            onMouseDown={startDrag}
          >
            <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] shadow-sm transition-colors flex items-center justify-center group">
                  <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold">×</span>
              </button>
              <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffcc00] shadow-sm transition-colors flex items-center justify-center group">
                  <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold">−</span>
              </button>
              <button className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#28cd41] shadow-sm transition-colors" />
            </div>
            
            <div className={`text-xs font-mono flex items-center gap-2 opacity-80 transition-colors ${isDragging ? 'text-green-400' : 'text-gray-400'}`}>
              <span className="text-green-500">➜</span>
              <span>{title}</span>
            </div>
            
            <div className="w-10"></div> 
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 text-gray-300 font-mono text-xs md:text-sm lg:text-base bg-[#0d1117]/95 scrollbar-hide overscroll-contain">
            {children}
          </div>
          
          {/* Footer Status Bar */}
          <div className="bg-[#161b22] border-t border-[#30363d] px-4 py-1 text-[10px] text-gray-500 flex justify-between font-mono relative">
            <div className="flex gap-4">
              <span>PID: {Math.floor(Math.random() * 9000) + 1000}</span>
              <span>MEM: {Math.floor(Math.random() * 50) + 10}%</span>
            </div>
            <span>TYPE: BASH</span>
            
            {/* Resize Handle - Hidden on mobile */}
            <div 
              className="hidden md:block absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 hover:bg-white/10"
              onMouseDown={startResize}
            >
              <svg viewBox="0 0 10 10" className="w-2 h-2 text-gray-500 fill-current opacity-50">
                 <path d="M10 10 L10 0 L0 10 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
