// declare separate arrays for each of the four questions
// inside each object, declare properties that are objects with properties within them
// the properties inside of the objects will be a string and a Number, the string representing which option they can choose and the number representing a corresponding value for their choice

//declare one object that has the question value scores
//declare a function that takes the user choice values and puts them into an array. (can I do this?)
//declare a new function that will take that array and for loop through it, matching value properties in the object so that it will push the score properties into a new array.
//this new array is what will be summed in order to put together a score in order to categorize the user.
const leafsApp = {};
    const categoryDetails = {
        fanatic: {
            heading: `You're `,
            span: `Clueless`,
            detail: `Some information`,
            image: `some url`
        }
    }

    const userIdentityDetail = function(identity){
        $(`.results h2`).text(identity.heading);
        $(`h2 span`).text(identity.span);
        $(`.outcomeDetail p`).text(identity.detail);
        $(`.outcomeDetail img`).attr(identity.image);

        const button = $(`<button>`).text(`Reset`);
        $(`.results`).append(button);
    };
        

    const sumTool = (total, currentValue) => total + currentValue;


$(document).ready(function () {
    // console.log(`hello`);
    $(`form`).on(`submit`,function(event){
        event.preventDefault();

        const userSelections = [
            $(`input[name=question1]:checked`).val(),
            $(`input[name=question2]:checked`).val(),
            $(`input[name=question3]:checked`).val(),
            $(`input[name=question4]:checked`).val()
        ];

        // need to convert string values in array into number values, could use a forEach() to change each string value into a number
        const userSelectionNumbers = userSelections.map(function(value) {
            return parseInt(value, 10);
        })

        // need to sum the value of the sampleArray
        const userScore = userSelectionNumbers.reduce(sumTool);
        console.log(userScore);

        // create if else statements to categorize the user and then assign them the appropriate string to connect with category object
        let userIdentity = function(score) {
            if (score <= 3) {
                return `clueless`;
            }
            else if (score <= 6) {
                console.log(`You win too!`);
            }
            else {
                return `fanatic`;
            }
        }
        // need this variable to pull object properties dedicated to user category information properly. It allows me to pass in a string that will match up with the object's property key and access appropriate content
        const userIdentityProperty = categoryDetails[userIdentity(userScore)];
        
        // This returns the results page to the DOM
        userIdentityDetail(userIdentityProperty);
        
    })
});






// the main section of the page is a div that contains the instructions and outcome of the quiz
// this section will contain a button that when CLICKED will dynamically change the div to reveal the form with the questions and options
// this question div will have a button that when CLICKED does three things 
// 1) collect the corresponding values for their choices into a new Array. 
// 2) sum that array and correspond that sum to an outcome using if statements. 
// 3) dynamically change the div to a new div that displays their outcome 

// On that final outcome div page, there will be another button that when CLICKED will reset everything and bring the quiz to the beginning


// stretch goals:
// Give each question and its options its own dedicated div in the main section
//Include an option to share their results to 