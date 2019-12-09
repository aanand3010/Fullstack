const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log(process.argv[0],process.argv[1],process.argv[2],process.argv[3],process.argv[4],process.argv.length,'give password as argument')
    process.exit(1)
}

const password = process.argv[2]

//console.log(process.argv[0],process.argv[1],process.argv[2])

const url =
`mongodb+srv://fullstack:${password}@fullstack-mpqyb.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if ( process.argv.length===5 ) {
    console.log(process.argv[3],process.argv[4])
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then(response => {
    console.log('added ' + process.argv[3] + " " + process.argv[4] + ' to phonebook')
    mongoose.connection.close()
    })
}

if ( process.argv.length===3 ) {

    Contact.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(contact => {
        console.log(contact.name + " " +contact.number)
        })
        mongoose.connection.close()
        }
    )
}