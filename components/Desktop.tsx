import React, { useState, useEffect } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { RESUME_DATA } from '../constants';
import { WindowType, WindowState } from '../types';

const Icon: React.FC<{ label: string; icon: React.ReactNode; onClick: () => void; active: boolean; minimized: boolean }> = ({ label, icon, onClick, active, minimized }) => (
  <button 
    onClick={onClick}
    className={`
      group flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg transition-all duration-300
      hover:bg-white/10 backdrop-blur-sm w-16 md:w-24 relative touch-manipulation flex-shrink-0
      ${active ? 'bg-white/5 ring-1 ring-green-500/50' : ''}
    `}
  >
    <div className={`
      w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110 active:scale-95
      ${active ? 'bg-gray-800 text-green-400 shadow-green-500/20' : 'bg-black/80 text-gray-400 border border-gray-700'}
    `}>
      <div className="w-5 h-5 md:w-6 md:h-6">
        {icon}
      </div>
    </div>
    <span className="text-[10px] md:text-xs font-mono text-gray-300 bg-black/50 px-1.5 md:px-2 py-0.5 md:py-1 rounded backdrop-blur-md border border-gray-800 group-hover:text-green-400 transition-colors truncate max-w-full">
      {label}
    </span>
    {/* Status Indicator */}
    {active && (
      <div className={`absolute right-1 top-1 w-2 h-2 rounded-full ${minimized ? 'bg-yellow-500' : 'bg-green-500'} shadow-lg ring-1 ring-black`}></div>
    )}
  </button>
);

