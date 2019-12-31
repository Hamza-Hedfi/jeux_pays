(function () {

    //Global dict/object
    //Containing options
    //key:value corresponde to correct answers
    const countries = {
        1: "Azerbaïdjan",
        2: "Turkménistan",
        3: "Ousbékistan",
        4: "Afghanistan",
        5: "Pakistan",
        6: "Tadjikistan",
        7: "Kirghizistan"
    }
    function init() {
        insertSelectTags();
        insertRefImage()
    }

    function insertSelectTags() {
        let selectTags = createSelectTags();
        selectTags.forEach((selectTag, index) => {
            document.getElementById("options").appendChild(
                parg(index)
            ).appendChild(selectTag);
        });


        function parg(num) {
            let p = document.createElement("p");
            p.innerHTML = `<span>${num + 1}</span> `
            return p;
        }
    }

    function insertRefImage(params) {
        const img = document.createElement("img");
        img.setAttribute("src", "img/carte.png");
        img.setAttribute("alt", "Carte");
        img.setAttribute("class", "rounded");
        document.getElementById("image").appendChild(img);
    }

    function createOptions() {
        let optionTag;
        let optionsTagArray = [];

        for (const key in countries) {
            optionTag = document.createElement("option");
            optionTag.text = countries[key];
            optionTag.setAttribute("value", countries[key]);
            optionsTagArray.push(optionTag);
        }

        return shuffle(optionsTagArray);
    }

    function createSelectTags() {
        let id;
        let selectTag;
        let selectTagsArray = [];
        let options;
        for (const key in countries) {
            options = createOptions();
            selectTag = document.createElement("select");
            selectTag.setAttribute("name", `Country_${key}`);
            selectTag.setAttribute("id", `country_${key}`);
            selectTag.setAttribute("data-correct-answer", countries[key]);
            appendOptionsToSelectTags(selectTag, options);
            selectTagsArray.push(selectTag);
        }
        return selectTagsArray;
    }

    function appendOptionsToSelectTags(selectTag, options) {
        selectTag.appendChild(document.createElement("option"))
        options.forEach(option => {
            selectTag.appendChild(option);
        });
    }

    // Utility function to shuffle options
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


    // Initialize the game
    init();

    // Reset the game
    // Just reload the page
    document.getElementById("btn2").addEventListener("click", _ => {
        window.location.reload();
    });

    // Validate answers
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
        this.disabled = true;
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
    document.getElementById("open_modal").click();
})();
