// declare separate arrays for each of the four questions
// inside each object, declare properties that are objects with properties within them
// the properties inside of the objects will be a string and a Number, the string representing which option they can choose and the number representing a corresponding value for their choice

//declare one object that has the question value scores
//declare a function that takes the user choice values and puts them into an array. (can I do this?)
//declare a new function that will take that array and for loop through it, matching value properties in the object so that it will push the score properties into a new array.
//this new array is what will be summed in order to put together a score in order to categorize the user.
const leafsApp = {};
leafsApp.categoryDetails = {
    clueless: {
        heading: `You're <span class="category">Clueless</span>`,
        detail: `You did realize this was a quiz about what kind of fan you are, right? Not what kind of fan you own and use on a humid evening when your A/C is down. My advice to you is simple. Get out once in a while and watch a Leafs game. It will surely disappoint you.`,
        image: `styles/imagesAndIcons/cluelessImage.jpg`
    },
    hater: {
        heading: `You're <span class="category">A Hater</span>`,
        detail: `Someone pass this person a "Hater"ade with a side of salt. I bet you love watching the Leafs golf in May as you hit 30 over par. Also, you're probably a Canadiens fan. Well, remember that Montreal is better than Toronto in one respect: shawarma not hockey.`,
        image: `styles/imagesAndIcons/leafsHater.jpg`
    },
    realist: {
        heading: `You're <span class="category">A Realist</span>`,
        detail: `You've seen it all: the ups, the downs, the comebacks, and the colossal chokes. And you've learned. You know better than to take a 4-1 lead in the third period for granted. At least you can enjoy the ride of a playoff run with the very real certainty of it crashing and burning.`,
        image: `styles/imagesAndIcons/leafsRealist.jpg`
    },
    fanatic: {
        heading: `You're <span class="category">A Fanatic</span>`,
        detail: `Woah you really like to scream! And paint your face. And initiate violent conflict with fans of opposing teams. But you're passionate. And if passion means a one night stay at the drunk tank, then let's appoint you the Parade's grand marshal now.`,
        image: `styles/imagesAndIcons/leafsFanatic.jpg`
    }
}

leafsApp.userCategoryDetail = function(identity){
    $(`h2`).html(identity.heading);
    $(`span.category`).text(identity.span);
    $(`.outcomeDetail p`).text(identity.detail);
    $(`.outcomeDetail img`).attr(`src`, identity.image);
};
        

leafsApp.mustAnswer = `What are you a Sens fan? You must answer before moving on`;

leafsApp.rejectClickCounter = 0;

leafsApp.beginQuizAction = () => {
    $(`button.begin`).on(`click`, function (event) {
        event.preventDefault();
        // console.log(`working`);
        $(`div.welcome.show`).removeClass(`show`);
        $(`.question1`).addClass(`show`);
    })
};

leafsApp.buttonBegin = $(`button.begin`);
leafsApp.buttonQuestion1 = $(`button.question1`);
leafsApp.buttonQuestion2 = $(`button.question2`);
leafsApp.buttonQuestion3 = $(`button.question3`);
leafsApp.welcomeCard = $(`div.welcome.show`);
leafsApp.firstQuestionCard = $(`.question1`);
leafsApp.secondQuestionCard = $(`.question2`);
leafsApp.thirdQuestionCard = $(`.question3`);
leafsApp.fourthQuestionCard = $(`.question4`);
leafsApp.firstCardInput = $(`input[name=question1]`);
leafsApp.secondCardInput = $(`input[name=question2]`);
leafsApp.thirdCardInput = $(`input[name=question3]`);
leafsApp.firstCardParagraph = $(`.question1 p.warning`);
leafsApp.secondCardParagraph = $(`.question2 p.warning`);
leafsApp.thirdCardParagraph = $(`.question3 p.warning`);

