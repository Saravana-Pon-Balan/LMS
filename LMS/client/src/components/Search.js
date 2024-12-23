import {React,useEffect,useState} from 'react';
import {alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled} from '@mui/material/styles';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '50ch',
      },
    },
  }));
export default function SearchComp(props){
  const [courseTitle,setCourseTitle] = useState([])
  const [searchId, setSearchId] = useState()
  const {searchClicking} = props;
  useEffect(()=>{
    axios.get("http://localhost:3001/get_course_title")
    .then((res)=>{
      setCourseTitle(res.data)

    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  const handleOptionClick = (e) =>{
    // axios.post("http://localhost:3001/search_course",{q:e.target.value})
    if(e!== null){
    setSearchId(e.id)
    searchClicking(e.id)
   
    }
  }
    return(
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={courseTitle}
              sx={{ width: 300 ,paddingLeft:"50px", border:'none',color:"white"}} 
              noOptionsText="No Course Found"
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => handleOptionClick(value)}
              renderInput={(params) => <TextField sx={{color:"white"}} {...params} label="Search here" />}
            />
          </Search>
    )
}