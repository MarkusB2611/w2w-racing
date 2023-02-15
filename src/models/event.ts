import {z} from "zod";

export const EventSchema = z.object({
    name: z.string(),
    date: z.date(),
    duration: z.number(),
    trackId: z.string(),
    greenFlagOffset: z.number(),
    simStartTime: z.date(),
    sunrise: z.date(),
    sunset: z.date(),
    carClasses: z.array(z.object({id: z.string(), text: z.string()}))
    })

export type Event = z.infer<typeof EventSchema>