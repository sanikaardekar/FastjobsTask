import { TextField, Typography, Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { GiSparkles } from 'react-icons/gi'
import { URL } from '../utils/Api';
import { useNavigate } from 'react-router-dom';

const Page3 = () => {
    const navigate = useNavigate();
    const [setLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [experience, setExperience] = useState("");
    const [fill, setFill] = useState(true); //for dots

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createacc();
    };

    async function createacc() {
        console.log("hello");
        try {
            let result = await fetch(
                URL,
                {
                    method: "POST",
                    body: JSON.stringify({
                        roles: roles,
                        experience: experience,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            result = await result.json();
            console.log(result);
            if (result.message === "Successful") {
                navigate("/page1")
            }
        } catch (error) {
            console.log("Error" + error);
            alert("Please enter name and/or gender");
            setLoading(false);
        }
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography>Roles you are looking for?<GiSparkles /></Typography>

        </Box>
    )
}
export default Page3;