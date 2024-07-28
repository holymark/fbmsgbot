import  { Router } from "express";
import WebHook from "./controllers";
import { configDotenv } from "dotenv";

const router = Router()
configDotenv()

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const webhook = new WebHook(VERIFY_TOKEN!, PAGE_ACCESS_TOKEN!)
router.get("/webhooks", webhook.get_webhook)
router.post("/webhooks", webhook.post_webhook)

export default router
export { webhook }
export type { WebHook }