'use client'

import { Box, Typography, Stack, TextField, Button, Icon} from "@mui/material";
import { useEffect, useState, useRef, classes} from "react";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ]);
  
  const [mode, setMode] = useState('light');
  const [bgOne, setBgOne] = useState("#D9D9D9");
  const [bgTwo, setBgTwo] = useState("#BDC3C7");
  const [bgThree, setBgThree] = useState("#FFFFFF");
  const [bgFour, setBgFour] = useState("#786fa6");
  const [colorOne, setcolorOne] = useState('#111');
  const [glowOne, setglowOne] = useState('0 0 30px 1px #786fa6');
  const [buttonOne, setbuttonOne] = useState('#786fa6');
  const [buttonTwo, setbuttonTwo] = useState('#fff');

  

  const darkMode = () => {
    if (mode === "light") {
      setMode("dark");
      setBgOne("#1A1A2E"); // Darker shade of blue
      setBgTwo("#16213E"); // Even darker blue
      setBgThree("#0F3460"); // Dark navy blue
      setBgFour("#E94560"); // Bright red for accents
      setcolorOne('#EAEAEA'); // Light gray for text
      setglowOne('0 0 40px 4px #E94560'); // Glow effect color updated
      setbuttonOne('#E94560'); // Update button color
    }
  };
  

  const lightMode = () => {
    if (mode === "dark") {
      setMode("light");
      setBgOne("#D9D9D9");
      setBgTwo("#BDC3C7");
      setBgThree("#FFFFFF");
      setBgFour("#E67E22");
      setcolorOne('#111');
      setglowOne('0 0 30px 1px #786fa6');
      setbuttonOne('#786fa6');
    }
  };

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' }
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json' // Set content type
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: message }
          ]
        }) // Send the messages in the request body
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let result = '';
      await reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text
            }
          ];
        });
        return reader.read().then(processText);
      });

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const styles = theme => ({
    multilineInput:
    {
      color:'#fff'
    }

  })


  useEffect(() => {
    document.title = "Compendio";
    scrollToBottom();
  }, [messages]);

  

  return (
    <Box
      backgroundColor={bgOne}
      width={'100vw'}
      height={'100vh'}
      position={'relative'}
      overflow={'hidden'}
    >
      {/*/////////// Left pane //////////////*/}
      <Box
        position={'absolute'}
        width={{ xs: '100vw', sm: '50vw', md: '28vw' }}
        height={{xs:'13vh',sm:'100vh', md:'100vh'}}
        top={'0'}
        left={'0'}
        backgroundColor={bgTwo}
      >
        
        {/*///////// Menu /////////// */}
        <Box
          position={{xs:'fixed',sm:'absolute',md:'absolute'}}
          width={{ xs: '30vw', sm: '20vw', md: '14vw' }}
          backgroundColor={bgOne}
          borderRadius={'2em'}
          top={{xs:'2vh',sm:'1vh',md:'2vh'}}
          left={{ xs: '5vw', sm: '10vw', md: '7vw' }}
          padding={{xs:'0.1em',sm:'0.3em',md:'1em'}}
          display={'flex'}
          alignContent={'center'}
          justifyContent={'space-around'}
        >
          <Box
          margin={{xs:'0',sm:'0 0.5em',md:'0 2em'}}
          onClick={lightMode}
          >
            <LightModeOutlinedIcon
              
              sx={{ color:colorOne, transition:'0.5s', '&:hover':{
                transform: 'scale(1.3)'
              } }}
            ></LightModeOutlinedIcon>
          </Box>
          
          <Typography
            sx={{ color: mode === 'light' ? colorOne : colorOne }}
          >|</Typography>

          <Box
          margin={{xs:'0',sm:'0 0.5em',md:'0 2em'}}
          onClick={darkMode}
          >
            <DarkModeOutlinedIcon
              sx={{ color:colorOne, transition:'0.5s', '&:hover':{
                transform: 'scale(1.3)'
              } }}
            ></DarkModeOutlinedIcon>
          </Box>
          
        </Box>

        {/* ////////////// DP placeholder ///////////////////// */}
        <Box
          width={{ xs: '40px', md: '200px' }}
          height={{ xs: '40px', md: '200px' }}
          borderRadius={'50%'}
          backgroundColor={bgOne}
          position={{xs:'fixed', sm:'static',md:'static'}}
          right={{xs:'5vw'}}
          top={{xs:'2vh'}}
          margin={{xs:'0', sm: '4em auto', md: '9em auto' }}
          marginBottom={{xs:'0',sm:'0',md:'0.5em'}}
          boxShadow={messages[messages.length - 1]?.role === 'assistant' ? glowOne : 'none'} // Apply glow when assistant answers
        >
        </Box>

        <Typography
          color={colorOne}
          textAlign={'center'}
          fontSize={{xs:'0.8em',sm:'1em',md:'2em'}}
          position={{xs:'fixed',sm:'static',md:'static'}}
          right={{xs:'3vw'}}
          top={{xs:'9vh'}}
        >
          Hi, John Doe!
        </Typography>
        <Typography
        color={colorOne}
        textAlign={'center'}
        fontSize={'0.8em'}
        display={{xs:'none'}}
        >
          Bio
        </Typography>
        
      </Box>
      {/* ///////////////// Left pane ends here ////////////////// */}
      <Box
        position={'absolute'}
        right={0}
        top={{xs:'15vh',sm:'0',md:'0'}}
        height={'90vh'}
        padding={'1em'}
        margin={{xs:'0 0 10vh 0'}}
        width={{ xs: '90vw', sm: '80vw', md: '62vw' }}
      >
        <Stack
          direction={'column'}
          spacing={5}
          flexGrow={1}
          overflow={'auto'}
          maxHeight={'100%'}
          maxWidth={'100%'}
          disabled={isLoading}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display={'flex'}
              width={'95%'}
              marginBottom={{xs:'18vh'}}
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box color={'#fff'} padding={'1em'} borderRadius={'2em'} bgcolor={
                message.role === 'assistant' ? '#786fa6' : '#cf6a87'
              }>
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>
      <Box
        position={"fixed"}
        bottom={{xs:'0',sm:'5vh',md:'5vh'}}
        right={'3vw'}
        width={{ xs: '90vw', sm: '80vw', md: '62vw' }}
        display={'flex'}
        alignContent={'center'}
        backgroundColor={bgOne}
        padding={'0.5em'}
        zIndex={'10'}
      >
        <Box width={'80%'}

        >
          <TextField
            id="outlined-textarea"
            placeholder="Hey"
            multiline
            fullWidth
            label="Compendio Message"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: colorOne,
                '& fieldset': {
                  borderColor: colorOne,
                },
                '&:hover fieldset': {
                  borderColor: bgFour,
                },
                '&.Mui-focused fieldset': {
                  borderColor: bgFour,
                },
              },
              '& .MuiInputLabel-root': {
                color: colorOne,
              },
            }}
            InputProps={{
              sx: {
                color: colorOne,
              },
            }}
            InputLabelProps={{
              sx: {
                color: colorOne,
              },
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <Button
          onClick={sendMessage}
          disabled={isLoading}
          sx={{
            backgroundColor: buttonOne,
            color: 'white',
            '&:hover': {
              backgroundColor: buttonTwo,
              color: 'black',
            },
          }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Box>

    </Box>
  );
}
