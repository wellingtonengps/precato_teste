import { Request, Response } from "express";
import { AppDataSource } from '../data-soucer';
import { Message_Flow } from '../entity';
import { convertToDateBR } from "../utils/dateConvert";


export async function postMessageFlow(req: Request, res: Response) {

  const { position, template_email } = <Message_Flow>req.body;

  try {
    const messageFlow = await AppDataSource.getRepository(Message_Flow).create({
      position: convertToDateBR(position),
      template_email: template_email
    });

    const messageFlowCreated = await AppDataSource.getRepository(Message_Flow).save(messageFlow);
    return res.status(201).send(messageFlowCreated)
  } catch (error) {
    return res.status(400).send({ error: "data doesn't found" })
  }
}