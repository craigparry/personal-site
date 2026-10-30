import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Register() {
    const [formValues, setFormValues] = React.useState({
        full_name: '',
        username: '',
        email: '',
        password: '',
    });

    function handleChange(field: keyof typeof formValues) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormValues((current) => ({
                ...current,
                [field]: event.target.value,
            }));
        };
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const response = await axios.post('/api/backend/users', formValues);
            console.log(response.data);
        } catch (error:any) {
            console.error('Registration failed:', error.message);
        }
    }

    return (
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ align: 'center', maxWidth: '50%' }}>
                <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                    required
                    id="full-name"
                    type="text"
                    label="Full Name"
                    value={formValues.full_name}
                    onChange={handleChange('full_name')}
                    />
                    <TextField
                    required
                    id="username"
                    type="text"
                    label="Username"
                    value={formValues.username}
                    onChange={handleChange('username')}
                    />
                    <TextField
                    required
                    id="email"
                    type="text"
                    label="Email"
                    value={formValues.email}
                    onChange={handleChange('email')}
                    />
                    <TextField
                    required
                    id="password"
                    type="password"
                    label="Password"
                    value={formValues.password}
                    onChange={handleChange('password')}
                    />
                </div>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" type="submit">Submit</Button>
                </Box>
                </Box>
            </Card>
        </Box>
    );
}