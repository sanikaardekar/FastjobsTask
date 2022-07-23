import { Typography, Card, Button, Grid, Box, Snackbar, IconButton } from "@mui/material";
import React, { useState } from "react";
import { GiSparkles } from 'react-icons/gi'
import { GrCaretNext } from 'react-icons/gr';
import { URL } from '../utils/Api';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import './Tags.css';
import '../App.css'
import rolesSvg from '../assets/roles.svg';
import CloseIcon from '@mui/icons-material/Clear';

const TagsInput = (props) => {

    //const [tags, setTags] = React.useState(props.tagList);
    const removeTags = (indexToRemove) => {
        props.setRoles([...props.roles.filter((_, index) => index !== indexToRemove)]);//if index is not equal to indexToRemove then those elements stay, if index is equal to indexToRemove then that element is removed
        props.selectedTags([...props.roles.filter((_, index) => index !== indexToRemove)])
    };
    const addTags = (e) => {
        if (e.target.value !== '') {
            props.setRoles([...props.roles, e.target.value]);
            props.selectedTags([...props.roles, e.target.value]);
            e.target.value = '';
        }
    };
    return (
        <div className="tags-input">
            <input type="text" onKeyUp={(e) => e.key === "Enter" ? addTags(e) : null}
                placeholder=" Add Tags"
                value={props.roles} onChange={(e) => { props.setRoles([e.target.value]); e.target.value = ''; }}
            />
            <ul id="tags">
                {props.roles.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className="tag-title">{tag}</span>
                        <span className='tag-close-icon'
                            onClick={() => removeTags(index)}
                        >
                            <ClearIcon fontSize="small" />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Page3 = () => {
    const navigate = useNavigate();
    const [setLoading] = useState(true);
    const [roles, setRoles] = useState(["ML Developer"]);
    const [experience, setExperience] = useState("");
    const [errorMessage, setErrorMessage] = useState(null) //for alert

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
                navigate("/end")
            }
            if (result.message === "Missing Field in a key") {
                setErrorMessage('Please fill/select all details');
            }
        } catch (error) {
            console.log("Error" + error);
            alert("Please enter name and/or experience");
            setLoading(false);
        }
    }

    const selectedTags = tags => {
        console.log(tags);
    };
    return (
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

                        <Grid item display="flex" flexDirection="row">
                            <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#6776FF", border: "2px solid black" }}><Typography textAlign="center">1</Typography></Box>
                            <Typography>---</Typography>
                            <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#6776FF", border: "2px solid black" }}><Typography textAlign="center">2</Typography></Box>
                            <Typography>---</Typography>
                            <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "white", border: "2px solid black" }}><Typography textAlign="center">3</Typography></Box>
                        </Grid>
                        <Typography fontSize="30px" fontFamily="Nunito" fontWeight="700">Roles you are looking for?<GiSparkles /></Typography>
                        <TagsInput selectedTags={selectedTags} tagList={["ML Developer"]} roles={roles} setRoles={setRoles} />
                        <Typography fontSize="20px" fontFamily="Nunito" fontWeight="700">Trending Roles: </Typography>
                        <Grid item display="flex" flexDirection="row" justifyContent="flex-start">
                            <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>Web Developer</Card>{" "}
                            <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF" }}>UI Developer</Card>{" "}
                        </Grid>
                        <Typography fontSize="30px" fontFamily="Nunito" fontWeight="700">How many years of experience?<GiSparkles /></Typography>
                        <Grid item display="flex" flexDirection="row" justifyContent="flex-start">
                            <label>
                                <input type="radio" name="experience" value="Fresher" checked={experience === "male"} onChange={(e) => setExperience(e.target.value)} required />
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>Fresher</Card>{" "}
                            </label>
                            {" "}
                            <label>
                                <input type="radio" name="experience" value="1-3 years" checked={experience === "female"} onChange={(e) => setExperience(e.target.value)} required />
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>1-3 years</Card>{" "}
                            </label>
                            {" "}
                            <label>
                                <input type="radio" name="experience" value="3-6 years" checked={experience === "male"} onChange={(e) => setExperience(e.target.value)} required />
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>3-6 years</Card>{" "}
                            </label>
                            {" "}
                            <label>
                                <input type="radio" name="experience" value="6+ years" checked={experience === "female"} onChange={(e) => setExperience(e.target.value)} required />
                                <Card sx={{ height: "30px", mr: "4px", fontFamily: "Nunito", fontWeight: "700", padding: "2px 4px 4px 4px", borderRadius: "5px", color: "#6776FF", }}>6+ years</Card>{" "}
                            </label>
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
                        <img style={{ height: "25vh", marginLeft: "0px" }} src={rolesSvg} alt="hello" />
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}
export default Page3;