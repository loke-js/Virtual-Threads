import express from "express";
import * as dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import axios from "axios";
import fetch from "node-fetch";
dotenv.config();

const router = express.Router();

// const inference = new HfInference(process.env.HF_API_KEY);

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const API_LINK = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
    const response = await axios.post(
      API_LINK,
      JSON.stringify(prompt),
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // Use env to access the API key
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );
    // Convert binary to base64
    const buffer = Buffer.from(response.data);
    // Convert the Buffer to a base64 string
    const base64Image = buffer.toString("base64");
    res.status(200).json({
      success: true,
      message: "Image generated successfully",
      image: `${base64Image}`,
      err: {}
    });
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ 
        success: false, 
        message: error.message, 
        error: {error},
       });
  }
});

// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "Hello from DALLE routes" });
// });

export default router;
