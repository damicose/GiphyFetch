let queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=b7NVjCWm7hvalev6T5ZVweXLvFUYFTAp";

const heroes = ["Wolverine", "Hulk", "The Flash"];

function displayHeroInfo() {

    const hero = this.getAttribute("data-name");
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=b7NVjCWm7hvalev6T5ZVweXLvFUYFTAp&limit=10";

    // Creating an fetch call for the specific hero button being clicked
    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (responseJson) {

            const results = responseJson.data;

            // Looping over every result item
            for (let i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating === "g" || results[i].rating === "pg") {
                    // Creating a div for the gif
                    const gifDiv = document.createElement("div");

                    // Storing the result item's rating
                    const rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    const p = document.createElement("p");
                    p.innerHTML = "Rating: " + rating;
                    // Creating an image tag
                    const heroImage = document.createElement("img");
                    heroImage.classList.add(".gif");
                    heroImage.setAttribute("data-state", "animate");

                    heroImage.setAttribute("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and heroImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(heroImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    document.getElementById("gifs-appear-here").prepend(gifDiv);


                    heroImage.addEventListener("click", function (event) {

                        let state = event.target.getAttribute("data-state");

                        if (state === "animate") {
                            event.target.setAttribute("src", results[i].images.fixed_height_still.url);
                            event.target.setAttribute("data-state", "still");
                        } else {
                            event.target.setAttribute("src", results[i].images.fixed_height_still.url);
                            event.target.setAttribute("data-state", "animate");
                        }
                    })


                }
            }
        });
};

function renderButtons() {

    document.getElementById("buttons-view").innerHTML = "";

    for (let i = 0; i < heroes.length; i++) {

        const a = document.createElement("button");
        a.classList.add("hero");
        a.setAttribute("data-name", heroes[i]);
        a.innerHTML = heroes[i];
        document.getElementById("buttons-view").append(a);

        a.addEventListener("click", displayHeroInfo);
    }
}

document.getElementById("add-hero").addEventListener("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    let hero = document.getElementById("hero-input").value.trim();

    // Adding the hero from the textbox to our array
    heroes.push(hero);
    console.log(heroes);

    // Calling renderButtons which handles the processing of our hero array
    renderButtons();
});



renderButtons();