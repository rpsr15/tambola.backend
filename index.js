var endpoints = require('./endpoints')
const url = require('url')
const Ticket = require('./Ticket')
const express = require('express')
const tambola = require('tambola');
const app = express()
const port = 3000

var tickets = []
const TICKET_COUNT = 600

function generateTickets()
{
    //clear tickets
    tickets = []
    for(var i = 0 ; i < TICKET_COUNT; i++)
    {
        const newTicket = tambola.generateTicket();
        const ticket = []
        for (const row of newTicket) {
            const newRow = []
            for (const element of row) {
                newRow.push({
                    num: element,
                    marked: false 
                })
            }
            ticket.push(newRow)
        }
        tickets.push(ticket)

    }
}

function getTicketById(id)
{
    const ticket = tickets[id]
    return ticket
}



app.get('/ticket/:id', async (req, res) => {
    //const search_params = (new URL(req.url)).searchParams
    const id = req.params.id
    console.log("id",id)
    if( parseInt(id,10)  && id < TICKET_COUNT && getTicketById(id))
    {
        const ticket = await getTicketById(id)
        console.log(ticket)
        res.send(ticket)
    }else{
        res.send("invalid ticket or tickets not generated")
    }
    
    
})


app.get('/getTickets', async (req, res) => {
    
    if(tickets.length > 0){
        res.send(tickets)
    }else{
        res.send("tickets not generated")
    }
    
})


app.get('/', async (req, res) => {
    
    await generateTickets();
    console.log(tickets)
    res.send('Hello World!')
    
})


// update ticket owner
app.post('',(req,res) => {

})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.get(endpoints.GENERATE_TICKETS, () => {
    const ticket = tambola.generateTicket();
    console.log(ticket)
    
})
