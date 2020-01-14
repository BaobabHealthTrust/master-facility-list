import styled from "styled-components";
import { withStyles, TextField } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
`;
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 40%;
  margin: 10% auto;
  padding: 30px;
  border-left: 6px solid #82b1ff;
  border-right: 6px solid #82b1ff;
  background-color: #0d47a1;
`;

export const Title = styled.h3`
  color: white;
  font-size: 26px;
`;
export const StyledTextField = withStyles({
  root: {
    background: "white",
    borderRadius: "0px 4px 4px 0px",
    margin: "6px 0px",
    width: "100%",
    "& fieldset": {
      borderRadius: "0px 4px 4px 0px !important"
    },
    "&:hover fieldset": {
      borderColor: "gray !important"
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray !important"
    }
  }
})(TextField);
export const InputContainer = styled.div`
  display: flex;
`;

export const InputIconContainer = styled.div`
  background: #f3f3f3;
  color: gray;
  width: 15%;
  margin: 6px 0px;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 26px;
  border-radius: 4px 0px 0px 4px;
`;

export const Notification = styled<any>("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 4px;
  padding: 0.3rem;
  font-size: 1rem;
  background-color: ${props => (props.warning ? "khaki" : "powderblue")};
  color: ${props => (props.warning ? "olive" : "midnightblue")};
  i {
    cursor: pointer;
  }
`;

export const NotificationContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;
