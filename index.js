const baseURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-ftb-et-web-pt';

//refferences
const main = document.querySelector('main');
const eventContainer = document.getElementById('eventContainer');
const form = document.querySelector('#formContainer');

//get events
async function getEvents(){
    const response = await fetch(`${baseURL}/events`);
    const json = await response.json();
    if(!json.success){
        throw new Error(json.console.error);

    }
    return json.data;
}

//create events
async function createEvent(event){
    const response = await fetch('${baseURL}/events', {
        method: 'post',
        headers: 
        {"Content-Type": "application/json"},
        body: JSON.stringify(event)
    });
    const json = await response.json();
    if(!json.success){
        throw new Error(json.error);
    }
        return json.data

}


//display events
function addEventsToScreen(event){
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("eventDiv");
    const eventName = document.createElement("h2");
    const eventDate = document.createElement("h3");
    const eventDescription = document.createElement("a");
    const eventLocaion = document.createElement("a");
    const space = document.createElement("br")

    eventName.append(event.name);
    eventDate.append(event.date);
    eventDescription.append(event.description);
    eventLocaion.append(event.location);

    eventDiv.append(eventName);
    eventDiv.append(eventDate);
    eventDiv.append(eventDescription);
    eventDiv.append(space);
    eventDiv.append(eventLocaion);

    eventContainer.appendChild(eventDiv);
}

document.addEventListener('DOMContentLoaded', async () => {
    const events = await getEvents();

    events.forEach(event => {
        addEventsToScreen(event)
    })
});

//delte events
