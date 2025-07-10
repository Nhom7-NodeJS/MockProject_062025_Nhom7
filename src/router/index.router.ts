import express from "express";
import CaseRouter from "@/modules/cases/case.route";
import WarrantRouter from "@/modules/warrants/warrant.router";
const router = express.Router();

const rootRoutes = [CaseRouter,WarrantRouter];
rootRoutes.map((route) => {
router.use(route);
});
export default rootRoutes;
