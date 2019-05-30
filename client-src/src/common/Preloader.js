//@flow
import React from "react";
import styled from "styled-components";


const Loader = styled.div.attrs({ className: "center-align" })`
  position: fixed;
  z-index: 999;
  overflow: show;
  margin: auto;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Container=styled.div`
margin:auto;
position:absolute;
width: 400px;
height: 300px;
top:50%;
left:50%;
margin-top:-150px;
margin-left:-200px;
overflow:show;
`
const Spinner=styled.div`
 margin:auto;

 background-image: url("${props => props.background}");
background-repeat: no-repeat;
background-position: center;
width: 200px;
height: 200px;
`

const Message=styled.div`
    font-size:28px;
    color:${props => props.color};
    margin-bottom:15px;
`
const Link=styled.a`
    
`

export default (props) => {
    const spinnerBackground=props.error?"./connection-error-200.png":"./Loading-blue-200px.gif";
    const textColor=props.error?"#222222":"#5a90dc";
  return (
    <Loader>
        <Container>
        <Spinner background={spinnerBackground}/>
      <Message color={textColor}>
          {props.error?"THERE WAS A NETWORK ERROR. PLEASE TRY AGAIN":"SETTING UP YOUR ENVIRONMENT THIS COULD TAKE A WHILE..."}
      
      </Message>{
          props.error && <Link href="/" class="btn blue">Try Again</Link>
      }
      
        </Container>
      
    </Loader>
  );
};
