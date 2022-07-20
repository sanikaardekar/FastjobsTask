import { Typography, Box, Button, Grid, Radio} from "@mui/material";
import React, { useState } from "react";
import { GiSparkles } from 'react-icons/gi'
import { URL } from '../utils/Api';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import './Tags.css';

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
                value={props.roles} onChange={(e) => {props.setRoles([e.target.value]); e.target.value = '';}}
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
            alert("Please enter name and/or experience");
            setLoading(false);
        }
    }

    const selectedTags = tags => {
        console.log(tags);
    };
    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography>Roles you are looking for?<GiSparkles /></Typography>
            <TagsInput selectedTags={selectedTags} tagList={["ML Developer"]} roles={roles} setRoles={setRoles} />
            <Typography>Trending Roles: </Typography>
            <Grid item display="flex" flexDirection="row" justifyContent="flex-start">
                <Box sx={{ height: "30px", backgroundColor: "cyan", mr: "2px", padding: "2px 2px 2px 2px" }}>Web Developer</Box>{" "}
                <Box>UI Developer</Box>{" "}
            </Grid>
            <Typography>How many years of experience?<GiSparkles /></Typography>
            <Radio
                checked={experience === 'Fresher'}
                onChange={(e) => setExperience(e.target.value)}
                value="Fresher"
                name="experience"
                inputProps={{ 'aria-label': 'Fresher' }}
            />
            <Radio
                checked={experience === '1-3 years'}
                onChange={(e) => setExperience(e.target.value)}
                value="1-3 years"
                name="experience"
                inputProps={{ 'aria-label': '1-3 years' }}
            />
            <Radio
                checked={experience === '3-6 years'}
                onChange={(e) => setExperience(e.target.value)}
                value="3-6 years"
                name="experience"
                inputProps={{ 'aria-label': '3-6 years' }}
            />
            <Radio
                checked={experience === '6+ years'}
                onChange={(e) => setExperience(e.target.value)}
                value="6+ years"
                name="experience"
                inputProps={{ 'aria-label': '6+ years' }}
            />
            <Button
                type="submit"
                size="medium"
                variant="contained"
                sx={{ ml: 2, mt: 2, mb: 1 }}
            >
                Next
            </Button>
        </Box>
    )
}
export default Page3;