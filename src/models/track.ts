import {z} from "zod";

export const TrackSchema = z.object({
    name: z.string(),
    length: z.number(),
    pitstopTimes: z.array(z.object({
        car: z.string(),
        time: z.number()
    }))
})

export type Track = z.infer<typeof TrackSchema>

