import { z } from "zod";
import { CarSchema } from "../../../models/car";
import { router, publicProcedure } from "../trpc";

export const carRouter = router({
  getAllCars: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.car.findMany({
      orderBy: [
        {class: 'asc'},
        {name: 'asc'}
      ]
    })
  }),
  addCar: publicProcedure
  .input(z.object({car: CarSchema}))
  .mutation(async ({input, ctx}) => {
    const car = await ctx.prisma.car.create({
        data: input.car
    })
    return car
  })
});
