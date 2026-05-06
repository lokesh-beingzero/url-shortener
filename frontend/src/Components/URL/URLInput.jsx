import { Button, Container, TextInput } from "@mantine/core";
import { useState } from "react";
import Service from "../../utils/http";
import { isValidUrl } from "../../utils/utils";
import { showNotification } from "@mantine/notifications";
import { SHORTEN_URL } from "../../utils/urls";

export default function URLInput(props) {
    const {
        originalURL,
        setOriginalURL,
        title,
        setTitle,
        expiryDate,
        setExpiryDate,
        setShortCode
    } = props;

    const service = new Service();

    async function validateAndGenerateShortUrl() {
        if(!originalURL || originalURL.length === 0 || !isValidUrl(originalURL)) {
            showNotification({
                title: 'Info',
                message: 'Please Enter a valid URL',
                color: 'indigo'
            })
            return;
        }
        const response = await service.post(SHORTEN_URL, { originalURL, expiresAt: expiryDate, title });
        
        setShortCode(response.shortCode);
    }
    return (
        <Container size="xs">
            <TextInput required
                onChange={(e) => {
                    setOriginalURL(e.target.value);
                }}
                label="Original URL" 
                placeholder="Place Original URL" 
            />
            <TextInput 
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                label="Title" 
                placeholder="Enter Title" 
            />
            <TextInput 
                label="Custom URL"
                placeholder="Enter Custom URL" 
            />
            <TextInput 
                onChange={(e) => {
                    setExpiryDate(e.target.value);
                }}
                type="date"
                label="Date Of Expiry" 
                placeholder="Enter Date of Expiry" 
            />
            <Button onClick={validateAndGenerateShortUrl} variant="filled">Generate and Shorten URL</Button>
        </Container>
    )
}