import express, { json } from "express";
import mongoose from "mongoose";
import axios from "axios";
import https from "https";
import cors from "cors";

const app = express();
const port = 5000;

import Character from "./models/Character.js";

mongoose.connect("mongodb+srv://swwsdf:swwsdf1@cluster0.hqjo9xp.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.get("/api/characters", async (req, res) => {
  const baseUrl = "https://swapi.dev/api/people/";

  try {
    const characters = await getAllCharacters(baseUrl);
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve characters" });
  }
});

app.get("/api/planets", async (req, res) => {
  const baseUrl = "https://swapi.dev/api/planets/";

  try {
    const planets = await getAllPlanets(baseUrl);
    res.json(planets);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve planets" });
  }
});

const getAllCharacters = async (url, characters = []) => {
  try {
    const response = await axios.get(url, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    const result = response.data;

    characters = characters.concat(result.results);

    if (result.next) {
      return getAllCharacters(result.next, characters);
    }

    return characters;
  } catch (error) {
    console.error(error);
  }
};

const getAllPlanets = async (url, planets = []) => {
  try {
    const response = await axios.get(url, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    const result = response.data;

    planets = planets.concat(result.results);

    if (result.next) {
      return getAllPlanets(result.next, planets);
    }

    return planets;
  } catch (error) {
    console.error(error);
  }
};

app.get("/api/characters/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://swapi.dev/api/people/?search=${name}`);
    const character = response.data.results.find((char) => char.name === name);

    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ error: "Character not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve character" });
  }
});

app.post("/api/favorites", async (req, res) => {
  const characterData = req.body;

  try {
    const character = new Character(characterData);

    const validationError = character.validateSync();
    if (validationError) {
      throw validationError;
    }

    await character.save();

    res.status(200).json({ message: "Character added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving character to favorites" });
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await Character.find({});
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve favorites" });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  const characterId = req.params.id;

  try {
    await Character.findByIdAndRemove(characterId);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove favorite card' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
