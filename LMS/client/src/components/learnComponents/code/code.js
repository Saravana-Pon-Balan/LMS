import React, { useState } from 'react';
import { Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Resizable } from 'react-resizable';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleCompile = () => {
    setOutput(code);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Online Compiler
      </Typography>

      <div style={{ display: 'flex', height: '500px' }}>
        <Resizable
          defaultSize={{ width: '50%' }}
          minWidth={100}
          maxWidth={800}
          enable={{ right: true }}
        >
          <div>
            <Select
              label="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ marginBottom: '10px' }}
            >
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
              <MenuItem value="PHP">PHP</MenuItem>
              {/* Add other language options as needed */}
            </Select>

            <TextField
              multiline
              rows={10}
              fullWidth
              label="Enter your code"
              variant="outlined"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </Resizable>

        <div style={{ flex: 1, marginLeft: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompile}
            style={{ marginTop: '10px' }}
          >
            Compile
          </Button>

          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Output:
          </Typography>

          <TextField
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            value={output}
            readOnly
            style={{ marginTop: '10px' }}
          />
        </div>
      </div>
    </Container>
  );
}

export default App;
