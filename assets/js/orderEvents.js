/**
Events can be added anywhere in the JSON file. JS below will sort and order
events appropriately by date on the page.

JSON structure:
  eventName: **required**
  site: not required
  location: not required
  startDate: **required**
  endDate: not required
  description: not required
  featured: **required**
*/

const url = 'assets/events.json';
const norelblank = "target=\"_blank\" rel=\"noopener noreferrer\"";
let pastEvents = [];
let upcomingEvents = [];
let featuredEvents = [];
let homeEvents = [];

$.getJSON(url)
  .done(data => {
    processEvents(data);
  })
  .fail((a, b, c) => {
    console.log("JSON import failed. So that's it, folks; OHI/O is cancelled forever.");
    console.log("Error: ", c);
  });

function processEvents(data) {
  splitEventsIntoPastAndUpcoming(data);
  orderPastAndUpcomingEventsChronologically();
  insertEventsIntoPage(); //ensure this works for featured events
}

/**
 Splits events coming from data stream into two stacks, upcomingEvents and pastEvents, and
 adds featured events onto the featuredEvents stack
 @param data
    json file with events
 @requires [required fields are filled in on json file]
*/
function splitEventsIntoPastAndUpcoming(data) {
  // Sort the events into past and upcoming.
  const currentDate = new Date();
  for (const event of data) {
    const eventDate = new Date(event.startDate);
    if (eventDate < currentDate) {
      pastEvents.push(event);
    } else {
      upcomingEvents.push(event);
    }
    //add featured events
    const featured = event.featured;
    if(featured){
        featuredEvents.push(event);
    }
  }
}

function orderPastAndUpcomingEventsChronologically() {
  // Sort the events into correct chronological order, in past and upcoming.
  upcomingEvents.sort((e1, e2) => {
    if (new Date(e1.startDate) < new Date(e2.startDate)) {
      return -1;
    } else {
      return 1;
    }
  });
  pastEvents.sort((e1, e2) => {
    if (new Date(e1.startDate) > new Date(e2.startDate)) {
      return -1;
    } else {
      return 1;
    }
  });
}

/**
 Inserts upcoming, past, and featured events into the homepage
*/
function insertEventsIntoPage() {
  for (const event of upcomingEvents) {
    $("#events-upcoming").append(createEventBlock(event));
  }
  for (const event of pastEvents) {
    $("#events-past").append(createEventBlock(event));
  }
  for (const event of featuredEvents){
    $("#featured-event").append(createFeaturedEventBlock(event));
  }
 // for (const event of homeEvents){
 //   #("#event-box-text").append(createHomeEventBlock(event));
 // }
}

/*
    event.
        eventName: string of the event name
        site: string to the link of event page
        startDate: string of the start date (ex. "March 1, 2021")
        endDate: string of the end date (ex. "March 5, 2021")
        location: string of the location
        description: string of an event description
        featured: boolean if event is featured (one at a time)
*/
function createEventBlock(event) {
  let elem = "";
  if (event.site) {
    elem += "<h2><a href=\"" + event.site + "\" " + norelblank + ">" + event.eventName + "</a></h2><p><span>";
  } else {
    elem += "<h2>" + event.eventName + "</h2><p><span>";
  }

  if (event.endDate) {
    const start = event.startDate.split(" ");
    const end = event.endDate.split(" ");
    if (start[0] == end[0]){
      elem += start[0] + " " + start[1].substring(0, start[1].length - 1) + " - " + end[1].substring(0, end[1].length - 1) + ", " + start[2];
    } else {
      elem += start[0] + " " + start[1].substring(0, start[1].length - 1) + " - " + end[0] + " " + end[1].substring(0, end[1].length - 1) + ", " + start[2];
    }
  } else {
    elem += event.startDate;
  }

  if (event.location) {
    elem += "  //  " + event.location;
  }

  elem += "</span><br />";

  if (event.description) {
    elem += event.description;
  }

  elem += "</p>";
  return elem;
}



/**
 Creates a featured event block
*/
function createFeaturedEventBlock(event){
  let elem = "";
  if(event.featured){
      if (event.site) {
          elem += "<a href=\"" + event.site + "\" " + norelblank + "><h3>FEATURED EVENT</h3>\n" + "<h1>" + event.eventName + "</h1>\n";
        } else {
          elem += "<h3>FEATURED EVENT</h3>\n" + "<h1>" + event.eventName + "</h1>\n";
        }


        if (event.endDate) {
            const start = event.startDate.split(" ");
            const end = event.endDate.split(" ");
            if (start[0] == end[0]){
              elem += "<h4>" + start[0] + " " + start[1].substring(0, start[1].length - 1) + " - " + end[1].substring(0, end[1].length - 1) + ", " + start[2] + "</h4>\n";
            } else {
              elem += "<h4>" + start[0] + " " + start[1].substring(0, start[1].length - 1) + " - " + end[0] + " " + end[1].substring(0, end[1].length - 1) + ", " + start[2] + "</h4>\n";
            }
          } else {
            elem += "<h4>" + event.startDate + "</h4>\n";
          }

          if(event.site){
            elem += "</a>";
          }

    }

  return elem;
}

/*
//Creates a home event block
function createHomeEventBlock(event){
  let elem = "";
  var homeDate = new Date("February 9, 2012, 12:15");
  var currentdate = new Date();

  let name = event.eventName;
      switch(name.substring(0,name.indexOf("I/O")){
        case "HackOHI/O":
        //code
        break;
        case "MakeOHI/O":
        //code
        break;
        case "ShowOHI/O"

        break;
        case "Code I/O"

        break;
        case "High School I/O"
        break;

        case "Data I/O"
        break;

        case "Hack A/I"
        break;

        case "Logi I/O"
        break;

        case "Bio-Hack"
        break;

      }

  return elem;
}*/

