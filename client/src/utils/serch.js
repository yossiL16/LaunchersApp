export function serchLaunchers(data, city, rocketType){
    return data.filter(louncher => {
        const checkCity = !city || city.toLowerCase() === louncher.city.toLowerCase();
        const checkRocketType = !rocketType || rocketType.toLowerCase() === louncher.rocketType.toLowerCase();
        return checkCity && checkRocketType
    })
}