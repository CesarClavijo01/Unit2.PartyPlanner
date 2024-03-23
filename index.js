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
    const response = await fetch(`${baseURL}/events`, {
        method: 'post',
        headers: 
        {"Content-Type": "application/json"},
        body: JSON.stringify(event)
    });
    const json = await response.json();
    if(!json.success){
        throw new Error(json.error);
    }
        return json.data;

}


//display events
function addEventsToScreen(event){
    const deleteBtn = document.createElement("button");
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("eventDiv");
    const eventName = document.createElement("h2");
    eventName.classList.add("name")
    const eventDate = document.createElement("h3");
    const eventDescription = document.createElement("a");
    const eventLocaion = document.createElement("a");
    const space = document.createElement("br");
    const deleteText = document.createTextNode("X");
    deleteBtn.classList.add("deleteBtn");
    const idContainer = document.createElement("h2");
    idContainer.classList.add("eventId");

    idContainer.append("#" + event.id);
    deleteBtn.append(deleteText);
    eventName.append(event.name);
    eventDate.append(event.date);
    eventDescription.append(event.description);
    eventLocaion.append(event.location);

    eventDiv.append(deleteBtn);
    eventDiv.append(idContainer);
    eventDiv.append(eventName);
    eventDiv.append(eventDate);
    eventDiv.append(eventDescription);
    eventDiv.append(space);
    eventDiv.append(eventLocaion);

    eventContainer.appendChild(eventDiv);

    deleteBtn.addEventListener("click", async (event) => {
        //get the id of the event we want to delete
        const selectedEvent = event.target.closest(".eventDiv");
        const id = selectedEvent.querySelector(".eventId").innerText.slice(1);
    
        //delete the event from the DB
        deleteEvents(id)

        //delete the event from the screen
        selectedEvent.remove()
    })
};

document.addEventListener('DOMContentLoaded', async () => {
    const events = await getEvents();

    events.forEach(event => {
        addEventsToScreen(event)
    })

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name");
        const date = document.getElementById("date");
        const description = document.getElementById("description");
        const location = document.getElementById("location");

        const newEvent = {
            name: name.value,
            date: date.value,
            description: description.value,
            location: location.value
        };
        
        try{
            const postedEvent = await createEvent(newEvent);
            console.log(postedEvent);

            addEventsToScreen(postedEvent);
        }
        catch{
            console.error(err);
        }
    })
});



//delte events
async function deleteEvents(id){
    const response = await fetch(`${baseURL}/events/${id}`, {
        method: 'delete'
    });


    if(response.status === 204){

        return true;

    }

    throw new Error(`Sorry we can't delete the event with Id ${id}`);
} 

