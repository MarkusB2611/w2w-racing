import { router } from "../trpc";
import { authRouter } from "./auth";
import { driverRouter } from "./driver";

export const appRouter = router({
  driver: driverRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
