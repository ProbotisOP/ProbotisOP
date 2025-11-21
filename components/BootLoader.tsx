import React, { useEffect, useState, useRef } from 'react';

// Define sequence outside component
const BOOT_SEQUENCE = [
  "[    0.000000] Linux version 6.8.11-amd64 (satnam@kali) (gcc-13)",
  "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.8.11-amd64 root=UUID=1337-cafe ro quiet splash",
  "[    0.081253] KERNEL: Arch: x86_64, CPU: AMD Ryzen 9 7950X, MHz: 4500.00",
  "[    0.122210] console [tty0] enabled",
  "[    0.452110] ACPI: Core revision 20230628",
  "[    0.912333] input: Power Button as /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0C0C:00/input/input0",
  "[ OK ] Reached target System Initialization.",
  "[ OK ] Started CUPS Scheduler.",
  "[ OK ] Started Network Manager Script Dispatcher Service.",
  "[ OK ] Found device /dev/nvme0n1 (2TB SSD).",
  "[ OK ] Mounted /boot/efi.",
  " ",
  "$ systemctl start docker.service",
  "[ OK ] Started Docker Application Container Engine.",
  "$ service postgresql start",
  "[ OK ] Started PostgreSQL RDBMS.",
  " ",
  "$ whoami",
  "root",
  "$ uname -r",
  "6.8.11-kali-amd64",
  " ",
  "$ ./init_portfolio_env.sh",
  "[+] Verifying system integrity...",
  "[+] Loading components: [Experience, Projects, Skills]",
  "[+] Starting display manager...",
  "[+] Initializing graphical interface (X11)...",
  " ",
  "Login successful. Welcome, Satnam.",
  "Starting Desktop Environment..."
];

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const processLine = () => {
      if (currentIndex >= BOOT_SEQUENCE.length) {
        // Sequence finished, wait a bit then complete
        timeoutId = setTimeout(() => {
          onComplete();
        }, 800);
        return;
      }

      const line = BOOT_SEQUENCE[currentIndex];
      
      // Skip undefined lines to prevent errors
      if (!line && line !== '') {
        currentIndex++;
        processLine();
        return;
      }

      setLogs(prev => [...prev, line]);

      // Calculate dynamic delay based on line content to simulate realism
      let delay = 20; // Default fast scroll for kernel messages

      if (line.startsWith('$')) {
        delay = 500; // Commands take time to "type" and "execute"
      } else if (line.startsWith('[+]')) {
        delay = 250; // Loading components takes a moment
      } else if (line.trim() === '') {
        delay = 300; // Pause on empty lines for visual pacing
      } else if (line.includes('Starting Desktop')) {
        delay = 1000; // Long pause before final switch
      }

      currentIndex++;
      timeoutId = setTimeout(processLine, delay);
    };

    // Start the sequence
    timeoutId = setTimeout(processLine, 100);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 bg-black text-gray-300 font-mono text-xs md:text-sm p-4 md:p-8 z-50 flex flex-col justify-end pb-12 cursor-none">
      <div 
        ref={logContainerRef}
        className="w-full max-w-4xl mx-auto h-full overflow-hidden flex flex-col justify-end font-mono leading-snug"
      >
        {logs.map((log, idx) => {
          // Safety check
          if (!log && log !== '') return null;

          // Styling logic
          const isCommand = log.startsWith('$');
          const isSuccess = log.includes('[ OK ]') || log.includes('[+]');
          const isKernel = log.startsWith('[');
          
          return (
            <div key={idx} className="whitespace-pre-wrap break-words">
              {isCommand ? (
                <span className="text-white font-bold">{log}</span>
              ) : isSuccess ? (
                <span>
                  <span className="text-green-500">{log.split(']')[0]}]</span>
                  <span className="text-gray-400">{log.split(']')[1]}</span>
                </span>
              ) : isKernel ? (
                <span className="text-gray-500">{log}</span>
              ) : (
                <span className="text-gray-300">{log}</span>
              )}
            </div>
          );
        })}
        <div className="animate-pulse text-green-500 mt-1">_</div>
      </div>
    </div>
  );
};