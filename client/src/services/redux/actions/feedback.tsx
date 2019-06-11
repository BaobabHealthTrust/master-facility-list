import actions from "./actions";
import { getFeedbackTypes, postFeedback } from "../../api";

export const fetchFeedbackTypes = () => {
  return {
    type: actions.fetchFeedbackTypes,
    payload: getFeedbackTypes()
  };
};

export const sendFeedback = (data: any) => {
  return {
    type: actions.sendFeedback,
    payload: postFeedback(data)
  };
};
