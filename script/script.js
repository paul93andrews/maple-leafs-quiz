// declare separate arrays for each of the four questions
// inside each object, declare properties that are objects with properties within them
// the properties inside of the objects will be a string and a Number, the string representing which option they can choose and the number representing a corresponding value for their choice

//declare one object that has the question value scores
//declare a function that takes the user choice values and puts them into an array. (can I do this?)
//declare a new function that will take that array and for loop through it, matching value properties in the object so that it will push the score properties into a new array.
//this new array is what will be summed in order to put together a score in order to categorize the user.
const leafsApp = {};
    const categoryDetails = {
        clueless: {
            heading: `You're `,
            span: `Clueless`,
            detail: `Some information`,
            image: `some url`
        },
        hater: {
            heading: `You're `,
            span: `A Hater`,
            detail: `Some information`,
            image: `some url`
        },
        realist: {
            heading: `You're `,
            span: `A Realist`,
            detail: `Some information`,
            image: `some url`
        },
        fanatic: {
            heading: `You're `,
            span: `A Fanatic`,
            detail: `Some information`,
            image: `Some url`
        }
    }

    const userIdentityDetail = function(identity){
        $(`.results h2`).text(identity.heading);
        $(`h2 span`).text(identity.span);
        $(`.outcomeDetail p`).text(identity.detail);
        $(`.outcomeDetail img`).attr(identity.image);
    };
        

    const sumTool = (total, currentValue) => total + currentValue;

    const mustAnswer = $(`<p>`).text(`What are you a Sens fan? You must answer before moving on`);

    let rejectClickCounter = 0;



$(document).ready(function () {
    // console.log(`hello`);
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
        const userIdentityProperty = categoryDetails[userScore(userSelectionNumbers)];
        
        // // This returns the results page to the DOM
        userIdentityDetail(userIdentityProperty);
        // console.log(userIdentityDetail(userIdentityProperty));

        if ($(`input[name=question4]`).is(`:checked`)) {
            $(`.question4`).removeClass(`show`);
            $(`.results`).addClass(`show`);
            const button = $(`<button>`).text(`Reset`).addClass(`reset`);
            $(`.results`).append(button);
            rejectClickCounter = 0;
        }
        else if (rejectClickCounter <= 0) {
            $(`.question4`).append(mustAnswer);
            rejectClickCounter++;
        }
    })

    $(`button.begin`).on(`click`, function(event){
        event.preventDefault();
        // console.log(`working`);
        $(`div.welcome.show`).removeClass(`show`);
        $(`.question1`).addClass(`show`);
    });
    
    $(`button.question1`).on(`click`, function (event) {
        event.preventDefault();
        // console.log(`working`);
        if ($(`input[name=question1]`).is(`:checked`)) {
            $(`.question1`).removeClass(`show`);
            $(`.question2`).addClass(`show`);
            rejectClickCounter = 0;
        }
        else if (rejectClickCounter <= 0) {
            $(`.question1`).append(mustAnswer);
            rejectClickCounter++;
        }
    });

    // I could style it so that the reject message appears as a box to be clicked on to be removed, a stretch goal!

    $(`button.question2`).on(`click`, function () {
        event.preventDefault();
        // console.log(`working`);
        if ($(`input[name=question2]`).is(`:checked`)) {
            $(`.question2`).removeClass(`show`);
            $(`.question3`).addClass(`show`);
            rejectClickCounter = 0;
        }
        else if (rejectClickCounter <= 0) {
            $(`.question2`).append(mustAnswer);
            rejectClickCounter++;
        }
    });

    $(`button.question3`).on(`click`, function () {
        event.preventDefault();
        // console.log(`working`);
        if ($(`input[name=question3]`).is(`:checked`)) {
            $(`.question3`).removeClass(`show`);
            $(`.question4`).addClass(`show`);
            rejectClickCounter = 0;
        }
        else if (rejectClickCounter <= 0) {
            $(`.question3`).append(mustAnswer);
            rejectClickCounter++;
        }
    });

    $(`.results`).on(`click`, `.reset`, function() {
        location.reload();
    })
});




// still to do:
//style the shit out of this thing, ensuring accessibility throughout
//properly organize all of the code and run an init function

// stretch goals:
//refactor the .click functions so that there is one function that takes inputs depending on where on the page the user is and will dynamically change divs 
// see if the dynamic appearance of divs can be transitioned
//Include an option to share their results to twitter