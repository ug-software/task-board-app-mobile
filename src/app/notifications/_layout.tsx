/** @format */

import React from "react";
import { Slot } from "expo-router";
import { Layout } from "@/src/components/layout";

export default function RootLayout() {
  return (
    <Layout showHeaderApp={true} showAppBar={true}>
      <Slot />
    </Layout>
  );
}
