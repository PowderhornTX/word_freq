// set up some shorthand
let qi = document.getElementById.bind(document);

// assign buttons for event listener
let submit = qi('submit');

let myResults = {
    textInput: "", // user input
    strippedInput: "",
    dictOutput: {}, // initial output
    newItem: "",
    textOutput: "",
    parseText: function () {
        this.textInput = qi('source').value;

        // strip punctuation
        this.strippedInput = this.textInput.replace(/[^\w\s]+/g, "");
        // handle multiple spaces around punctuation
        this.strippedInput = this.strippedInput.replace(/\s\s+/g, ' ');
        // handle dupes by converting to lowercase
        this.strippedInput = this.strippedInput.toLowerCase();
        // generate the sorted dictionary via function
        this.dictOutput = createDict(this.strippedInput.split(' '));
        // this wasn't sticking from the definition for some reason and was initializing as undefined        
        this.textOutput = "";
        // generate human-friendly output
        this.dictOutput.forEach(item => {
            this.newItem = item[0] + ": " + item[1] + "<br>";
            this.textOutput += this.newItem;
        })
        //display
        qi('results').innerHTML = this.textOutput;
    }
}

submit.addEventListener('click', myResults.parseText);

function createDict(arr) {
    // dictionary to store item frequencies
    const frequencyDict = {};
  
    // iterate through array
    arr.forEach(item => {
      
      // if item not in dictionary, initialize at 1; otherwise, increment
      frequencyDict[item] = (frequencyDict[item] || 0) + 1;
    });

    // convert dictionary into array
    const frequencyArray = Object.entries(frequencyDict);

    // sort array in descending frequency
    const sortedFrequencyArray = frequencyArray.sort((a, b) => b[1] - a[1]);

    return sortedFrequencyArray;
  }