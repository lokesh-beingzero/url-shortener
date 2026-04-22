import { Container, TextInput } from "@mantine/core";
import { useState } from "react";
import URLOutput from "../../Components/URL/URLOutput";
import URLInput from "../../Components/URL/URLInput";

export default function UrlShortener() {
    const [response, setResponse] = useState(null);

    return (
        <div>
            {
            response
            ? 
                <URLOutput /> 
            : 
                <URLInput />
            }
        </div>
    )
}