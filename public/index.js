const previous = document.querySelector(".previous-result");
const current = document.querySelector(".current-result");
const resetButton = document.querySelector(".reset");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");
const ul = document.querySelector(".online-result ul");

// Socket back-end variables
const socket = io.connect("http://localhost:3000");

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

// Showing result after hit Equal button
equalButton.addEventListener('click', (e) => {
    try{
      if(current.textContent === "NaN") {
            ul.firstChild.remove();
            current.innerText = '';
        }
        else {
            current.innerText = easyToSee(eval(previous.textContent));
            showOnline();
            previous.innerText = '';
        }
    }
    // Return null for unexpected error
    catch(err) {
        return
    }
        
})

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
const easyToSee = (string) => {
    const toNumber = Number(string);
    return toNumber.toLocaleString(0)
}

// Function to show online result from user
const showOnline = () => {
    ul.innerHTML += `<li>${previous.textContent} = ${current.textContent}</li>`;
    const li = document.querySelectorAll("li");
    // insert the element to top and remove the last element
    ul.insertBefore(ul.lastElementChild, ul.firstChild);
      if(li.length > 10) ul.removeChild(ul.lastElementChild)
}
