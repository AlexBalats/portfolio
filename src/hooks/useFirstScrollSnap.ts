"use client";

import { useEffect, useRef } from "react";

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT" ||
    target.isContentEditable
  );
};

export default function useFirstScrollSnap(targetId: string) {
  const hasSnappedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!targetId) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const getScrollContainer = () => {
      const main = document.querySelector("main");
      if (main) {
        const style = window.getComputedStyle(main);
        if (/(auto|scroll|overlay)/.test(style.overflowY)) {
          return main;
        }
      }

      return document.scrollingElement;
    };

    const scrollContainer = getScrollContainer();
    const extraTarget =
      scrollContainer &&
      scrollContainer !== document.documentElement &&
      scrollContainer !== document.body
        ? scrollContainer
        : null;

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) {
        return;
      }
      cleaned = true;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (extraTarget) {
        extraTarget.removeEventListener("wheel", onWheel);
        extraTarget.removeEventListener("touchstart", onTouchStart);
        extraTarget.removeEventListener("touchmove", onTouchMove);
      }
    };

    const triggerSnap = (event?: Event) => {
      if (hasSnappedRef.current) {
        return;
      }
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }
      hasSnappedRef.current = true;
      if (event) {
        event.preventDefault();
      }
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      cleanup();
    };

    const onWheel = (event: WheelEvent) => {
      if (hasSnappedRef.current) {
        return;
      }
      if (event.deltaY <= 0) {
        return;
      }
      triggerSnap(event);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (hasSnappedRef.current || event.defaultPrevented) {
        return;
      }
      if (isEditableTarget(event.target)) {
        return;
      }
      const key = event.key;
      if (key !== "ArrowDown" && key !== "PageDown" && key !== " ") {
        return;
      }
      triggerSnap(event);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (hasSnappedRef.current || event.touches.length === 0) {
        return;
      }
      touchStartYRef.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (hasSnappedRef.current || event.touches.length === 0) {
        return;
      }
      const startY = touchStartYRef.current;
      if (startY === null) {
        return;
      }
      const currentY = event.touches[0].clientY;
      if (startY - currentY <= 8) {
        return;
      }
      triggerSnap(event);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    if (extraTarget) {
      extraTarget.addEventListener("wheel", onWheel, { passive: false });
      extraTarget.addEventListener("touchstart", onTouchStart, {
        passive: true,
      });
      extraTarget.addEventListener("touchmove", onTouchMove, {
        passive: false,
      });
    }

    return cleanup;
  }, [targetId]);
}
