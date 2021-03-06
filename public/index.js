const previous = document.querySelector(".previous-result");
const current = document.querySelector(".current-result");
const resetButton = document.querySelector(".reset");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");
const ul = document.querySelector(".online-result ul");

// Socket back-end variables
const socket = io.connect();

// Create number button
document.querySelectorAll(".number").forEach(num => {
    num.addEventListener("click",() => previous.innerText += num.textContent)
})

// Create operators button
document.querySelectorAll(".operator").forEach(operator => {
    operator.addEventListener("click",() => {
        previous.innerText += operator.textContent
    })
})


// Result
equalButton.addEventListener("click", () => {
    try{
        // display result for current user
        const currentResult = easyToRead(eval(previous.textContent));
        if(!isNaN(currentResult)){
            current.innerText = currentResult;
            // Pass value to server
            socket.emit("user", {
                previousOnline: previous.textContent,
                currentOnline : currentResult,
            })
        }
    }catch(e) {
        return null
    }
})

// Display result from other user
socket.on("user",(data) => {
    ul.innerHTML += `<li>${data.previousOnline} = ${data.currentOnline}</li>`
    descendingValue();
    previous.innerText = '';
  }
)

// Reset
resetButton.addEventListener('click', () => {
    previous.innerText = '';
    current.innerText = '';
})

// Delete previous number
deleteButton.addEventListener('click',() => {
   const delChar = previous.textContent.slice(0,-1);
   previous.innerText = delChar;
})



// Function to convert number with comma after 4 digits 
const easyToRead = (string) => {
    const toNumber = Number(string);
    return toNumber.toLocaleString(0)
}

// Function to make list descending
const descendingValue = () => {
    const li = document.querySelectorAll("li");
    // insert the element to top and remove the last element
    ul.insertBefore(ul.lastElementChild, ul.firstChild);
      if(li.length > 10) ul.removeChild(ul.lastElementChild)
}





