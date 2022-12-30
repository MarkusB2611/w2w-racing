import {z} from "zod";

export const CarSchema = z.object({
    name: z.string(),
    class: z.string(),
    fuelTankSize: z.number(),
    tireChangeTime: z.number(),
    tireChangeWhileRefueling: z.boolean()
})

export type Car = z.infer<typeof CarSchema>

