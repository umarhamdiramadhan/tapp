import express from "express";
import { publicRouter } from "../route/public-api";
import { privateRouter } from "../route/private-api";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express()
web.use(express.json())
web.use(publicRouter)
web.use(privateRouter)
web.use(errorMiddleware)