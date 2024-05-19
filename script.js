document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded event fired");

  var navbar = document.getElementById("getBackground");
  var lastScrollTop = 0;

  window.addEventListener("scroll", function() {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
          navbar.classList.add('background-on-scroll');
      } else {
          if (currentScroll === 0) {
              navbar.classList.remove("background-on-scroll");
          } else {
              navbar.classList.add("background-on-scroll");
          }
      }

      lastScrollTop = currentScroll;
  });

  function attachEventListeners() {
      var paragraph1 = document.getElementsByClassName('mobile-span')[0];
      var paragraph2 = document.getElementsByClassName('awb-span')[0];
      var paragraph3 = document.getElementsByClassName('order-span')[0];
      var inputX = document.getElementById('enter-no');
      var currentParagraph = null; // To keep track of the currently clicked paragraph

      paragraph1.addEventListener('click', function() {
          console.log("Mobile span clicked");
          if (currentParagraph !== null) {
              currentParagraph.style.backgroundColor = ''; // Remove background color from previously clicked paragraph
          }
          inputX.value = "Enter Mobile Number";
          paragraph1.style.backgroundColor = "lightblue"; // Change background color of clicked paragraph
          currentParagraph = paragraph1; // Update current paragraph
      });

      paragraph2.addEventListener('click', function() {
          console.log("AWB span clicked");
          if (currentParagraph !== null) {
              currentParagraph.style.backgroundColor = ''; // Remove background color from previously clicked paragraph
          }
          inputX.value = "Enter AWB Number";
          paragraph2.style.backgroundColor = "lightblue"; // Change background color of clicked paragraph
          currentParagraph = paragraph2; // Update current paragraph
      });

      paragraph3.addEventListener('click', function() {
          console.log("Order span clicked");
          if (currentParagraph !== null) {
              currentParagraph.style.backgroundColor = ''; // Remove background color from previously clicked paragraph
          }
          inputX.value = "Enter the Order ID";
          paragraph3.style.backgroundColor = "lightblue"; // Change background color of clicked paragraph
          currentParagraph = paragraph3; // Update current paragraph
      });

      // Clear input field when typing starts
      inputX.addEventListener('input', function() {
          if (inputX.value === "Enter Mobile Number" || 
              inputX.value === "Enter AWB Number" || 
              inputX.value === "Enter the Order ID") {
              inputX.value = "";
          }
      });

      // Ensure placeholder text remains visible until typing starts
      inputX.addEventListener('focus', function() {
          if (inputX.value === "Enter Mobile Number" || 
              inputX.value === "Enter AWB Number" || 
              inputX.value === "Enter the Order ID") {
              inputX.value = "";
          }
      });

      inputX.addEventListener('blur', function() {
          if (inputX.value === "") {
              inputX.placeholder = "Enter details here";
          }
      });
  }

  attachEventListeners();

  const searchButton = document.getElementById("searchButton");
  const inputField = document.getElementById("enter-no");

  searchButton.addEventListener("click", function () {
      const inputValue = inputField.value;
      console.log("Input value:", inputValue);
  });

  inputField.addEventListener("input", function () {
      const inputValue = inputField.value;
      console.log("Input value changed:", inputValue);
  });

  var rightarrow = document.getElementById("right-arr");
  rightarrow.addEventListener('click', function() {
      console.log("Right arrow clicked");
      var inputX = document.getElementById('enter-no');
      var inputValue = inputX.value.trim(); 
      // Check if the input value is empty
      if (inputValue === "") {
          alert("Please fill in the details");
      } else {
          window.location.href = "track.html";
      }
  });
});
//MODELLLLL

document.addEventListener('DOMContentLoaded', function() {
  const getQuoteLink = document.getElementById('getQuoteLink');
  const modal = document.getElementById('quoteModal');
  const closeButton = document.querySelector('.close');
  getQuoteLink.addEventListener('click', function() {
      modal.style.display = 'block';
  });


  closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
  });

  
  window.addEventListener('click', function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  });

  // Handle form submission to calculate the quote
  const quoteForm = document.getElementById('quoteForm');
  quoteForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Collect form data
      const originPincode = document.getElementById('originPincode').value;
      const destinationPincode = document.getElementById('destinationPincode').value;
      const weight = document.getElementById('weight').value;
      const formData = {
        originPincode: originPincode,
        destinationPincode: destinationPincode,
        weight: weight
    };

    // Log the object to the console
    console.log('Form Data:', formData);

      // Calculate shipping cost
      const shippingCost = calculateShippingCost(destinationPincode, weight);

      // Display shipping cost to the user
      const resultElement = document.getElementById('shippingCost');
      resultElement.textContent = `Shipping Cost: $${shippingCost}`;

      
    //  modal.style.display = 'none';
  });
});
//calculation of shipping cost
function calculateShippingCost(destinationPincode, weight) {
  
  const shippingRates = {
      '100001': {
          '0.5': 10,
          '1': 15,   
          '2': 20    
          
      },
      '200002': {
        '0.5': 12, 
        '1': 18,   
        '2': 24    
        
    },

      
  };

  
  const weightStr = weight.toString();

  
  if (destinationPincode in shippingRates) {
      
      if (weightStr in shippingRates[destinationPincode]) {
          return shippingRates[destinationPincode][weightStr];
      } else {
          
          return "Weight not supported";
      }
  } else {
      
      return "Destination not supported";
  }
}