leafsApp.clickActions = function (button, currentInput, currentQuestionCard, nextQuestionCard, currentQuestionParagraph) {
    $(button).on(`click`, function (event) {
        event.preventDefault();
        console.log(`works`);
        if ($(currentInput).is(`:checked`)) {
            $(currentQuestionCard).removeClass(`show`);
            $(nextQuestionCard).addClass(`show`);
            leafsApp.rejectClickCounter = 0;
        }
        else if (leafsApp.rejectClickCounter <= 0) {
            $(currentQuestionParagraph).addClass(`show`).text(leafsApp.mustAnswer);
            leafsApp.rejectClickCounter++;
        }
    });
}

leafsApp.submitButtonAction = function() {
    $(`.submitButton`).on(`click`,function(event){
        event.preventDefault();

        const userSelections = [
            $(`input[name=question1]:checked`).val(),
            $(`input[name=question2]:checked`).val(),
            $(`input[name=question3]:checked`).val(),
            $(`input[name=question4]:checked`).val()
        ];

        console.log(userSelections);

        // need to convert string values in array into number values, could use a forEach() to change each string value into a number
        const userSelectionNumbers = userSelections.map(function(value) {
            return parseInt(value, 10);
        })

        // need to sum the value of the sampleArray
        const userScore = function(selectionArray){
            const sumTool = (total, currentValue) => total + currentValue;
            const score = selectionArray.reduce(sumTool);
            if (score <= 3) {
                return `clueless`;
            }
            else if (score <= 6) {
                return `hater`;
            }
            else if (score <= 9) {
                return `realist`;
            }
            else {
                return `fanatic`;
            }
        }

        console.log(userScore(userSelectionNumbers));
        
        // need this variable to pull object properties dedicated to user category information properly. It allows me to pass in a string that will match up with the object's property key and access appropriate content
        const userIdentityProperty = leafsApp.categoryDetails[userScore(userSelectionNumbers)];
        
        // // This returns the results page to the DOM
        leafsApp.userCategoryDetail(userIdentityProperty);
        // console.log(userIdentityDetail(userIdentityProperty));

        if ($(`input[name=question4]`).is(`:checked`)) {
            $(`.question4`).removeClass(`show`);
            $(`.results`).addClass(`show`);
            const button = $(`<button>`).text(`Reset`).addClass(`reset`);
            $(`.results`).append(button);
            leafsApp.rejectClickCounter = 0;
        }
        else if (leafsApp.rejectClickCounter <= 0) {
            $(`.question4 p.warning`).addClass(`show`).append(leafsApp.mustAnswer);
            leafsApp.rejectClickCounter++;
        }
    });
}

leafsApp.resultsReloadAction = function () {
    $(`.results`).on(`click`, `.reset`, function () {
        location.reload();
    });
}

leafsApp.init = () => {
    leafsApp.beginQuizAction();
    leafsApp.submitButtonAction();
    leafsApp.clickActions(leafsApp.buttonQuestion1, leafsApp.firstCardInput, leafsApp.firstQuestionCard, leafsApp.secondQuestionCard, leafsApp.firstCardParagraph);
    leafsApp.clickActions(leafsApp.buttonQuestion2, leafsApp.secondCardInput, leafsApp.secondQuestionCard, leafsApp.thirdQuestionCard, leafsApp.secondCardParagraph);
    leafsApp.clickActions(leafsApp.buttonQuestion3, leafsApp.thirdCardInput, leafsApp.thirdQuestionCard, leafsApp.fourthQuestionCard, leafsApp.thirdCardParagraph);
    leafsApp.resultsReloadAction();
}


$(document).ready(function () {
    leafsApp.init();
});

// still to do:
//style the shit out of this thing, ensuring accessibility throughout
    // ensure the warning paragraph is correctly positioned
    // change font sizes as screen scales up
    // check alignment of radio labels and the label button as screen scales up

// stretch goals:
// see if the dynamic appearance of divs can be transitioned
//Include an option to share their results to twitter, make it an anchor tag that looks like a round button, and for accessibility include alt-text that explains what it is and a hover state that explains that it shares to twitter