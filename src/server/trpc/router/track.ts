import { z } from "zod";
import { TrackSchema } from "../../../models/track";
import { router, publicProcedure } from "../trpc";

export const trackRouter = router({
  getAllTracks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.track.findMany({
      orderBy: {name: 'asc'}
    })
  }),
  addTrack: publicProcedure
  .input(z.object({track: TrackSchema}))
  .mutation(async ({input, ctx}) => {
    const track = await ctx.prisma.track.create({
        data: input.track
    })
    return track
  })
});
