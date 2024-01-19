"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import store from "src/lib/redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ConfigProvider
          direction="rtl"
          theme={{
            token: {
              fontFamily: "Vazirmatn, tahoma",
            },
            components: {
              Card: {
                headerFontSize: 14,
              },
              Button: {
                textHoverBg: "transparent",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  );
}
