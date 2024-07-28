import { Request, Response } from "express";
import request from "request";

class WebHook {
     verify_token: string;
     page_access_token: string;

    // Initialize the WebHook class with the provided verify token and page access token
    constructor(verify_token: string, page_access_token: string) {
        this.verify_token = verify_token;
        this.page_access_token = page_access_token;
    }
    // Define the routes for the webhook
    public async get_webhook(req: Request, res: Response) {
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        // console.log(mode, token, challenge);

        // Check if the request is a verification request
        if (mode && token) {
            // console.log({ VERIFY_TOKEN: this.page_access_token, PAGE_ACCESS_TOKEN:this.verify_token })

            if  (mode === 'subscribe' && token ===  this.verify_token) {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        }
    }
    // Define the route for handling incoming messages
    public async post_webhook(req: Request, res: Response) {
        const body = req.body;
        if (body.object === 'page') {
            body.entry.forEach((entry: any) => {
                entry.messaging.forEach((event: any) => {
                    if (event.message) {
                        this.send_message(event);
                    }
                });
            });
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
    // Send a message to the recipient
     async send_message(event: any) {
        const sender_id = event.sender.id;
        const recipient_id = event.recipient.id;
        const message = event.message;

        if (message.text) {
            const response = {
                recipient: {
                    id: sender_id
                },
                message: {
                    text: `You sent the message: ${message.text}`
                }
            }
            request({
                uri: 'https://graph.facebook.com/v20.0/me/messages',
                qs: { access_token: this.page_access_token },
                method: 'POST',
                json: response
            },
                (error: any, response: any, body: any) => {
                    if (error) {
                        console.error('Error sending messages: ', error);
                    } else if (response.statusCode >= 400) {
                        console.error('Error sending messages: ', body.error);
                    }
                }

            )
        }
    }
}

export default WebHook
