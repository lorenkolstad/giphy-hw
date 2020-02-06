let animals = ["cat", "dog", "fish"];

function renderButtons() {

    $("#buttons-view").empty();

    for (let i = 0; i < animals.length; i++) {
        let x = $("<button>");

        x.addClass("animal");
        x.addClass("btn-outline-secondary");
        x.attr("data-name", animals[i]);
        x.text(animals[i]);
        
        $("#buttons-view").append(x);
    }
}

$("#add-animal").on("click", function(event) {
    event.preventDefault();

    let animal = $("#animal-input").val().trim();

    animals.push(animal);

    renderButtons();

})

$("#buttons-view").on("click", ".animal", function(event) {

    let animal = $(this).attr("data-name")
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=TFzw5L644qlyOX4bwrNLcR7EjhSu83F0&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response.data);
        console.log(queryURL);

        let giphys = response.data
        for (let i = 0; i < giphys.length; i++) {

            let element = `<img src= ${giphys[i].images.fixed_height.url} data-still= ${giphys[i].images.fixed_height_still.url} data-animate= ${giphys[i].images.fixed_height.url} data-state= "animate" class= "gifs">`

            let elementRating = "<p>" + giphys[i].rating + "</p>"


            $("#newGifs").append(elementRating);
            console.log(elementRating);
            $("#newGifs").append(element);
        }
    })
            $("#newGifs").empty();
})

$("#newGifs").on("click", ".gifs", function(event) {

    let state = $(this).attr("data-state")
    
    if (state === "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }

    else {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
});


renderButtons();