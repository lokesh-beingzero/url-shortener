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

        let expiresAt = req.body.expiresAt;
        if(expiresAt && typeof expiresAt === "string" && expiresAt.trim() !== ""){
            const parsedDate = new Date(expiresAt);

            if(!isNaN(parsedDate.getTime())){
                expiresAt = parsedDate;
            }
            else{
                return res.status(400).json({ messgae: "Invalid expiresAt format."});
            }
        }
        else {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            expiresAt = date;
        }

        let newShortURL = new ShortURL({
            originalUrl: req.body.originalURL,
            shortCode: hash,
            userId: req.user.id || null,
            title: req.body.title || null,
            expiresAt
        });

        await newShortURL.save();
        res.status(201).json(newShortURL);
    }
    catch(error) {
        console.error("Error creating short URL: ", error);
        res.status(500).json({ status: "Internal Server Error", error: error.message });
    }
}

export const getAndRedirectURL = async (req, res) => {
    const { shortCode } = req.params

    const shortURL = await ShortURL.findOne({ shortCode: shortCode, isActive: true });

    if(!shortURL) {
        return res.status(404).json({ message: "Short url not found or is inactive"});
    }
    
    if(shortURL.expiresAt < new Date()) {
        console.log("The Short url is expired");
        shortURL.isActive = false;
        await shortURL.save();
        return res.status(410).json({ message: "The Short url is expired"});
    }

    return res.redirect(shortURL.originalUrl);
}