import express from "express";
import CaseRouter from "@/modules/cases/case.route";
import WarrantRouter from "@/modules/warrants/warrant.router";
import FinancialInvestRouter from "@/modules/financial_invests/financial_invest.route";
const router = express.Router();

const rootRoutes = [CaseRouter,WarrantRouter,FinancialInvestRouter];
rootRoutes.map((route) => {
router.use(route);
});
export default rootRoutes;
