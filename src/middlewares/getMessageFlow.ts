import { Request, Response } from "express";
import { AppDataSource } from '../data-soucer';
import { Message_Flow } from '../entity';

export async function getMessageFlow(req: Request, res: Response) {

  try {
    const messageFlow = await AppDataSource.getRepository(Message_Flow).find(
      {
        relations: {
          template_name: true,
        },
      }
    )

    const messageFlowCreated = await AppDataSource.getRepository(Message_Flow).save(messageFlow);
    return res.status(201).send(messageFlowCreated)
  } catch (error) {
    console.log(error);
  }
}