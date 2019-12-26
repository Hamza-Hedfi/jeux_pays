(function init() {
    let countries = {
        1: "Azerbaïdjan",
        2: "Turkménistan",
        3: "Ousbékistan",
        4: "Afghanistan",
        5: "Pakistan",
        6: "Tadjikistan",
        7: "Kirghizistan"
    }

    //Utility function to Shuffle an array
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function insertRefImg() {
        let img = document.createElement("img");
        img.setAttribute("src", "img/carte.png");
        img.setAttribute("alt", "Carte");
        img.setAttribute("class", "rounded");
        document.getElementById("image").appendChild(img);
    }

    function createOptions() {
        let option;
        let optionsArry = [];

        for (const key in countries) {
            option = document.createElement("option");
            option.text = countries[key];
            option.setAttribute("value", countries[key]);
            optionsArry.push(option);
        }

        return shuffle(optionsArry);
    }

    function createSelectTags() {
        let id;
        let selectTag;
        let selectTagsArray = [];


        for (const key in countries) {

            selectTag = document.createElement("select");
            id = `country_${key}`;
            selectTag.setAttribute("name", `Country_${key}`);
            selectTag.setAttribute("id", id);
            selectTag.setAttribute("data-correct-answer", countries[key]);

            addOptionToSelect(selectTag);

            selectTagsArray.push(selectTag);
        }
        return selectTagsArray;
    }

    function addOptionToSelect(selectTag) {
        let optionsArray;
        optionsArray = createOptions();
        selectTag.appendChild(document.createElement("option"));
        optionsArray.forEach(element => {
            selectTag.appendChild(element);
        });
    }

    function insertSelectTags() {
        let selectTagsArray = createSelectTags();
        selectTagsArray.forEach((element, index) => {
            document.getElementById("options").appendChild(
                par(index)
            ).appendChild(element);
        });


        function par(num) {
            let p = document.createElement("p");
            p.innerHTML = `<span>${num + 1}</span> `
            return p;
        }
    }

    insertSelectTags();
    insertRefImg();

    //Reset the game
    document.getElementById("btn2").addEventListener("click", (e) => {
        window.location.reload();
    });

    //Validate answers
    document.getElementById("btn1").addEventListener("click", (e) => {
        let userAnswers = document.getElementsByTagName("select");
        for (const answer of userAnswers) {
            if (answer.getAttribute("data-correct-answer") === answer.value) {
                answer.parentElement.setAttribute("class", "correct");
            }
            else {
                answer.parentElement.setAttribute("class", "wrong");
            }
        }

    });

    let selectTagsCollection = document.getElementsByTagName("select");
    for (const iterator of selectTagsCollection) {
        iterator.addEventListener("change", removeSelectedOptionFromOthers);

    }


    // Call back function to remove chosen option
    function removeSelectedOptionFromOthers() {
        // Get the selection option
        let selectedOption = document.querySelector(`option[value=${this.value}]`);

        let selectTags = document.getElementsByTagName("select");

        for (const iterator of selectTags) {
            if (iterator === this) continue; // Skip for the selected one
            // Remove selected option from the others
            if (iterator.hasChildNodes(selectedOption)) 
            iterator.removeChild(iterator.querySelector(`option[value=${selectedOption.value}`)); 
        }

    }


})();


