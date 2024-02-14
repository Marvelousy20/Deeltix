"use client";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import React from "react";

const emotionCache = createEmotionCache({ key: "xds", prepend: true });
export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <MantineProvider>{children}</MantineProvider>;
};
