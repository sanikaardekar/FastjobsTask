import { TextField, Typography, Box, Button, Grid, Card } from "@mui/material";
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
                    <Grid item sm={12} md={12} className="main" data-aos="fade-up-left">
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Typography fontFamily="Nunito" fontWeight="700" fontSize="30px">Where can we reach you?<GiSparkles /></Typography>
                            <TextField
                                label="Email"
                                id="email"
                                type="email"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                                fontFamily="Nunito" fontWeight="700"
                            />
                            <Typography fontSize="30px" fontFamily="Nunito" fontWeight="700">Preferred city to work?<GiSparkles /></Typography>
                            <TextField
                                label="City"
                                id="city"
                                type="text"
                                size="small"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                autoFocus
                                required
                                fontFamily="Nunito" fontWeight="700"
                            />
                            <Typography fontSize="20px" fontFamily="Nunito" fontWeight="700">Top cities you may prefer: </Typography>
                            <Grid item display="flex" flexDirection="row" justifyContent="flex-start">
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>Mumbai</Card>{" "}
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>Bengaluru</Card>{" "}
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>Pune</Card>{" "}
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>Delhi</Card>{" "}

                            </Grid>

                            <Button
                                type="submit"
                                size="medium"
                                variant="contained"
                                sx={{ ml: 2, mt: 2, mb: 1, backgroundColor: "#6776FF", color: "black", fontFamily: "Nunito", fontWeight: "700", }}
                                endIcon={<GrCaretNext style={{ fill: "white" }} />}
                            >
                                Next
                            </Button>
                        </Box>

                        <Grid item sm={6} md={8} className="hello">
                            <img style={{ height: "30vh", marginLeft: "200px" }} src={location} alt="hello" />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </>
    )
}
export default Page2;