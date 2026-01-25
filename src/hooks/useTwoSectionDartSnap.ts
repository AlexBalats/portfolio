"use client";

import { useEffect, useRef } from "react";

type DartSnapOptions = {
  topId: string;
  bottomId: string;
  cooldownMs?: number;
};

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

export default function useTwoSectionDartSnap({
  topId,
  bottomId,
  cooldownMs = 800,
}: DartSnapOptions) {
  const cooldownUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!topId || !bottomId) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const topSection = document.getElementById(topId);
    const bottomSection = document.getElementById(bottomId);
    if (!topSection || !bottomSection) {
      return;
    }

    const isActiveSection = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const nearTop = Math.abs(rect.top) <= viewportHeight * 0.25;
      const nearBottom =
        Math.abs(rect.bottom - viewportHeight) <= viewportHeight * 0.25;
      return nearTop || nearBottom;
    };

    const getActive = () => {
      const topActive = isActiveSection(topSection);
      const bottomActive = isActiveSection(bottomSection);
      if (topActive && !bottomActive) {
        return "top";
      }
      if (bottomActive && !topActive) {
        return "bottom";
      }
      if (topActive && bottomActive) {
        const topDistance = Math.abs(topSection.getBoundingClientRect().top);
        const bottomDistance = Math.abs(
          bottomSection.getBoundingClientRect().top,
        );
        return topDistance <= bottomDistance ? "top" : "bottom";
      }
      return null;
    };

    const isCoolingDown = () => Date.now() < cooldownUntilRef.current;

    const snapTo = (target: HTMLElement, event?: Event) => {
      if (isCoolingDown()) {
        return;
      }
      cooldownUntilRef.current = Date.now() + cooldownMs;
      if (event) {
        event.preventDefault();
      }
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleDown = (event?: Event) => {
      if (isCoolingDown()) {
        return;
      }
      if (getActive() !== "top") {
        return;
      }
      snapTo(bottomSection, event);
    };

    const handleUp = (event?: Event) => {
      if (isCoolingDown()) {
        return;
      }
      if (getActive() !== "bottom") {
        return;
      }
      snapTo(topSection, event);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        handleDown(event);
        return;
      }
      if (event.deltaY < 0) {
        handleUp(event);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) {
        return;
      }
      if (isEditableTarget(event.target)) {
        return;
      }
      const key = event.key;
      if (key === "ArrowDown" || key === "PageDown") {
        handleDown(event);
        return;
      }
      if (key === "ArrowUp" || key === "PageUp") {
        handleUp(event);
        return;
      }
      if (key === " ") {
        if (event.shiftKey) {
          handleUp(event);
        } else {
          handleDown(event);
        }
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return;
      }
      touchStartYRef.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return;
      }
      const startY = touchStartYRef.current;
      if (startY === null) {
        return;
      }
      const currentY = event.touches[0].clientY;
      const delta = startY - currentY;
      if (delta > 12) {
        handleDown(event);
        return;
      }
      if (delta < -12) {
        handleUp(event);
      }
    };

    const scrollContainer = getScrollContainer();
    const extraTarget =
      scrollContainer instanceof HTMLElement &&
      scrollContainer !== document.documentElement &&
      scrollContainer !== document.body
        ? scrollContainer
        : null;

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

    return () => {
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
  }, [topId, bottomId, cooldownMs]);
}
