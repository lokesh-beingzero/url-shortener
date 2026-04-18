import { Avatar, Container, Stack, Text } from '@mantine/core'
import React from 'react'
import { useState, useEffect } from 'react'
import Service from '../../utils/http';

export default function ProfilePage() {
    const [user, setUser] = useState({});

    const service = new Service();

    async function getUserDetails() {
        try {
            let response = await service.get('user/me');
            setUser(response);
        }
        catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <Container size="sm">
            <Stack align='center' my={"xl"}>
                <Avatar src={user.avatar} size={120}></Avatar>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                <Text>{user._id}</Text>
                <Text>{user.createdAt}</Text>
            </Stack>
        </Container>
    )
}
