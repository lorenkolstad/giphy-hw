var animals = ["cat", "dog", "fish"];

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {
        var x = $("<button>");

        x.addClass("animal");
        x.attr("data-name", animals[i]);
        x.text(animals[i]);

        $("#buttons-view").append(x);
    }
}

$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    animals.push(animal);

    renderButtons();

})

$("#buttons-view").on("click", ".animal", function(event) {

    var animal = $(this).attr("data-name")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=TFzw5L644qlyOX4bwrNLcR7EjhSu83F0&limit=5"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response.data);
        console.log(queryURL);

        var giphys = response.data
        for (let i = 0; i < giphys.length; i++) {

            var element = `<img src= ${giphys[i].images.fixed_height.url} data-still= ${giphys[i].images.fixed_height_still.url} data-animate= ${giphys[i].images.fixed_height.url} data-state= "animate" class= "gifs">`

            $("#newGifs").append(element);
        }
    })

})

$("#newGifs").on("click", ".gifs", function(event) {

    var state = $(this).attr("data-state")
    
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