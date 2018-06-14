const initialValues = {
    feedbackTypes: [],
    feedbackSubmitted: false
}
export default (state = initialValues, action) => {
    switch (action.type) {
        case 'FETCH_FEEDBACK_TYPES':
            if(action.payload.data){
                return {
                    ...state,
                    feedbackTypes: action.payload.data
                }
            }
            break;
        case 'POST_FEEDBACK':
            console.log(action);
            if(action.payload.data){
                return {
                    ...state,
                    feedbackSubmitted: true
                }
            }
            return state;
            break;
        default:
            return state;
            break;
    }
}