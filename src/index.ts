import 'dotenv/config';
import express from "express";
import cors from "cors";
import cron from "cron";
import { Request, Response } from "express";
import { AppDataSource } from './data-soucer';
import { Message_Flow, Subscriptions } from './entity';

const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch((error) => console.error("Error during initialization: ", error));

setInterval(async () => {
  await AppDataSource.getRepository(Subscriptions).find(
    {
      where: {
        active: true
      },
    }
  ).then((subscriptions) => subscriptions.map((subscription) => {
    updateSubscriptions(subscription.id);
  }))
}, 5000);

async function updateSubscriptions(id: number) {
  try {
    const lastMessage = await AppDataSource.getRepository(Message_Flow).findOne({
      where: {
        template_name: {
          id: id,
        },
        position: new Date("09-23-2022"),
      },
    })

    if (lastMessage) {
      AppDataSource.createQueryBuilder().update(Subscriptions).set({
        last_message: lastMessage,
        active: true
      }).where({ id: id }).execute();
    } else {
      AppDataSource.createQueryBuilder().update(Subscriptions).set({
        active: false
      }).where({ id: id }).execute()
    }
  } catch (error) {
    console.log(error);
  }
}

app.post("/subscriptions", async (req: Request, res: Response) => {

  const { last_message, subscription_date, name } = <Subscriptions>req.body;

  try {
    const subscriptions = await AppDataSource.getRepository(Subscriptions).create({
      active: true,
      subscription_date: subscription_date,
      last_message: last_message,
      name: name,
    });

    const subscriptionsCreated = await AppDataSource.getRepository(Subscriptions).save(subscriptions);

    return res.status(201).send(subscriptionsCreated)
  } catch (error) {
    console.log(error);
  }
});

app.post("/messageFlow", async (req: Request, res: Response) => {

  const { position, template_name } = <Message_Flow>req.body;

  try {
    const messageFlow = await AppDataSource.getRepository(Message_Flow).create({
      position: position,
      template_name: template_name
    });

    const messageFlowCreated = await AppDataSource.getRepository(Message_Flow).save(messageFlow);
    return res.status(201).send(messageFlowCreated)
  } catch (error) {
    console.log(error);
  }
});

app.get("/messageFlow", async (req: Request, res: Response) => {

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
});

app.get("/subscriptions", async (req: Request, res: Response) => {

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
});





app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
})
