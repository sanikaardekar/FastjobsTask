import { Link } from 'react-router-dom';
import '../App.css';
import { Grid, Box, Typography, Button } from '@mui/material';


export default function EndingPage() {
    return (<>
        <Grid container className="ending">
            <div className="ending-root">

                <Grid item display="flex" flexDirection="row">
                    <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#6776FF", border: "2px solid black" }}><Typography textAlign="center">1</Typography></Box>
                    <Typography>---</Typography>
                    <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#6776FF", border: "2px solid black" }}><Typography textAlign="center">2</Typography></Box>
                    <Typography>---</Typography>
                    <Box style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#6776FF", border: "2px solid black" }}><Typography textAlign="center">3</Typography></Box>
                    <Typography fontSize="25px" fontFamily="Nunito" fontWeight="700" color="#6776FF">✅</Typography>
                </Grid>
                <Typography fontSize="25px" fontFamily="Nunito" fontWeight="700" color="#6776FF">
                    Thank you for your Response 😊
                </Typography>
                <Typography fontSize="25px" fontFamily="Nunito" fontWeight="700" color="#6776FF">
                    To submit another response click here 👇
                </Typography>
                <Link to="/page1" style={{ textDecoration: "none" }}>
                    <Button
                        type="submit"
                        size="medium"
                        variant="contained"
                        sx={{ l: 10, mt: 2, mb: 1, backgroundColor: "#6776FF", color: "black", fontFamily: "Nunito", fontWeight: "700", }}
                    >
                        Another Response
                    </Button>
                </Link>
            </div>
        </Grid>
    </>);
}