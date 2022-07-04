import { AppDataSource } from './data-soucer';

export function initializeDB() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized");
    })
    .catch((error) => console.error("Error during initialization: ", error));
} 