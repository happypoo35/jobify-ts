import { publicProcedure, router } from "../trpc";
import { z } from "zod";

import { userRouter } from "./user";
import { jobRouter } from "./job";

export const appRouter = router({
  user: userRouter,
  job: jobRouter,
  hello: publicProcedure.query(() => "hello world"),
});

export type AppRouter = typeof appRouter;
