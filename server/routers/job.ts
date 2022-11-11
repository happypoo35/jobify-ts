import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import Job from "../models/job.model";

export const jobRouter = router({
  foo: publicProcedure.query(() => "Hello from trpc"),
  id: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await Job.findById(input);
  }),
  list: publicProcedure.query(async () => {
    return await Job.find();
  }),
  stats: publicProcedure.query(async () => {}),
});
