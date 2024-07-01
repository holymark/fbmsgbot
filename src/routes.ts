import  { Router } from "express";
import WebHook from "./controllers";

const router = Router()

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const webhook = new WebHook(VERIFY_TOKEN!, PAGE_ACCESS_TOKEN!)

router.get("/webhook", webhook.get_webhook)
router.post("/webhook", webhook.post_webhook)

export default router
export { webhook }
export type { WebHook }