export const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [topZIndex, setTopZIndex] = useState(50);

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
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-green-500 p-1 shadow-[0_0_20px_rgba(34,197,94,0.4)] relative overflow-hidden group flex-shrink-0">
                  <img src="https://picsum.photos/200/200?grayscale" alt="Satnam" className="w-full h-full rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-green-500/20 animate-pulse rounded-full"></div>
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tighter">
                    <span className="text-green-500">$</span> {RESUME_DATA.personal.name}
                  </h1>
                  <p className="text-base md:text-lg text-gray-300 font-light border-b border-gray-700 pb-2">
                    {RESUME_DATA.personal.role}
                  </p>
                  <div className="text-xs md:text-sm text-gray-400 mt-2 font-mono space-y-1">
                    <p><span className="text-green-500 font-semibold">Location:</span> {RESUME_DATA.personal.location}</p>
                    <p><span className="text-green-500 font-semibold">Contact:</span> {RESUME_DATA.personal.email} | {RESUME_DATA.personal.phone}</p>
                    <p className="text-gray-500">Groups: data-analytics, software-engineering, security-research, cloud-devops</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                    <a 
                      href="./Satnam_ResumeCO-OP.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-950/60 hover:bg-green-900 border border-green-500/70 text-green-300 hover:text-white rounded text-xs font-mono transition-all hover:shadow-[0_0_12px_rgba(34,197,94,0.3)]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <span>Download Resume (PDF)</span>
                    </a>
                    <a 
                      href={RESUME_DATA.personal.links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-blue-900/30 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-blue-300 rounded text-xs font-mono transition-all"
                    >
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href={RESUME_DATA.personal.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-white/10 border border-gray-700 hover:border-gray-400 text-gray-300 hover:text-white rounded text-xs font-mono transition-all"
                    >
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border border-gray-700 rounded bg-black/40 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
                 <h3 className="text-green-400 mb-2 font-bold flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                   Professional Summary
                 </h3>
                 <p className="leading-relaxed text-gray-300 text-sm md:text-base">
                   {RESUME_DATA.personal.summary}
                 </p>
              </div>

              <div className="mt-6">
                <h3 className="text-green-400 mb-3 font-bold border-b border-gray-800 pb-1">Education</h3>
                {RESUME_DATA.education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row justify-between text-sm mb-3 hover:bg-white/5 p-2 rounded transition-colors cursor-default border border-transparent hover:border-gray-800">
                    <div className="flex-1 pr-2">
                      <span className="text-white font-bold">{edu.degree}</span>
                      <br/>
                      <span className="text-gray-400">{edu.school}</span>
                      {edu.details && (
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed bg-black/30 p-2 rounded border border-gray-800/80">
                          {edu.details}
                        </p>
                      )}
                    </div>
                    <div className="text-left md:text-right mt-1 md:mt-0 flex-shrink-0">
                      <span className="text-green-500 font-mono text-xs">{edu.year}</span>
                      {edu.gpa && (
                        <div>
                          <span className="text-gray-500 text-xs font-mono">GPA: {edu.gpa}</span>
                        </div>
                      )}
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
                     <h3 className="text-lg md:text-xl font-bold text-green-400">{job.company}</h3>
                     <span className="text-xs md:text-sm bg-gray-800 px-2 py-0.5 rounded text-gray-300 border border-gray-600 font-mono mt-1 md:mt-0">{job.period}</span>
                   </div>
                   <h4 className="text-white mb-3 italic text-sm md:text-base font-semibold">{job.role}</h4>
                   
                   <ul className="space-y-2">
                     {job.highlights.map((hl, i) => (
                       <li key={i} className="text-xs md:text-sm text-gray-300 pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-green-500 hover:text-white transition-colors leading-relaxed">
                         {hl}
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
        );
      case WindowType.PROJECTS:
        return (
             <div className="space-y-6">
                <div className="font-mono text-xs text-gray-500 border-b border-gray-800 pb-2">
                   $ ls -la ~/projects/featured
                </div>
                {RESUME_DATA.projects.map((proj, idx) => (
                   <div key={idx} className="bg-gray-900/60 border border-gray-800 hover:border-green-500/60 p-4 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                         <h3 className="text-base md:text-lg font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-2">
                            <span className="text-green-500 font-mono">#</span> {proj.name}
                         </h3>
                         {proj.metric && (
                            <span className="text-xs bg-green-950/80 border border-green-600/50 text-green-300 px-2.5 py-0.5 rounded-full font-mono self-start md:self-auto">
                               {proj.metric}
                            </span>
                         )}
                      </div>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                         {proj.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-800/80">
                         <div className="flex flex-wrap gap-1.5">
                            {proj.tech.map((t, ti) => (
                               <span key={ti} className="px-2 py-0.5 bg-black/80 border border-gray-800 text-[11px] text-gray-300 rounded font-mono group-hover:border-green-900/60">
                                  {t}
                               </span>
                            ))}
                         </div>
                         {proj.github && (
                            <a 
                               href={proj.github} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 font-mono hover:underline"
                            >
                               <span>Source Code</span>
                               <span>→</span>
                            </a>
                         )}
                      </div>
                   </div>
                ))}
             </div>
        );
      case WindowType.SKILLS:
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {RESUME_DATA.skills.map((skillCat, idx) => (
                  <div key={idx} className="bg-gray-900/50 border border-gray-800 p-4 rounded hover:border-green-500/50 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:-translate-y-0.5 transform duration-300">
                    <h3 className="text-green-400 font-bold mb-3 uppercase tracking-wider border-b border-dashed border-gray-700 pb-2 text-xs md:text-sm flex items-center justify-between">
                      <span>{skillCat.category}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{skillCat.items.length} modules</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillCat.items.map((item, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 bg-black border border-green-900/70 text-xs text-gray-300 rounded hover:bg-green-900/30 hover:text-white hover:border-green-500 transition-colors cursor-crosshair font-mono"
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
                <div className="mb-4 text-gray-500 text-xs">
                  <p>Metasploit Console</p>
                  <p>Version: 6.4-sec-audit</p>
                  <p className="text-red-500 font-bold animate-pulse"> [!] Security Clearance: LEVEL 5 (ROOT)</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-blue-400 font-bold">msf6 &gt;</span> <span className="text-white">show achievements</span>
                    <div className="mt-2 space-y-3 border-l-2 border-blue-900 pl-4 ml-2">
                      {RESUME_DATA.security.achievements.map((ach, i) => (
                        <div key={i} className="group">
                          <p className="text-yellow-400 font-bold group-hover:text-yellow-200 transition-colors text-sm">{ach.title}</p>
                          <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">{ach.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-blue-400 font-bold">msf6 &gt;</span> <span className="text-white">run hall_of_fame.rb</span>
                    <div className="mt-2 bg-black p-3 rounded border border-gray-800">
                      {RESUME_DATA.security.hallOfFame.map((hof, i) => (
                        <div key={i} className="flex items-center gap-2 mb-1.5 text-xs md:text-sm">
                           <span className="text-green-500">[+]</span>
                           <span className="text-gray-300">Honorable Mention: <span className="text-white font-bold">{hof}</span></span>
                        </div>
                      ))}
                      <div className="mt-2 text-gray-600 text-xs italic">
                        Payload delivered successfully. Responsible disclosure verified.
                      </div>
                    </div>
                  </div>

                  <div>
                     <span className="text-blue-400 font-bold">msf6 &gt;</span> <span className="text-white">cat /etc/certs</span>
                     <div className="mt-2 grid grid-cols-1 gap-2">
                        {RESUME_DATA.security.certifications.map((cert, i) => (
                          <div key={i} className="bg-gray-800/50 p-2.5 border-l-4 border-purple-500 flex items-center justify-between text-xs md:text-sm">
                             <div>
                               <span className="text-white font-semibold">{cert.name}</span>
                               <span className="text-gray-500 ml-2">({cert.issuer})</span>
                             </div>
                             <span className="text-[10px] bg-purple-900/80 text-purple-200 border border-purple-600 px-2 py-0.5 rounded font-mono">VERIFIED</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
             </div>
        );
      case WindowType.CONTACT:
        return (
             <div className="flex flex-col items-center justify-center h-full space-y-6 text-center py-4">
                <div className="w-full max-w-lg bg-black border border-green-800 p-6 shadow-[0_0_30px_rgba(34,197,94,0.15)] rounded">
                   <div className="text-left mb-4 border-b border-gray-800 pb-2 text-gray-500 text-xs font-mono">
                     Listening on [satnam-server] : 1337 ... ESTABLISHED
                   </div>
                   <div className="space-y-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-green-500 text-xs uppercase font-mono tracking-wider">Email Protocol</span>
                        <a href={`mailto:${RESUME_DATA.personal.email}`} className="text-sm md:text-lg lg:text-xl text-white hover:text-green-400 hover:bg-green-900/20 transition-all p-2 rounded break-all font-mono">
                          {RESUME_DATA.personal.email}
                        </a>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left bg-gray-900/50 p-3 rounded border border-gray-800 text-xs font-mono">
                        <div>
                           <span className="text-gray-500 block">Phone:</span>
                           <span className="text-gray-200">{RESUME_DATA.personal.phone}</span>
                        </div>
                        <div>
                           <span className="text-gray-500 block">Location:</span>
                           <span className="text-gray-200">{RESUME_DATA.personal.location}</span>
                        </div>
                     </div>
                     
                     <div className="flex justify-center gap-4 mt-6">
                        <a 
                          href={RESUME_DATA.personal.links.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors group"
                        >
                           <div className="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all">
                             <span className="font-bold text-sm">in</span>
                           </div>
                           <span className="text-xs">LinkedIn</span>
                        </a>

                        <a 
                          href={RESUME_DATA.personal.links.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-white transition-colors group"
                        >
                           <div className="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                             <span className="font-bold text-sm">Git</span>
                           </div>
                           <span className="text-xs">GitHub</span>
                        </a>

                        <a 
                          href="./Satnam_ResumeCO-OP.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors group"
                        >
                           <div className="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center group-hover:border-green-500 group-hover:bg-green-500/10 transition-all">
                             <span className="font-bold text-sm">PDF</span>
                           </div>
                           <span className="text-xs">Resume</span>
                        </a>
                     </div>
                   </div>
                   <div className="mt-6 text-left pt-2 border-t border-gray-800">
                      <span className="animate-pulse text-green-500 font-mono">root@satnam:~$ _</span>
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
      
      {/* Background Grid - Simplified on mobile */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 md:opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: window.innerWidth >= 768 
            ? `perspective(1000px) rotateX(20deg) translateZ(-100px) translateX(${mousePos.x * -1}px) translateY(${mousePos.y * -1}px)`
            : 'none',
        }}
      />

      {/* Floating Particles/Orbs for depth - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="hidden md:block absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Desktop Icons Area (Taskbar/Launcher) */}
      <div className="absolute top-0 left-0 h-full w-20 md:w-32 flex flex-col gap-3 md:gap-5 p-2 md:p-4 z-10 pt-4 md:pt-8 pointer-events-auto bg-gradient-to-r from-black/40 md:from-black/20 to-transparent overflow-y-auto scrollbar-none">
        <Icon 
          label="whoami" 
          {...getWindowStatus(WindowType.PROFILE)}
          onClick={() => handleOpenWindow(WindowType.PROFILE)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>} 
        />
        <Icon 
          label="history" 
          {...getWindowStatus(WindowType.EXPERIENCE)}
          onClick={() => handleOpenWindow(WindowType.EXPERIENCE)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>} 
        />
        <Icon 
          label="projects" 
          {...getWindowStatus(WindowType.PROJECTS)}
          onClick={() => handleOpenWindow(WindowType.PROJECTS)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>} 
        />
        <Icon 
          label="skills" 
          {...getWindowStatus(WindowType.SKILLS)}
          onClick={() => handleOpenWindow(WindowType.SKILLS)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>} 
        />
        <Icon 
          label="exploits" 
          {...getWindowStatus(WindowType.SECURITY)}
          onClick={() => handleOpenWindow(WindowType.SECURITY)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>} 
        />
        <Icon 
          label="connect" 
          {...getWindowStatus(WindowType.CONTACT)}
          onClick={() => handleOpenWindow(WindowType.CONTACT)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>} 
        />
      </div>

      {/* Windows Area */}
      <div className="absolute inset-0 pointer-events-none">
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
            initialPosition={{ x: 320 + (index * 25), y: 70 + (index * 25) }}
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
