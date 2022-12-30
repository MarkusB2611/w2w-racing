import { router } from "../trpc";
import { authRouter } from "./auth";
import { driverRouter } from "./driver";
import { trackRouter } from "./track";

export const appRouter = router({
  driver: driverRouter,
  auth: authRouter,
  track: trackRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
