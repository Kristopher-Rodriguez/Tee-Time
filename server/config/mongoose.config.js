const mongoose = require('mongoose');
const dbname = "tee-time";
mongoose.connect(`mongodb://127.0.0.1/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log(`Connected to ${dbname} database`))
    .catch((err)=>console.log(err));
