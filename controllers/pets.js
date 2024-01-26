import { connection } from "../database.js";

export const getPets = async (req, res) => {
  try {
    const findAllPets = "SELECT * FROM pets";

    const [rows] = await connection.query(findAllPets);
    return res.status(200).json(rows);
  } catch (e) {
    return res.json(null);
  }
};

export const getPetByPk = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ["ID missing"],
      });
    }
    const findPetById = `SELECT * FROM pets WHERE id = ${id}`;

    const [rows] = await connection.query(findPetById);

    console.log(rows.length);

    if (rows.length === 0) {
      return res.status(400).json({
        errors: ["Pet não existe"],
      });
    }

    return res.status(200).json(rows);
  } catch (e) {
    return res.json(null);
  }
};

export const adoptPet = async (req, res) => {
  try {
    const { id } = req.params;

    const findPetById = `SELECT * FROM pets WHERE id = ${id}`;

    const [rows] = await connection.query(findPetById);

    if (rows.length === 0) {
      return res.status(400).json({
        errors: ["Pet não existe"],
      });
    }

    const { nome, idade, especie, raca } = req.body;
    let { dataAdocao } = req.body;

    const formattedDataAdocao = dataAdocao ? `"${dataAdocao}"` : null;

    const updatePet = `UPDATE pets SET nome = "${nome}", idade = ${idade}, especie = "${especie}", raca = "${raca}", dataAdocao = ${formattedDataAdocao}  WHERE id = ${id}`;

    await connection.query(updatePet);

    return res.json(req.body);
  } catch (e) {
    return res.status(400).json({
      errors: e.message,
    });
  }
};

export const createPet = async (req, res) => {
  try {
    const { nome, idade, especie, raca } = req.body;
    let { dataAdocao } = req.body;

    const formattedDataAdocao = dataAdocao ? `"${dataAdocao}"` : null;

    const registerPet = `INSERT INTO pets (nome, idade, especie, raca, dataAdocao) VALUES ("${nome}", ${idade}, "${especie}", "${raca}", ${formattedDataAdocao})`;

    await connection.query(registerPet);

    return res.json(req.body);
  } catch (e) {
    return res.status(400).json({
      errors: e.message,
    });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    const registerPet = `DELETE FROM pets WHERE id = ${id}`;

    const [rows] = await connection.query(registerPet);

    if (rows.affectedRows === 0) {
      return res.status(404).json("Pet não existe");
    }

    return res.status(200).json("Pet deletado com sucesso.");
  } catch (e) {
    return res.status(400).json({
      errors: e.message,
    });
  }
};
