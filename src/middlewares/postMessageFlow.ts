import { Request, Response } from "express";
import { AppDataSource } from '../data-soucer';
import { Message_Flow } from '../entity';
import { convertToDateBR } from "../utils/dateConvert";


export async function postMessageFlow(req: Request, res: Response) {

  const { position, template_name } = <Message_Flow>req.body;

  try {
    const messageFlow = await AppDataSource.getRepository(Message_Flow).create({
      position: convertToDateBR(position),
      template_name: template_name
    });

    const messageFlowCreated = await AppDataSource.getRepository(Message_Flow).save(messageFlow);
    return res.status(201).send(messageFlowCreated)
  } catch (error) {
    console.log(error);
  }
}