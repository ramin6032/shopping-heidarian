"use client";
import { ConfigProvider } from "antd";
import store from "src/lib/redux/store";
import { Provider } from "react-redux";

export default function App({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
