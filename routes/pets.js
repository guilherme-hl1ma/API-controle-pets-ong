import express from "express";
import { getPets, getPetByPk, adoptPet, createPet, deletePet } from "../controllers/pets.js";

const router = express.Router();

router.get("/pets", getPets);
router.get("/pets/:id", getPetByPk);
router.put("/pets/adopt/:id", adoptPet);
router.post("/pets", createPet);
router.delete("/pets/:id", deletePet);

export default router;
