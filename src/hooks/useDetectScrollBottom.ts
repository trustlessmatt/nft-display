import { useEffect, useState } from "react";
/*
 * Hook that returns true or false based on whether screen has reached bottom
 */

export const useDetectScrollBottom = () => {
  const [isBottom, setIsBottom] = useState<boolean>(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const onScroll = () => {
      const bottom: boolean =
        Math.ceil(window.innerHeight + (window.scrollY + 500)) >=
        document.documentElement.scrollHeight;
      if (bottom !== isBottom) setIsBottom(bottom);

      // detects scroll end and set isBottom to false to prevent additional api calls
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsBottom(false);
      }, 150);
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
      clearTimeout(timeout);
    };
  }, [isBottom]);

  return isBottom;
};
