var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=b7NVjCWm7hvalev6T5ZVweXLvFUYFTAp";

const movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

function displayMovieInfo() {

    const movie = this.getAttribute("data-name");
    const queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Creating an fetch call for the specific movie button being clicked
    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (responseJson) {

            const results = responseJson.data;

            // Looping over every result item
            for (let i = 0; i < results.length; i++) {

              // Only taking action if the photo has an appropriate rating
              if (results[i].rating === "r" || results[i].rating === "pg") {
                // Creating a div for the gif
                const gifDiv = document.createElement("div");

                // Storing the result item's rating
                const rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                const p = document.createElement("p");
                p.innerHTML = "Rating: " + rating;
                // Creating an image tag
                const personImage = document.createElement("img");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.setAttribute("src", results[i].images.fixed_height.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(personImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                document.getElementById("gifs-appear-here").prepend(gifDiv);
              }
            }
            
            
            
            
            
            
            
            
            
            
            // Creating a div to hold the movie
            const movieDiv = document.createElement("div");
            movieDiv.classList.add('movie');

            // Storing the rating data
            const rating = responseJson.Rated;

            // Creating an element to have the rating displayed
            const pOne = document.createElement("p")
            pOne.innerHTML = "Rating: " + rating;

            // Displaying the rating
            movieDiv.append(pOne);

            // Storing the release year
            const released = responseJson.Released;

            // Creating an element to hold the release year
            const pTwo = document.createElement("p")
            pTwo.innerHTML = "Released: " + released;

            // Displaying the release year
            movieDiv.append(pTwo);

            // Storing the plot
            const plot = responseJson.Plot;

            // Creating an element to hold the plot
            const pThree = document.createElement("p")
            pThree.innerHTML = "Plot: " + plot;

            // Appending the plot
            movieDiv.append(pThree);

            // Retrieving the URL for the image
            const imgURL = responseJson.Poster;

            // Creating an element to hold the image
            const image = document.createElement("img")
            image.setAttribute("src", imgURL);

            // Appending the image
            movieDiv.append(image);

            // Putting the entire movie above the previous movies
            document.getElementById("movies-view").prepend(movieDiv);
        });

}

function renderButtons() {

    document.getElementById("buttons-view").innerHTML = "";

    for (let i = 0; i < movies.length; i++) {

        const a = document.createElement("button");
        a.classList.add("movie");
        a.setAttribute("data-name", movies[i]);
        a.innerHTML = movies[i];
        document.getElementById("buttons-view").append(a);

        a.addEventListener("click", displayMovieInfo);
    }
}

document.getElementById("add-movie").addEventListener("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var movie = document.getElementById("movie-input").value.trim();

    // Adding the movie from the textbox to our array
    movies.push(movie);
    console.log(movies);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

document.querySelectorAll(".gif").forEach(function (img) {
    img.addEventListener("click", function (event) {

        // The javascript getAttribute method allows us to get or set the value of any attribute on our HTML element
        var state = event.target.getAttribute("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            event.target.setAttribute("src", event.target.getAttribute("data-animate"));
            event.target.setAttribute("data-state", "animate");
        } else {
            event.target.setAttribute("src", event.target.getAttribute("data-still"));
            event.target.setAttribute("data-state", "still");
        }
    });
});