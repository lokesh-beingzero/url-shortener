import { ShortURL } from "../models/shorturl.model.js"
import { nanoid } from 'nanoid'

export const createShortURL = async (req, res) => {
    try {
        let hash = nanoid(7);
        let isUnique = false;
        while(isUnique == false) {
            const result = await ShortURL.findOne({ shortCode: hash });
            if(result == null) {
                isUnique = true;
            }
            else {
                hash = nanoid(7);
            }
        }
        let newShortURL = new ShortURL({
            originalUrl: req.body.originalURL,
            shortCode: hash
        });
        await newShortURL.save();
        res.status(201).json(newShortURL);
    }
    catch(error) {
        console.error("Error creating short URL: ", error);
        res.status(500).json({ status: "Internal Server Error", error: error.message });
    }
}