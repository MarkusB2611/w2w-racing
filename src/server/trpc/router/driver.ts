import { z } from "zod";
import { DriverSchema } from "../../../models/driver";

import { router, publicProcedure } from "../trpc";

export const driverRouter = router({
  getAllDrivers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.driver.findMany();
  }),
  addDriver: publicProcedure
  .input(z.object({driver: DriverSchema}))
  .mutation(async ({input, ctx}) => {
    const driver = await ctx.prisma.driver.create({
        data: input.driver
    })
    return driver
  })
});
