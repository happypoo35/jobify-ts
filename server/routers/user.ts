import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import User from "../models/user.model";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // try {
      const user = await User.create(input);
      user.createAndSendJWT(user, ctx.req, ctx.res);

      return {
        user,
      };
      // } catch (err: any) {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "Duplicate key",
      //     cause: err,
      //   });
      // }
    }),
});
