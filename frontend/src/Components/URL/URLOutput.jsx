import { Anchor, Button, Center, Container, Stack, Text } from '@mantine/core';
import { QRCodeSVG } from 'qrcode.react';
import { useClipboard } from '@mantine/hooks';

export default function URLOutput({ shortURL }) {
    const clipboard = useClipboard({ timeout: 2000 });

    return (
        <Container size="md">
            <Stack align='center'>
                <h1>Scan the QR code</h1>
                <QRCodeSVG 
                    value={shortURL}
                    imageSettings={{
                        src: "/HomeBackground.png",
                        height: 100,
                        width: 100,
                    }}
                    size={300}
                />
                <Text>Shortened Link: <Anchor href={shortURL} target="_blank">{shortURL}</Anchor> </Text>
                <Button
                    color={clipboard.copied ? 'teal' : 'blue'}
                    onClick={() => clipboard.copy(shortURL)}
                >
                    {clipboard.copied ? 'Copied URL!' : 'Copy URL'}
                </Button>
            </Stack>
        </Container>
    )
}