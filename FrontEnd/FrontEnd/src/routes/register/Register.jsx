import { Box, TextField } from "@mui/material";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="main">
      <Box
        onSubmit={(e) => submit(e)}
        component="form"
        sx={{
          "& > :not(style)": {
            width: "25ch",
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            margin: "0 auto",
            color: "white",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          variant="standard"
          type="password"
        />
        <button type="submit" className="button-primary">
          Crear cuenta
        </button>
      </Box>
    </div>
  );

  function submit(e) {
    e.preventDefault();
    console.log(`${password} ${username}`);
  }
}

export default Register;
