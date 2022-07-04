import { Request, Response } from "express";
import { AppDataSource } from '../data-soucer';
import { Subscriptions } from '../entity';

export async function getSubscriptions(req: Request, res: Response) {

  try {
    const messageFlow = await AppDataSource.getRepository(Subscriptions).find(
      {
        relations: {
          last_message: true
        }
      }
    )

    const getSubscriptions = await AppDataSource.getRepository(Subscriptions).save(messageFlow);
    return res.status(200).send(getSubscriptions)
  } catch (error) {
    console.log(error);
  }
}