/*is adding up all the data points and dividing the sum by the number of data points (or total number of numbers)*/
function getMean(nums){
   try {
        const result = nums.reduce((accumulator, currentValue) => accumulator + currentValue,0);
        const total = result/nums.length;
        return total;

   } catch (error) {
     
   }
}
 /*is the middle value (or midpoint) after all the data points have been arranged in value order as a list of numbers.*/
function getMedian(nums){
   try {

        nums.sort((a,b) => { return a-b; });
        let half = Math.floor(nums.length / 2);
        if (nums.length % 2)
            return nums[half];
        return (nums[half - 1] + nums[half]) / 2.0;

   } catch (error) {
   }
}
 /*is the value that appears the most number of times in a data set.*/
function getMode(nums){
    
    try {
        const sortList = nums.slice().sort((x, y) => x - y);
        let bestStreak = 1;
        let bestElem = sortList[0];
        let currentStreak = 1;
        let currentElem = sortList[0];
        
        for (let i = 1; i < sortList.length; i++) {
            if (sortList[i-1] !== sortList[i]) {
            if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
                bestElem = currentElem;
            }
            currentStreak = 0;
            currentElem = sortList[i];
            }
            currentStreak++;
        }
        return currentStreak > bestStreak ? currentElem : bestElem;
    } catch (error) {
        
    }
}

module.exports = { getMean, getMedian, getMode }