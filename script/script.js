const leafsApp = {};
leafsApp.categoryDetails = {
    clueless: {
        heading: `You're <span class="category">Clueless</span>`,
        detail: `You did realize this was a quiz about what kind of Leafs fan you are, right? Not what kind of fan you own and use on a humid evening when your A/C is down. My advice to you is simple. Get out once in a while and watch a Leafs game. It will surely disappoint you.`,
        image: `styles/imagesAndIcons/cluelessImage.jpg`,
        twitter: `"Clueless"`
    },
    hater: {
        heading: `You're <span class="category">A Hater</span>`,
        detail: `Someone pass this person a "Hater"ade with a side of salt. I bet you love watching the Leafs golf in May as you hit 30 over par. Also, you're probably a Canadiens fan. Well, remember that Montreal is better than Toronto in one respect: shawarma, not hockey.`,
        image: `styles/imagesAndIcons/leafsHater.jpg`,
        twitter: `"Hater"`
    },
    realist: {
        heading: `You're <span class="category">A Realist</span>`,
        detail: `You've seen it all: the ups, the downs, the comebacks, and the colossal chokes. And you've learned. You know better than to take a 4-1 lead in the third period for granted. At least you can still enjoy a playoff run despite the very real certainty of it crashing and burning.`,
        image: `styles/imagesAndIcons/leafsRealist.jpg`,
        twitter: `"Realist"`
    },
    fanatic: {
        heading: `You're <span class="category">A Fanatic</span>`,
        detail: `Woah you really like to scream! And paint your face. And initiate violent conflict with fans of opposing teams. But you're passionate. And if passion means a one night stay at the drunk tank, then let's appoint you the Parade's grand marshal now.`,
        image: `styles/imagesAndIcons/leafsFanatic.jpg`,
        twitter: `"Fanatic"`
    }
}

leafsApp.userCategoryDetail = function(identity){
    $(`h2`).html(identity.heading);
    $(`span.category`).text(identity.span);
    $(`.outcomeDetail p`).text(identity.detail);
    $(`.outcomeDetail img`).attr(`src`, identity.image);
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
        
leafsApp.mustAnswer = `What are you a Sens fan? You must answer before moving on`;

leafsApp.rejectClickCounter = 0;

leafsApp.beginQuizAction = (button, currentCard, nextCard) => {
    $(button).on(`click`, function (event) {
        event.preventDefault();
        // console.log(`working`);
        $(currentCard).removeClass(`show`);
        $(nextCard).addClass(`show`);
    })
};

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

        // this converts the string values from userSelections array into number values so that they can be connected to given a ranking score
        const userSelectionNumbers = userSelections.map(function(value) {
            return parseInt(value, 10);
        })

        // need to sum the value of the sampleArray and then rank their score accordingly
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
        
        // need this variable to pull object properties dedicated to user category information properly. 
        // I'm able to pass in a string that will match up with the object's property key and access appropriate content
        const userIdentityProperty = leafsApp.categoryDetails[userScore(userSelectionNumbers)];
        
        // // This returns the results page to the DOM
        leafsApp.userCategoryDetail(userIdentityProperty);

        const shareTwitterURL = `https://twitter.com/intent/tweet?url=https:%2f%2fpaul93andrews.github.io%2f&text=I%27m%20the%20${userIdentityProperty.twitter}%20Toronto%20Maple%20Leafs%20fan%20-%20Who%20are%20you?%20via%20@paulandrewsdev&related=paulandrewsdev`;

        // final click actions that will dynamically change the DOM to display results page and twitter link
        if ($(`input[name=question4]`).is(`:checked`)) {
            $(`.question4`).removeClass(`show`);
            $(`.results`).addClass(`show`);
            const button = $(`<button>`).text(`Reset`).addClass(`reset`);
            $(`.results`).append(button);
            $(`a`).attr(`href`, shareTwitterURL);
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
    })
};

leafsApp.init = () => {
    leafsApp.beginQuizAction(leafsApp.buttonBegin, leafsApp.welcomeCard, leafsApp.firstQuestionCard);
    leafsApp.submitButtonAction();
    leafsApp.clickActions(leafsApp.buttonQuestion1, leafsApp.firstCardInput, leafsApp.firstQuestionCard, leafsApp.secondQuestionCard, leafsApp.firstCardParagraph);
    leafsApp.clickActions(leafsApp.buttonQuestion2, leafsApp.secondCardInput, leafsApp.secondQuestionCard, leafsApp.thirdQuestionCard, leafsApp.secondCardParagraph);
    leafsApp.clickActions(leafsApp.buttonQuestion3, leafsApp.thirdCardInput, leafsApp.thirdQuestionCard, leafsApp.fourthQuestionCard, leafsApp.thirdCardParagraph);
    leafsApp.resultsReloadAction();
}

$(document).ready(function () {
    leafsApp.init();
});