"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function GuidedTour() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("kane-tour-seen");
    if (seen) return;

    (async () => {
      const { driver } = await import("driver.js");
      // @ts-expect-error - driver.js ships CSS without types
      await import("driver.js/dist/driver.css");

      const d = driver({
        showProgress: true,
        overlayColor: "rgba(21, 52, 82, 0.65)",
        stagePadding: 6,
        stageRadius: 2,
        popoverClass: "kane-tour",
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Finish",
        steps: [
          {
            element: '[data-tour="brand"]',
            popover: {
              title: "Welcome to the Kane County Community Health Atlas",
              description:
                "A five-step tour of how residents, partners, and KCHD staff use this dashboard.",
            },
          },
          {
            element: '[data-tour="nav"]',
            popover: {
              title: "Six public sections",
              description:
                "Overview, an interactive county map, priority area deep dives, a standalone health equity dashboard, a custom report builder, and the full data and methods documentation.",
            },
          },
          {
            element: '[data-tour="search"]',
            popover: {
              title: "Search the atlas",
              description:
                "One search bar across indicators, places, and priority areas. Press ⌘K anywhere to open it.",
            },
          },
          {
            element: '[data-tour="language"]',
            popover: {
              title: "English, Spanish, Polish",
              description:
                "Switch languages at any point. Interface, content, and exported reports all translate.",
            },
          },
          {
            element: '[data-tour="indicators"]',
            popover: {
              title: "Indicators, disaggregated",
              description:
                "Every headline indicator links to a priority area page with demographic cross-tabs and a geographic view.",
            },
          },
        ],
        onDestroyed: () => {
          localStorage.setItem("kane-tour-seen", "1");
        },
      });

      // Delay to allow hydration
      setTimeout(() => d.drive(), 900);
    })();
  }, [pathname]);

  return null;
}
