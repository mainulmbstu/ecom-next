import { Suspense } from "react";
import Skeleton from "@/lib/components/Skeleton";
import Home1 from "./Home1";

const Home = async ({ searchParams }) => {
  return (
    <Suspense fallback=<Skeleton />>
      <Home1 searchParams={searchParams} />
    </Suspense>
  );
};

export default Home;
