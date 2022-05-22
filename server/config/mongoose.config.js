const mongoose = require('mongoose');
const dbname = "tee-time";
mongoose.connect(`mongodb://localhost/${dbname}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log(`Connected to ${dbname} database`))
    .catch((err)=>console.log(err));