import { z } from "zod";
import { EventSchema } from "../../../models/event";
import { router, publicProcedure } from "../trpc";

export const eventRouter = router({
  getAllEvents: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      orderBy: {name: 'asc'}
    })
  }),
  addEvent: publicProcedure
  .input(z.object({event: EventSchema}))
  .mutation(async ({input, ctx}) => {
    const event = await ctx.prisma.event.create({
        data: input.event
    })
    return event
  })
});
