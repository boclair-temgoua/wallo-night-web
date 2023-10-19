import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { NextIntlProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import "react-quill/dist/quill.snow.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "toastify-js/src/toastify.css";
import "animate.css";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextUserProvider } from "@/components/util/context-user";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ConfigProvider>
          <ContextUserProvider>
            <Component {...pageProps} />

            {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
              <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
            )}
          </ContextUserProvider>
        </ConfigProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
