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

    const messageFlowCreated = await AppDataSource.getRepository(Subscriptions).save(messageFlow);
    return res.status(201).send(messageFlowCreated)

  } catch (error) {
    console.log(error);
  }
}