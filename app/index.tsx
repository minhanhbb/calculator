import React from "react";
import { Stack } from "expo-router";
import Calculator from "./Calculator"; // hoặc code Calculator của bạn ở đây

export default function Index() {
  return (
    <>
      {/* Ẩn header hoặc đổi title */}
      <Stack.Screen options={{ headerShown: false }} />
      <Calculator />
    </>
  );
}
