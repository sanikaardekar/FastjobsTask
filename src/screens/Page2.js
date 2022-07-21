import { TextField, Typography, Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { GiSparkles } from 'react-icons/gi';
import { GrCaretNext } from 'react-icons/gr';
import { URL } from '../utils/Api';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import location from '../assets/location.svg'

const Page2 = () => {
    const navigate = useNavigate();
    const [setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
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
                        email: email,
                        preferred_city: city,
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
                navigate("/page3")
            }
        } catch (error) {
            console.log("Error" + error);
            alert("Please enter name and/or gender");
            setLoading(false);
        }
    }

    return (
        <>
            <Grid container className="background-pic">
                <div className="root">
                    <Grid item sm={12} md={12} className="main">
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Typography>Where can we reach you?<GiSparkles /></Typography>
                            <TextField
                                label="Email"
                                id="email"
                                type="email"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                            />
                            <Typography>Preferred city to work?<GiSparkles /></Typography>
                            <TextField
                                label="City"
                                id="city"
                                type="text"
                                size="small"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                autoFocus
                                required
                            />
                            <Typography>Top cities you may prefer: </Typography>
                            <Grid item display="flex" flexDirection="row" justifyContent="flex-start">
                                <Box sx={{ height: "30px", backgroundColor: "cyan", mr: "2px", padding: "2px 2px 2px 2px" }}>Mumbai</Box>{" "}
                                <Box>Bengaluru</Box>{" "}
                                <Box>Pune</Box>{" "}
                                <Box>Delhi</Box>{" "}
                            </Grid>

                            <Button
                                type="submit"
                                size="medium"
                                variant="contained"
                                sx={{ ml: 2, mt: 2, mb: 1 }}
                                endIcon={<GrCaretNext style={{fill:"white"}}/>}
                            >
                                Next
                            </Button>
                        </Box>

                        <Grid item sm={6} md={8} className="hello">
                            <img style={{ height: "30vh", marginLeft:"200px" }} src={location} alt="hello" />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </>
    )
}
export default Page2;