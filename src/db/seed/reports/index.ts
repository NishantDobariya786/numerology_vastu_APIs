import { connectDB, disConnectDB } from "../../connectDB";
import { conductorNumberAnalysisDataInsert } from "./conductor-number-analysis";
import { driverNumberAnalysisDataInsert } from "./driver-number-analysis";
import { LuckyAndUnLuckyColorsAnalysisDataInsert } from "./lucky-and-unlucky-color-analysis";
import { LuckyAndUnLuckyDaysAnalysisDataInsert } from "./lucky-and-unlucky-days-analysis";
import { LuckyAndUnLuckyNumberAnalysisDataInsert } from "./lucky-and-unlucky-number-analisis";
import { LuckyAndUnLuckyProfessionAnalysisDataInsert } from "./lucky-and-unlucky-profession-analysis";
import { missingNumberAnalysisDataInsert } from "./missing-number-analysis";

export async function init() {
  try {
    await connectDB();
    await driverNumberAnalysisDataInsert();
    await conductorNumberAnalysisDataInsert();
    // await LuckyAndUnLuckyNumberAnalysisDataInsert();
    // await LuckyAndUnLuckyColorsAnalysisDataInsert();
    // await LuckyAndUnLuckyProfessionAnalysisDataInsert();
    // await LuckyAndUnLuckyDaysAnalysisDataInsert();
    // await missingNumberAnalysisDataInsert();
    console.log("DriverNumber Report Inserted");
    console.log("Reports Inserted");
  } catch (error) {
    console.log(error);
    process.exit(5);
  } finally {
    await disConnectDB();
    process.exit();
  }
}

init();
