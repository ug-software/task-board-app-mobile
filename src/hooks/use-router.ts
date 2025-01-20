/** @format */

import { Href, usePathname, useRouter } from "expo-router";

export default () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirect = (href: Href<string | object>) => {
    return () => {
      router.replace(href);
    };
  };

  const isMatch = (path: string) => {
    return pathname === path;
  };

  return { redirect, isMatch };
};
