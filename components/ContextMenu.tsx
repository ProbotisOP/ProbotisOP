import React, { useEffect, useState } from 'react';
import { RESUME_DATA } from '../constants';

interface ContextMenuProps {
  onSecurityBreach: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ onSecurityBreach }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      
      // Adjust position to keep menu on screen
      const x = e.clientX > window.innerWidth - 220 ? e.clientX - 220 : e.clientX;
      const y = e.clientY > window.innerHeight - 200 ? e.clientY - 200 : e.clientY;
      
      setPosition({ x, y });
      setVisible(true);
    };

    const handleClick = () => setVisible(false);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) return null;

  const menuItems = [
    { 
      label: 'Inspect Element', 
      action: () => window.open(RESUME_DATA.personal.links.github, '_blank'),
      icon: '🔍'
    },
    { 
      label: 'View Source Code', 
      action: () => window.open(RESUME_DATA.personal.links.github, '_blank'),
      icon: '💻' 
    },
    { 
      label: 'System Diagnostics', 
      action: () => window.location.reload(),
      icon: '🔄'
    },
    { 
      label: 'Override Security', 
      action: onSecurityBreach,
      icon: '🔒'
    },
  ];

  return (
    <div 
      className="fixed z-[10000] bg-[#0d1117]/95 backdrop-blur-md border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)] min-w-[220px] rounded font-mono text-sm overflow-hidden"
      style={{ top: position.y, left: position.x }}
    >
        <div className="bg-green-900/20 px-3 py-1 text-[10px] text-green-500 border-b border-green-500/30 flex justify-between items-center">
           <span>CTX_MENU_V1</span>
           <span className="animate-pulse">●</span>
        </div>
        <div className="p-1">
          {menuItems.map((item, idx) => (
              <div 
                  key={idx}
                  onClick={item.action}
                  className="px-3 py-2 hover:bg-green-500/20 text-gray-300 hover:text-green-400 cursor-pointer transition-colors flex items-center gap-3 group rounded-sm"
              >
                  <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 text-[10px]">&gt;</span>
              </div>
          ))}
        </div>
        <div className="border-t border-gray-800 p-1 bg-black/50">
            <div className="text-[10px] text-gray-600 text-center font-mono">
               satnam@root:~$ _
            </div>
        </div>
    </div>
  );
};