import { TextField, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { GiSparkles } from 'react-icons/gi'
import female from '../assets/female.svg';
// import femaleDisable from '../assets/femaleDisable.svg';
import male from '../assets/male.svg';
// import maleDisable from '../assets/maleDisable.svg';
import '../App.css';
import { URL } from '../utils/Api';
import { useNavigate } from 'react-router-dom';

const Page1 = () => {
    const navigate = useNavigate();
    const [setLoading] = useState(true);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");
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
                        name: name,
                        gender: gender,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            result = await result.json();
            console.log(result);
            if(result.message === "Successful")
            {
                navigate("/page2")
            }
        } catch (error) {
            console.log("Error" + error);
            alert("Please enter name and/or gender");
            setLoading(false);
        }
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Typography>What should we call you?<GiSparkles /></Typography>
                <TextField
                    label="Name"
                    id="name"
                    type="text"
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                />
                <Typography>Gender<GiSparkles /></Typography>

                <label>
                    <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} required />
                    <img src={male} alt="Option 1" />
                </label>
                {" "}
                <label>
                    <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} required />
                    <img src={female} alt="Option 2" />
                </label>

                <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    sx={{ ml: 2, mt: 2, mb: 1 }}
                >
                    Next
                </Button>
            </Box>
        </>
    );
}
export default Page1;