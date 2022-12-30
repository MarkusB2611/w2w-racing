import { z } from 'zod'

export const DriverSchema = z.object({
    name: z.string(),
    timezone: z.object({
        name: z.string(),
        offset: z.number(),
    }),
    accountId: z.number(),
    irating: z.number().optional(),
    isStarter: z.boolean(),
})

export type Driver = z.infer<typeof DriverSchema>
