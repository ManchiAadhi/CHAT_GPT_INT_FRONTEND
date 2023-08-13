import { useState } from "react"
import logo from "./assets/chatgpt2.png"
import { Box, Typography, Modal, TextField, LinearProgress} from '@mui/material';
import axios from "axios"
import GPTResponse from "./components/GPTResponse";
function App() {

  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const[loading,setLoading] =  useState(false);
  const[response,setResponse] = useState('');
  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
 async function handleSubmit (e){
e.preventDefault();
setResponse("");
setLoading(true);
const res = await axios.post("http://localhost:3000/chat", {prompt})
setLoading(false);
console.log(res.data)
setResponse(res.data);


}
  return (
    <div className="app">
      <img src={logo} />
      <button className="btn" onClick={handleOpen}>Ask Me Any Thing</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="chatgpt-model"
      >
        <Box className="container" >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Drop Yor Question.
          </Typography>
          <form   onSubmit={(e)=>handleSubmit(e)} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TextField value={prompt} onChange={(e) => { setPrompt(e.target.value) }} id="outlined-basic" label="Question" varient="outlined" sx={{ margin: "15px 0", width: "100%" }} />
            <button  type="submit" className="btn"> Submit</button>
          </form>
          {loading &&  <LinearProgress  color="secondary" sx={{margin:"20px 0 20px 0" }} />}
{response&& <GPTResponse response={response}/>}
        </Box>
      </Modal>
    </div>

  )
}

export default App
