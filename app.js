const express = require('express');
const ExpressError = require('./ExpressError');
const { getMean, getMedian, getMode } = require('./maths');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
   return res.send('<h1>EXPRESS ROUTING EXERCISE !!!!</h1>');
});

app.get('/mean', (req, res, next)=> {
    
    try {

        if (req.query.nums){

            const numbers = getListNum(req);
            const operation = "mean";
            const value = getMean(numbers);
            const data = { response: { operation, value } };

            if (req.query.save && req.query.save === "true"){

              const timestamp = displayTime();
              const dataSave = { response: { operation, value, timestamp } };

                fs.writeFileSync("result.json", JSON.stringify(dataSave), (error)=> {
                    if (error){
                        throw new ExpressError(error,400);
                    }
                });
            }
            return res.send(data);

        }else{
            throw new ExpressError('nums are required',400);
        }

    } catch (error) {
       return next(error);
    }

});


app.get('/median', (req, res, next)=> {

    try {
        
        if (req.query.nums){
            const numbers = getListNum(req);
            const operation = "median";
            const value = getMedian(numbers);
            const data = { response: { operation, value } };
            if (req.query.save && req.query.save === "true"){
                
                const timestamp = displayTime();
                const dataSave = { response: { operation, value, timestamp } };
  
                  fs.writeFileSync("result.json", JSON.stringify(dataSave), (error)=> {
                      if (error){
                          throw new ExpressError(error,400);
                      }
                  });
              }
            return res.send(data);
            
        }else{
            throw new ExpressError('nums are required',400);
        }

    } catch (error) {
        return next(error);
    }

});

app.get('/mode', (req, res, next)=> {

    try {

        if (req.query.nums){
            const numbers = getListNum(req);
            const operation = "mode";
            const value = getMode(numbers);
            const data = { response: { operation, value } };
            if (req.query.save && req.query.save === "true"){
                
                const timestamp = displayTime();
                const dataSave = { response: { operation, value, timestamp } };
  
                  fs.writeFileSync("result.json", JSON.stringify(dataSave), (error)=> {
                      if (error){
                          throw new ExpressError(error,400);
                      }
                  });
              }
            return res.send(data);

        }else{
            throw new ExpressError('nums are required',400);
        }
    } catch (error) {
        return next(error);
    }

});

app.get('/all', (req, res, next)=> {

    try {

        if (req.query.nums){
            const numbers = getListNum(req);
            const operation = "all";
            const mean = getMean(numbers);
            const median = getMedian(numbers);
            const mode = getMode(numbers);
            const data = { response: { operation, mean, median, mode}};

            if (req.query.save && req.query.save === "true"){
                
                const timestamp = displayTime();
                const dataSave ={ response: { operation, mean, median, mode,timestamp}};
  
                  fs.writeFileSync("result.json", JSON.stringify(dataSave), (error)=> {
                      if (error){
                          throw new ExpressError(error,400);
                      }
                  });
              }
            return res.send(data);


        }else{
            throw new ExpressError('nums are required',400);
        }
    } catch (error) {
        return next(error);
    }

});

function getListNum(req){
   const list = [];
    for(let el of req.query.nums.split(',')){
        if (Number(el)){
            list.push(Number(el));
        }else{
            throw new ExpressError(`${el} is not a number`,400);
        }
    }
    return list;
}
function displayTime() {
    let str = "";

    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds()

    let day = currentTime.getDay()
    let month =currentTime.getMonth()
    let year = currentTime.getFullYear()

    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + month
    }

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += month +"-"+ day +"-"+ year +" "+ hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}


// 404 handler
app.use((req, res, next)=> {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});
// generic error handler
app.use((err, req, res, next)=> {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.sendStatus(status).json({
        error: {message, status}
    });
});
// end generic handler
app.listen(3000,()=>{
    console.log('app listening on port 3000');
});