import { Container, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import URLOutput from "../../Components/URL/URLOutput";
import URLInput from "../../Components/URL/URLInput";
import Service from "../../utils/http";

export default function UrlShortener() {
    const [originalURL, setOriginalURL] = useState('');
    const [title, setTitle] = useState('');
    const [expiryDate, setExpiryDate] = useState(null);
    const [shortCode, setShortCode] = useState('');
    const [shortURL, setShortURL] = useState('');

    const service = new Service();

    useEffect(() => {
        if(shortCode) {
            setShortURL(`${service.getBaseURL()}/api/s/${shortCode}`);
        }
    }, [shortCode]);

    return (
        <div>
            {
            shortCode.length > 0
            ? 
                <URLOutput 
                    shortURL={shortURL}
                /> 
            : 
                <URLInput 
                    originalURL={originalURL} 
                    setOriginalURL={setOriginalURL}
                    title={title}
                    setTitle={setTitle}
                    expiryDate={expiryDate}
                    setExpiryDate={setExpiryDate}
                    setShortCode={setShortCode} 
                />
            }
        </div>
    )
}