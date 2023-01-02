import {z} from "zod";

export const EventSchema = z.object({
    name: z.string(),
    duration: z.number(),
    trackId: z.string(),
    greenFlagOffset: z.number().optional(),
    simStartTime: z.date().optional(),
    sunrise: z.date().optional(),
    sunset: z.date().optional()
    })

export type Event = z.infer<typeof EventSchema>