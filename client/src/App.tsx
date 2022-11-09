// import { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";

// function App() {
//   const [queryClient] = useState(() => new QueryClient());
//   const [trpcClient] = useState(() =>
//     trpc.createClient({
//       links: [
//         httpBatchLink({
//           url: "http://localhost:8000/trpc",
//         }),
//       ],
//     })
//   );

//   return (
//     <trpc.Provider client={trpcClient} queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>
//         <Content />
//       </QueryClientProvider>
//     </trpc.Provider>
//   );
// }

// const Content = () => {
//   const { data: jobs } = trpc.job.list.useQuery();
//   const { data: job } = trpc.job.id.useQuery("6288e527bf0ca5220938a52b");
//   console.log(job);

//   return (
//     <div className="App">
//       <h1>Hello world</h1>
//     </div>
//   );
// };

// export default App;

export default function App() {
  // const { data: jobs } = trpc.job.list.useQuery();
  const { data: job } = trpc.job.id.useQuery("6288e527bf0ca5220938a52b");
  console.log(job);

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}
