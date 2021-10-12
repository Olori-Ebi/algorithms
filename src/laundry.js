/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
    let socksCount = 0;

    for (let sock = 0; sock < cleanPile.length; sock++) {
        if (cleanPile.includes(cleanPile[sock], sock+1)) {
            let sockPair = cleanPile.lastIndexOf(cleanPile[sock]);
            cleanPile.splice(sockPair, 1);
            socksCount++
        } else if(dirtyPile.includes(cleanPile[sock])) {
            if (noOfWashes > 0){
                let sockPair = dirtyPile.lastIndexOf(cleanPile[sock]);
                dirtyPile.splice(sockPair, 1);
                noOfWashes--
                socksCount++
            }
        }
    }
    
    for (let sock = 0; sock < dirtyPile.length; sock++) {
        if (noOfWashes > 1) {
            if (dirtyPile.includes(dirtyPile[sock], sock+1)) {
                let sockPair = dirtyPile.lastIndexOf(dirtyPile[sock]);
                dirtyPile.splice(sockPair, 1)
                noOfWashes-=2
                socksCount++
            }
        }
    }
    return socksCount
}

module.exports = getMaxPairs;
