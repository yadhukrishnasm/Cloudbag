const gramma = require('gramma')

const GrammaCheck = async(para) =>{
try{
    var result = await gramma.check(para)
    return result.matches.map((item)=>({
        'message':item.message,
        'sentence':item.sentence,
        'word':item.word
    }))
}catch(err){
    console.log("Error in gramma check ->"+err)
}
}

module.exports = GrammaCheck;