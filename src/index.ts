import 'dotenv/config';
import express from "express";
import cors from "cors";
import { AppDataSource } from './data-soucer';
import { Message_Flow, Subscriptions } from './entity';
import { postSubscriptions, postMessageFlow, getMessageFlow, getSubscriptions } from './middlewares';
import { initializeDB } from './initializeDB';
import cron from "node-cron";
import { DateNow } from './utils/dateConvert';

const app = express();
app.use(express.json());
app.use(cors());
initializeDB();

//update server 22:11;
cron.schedule("11 22 * * *", () => {
  console.log("run update server");
  UpdateServer();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

async function UpdateServer() {
  await AppDataSource.getRepository(Subscriptions).find(
    {
      where: {
        active: true
      },
    }
  ).then((subscriptions) => subscriptions.map((subscription) => {
    updateSubscriptions(subscription.id);
  }))
};

async function updateSubscriptions(id: number) {
  try {
    const lastMessage = await AppDataSource.getRepository(Message_Flow).findOne({
      where: {
        template_name: {
          id: id,
        },
        position: DateNow(),
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

app.post("/subscriptions", postSubscriptions);

app.post("/messageFlow", postMessageFlow);

app.get("/messageFlow", getMessageFlow);

app.get("/subscriptions", getSubscriptions);

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
})
