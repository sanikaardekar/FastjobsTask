import { TextField, Typography, Box, Button, Grid, Snackbar, IconButton, Divider } from "@mui/material";
import React, { useState } from "react";
import { GiSparkles } from 'react-icons/gi'
import { GrCaretNext } from 'react-icons/gr'
import female from '../assets/female.svg';
import male from '../assets/male.svg';
import hello from '../assets/hello.svg';
import '../App.css';
import { URL } from '../utils/Api';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Clear';

const Page1 = () => {
    const navigate = useNavigate();
    const [setLoading] = useState(true);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("male");
    const [errorMessage, setErrorMessage] = useState(false) //for alert

    const handleToClose = (event, reason) => {
        if ("clickaway" == reason) return;
        setErrorMessage(false);
    };

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
            if (result.message === "Successful") {
                navigate("/page2")
            }
            if (result.message === "Missing Field in a key") {
                setErrorMessage('Please fill/select all details');
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
                {errorMessage && <Snackbar open={errorMessage} message={errorMessage} onClose={handleToClose} action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleToClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                } />}
                <div className="root">
                    <Grid item sm={12} md={12} className="main" data-aos="fade-up-left">
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Typography fontSize="20px" fontFamily="Nunito" fontWeight="700" color="#6776FF">Help us know you better!</Typography>

                            <Grid item display="flex" flexDirection="row" >
                                <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "white", border: "2px solid black" }}><Typography textAlign="center">1</Typography></Box>
                                <Typography>---</Typography>
                                <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "white", border: "2px solid black" }}><Typography textAlign="center">2</Typography></Box>
                                <Typography>---</Typography>
                                <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "white", border: "2px solid black" }}><Typography textAlign="center">3</Typography></Box>
                            </Grid>

                            <Typography fontSize="30px" fontFamily="Nunito" fontWeight="700">What should we call you?<GiSparkles /></Typography>
                            <TextField
                                label="Name"
                                id="name"
                                type="text"
                                size="medium"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                required
                                fontFamily="Nunito" fontWeight="700"
                            />
                            <Typography fontSize="30px" fontFamily="Nunito" fontWeight="700">Gender<GiSparkles /></Typography>

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
                                sx={{ ml: 2, mt: 2, mb: 1, backgroundColor: "#6776FF", color: "black", fontFamily: "Nunito", fontWeight: "700", }}
                                endIcon={<GrCaretNext style={{ fill: "white" }} />}
                            >
                                Next
                            </Button>
                        </Box>
                        <Grid item sm={6} md={8} className="hello">
                            <img style={{ height: "30vh", marginLeft: "150px" }} src={hello} alt="hello" />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </>
    );
}
export default Page1;