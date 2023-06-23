const { getMean, getMedian, getMode } = require('../maths');

describe('Arithmetic calculation', ()=> {
    let list;
    beforeEach(function(){ list =[ 1,3,5,7]; });

    test('Get the mean of the list of number', ()=>{
        //is adding up all the data points and dividing the sum by the number of data points (or total number of numbers)
        const mean = getMean(list);
        expect(mean).toEqual(4);

    });

    test('Get the median of the list of number', ()=>{
        //is the middle value (or midpoint) after all the data points have been arranged in value order as a list of numbers.
        list.push(4);
        const median = getMedian(list);
        expect(median).toEqual(4);

    });
    test('Get the mode of the list of number', ()=>{
        //is the value that appears the most number of times in a data set. 
        list.push(3);
        const mode = getMode(list);
        expect(mode).toEqual(3);
    });

});
