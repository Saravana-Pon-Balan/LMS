// App.js
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import Navbar from './nav';
import axios from 'axios';
import spinner from './spinner.gif';
import { Box, Button, TextareaAutosize } from '@mui/material';


function Code(props) {
    // State variables
    const [userCode, setUserCode] = useState('');
    const [userInput, setUserInput] = useState('');
    const [userOutput, setUserOutput] = useState('');
    const [loading, setLoading] = useState(false);
	const userid = props.userData;
    console.log(userid)
    // State variables for editor
    const [userLang, setUserLang] = useState("python");
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [fileName, setFileName] = useState("");
    // Function to call the compile endpoint
    const compile = () =>{
        setLoading(true);
        if (userCode === '') return;

        axios.post(`http://localhost:3001/compile`, {
            code: userCode,
            language: userLang,
            input: userInput,
        }).then((res) => {
            setUserOutput(res.data.output);
        }).then(() => {
            setLoading(false);
        })
    }

	const Save = () =>{
		axios.post(`http://localhost:3001/save_code`, {
			userId: userid,
            code: userCode,
            language: userLang,
            file_name:fileName
        }).then((res) => {
            console.log("Saved");
        }).then(() => {
            console.log("Failed TO Save");
        })
	}
    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        <Box width={"100%"} >
            <Navbar
                userLang={userLang} setUserLang={setUserLang}
                userTheme={userTheme} setUserTheme={setUserTheme}
                fontSize={fontSize} setFontSize={setFontSize}
				compile = {compile}
                fileName={fileName} setFileName={setFileName}
				Save = {Save}
            />
            <Box className="main" display={"flex"} width={"calc(100vw - 50px)"}>
                <Box className="left-container" width={"100%"}>
                    <Editor
                        options={{ fontSize: fontSize }}
                        height="calc(100vh - 50px)"
                        width="100%"
                        theme={userTheme}
                        language={userLang}
                        defaultValue="# Enter your code here"
                        onChange={(value) => { setUserCode(value) }}
						
                    />
                    
                </Box>
                <Box className="right-container" paddingLeft={"20px"} width={"100%"}>
                    <h4>Input:</h4>
                    <Box className="input-box">
                        <TextareaAutosize id="code-inp" onChange={(e) => setUserInput(e.target.value)}>
                        </TextareaAutosize>
                    </Box>
                    <h4>Output:</h4>
                    {loading ? (
                        <Box className="spinner-box">
                            <img src={spinner} alt="Loading..." />
                        </Box>
                    ) : (
                        <Box className="output-box">
                            <pre>{userOutput}</pre>
                            <Button onClick={() => { clearOutput() }} className="clear-btn">
                                Clear
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Code;
