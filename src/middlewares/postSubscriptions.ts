import { Request, Response } from "express";
import { AppDataSource } from '../data-soucer';
import { Subscriptions } from '../entity';

export async function postSubscriptions(req: Request, res: Response) {

  const { last_message, subscription_date, email } = <Subscriptions>req.body;

  try {
    const subscriptions = await AppDataSource.getRepository(Subscriptions).create({
      active: true,
      subscription_date: subscription_date,
      last_message: last_message,
      email: email,
    });

    const subscriptionsCreated = await AppDataSource.getRepository(Subscriptions).save(subscriptions);
    return res.status(201).send(subscriptionsCreated)
  } catch (error) {
    return res.status(400).send({ error: "E-mail unique" })
  }
}