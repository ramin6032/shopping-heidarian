import IntroduceProduct from "src/components/introduce/introduce";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProduct } from "src/server/actions";

export default async function productIntroduce({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(params.id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-top">
        <IntroduceProduct id={params.id} />
      </div>
    </HydrationBoundary>
  );
}
