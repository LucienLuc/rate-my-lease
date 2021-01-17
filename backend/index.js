require('dotenv').config()
const { response, request } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const Location = require('./models/location')
const Lease = require('./models/lease')

const {Client} = require("@googlemaps/google-maps-services-js")

app.use(express.json())
app.use(cors())

const client = new Client({})
const google_url = process.env.GOOGLE_API_KEY

app.get('/api/location-all', (request, response) => {
    Location.find({}, (error, docs) => {
        response.json(docs)
    })
})

app.get('/api/location', (request, response) => {
    const query = request.query
    // if searching for just address
    if(query.selection === '0')
    {
        Location.findOne({address: query.address})
        .then(location => {
            if(location){
                Lease.find({location: {$in: location._id}})
                .then(leases => {
                    const config = [
                        {
                            address: location.address,
                            reviews: location.reviews,
                            avg_rating: location.avg_rating,
                            lat: location.lat,
                            long: location.long,
                            leases
                        }
                    ]
                    response.json(config)
                })
            }else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).end()
        })
    }
    // if searching for leases with paramaters
    else{
        let address_flag = false
        let rating_flag = false
        let lower_bound_flag = false
        let upper_bound_flag = false
        let bed_flag = false
        let bath_flag = false

        if(query.address !== undefined && query.address !== '')
        {
            address_flag = true
        }
        if(query.rating !== undefined && query.rating !== '-1')
        {
            rating_flag = true
        }
        if(query.beds !== undefined && query.beds !== '-1')
        {
            bed_flag = true
        }
        if(query.baths !== undefined && query.baths !== '-1')
        {
            bath_flag = true
        }
        if(query.min !== undefined || query.min !== undefined)
        {
            if(query.min !== undefined && query.min !== null)
            {
                lower_bound_flag = true
            }
            if(query.max !== undefined && query.max !== null)
            {
                upper_bound_flag = true
            }
        }

        Location.find(address_flag ? {address: query.address} : {}).find(rating_flag ? {avg_rating: {"$gte": query.rating}} : {})
        .then(location => {
            const id_array = location.map(element => {
                return element._id
            })
            if(upper_bound_flag){
                Lease.find({location: {$in: id_array}}).find(bed_flag ? {bed: query.beds} : {}).find(bath_flag ? {bath: {"$gte": query.baths}} : {})
                .where("price").gte(lower_bound_flag ? query.min : 0).lte(query.max).then(leases => {
                    const lease_id_array = leases.map(element => {
                        return element.location
                    })
                    Location.find({_id: {$in: lease_id_array}}).then(f_location => {
                        let config = JSON.parse(JSON.stringify(f_location))
                        for(element in leases)
                        {
                            for(f_element in config)
                            {
                                if(leases[element].location.equals(config[f_element]._id))
                                {
                                    if(config[f_element].leases === undefined)
                                    {
                                        config[f_element].leases = [leases[element]]
                                    }
                                    else
                                    {
                                        config[f_element].leases.push(leases[element])
                                    }
                                }
                            }
                        }
                        response.json(config)
                    })
                    .catch(error => {
                        console.log(error)
                        response.status(500).end()
                    })
                }
            )}

            else{
                Lease.find({location: {$in: id_array}}).find(bed_flag ? {bed: query.beds} : {}).find(bath_flag ? {bath: {"$gte": query.baths}} : {})
                .where("price").gte(lower_bound_flag ? query.min : 0)
                .then(leases => {
                    const lease_id_array = leases.map(element => {
                        return element.location
                    })
                    Location.find({_id: {$in: lease_id_array}}).then(f_location => {
                        let config = JSON.parse(JSON.stringify(f_location))
                        for(element in leases)
                        {
                            for(f_element in config)
                            {
                                if(leases[element].location.equals(config[f_element]._id))
                                {
                                    if(config[f_element].leases === undefined)
                                    {
                                        config[f_element].leases = [leases[element]]
                                    }
                                    else
                                    {
                                        config[f_element].leases.push(leases[element])
                                    }
                                }
                            }
                        }
                        response.json(config)
                    })
                    .catch(error => {
                        console.log(error)
                        response.status(500).end()
                    })
                })
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).end()
        })
    }
})

app.post('/api/location', (request, response) => {
    const body = request.body
    client
        .geocode({
            params: {
                address: body.address,
                key: google_url
            }
        })
        .then((r) => {
            const tmpLocation = new Location ({
                address: body.address,
                reviews: [],
                lat: r.data.results[0].geometry.location.lat,
                long: r.data.results[0].geometry.location.lng,
                avg_rating: 0
            })
            tmpLocation.save().then(result => {
                console.log('sent location')
            })
        })
        .catch((e) => {
            console.log(e.response.data.error_message);
            response.status(e).end()
        })
})

app.get('/api/review', (request, response) => {
    const query = request.query
    Location.findOne({address: query.address})
    .then(location => {
        if(location){
            response.json(location.reviews)
        }else {
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).end()
    })
})

app.post('/api/review', (request, response) => {
    const body = request.body
    if(body.address === undefined || body.reviews === undefined ||
        body.reviews.rating === undefined || body.reviews.body === undefined)
        {
            return response.status(400).end()
        }

    Location.findOne({address: body.address}).then(location => 
    {
        // if location is valid and in db
        if(location) 
        {
            const tmpReview = 
            {
                rating: body.reviews.rating,
                date: new Date(),
                body: body.reviews.body
            }
            location.reviews.push(tmpReview)

            const length = location.reviews.length
            let totalAmount = 0
            location.reviews.map(element => {
                totalAmount += element.rating
            })
            
            location.avg_rating =  totalAmount / length

            location.save().then(result => {
                console.log('sent')
            })
        } 
        else // if user sent valid address but not database yet
        { 
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).end()
    })
})

app.post('/api/lease', (request, response) => {
    const body = request.body

    // error checking
    if(body.address === undefined || body.name === undefined || body.price === undefined || 
        body.bed === undefined || body.bath === undefined || body.contact === undefined || body.body === undefined)
        {
            return response.status(400).end()
        }
    if(body.contact.phone === undefined && body.contact.email === undefined)
    {
       return response.status(400).send("Error: Please enter either a phone number or email.").end()
    }
    if(body.contact.phone === null && body.contact.email === "")
    {
        return response.status(400).send("Error: Please enter either a phone number or email.").end()
    }

    Location.findOne({address: body.address}).then(location => 
    {
        if(location != null) 
        {
            const id = location._id
            const tmpLease = new Lease({
                location: id,
                name: body.name,
                date: new Date(),
                price: body.price,
                bed: body.bed,
                bath: body.bath,
                contact: {
                    phone: body.contact.phone,
                    email: body.contact.email,
                },
                body: body.body
            })
            tmpLease.save().then(result => {
                console.log('sent')
            })
        } 
        else 
        {
            response.status(404).end()
        }
    })
    .catch(error =>
    {
        console.log(error)
        response.status(500).end()
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})