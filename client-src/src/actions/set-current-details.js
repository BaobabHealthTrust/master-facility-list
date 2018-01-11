export default function setCurrentDetails(facilities, id) {
    let details = facilities.filter(facility => facility.id === id);
    details = details.length > 0 ? details : null;
    return {
        type: 'SET_CURRENT_DETAILS',
        payload: details
    };
}
