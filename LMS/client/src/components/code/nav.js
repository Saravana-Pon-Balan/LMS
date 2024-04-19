// Navbar.js
import { Button, TextField,Box } from '@mui/material';
import React from 'react';
import Select from 'react-select';

const navbarStyles = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    height: 50,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#00000014',
    gap: 20,
};

const selectContainerStyles = {
    width: 120,
    color: 'black',
    backgroundColor: 'black',
};

const inputRangeStyles = {
    width: 120,
    fontSize: 16,
    color: 'rgb(185, 185, 185)',
};

const Navbar = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize, compile,fileName,setFileName, Save}) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python3", label: "Python3" },
        { value: "java", label: "Java" },
    ];

    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ];

    return (
        <Box style={navbarStyles}>
            <h1>Code Craft</h1>
            <Select
                options={languages}
                value={userLang}
                onChange={(e) => setUserLang(e.value)}
                placeholder={userLang}
                style={selectContainerStyles}
            />
            <Select
                options={themes}
                value={userTheme}
                onChange={(e) => setUserTheme(e.value)}
                placeholder={userTheme}
                style={selectContainerStyles}
            />
            <label>Font Size</label>
            <TextField
                type="range"
                min="18"
                max="30"
                value={fontSize}
                step="2"
                onChange={(e) => { setFontSize(e.target.value) }}
                style={inputRangeStyles}
            />
			<Button onClick={compile}>
                Run
            </Button>
            <TextField
                type="text"
                value={fileName}
                variant="standard"
                label = "File Name"
                onChange={(e) => { setFileName(e.target.value) }}
            />

           
			<Button onClick={Save}>
                SaveToDB
            </Button>
        </Box>
    )
}

export default Navbar;
