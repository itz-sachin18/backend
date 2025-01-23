
const add=(a,b) =>a+b;
const sub = (a,b) =>a-b;

const arr = (arr) => {
     let result=[];
    for(let i=0;arr.length;i++){
        if(arr[i]%2===0){
            result.push(i);
        }
            
      
    }
    return result;     
};


module.exports={add,sub,arr};