import React, { useState, useEffect } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { RESUME_DATA } from '../constants';
import { WindowType, WindowState } from '../types';

const Icon: React.FC<{ label: string; icon: React.ReactNode; onClick: () => void; active: boolean; minimized: boolean }> = ({ label, icon, onClick, active, minimized }) => (
  <button 
    onClick={onClick}
    className={`
      group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300
      hover:bg-white/10 backdrop-blur-sm w-24 relative
      ${active ? 'bg-white/5 ring-1 ring-green-500/50' : ''}
    `}
  >
    <div className={`
      w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110
      ${active ? 'bg-gray-800 text-green-400 shadow-green-500/20' : 'bg-black/80 text-gray-400 border border-gray-700'}
    `}>
      {icon}
    </div>
    <span className="text-xs font-mono text-gray-300 bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-gray-800 group-hover:text-green-400 transition-colors">
      {label}
    </span>
    {/* Status Indicator */}
    {active && (
      <div className={`absolute right-2 top-2 w-2 h-2 rounded-full ${minimized ? 'bg-yellow-500' : 'bg-green-500'} shadow-lg ring-1 ring-black`}></div>
    )}
  </button>
);

export const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [topZIndex, setTopZIndex] = useState(10);

  useEffect(() => {
    // Open Profile by default
    handleOpenWindow(WindowType.PROFILE);

    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const handleOpenWindow = (type: WindowType) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === type);
      const newZ = topZIndex + 1;
      setTopZIndex(newZ);

      if (existing) {
        // If closing, reset it. Restore and bring to front
        return prev.map(w => 
          w.id === type 
            ? { ...w, isMinimized: false, isClosing: false, zIndex: newZ } 
            : w
        );
      } else {
        // Create new
        return [...prev, {
          id: type,
          isOpen: true,
          isMinimized: false,
          isClosing: false,
          zIndex: newZ
        }];
      }
    });
  };

  const handleCloseWindow = (type: WindowType) => {
    // First, mark as closing to trigger animation
    setWindows(prev => prev.map(w => w.id === type ? { ...w, isClosing: true } : w));

    // Remove after animation duration
    setTimeout(() => {
        setWindows(prev => prev.filter(w => w.id !== type));
    }, 300);
  };

  const handleMinimizeWindow = (type: WindowType) => {
    setWindows(prev => prev.map(w => w.id === type ? { ...w, isMinimized: true } : w));
  };

  const handleFocusWindow = (type: WindowType) => {
    setWindows(prev => {
      const newZ = topZIndex + 1;
      setTopZIndex(newZ);
      return prev.map(w => w.id === type ? { ...w, zIndex: newZ } : w);
    });
  };

  const getWindowStatus = (type: WindowType) => {
    const win = windows.find(w => w.id === type);
    return {
      active: !!win,
      minimized: win?.isMinimized || false
    };
  };

  const renderContent = (type: WindowType) => {
    switch (type) {
      case WindowType.PROFILE:
        return (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-32 h-32 rounded-full border-2 border-green-500 p-1 shadow-[0_0_20px_rgba(34,197,94,0.4)] relative overflow-hidden group flex-shrink-0">
                  <img src="https://picsum.photos/200/200?grayscale" alt="Satnam" className="w-full h-full rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-green-500/20 animate-pulse rounded-full"></div>
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                    <span className="text-green-500">$</span> {RESUME_DATA.personal.name}
                  </h1>
                  <p className="text-xl text-gray-400 font-light border-b border-gray-700 pb-2">
                    {RESUME_DATA.personal.role}
                  </p>
                  <div className="text-sm text-gray-500 mt-2 font-mono">
                    <p>UID: 0 (root)</p>
                    <p>GID: 0 (root)</p>
                    <p>Groups: wheel, docker, aws-admin, sec-ops</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border border-gray-700 rounded bg-black/40 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
                 <h3 className="text-green-400 mb-2 font-bold flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                   Summary
                 </h3>
                 <p className="leading-relaxed text-gray-300">
                   {RESUME_DATA.personal.summary}
                 </p>
              </div>

              <div className="mt-6">
                <h3 className="text-green-400 mb-3 font-bold border-b border-gray-800 pb-1">Education</h3>
                {RESUME_DATA.education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row justify-between text-sm mb-2 hover:bg-white/5 p-2 rounded transition-colors cursor-default">
                    <div>
                      <span className="text-white font-bold">{edu.degree}</span>
                      <br/>
                      <span className="text-gray-500">{edu.school}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600">{edu.year}</span>
                      <br/>
                      <span className="text-gray-600">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        );
      case WindowType.EXPERIENCE:
        return (
             <div className="space-y-8">
               {RESUME_DATA.experience.map((job, index) => (
                 <div key={index} className="relative pl-4 border-l-2 border-gray-700 hover:border-green-500 transition-colors duration-300 group">
                   <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#0d1117] border-2 border-gray-600 rounded-full group-hover:border-green-500 group-hover:bg-green-900 transition-all"></div>
                   
                   <div className="mb-1 font-mono text-xs text-gray-500">
                     $ {job.command}
                   </div>
                   
                   <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                     <h3 className="text-xl font-bold text-green-400">{job.company}</h3>
                     <span className="text-sm bg-gray-800 px-2 py-0.5 rounded text-gray-300 border border-gray-600">{job.period}</span>
                   </div>
                   <h4 className="text-white mb-3 italic">{job.role}</h4>
                   
                   <ul className="space-y-2">
                     {job.highlights.map((hl, i) => (
                       <li key={i} className="text-sm text-gray-400 pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-green-600 hover:text-gray-200 transition-colors">
                         {hl}
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
        );
      case WindowType.SKILLS:
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RESUME_DATA.skills.map((skillCat, idx) => (
                  <div key={idx} className="bg-gray-900/50 border border-gray-800 p-4 rounded hover:border-green-500/50 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:-translate-y-1 transform duration-300">
                    <h3 className="text-green-400 font-bold mb-4 uppercase tracking-wider border-b border-dashed border-gray-700 pb-2">
                      {skillCat.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillCat.items.map((item, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-black border border-green-900 text-xs text-gray-300 rounded hover:bg-green-900/30 hover:text-white hover:border-green-500 transition-colors cursor-crosshair"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
        );
      case WindowType.SECURITY:
        return (
             <div className="font-mono text-sm">
                <div className="mb-4 text-gray-500">
                  <p>Metasploit Console</p>
                  <p>Version: 6.0.45-dev</p>
                  <p className="text-red-500 font-bold animate-pulse"> [!] 3 Exploits Loaded</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-blue-400 font-bold">msf6 &gt;</span> <span className="text-white">show achievements</span>
                    <div className="mt-2 space-y-3 border-l-2 border-blue-900 pl-4 ml-2">
                      {RESUME_DATA.security.achievements.map((ach, i) => (
                        <div key={i} className="group">
                          <p className="text-yellow-400 font-bold group-hover:text-yellow-200 transition-colors">{ach.title}</p>
                          <p className="text-gray-400 text-xs">{ach.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-blue-400 font-bold">msf6 &gt;</span> <span className="text-white">run hall_of_fame.rb</span>
                    <div className="mt-2 bg-black p-3 rounded border border-gray-800">
                      {RESUME_DATA.security.hallOfFame.map((hof, i) => (
                        <div key={i} className="flex items-center gap-2 mb-1">
                           <span className="text-green-500">[+]</span>
                           <span className="text-gray-300">Honorable Mention: <span className="text-white font-bold">{hof}</span></span>
                        </div>
                      ))}
                      <div className="mt-2 text-gray-600 text-xs italic">
                        Payload delivered successfully.
                      </div>
                    </div>
                  </div>

                  <div>
                     <span className="text-blue-400 font-bold">msf6 &gt;</span> <span className="text-white">cat /etc/certs</span>
                     <div className="mt-2 grid grid-cols-1 gap-2">
                        {RESUME_DATA.security.certifications.map((cert, i) => (
                          <div key={i} className="bg-gray-800/50 p-2 border-l-4 border-purple-500 flex items-center justify-between">
                             <span>{cert.name}</span>
                             <span className="text-xs bg-purple-900 text-purple-200 px-1 rounded">VERIFIED</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
             </div>
        );
      case WindowType.CONTACT:
        return (
             <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">
                <div className="w-full max-w-md bg-black border border-green-800 p-4 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                   <div className="text-left mb-4 border-b border-gray-800 pb-2 text-gray-500 text-xs">
                     Listening on [any] 1337 ...
                   </div>
                   <div className="space-y-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-green-600 text-xs uppercase">Email Protocol</span>
                        <a href={`mailto:${RESUME_DATA.personal.email}`} className="text-xl md:text-2xl text-white hover:text-green-400 hover:bg-green-900/20 transition-all p-2 rounded">
                          {RESUME_DATA.personal.email}
                        </a>
                     </div>
                     
                     <div className="flex justify-center gap-6 mt-6">
                        <a href="#" className="flex flex-col items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
                           <div className="w-12 h-12 border border-gray-700 rounded flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/10">
                             <span className="font-bold">in</span>
                           </div>
                           <span className="text-xs">LinkedIn</span>
                        </a>
                        <a href="#" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                           <div className="w-12 h-12 border border-gray-700 rounded flex items-center justify-center group-hover:border-white group-hover:bg-white/10">
                             <span className="font-bold">Git</span>
                           </div>
                           <span className="text-xs">GitHub</span>
                        </a>
                     </div>
                   </div>
                   <div className="mt-6 text-left pt-2 border-t border-gray-800">
                      <span className="animate-pulse text-green-500">_</span>
                   </div>
                </div>
             </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0d1117] text-white perspective-container">
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `perspective(1000px) rotateX(20deg) translateZ(-100px) translateX(${mousePos.x * -1}px) translateY(${mousePos.y * -1}px)`,
        }}
      />

      {/* Floating Particles/Orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Desktop Icons Area (Taskbar/Launcher) */}
      <div className="absolute top-0 left-0 h-full w-28 md:w-32 flex flex-col gap-6 p-4 z-50 pt-10 pointer-events-auto bg-gradient-to-r from-black/20 to-transparent">
        <Icon 
          label="whoami" 
          {...getWindowStatus(WindowType.PROFILE)}
          onClick={() => handleOpenWindow(WindowType.PROFILE)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>} 
        />
        <Icon 
          label="history" 
          {...getWindowStatus(WindowType.EXPERIENCE)}
          onClick={() => handleOpenWindow(WindowType.EXPERIENCE)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>} 
        />
        <Icon 
          label="skills" 
          {...getWindowStatus(WindowType.SKILLS)}
          onClick={() => handleOpenWindow(WindowType.SKILLS)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>} 
        />
        <Icon 
          label="exploits" 
          {...getWindowStatus(WindowType.SECURITY)}
          onClick={() => handleOpenWindow(WindowType.SECURITY)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>} 
        />
        <Icon 
          label="connect" 
          {...getWindowStatus(WindowType.CONTACT)}
          onClick={() => handleOpenWindow(WindowType.CONTACT)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>} 
        />
      </div>

      {/* Windows Area */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {windows.map((win, index) => (
          <TerminalWindow
            key={win.id}
            id={win.id}
            title={`root@satnam:~/${win.id.toLowerCase().replace(' ', '_')}`}
            isMinimized={win.isMinimized}
            isClosing={win.isClosing}
            zIndex={win.zIndex}
            onClose={() => handleCloseWindow(win.id)}
            onMinimize={() => handleMinimizeWindow(win.id)}
            onFocus={() => handleFocusWindow(win.id)}
            initialPosition={{ x: 350 + (index * 30), y: 100 + (index * 30) }}
          >
            {renderContent(win.id)}
          </TerminalWindow>
        ))}
      </div>
      
      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 crt z-[100] opacity-30 mix-blend-overlay"></div>
    </div>
  );
};
