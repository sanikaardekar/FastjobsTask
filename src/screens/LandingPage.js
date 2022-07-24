import '../App.css';
import { Grid, Typography, Button } from '@mui/material';
import { GrNext } from 'react-icons/gr';
import Landing from '../assets/landing.svg';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (<>
        <Grid container className="page">

            <Typography fontSize="25px" fontFamily="Nunito" fontWeight="700" color="#6776FF" marginTop="50px">
                Welcome to my Website 👋
            </Typography>

            <Typography fontSize="25px" fontFamily="Nunito" fontWeight="700" color="#6776FF">
                Proceed to Fill the form 👇
            </Typography>
            <Link to="/page1" style={{textDecoration:"none"}}>
            <Button
                type="submit"
                size="medium"
                variant="contained"
                sx={{ l: 10, mt: 2, mb: 1, backgroundColor: "#6776FF", color: "black", fontFamily: "Nunito", fontWeight: "700", }}
                endIcon={<GrNext style={{ fill: "#6776FF" }} />}
            >
                Lets Start!
            </Button>
            </Link>
            <Grid item sm={6} md={8} className="">
                <img style={{ height: "50vh" }} src={Landing} alt="hello" />
            </Grid>

        </Grid>
    </>);
}