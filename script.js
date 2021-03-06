
let oldItemQuantity = 0;

const print = async(city) => {
    var weather;

    const data = await fetch('https://api.meteo.lt/v1/places/'+city+'/forecasts/long-term')
        .then(res => res.json())
        .then(data => weather = data);

    let card_amount = 1;

    let column_number = card_amount;
    let first_item = true;
    let carousel_inner = document.querySelector(".carousel-inner");

    let carouselItems = carousel_inner.childNodes;
    console.log(carouselItems.length)
    oldItemQuantity = carouselItems.length;


    let item_quanity = -1;

    for (let timeStamps in weather.forecastTimestamps){
        item_quanity ++;
        if (column_number === card_amount){

            let carousel_item = document.createElement("div"); // creates new carousel item
            carousel_item.classList.add("carousel-item");
            if (first_item){
                carousel_item.classList.add("active");
                first_item = false;
            }
            carousel_inner.appendChild(carousel_item)
        }

        let carousel_item_list = carousel_inner.querySelectorAll(".carousel-item");
        let latest_carousel_item = carousel_item_list[carousel_item_list.length - 1]

        if (column_number === card_amount) { //checks if the column number in a row is three

            let container = document.createElement("div");
            container.classList.add("container");

            let row = document.createElement("div"); // creates new row
            row.classList.add('row');

            let column = document.createElement("div"); //creates new column
            column.classList.add("col");

            row.appendChild(column);
            container.appendChild(row);
            latest_carousel_item.appendChild(container)

            column_number = 1;
        } else { // creates and ads new column to row if it's not "full"

            let container_list = carousel_inner.querySelectorAll(".container");
            let latest_container = container_list[container_list.length - 1]

            let rows = latest_container.querySelectorAll(".row"); //reselects the new last row
            let latest_row = rows[rows.length - 1];

            let column = document.createElement("div");
            column.classList.add("col");

            latest_row.appendChild(column);
            column_number += 1;
        }

        let container_list = carousel_inner.querySelectorAll(".container");
        let latest_container = container_list[container_list.length - 1];

        let column_list = latest_container.querySelectorAll(".col");
        let latest_column = column_list[column_list.length - 1]

        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("style", "width: 18rem;");

        let card_body = document.createElement("div");
        card_body.classList.add("card-body");

        const info_type_text = ["Time", "Air temperature", "Wind speed", "Wind gust", "Wind direction", "Cloud cover", "Sea level pressure", "Relative humidity", "Total precipitation", "Condition code"]

        let counter = 0;

        let icon = document.createElement("i");
        icon.classList.add("wi");

        let time_of_day;

        let time_location = weather.forecastTimestamps[timeStamps].forecastTimeUtc;
        let time = time_location.charAt(time_location.length - 8)+time_location.charAt(time_location.length - 7);
        if (parseInt(time) >= 18 || parseInt(time) < 6) {
            time_of_day = "night"
        } else {
            time_of_day = "day"
        }

        switch (weather.forecastTimestamps[timeStamps].conditionCode) {
            case "clear":
                if (time_of_day === "day"){
                    icon.classList.add("wi-day-sunny");
                } else {
                    icon.classList.add("wi-night-clear");
                }
                break;
            case "isolated-clouds":
                icon.classList.add("wi-"+time_of_day+"-cloudy");
                break;
            case "scattered-clouds":
                icon.classList.add("wi-"+time_of_day+"-cloudy-high");
                break;
            case "overcast":
                icon.classList.add("wi-cloud");
                break;
            case "light-rain":
                icon.classList.add("wi-"+time_of_day+"-showers");
                break;
            case "moderate-rain":
                icon.classList.add("wi-"+time_of_day+"-hail");
                break;
            case "heavy-rain":
                icon.classList.add("wi-"+time_of_day+"-rai");
                break;
            case "sleet":
                icon.classList.add("wi-"+time_of_day+"-rain-mix");
                break;
            case "light-snow":
                icon.classList.add("wi-"+time_of_day+"-snow");
                break;
            case "moderate-snow":
                icon.classList.add("wi-snow");
                break;
            case "heavy-snow":
                icon.classList.add("wi-snowflake-cold\n");
                break;
            case "fog ":
                icon.classList.add("wi-fog");
                break;
            case "na ":
                icon.classList.add("wi-na\n");
                break;
        }

        card_body.appendChild(icon);

        for (status in weather.forecastTimestamps[timeStamps]){
            let info_node = document.createElement("div");
            info_node.innerText = info_type_text[counter] + ": " + weather.forecastTimestamps[timeStamps][status];
            card_body.appendChild(info_node)
            if (counter === 9) {
                counter = 0;
            } else {
                counter ++;
            }
        }
        let info_node = document.createElement("div");
        info_node.innerText = city;
        card_body.appendChild(info_node)

        card.appendChild(card_body);
        latest_column.appendChild(card);
    }
    for (let i =0; oldItemQuantity > i; i ++){
        carousel_inner.firstChild.remove();
    }
}
print("kaunas")

const selector = document.querySelector("#city");
const submit_button = document.querySelector("#submit")

submit_button.addEventListener("click", function () {
    let choice = selector.options[selector.selectedIndex].value;
    print(choice);
    }
)