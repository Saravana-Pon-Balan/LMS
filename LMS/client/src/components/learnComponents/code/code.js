import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import MonacoEditor from 'react-monaco-editor';

const Code = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    try {
      const result = code;
      setOutput(result.toString());
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <Grid container spacing={3} height={"calc(100vh - 80px)"} width={"calc(100vw - 60px)"}>
        <Grid item xs={8} height={"calc(100vh - 80px)"} borderRadius={"5px"} >
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }} boxShadow={"1px 7px 30px 11px rgba(0,0,0,0.86)"}>
            <Typography variant="h5" gutterBottom>
              Online Code Compiler
            </Typography>

            <MonacoEditor
              height="calc(100% - 80px)"
              width="inherit"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleRunCode}
              style={{ marginTop: '10px' }}
            >
              Run Code
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Output:
            </Typography>
              <pre>{output}</pre>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Code;
