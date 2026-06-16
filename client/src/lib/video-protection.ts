import { useEffect, useRef, useState } from "react";

/** True when the device is likely a touch-only mobile device */
const isMobile = () =>
  typeof window !== "undefined" &&
  (navigator.maxTouchPoints > 1 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));

/**
 * Hook to apply various deterrence measures against screen recording and screenshots.
 * Note: Full prevention is impossible in a browser without DRM, but these measures
 * make it significantly more difficult for casual users.
 */
export function useVideoProtection(isActive: boolean) {
  const [isLocked, setIsLocked] = useState(false);
  const [lockReason, setLockReason] = useState<"blur" | "shortcut" | null>(null);

  const resetLock = () => {
    setIsLocked(false);
    setLockReason(null);
  };

  // Track whether the grace period after mount has elapsed.
  // On mobile, blur/visibility events fire during page load, scroll, and
  // keyboard-show animations — we ignore them for the first 2 seconds.
  const readyRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const mobile = isMobile();

    // Grace period: don't react to focus-loss events right after mounting
    const gracePeriod = setTimeout(() => {
      readyRef.current = true;
    }, 2000);

    // 1. Block Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Block Keyboard Shortcuts & Trigger Lock (desktop only — no hardware keyboard on most phones)
    const handleKeyDown = (e: KeyboardEvent) => {
      let shouldLock = false;

      // Print Screen
      if (e.key === "PrintScreen") {
        shouldLock = true;
      }
      // Ctrl+P / Cmd+P
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        shouldLock = true;
      }
      // Ctrl+S / Cmd+S
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        shouldLock = true;
      }
      // Ctrl+U / Cmd+Option+U (View Source)
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
        shouldLock = true;
      }
      // DevTools: F12
      else if (e.key === "F12") {
        shouldLock = true;
      }
      // DevTools: Ctrl+Shift+I / J / C or Cmd+Option+I (Mac)
      else if (
        (e.ctrlKey || e.metaKey) &&
        (e.shiftKey || e.altKey) &&
        ["i", "j", "c"].includes(e.key.toLowerCase())
      ) {
        shouldLock = true;
      }
      // macOS Screenshot shortcuts (Cmd+Shift+3 / 4 / 5)
      else if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        shouldLock = true;
      }

      if (shouldLock) {
        e.preventDefault();
        e.stopPropagation();
        setIsLocked(true);
        setLockReason("shortcut");
        return false;
      }
    };

    // 3a. Tab Visibility — lock immediately when tab is hidden.
    //     The 2-second grace period above already handles load-time false
    //     positives. Debouncing here would let screen-recording attempts
    //     slip through (user swipes down to start recorder → tab briefly
    //     hides → comes back → debounce cancels the lock).
    const handleVisibilityChange = () => {
      if (!readyRef.current) return; // still in grace period
      if (document.hidden) {
        setIsLocked(true);
        setLockReason("blur");
      }
    };

    // 3b. Window blur — SKIP on mobile.
    //     On iOS/Android `window blur` fires on every address-bar show,
    //     keyboard open, scroll bounce, and system-UI animation, making it
    //     completely unreliable as a screen-recording signal.
    const handleBlur = () => {
      if (!readyRef.current) return; // still in grace period
      if (mobile) return;            // not reliable on touch devices
      setIsLocked(true);
      setLockReason("blur");
    };

    // 4. Detect DevTools Opening — desktop only.
    //    On mobile the window/outer size difference is unrelated to DevTools.
    let devToolsCheck: ReturnType<typeof setInterval> | null = null;
    if (!mobile) {
      devToolsCheck = setInterval(() => {
        const threshold = 160;
        const isDevToolsOpen =
          window.outerWidth - window.innerWidth > threshold ||
          window.outerHeight - window.innerHeight > threshold;
        if (isDevToolsOpen) {
          setIsLocked(true);
          setLockReason("shortcut");
        }
      }, 2000);
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      clearTimeout(gracePeriod);
      if (devToolsCheck) clearInterval(devToolsCheck);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isActive]);

  return { isLocked, lockReason, resetLock };
}

/**
 * Hook to manage a floating watermark position
 */
export function useFloatingWatermark(isActive: boolean) {
  const [position, setPosition] = useState({ top: 10, left: 10 });

  useEffect(() => {
    if (!isActive) return;

    const moveWatermark = () => {
      const top = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      const left = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      setPosition({ top, left });
    };

    const interval = setInterval(moveWatermark, 6000); // Move every 6 seconds for tighter security
    moveWatermark();

    return () => clearInterval(interval);
  }, [isActive]);

  return position;
}
