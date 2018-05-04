

module.exports.express={
    port:3001
}

const mongoose={
    dns:'localhost',
    port:27017,
    db:'slp-Hospitals',  
} 


module.exports.mongoose_uri = `mongodb://${mongoose.dns}:${mongoose.port}/${mongoose.db}`