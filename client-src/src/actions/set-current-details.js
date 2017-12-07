export default function setCurrentDetails(facilities, id) {
    const details = facilities.filter(facility => facility.id == id);

    return {
        type: "SET_CURRENT_DETAILS",
        payload: details
    };
}
