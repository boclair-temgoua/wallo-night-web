import "@/styles/globals.css";
import "animate.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import "react-quill/dist/quill.snow.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "toastify-js/src/toastify.css";

import { LoadingFile } from "@/components/ui";
import { ClientOnly } from "@/components/util/client-only";
import { ContextUserProvider } from "@/components/util/context-user";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientOnly fallback={<LoadingFile />}>

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

      </ClientOnly>
    </QueryClientProvider>
  );
}
