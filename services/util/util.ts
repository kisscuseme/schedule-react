export const getToday = () => {
    const dateArr = (new Date()).toLocaleDateString().replaceAll(" ", "").split(".");
    const today = dateArr[0] + "-" + ("0"+dateArr[1]).substr(-2, 2) + "-" + ("0"+dateArr[2]).substr(-2, 2);
    
    return today;
}