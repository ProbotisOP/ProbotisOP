import React, { useState } from 'react';
import { BootLoader } from './components/BootLoader';
import { Desktop } from './components/Desktop';
import { MouseTrail } from './components/MouseTrail';
import { ContextMenu } from './components/ContextMenu';
import { SecurityBreach } from './components/SecurityBreach';
import { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.BOOTING);
  const [securityBreach, setSecurityBreach] = useState(false);

  const handleSecurityBreach = () => {
    setSecurityBreach(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setSecurityBreach(false);
    }, 3500);
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden text-green-500 font-mono antialiased cursor-default">
      <MouseTrail />
      <ContextMenu onSecurityBreach={handleSecurityBreach} />
      
      {securityBreach && <SecurityBreach />}

      {appState === AppState.BOOTING && (
        <BootLoader onComplete={() => setAppState(AppState.DESKTOP)} />
      )}
      {appState === AppState.DESKTOP && (
        <Desktop />
      )}
    </div>
  );
}

export default App;