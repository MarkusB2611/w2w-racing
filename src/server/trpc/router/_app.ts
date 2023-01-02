import { router } from "../trpc";
import { authRouter } from "./auth";
import { carRouter } from "./car";
import { driverRouter } from "./driver";
import { eventRouter } from "./event";
import { trackRouter } from "./track";

export const appRouter = router({
  driver: driverRouter,
  auth: authRouter,
  track: trackRouter,
  car: carRouter,
  event: eventRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
