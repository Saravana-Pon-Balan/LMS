import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import video from "./Video/jsc.mp4"


const CourseContent = () =>{
    return(
        <Box>
        <Card >
        <CardHeader
            title={"First Video"}
        />

        <CardActionArea>
            <CardMedia
                component='video'
                image={video}
                autoplay
            />
            <CardContent>

                <Typography variant="body2" color="textSecondary" component="p">
                    Some Text
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
        </Box>
    )
}
export default CourseContent;