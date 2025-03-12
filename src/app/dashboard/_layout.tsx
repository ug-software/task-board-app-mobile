/** @format */

import React from "react";
import { Slot } from "expo-router";
import { Layout } from "@/src/components/layout";

export default function RootLayout() {
  return (
    <Layout showHeaderApp={false} showAppBar={true}>
      <Slot />
    </Layout>
  );
}
