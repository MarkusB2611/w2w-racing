import {z} from "zod";

export const TeamSchema = z.object({
    name: z.string(),
    drivers: z.array(z.object({
        driver: z.string(),
        fuelPerLap: z.number(),
        averageLapTime: z.number()
    })),
    car: z.string(),
    startTime: z.date(),
    ingameStartTime: z.date(),
    raceDuration: z.number(),
    greenFlagOffset: z.number()
})

export type Team = z.infer<typeof TeamSchema>

