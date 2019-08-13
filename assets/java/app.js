let queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=b7NVjCWm7hvalev6T5ZVweXLvFUYFTAp";

const heroes = ["Wolverine", "Hulk", "The Flash", "Mr. Incredible"];

function displayHeroInfo() {

    const hero = this.getAttribute("data-name");
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=b7NVjCWm7hvalev6T5ZVweXLvFUYFTAp&limit=10";

    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (responseJson) {

            const results = responseJson.data;
            document.getElementById("gifs-appear-here").innerHTML = "";

            for (let i = 0; i < results.length; i++) {

                if (results[i].rating === "g" || results[i].rating === "pg") {
                    const gifDiv = document.createElement("div");
                    gifDiv.setAttribute("class", "jumbotron col border-danger border text-center m-3")

                    const rating = results[i].rating;

                    const p = document.createElement("p");
                    p.innerHTML = "<hr>" + "Rating: " + rating;
                    p.setAttribute("style", "font-size: 20px; font-weight: bold; text-transform: uppercase");

                    const heroImage = document.createElement("img");
                    heroImage.classList.add(".gif");
                    heroImage.setAttribute("data-state", "animate");
                    heroImage.setAttribute("src", results[i].images.fixed_height.url);
                   
                    gifDiv.append(heroImage);
                    gifDiv.append(p);



                    document.getElementById("gifs-appear-here").prepend(gifDiv);

                    heroImage.addEventListener("click", function (event) {

                        let state = event.target.getAttribute("data-state");

                        if (state === "animate") {
                            event.target.setAttribute("src", results[i].images.fixed_height_still.url);
                            event.target.setAttribute("data-state", "still");
                        } else if (state === "still") {
                            event.target.setAttribute("src", results[i].images.fixed_height.url);
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
        a.setAttribute("class", "btn m-2 btn-danger")
        a.innerHTML = heroes[i];
        document.getElementById("buttons-view").append(a);

        a.addEventListener("click", displayHeroInfo);
        
    }
}

document.getElementById("add-hero").addEventListener("click", function (event) {
    event.preventDefault();

    let hero = document.getElementById("hero-input").value.trim();

    heroes.push(hero);
    console.log(heroes);

    renderButtons();
});



renderButtons();