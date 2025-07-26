document.addEventListener("DOMContentLoaded", function () {
  // code for page 1
  const firstpagebutton = document.querySelector(".first-button");
  if (firstpagebutton) {
    let buttonid = ["name", "email", "phone"];
    if (sessionStorage.getItem("firstpageinput")) {
      let firstpageinputarray = JSON.parse(sessionStorage.getItem("firstpageinput"));
      for (let i = 0; i < buttonid.length; i++) {
        document.getElementById(buttonid[i]).value = firstpageinputarray[i];
        
      }
    }

    firstpagebutton.addEventListener("click", function (e) {
      let buttonvalue = [];

      for (let i = 0; i < buttonid.length; i++) {
        let element = document.getElementById(buttonid[i]);
        let value = element.value;
        buttonvalue.push(value);

        // Clear previous message if any
        const previous = element.previousElementSibling.querySelector(".error-msg");
        if (previous) {
          previous.remove();
        }

        // to check whether any input fields are empty in first page
        if (value === "") {
          e.preventDefault();
          e.stopPropagation();
          const sibling = element.previousElementSibling;
          const newelement = document.createElement("span");
          newelement.classList.add("error-msg");
          newelement.textContent = "This field is required";
          sibling.appendChild(newelement);
          newelement.style.color = "red";
        }
      }

      sessionStorage.setItem("firstpageinput", JSON.stringify(buttonvalue));
    });
  }
  // code for page 1

  // code for toggleswtich in page2 
  const toggleSwitch = document.getElementById('toggleSwitch');
  if (!sessionStorage.getItem("Monthoryear")) {
    sessionStorage.setItem("Monthoryear","Month");
  }
  
  function applyToggleState(isYearSelected) {
    const classRemover = document.querySelectorAll(".year");
    const classAdd = document.querySelectorAll(".month");

    if (isYearSelected) {
      toggleSwitch.checked = true;
      classRemover.forEach(el => el.classList.remove("hiding"));
      classAdd.forEach(el => el.classList.add("hiding"));
      sessionStorage.setItem('Monthoryear', 'year');
    } else {
      toggleSwitch.checked = false;
      classRemover.forEach(el => el.classList.add("hiding"));
      classAdd.forEach(el => el.classList.remove("hiding"));
      sessionStorage.setItem('Monthoryear', 'Month');
      
    }
  }

  // Event listener for toggle
  if (toggleSwitch) {
    toggleSwitch.addEventListener('change', () => {
      applyToggleState(toggleSwitch.checked);
    });

    // 🔁 Restore toggle state and UI from sessionStorage on page load
    const savedState = sessionStorage.getItem('Monthoryear');
    if (savedState === 'year') {
      applyToggleState(true);
    } else if (savedState === 'Month') {
      applyToggleState(false);
    }
  }

  // code for toggleswtich in page2 ends

  const plan = document.querySelector("#plan");

  if (plan) {
    const planchildren = Array.from(plan.children).filter(child => child.tagName.toLowerCase() === 'div');

    planchildren.forEach((child) => {
      child.addEventListener("click", (e) => {
        if (toggleSwitch.checked) {
          sessionStorage.setItem("info", e.currentTarget.id);
        } else {
          sessionStorage.setItem("info", e.currentTarget.id);
        }
      });
    });
  }

  // code for html_3
  if (window.location.pathname.includes("index_3.html")) {
    let storage = document.querySelectorAll(".storageyear");
    let monthstorage = document.querySelectorAll(".storagemonth");

    if (sessionStorage.getItem("Monthoryear") === "year") {
      storage.forEach((element) => {
        element.classList.remove("hiding");
      });
      monthstorage.forEach((element) => {
        element.classList.add("hiding");
      });
    }

    const mydiv = document.getElementById("Addon");
    const myinput = document.querySelectorAll("input");
    let addonarray = [];

    // 🟢 Load saved data from sessionStorage
    const storedArray = JSON.parse(sessionStorage.getItem("anarray"));
    if (storedArray && Array.isArray(storedArray)) {
      addonarray = storedArray;

      // 🟢 Mark checkboxes as checked
      myinput.forEach((input) => {
        if (addonarray.includes(input.id)) {
          input.checked = true;
        }
      });
    }

    // 🟢 Add event listeners
    myinput.forEach((element) => {
      element.addEventListener("change", (e) => {
        if (e.target.checked) {
          if (!addonarray.includes(e.target.id)) {
            addonarray.push(e.target.id);
          }
        } else {
          // 🛠 Remove unchecked ID from the array
          addonarray = addonarray.filter(id => id !== e.target.id);
        }

        // 🟢 Save to sessionStorage
        sessionStorage.setItem("anarray", JSON.stringify(addonarray));
      });
    });
  }
  // code for html_3

  // code for html_4
  const planselected = document.getElementById("planselected");
  const planprice = document.getElementById("planprice");
  let totalcost = 0;

  if (planselected && planprice) {
    const plan = sessionStorage.getItem("info");           // Arcade, Advanced, Pro
    const billing = sessionStorage.getItem("Monthoryear"); // Month or year
    console.log(billing);
    const planFees = {
      "Arcade": 9,
      "Advanced": 12,
      "Pro": 15
    };

    // 🟢 Display selected plan and billing cycle
    planselected.textContent = `${plan} (${billing})`;

    // 🟢 Set price based on plan and billing type
    const basePrice = planFees[plan];
    if (billing === "year") {
      planprice.textContent = `$${basePrice * 10}/Yr`;
      totalcost += basePrice * 10;
    } else {
      planprice.textContent = `$${basePrice}/Mo`;
      totalcost += basePrice;
    }

    // 🟢 Add-ons (optional)
    const addoncontent = JSON.parse(sessionStorage.getItem("anarray"));
    const firstaddon = document.getElementById("firstaddon");
    const secondaddon = document.getElementById("secondaddon");
    const firstaddonprice = document.getElementById("firstaddonprice");
    const secondaddonprice = document.getElementById("secondaddonprice");
    const totalprice = document.getElementById("totalprice");
    const addonprice = {
      "Onlineservice": 1,
      "Largerstorage": 2,
      "Customizableprofile": 2
    };

    if (addoncontent && Array.isArray(addoncontent)) {
      if (firstaddon) {
        firstaddon.textContent = addoncontent[0] || '';
        if (sessionStorage.getItem("Monthoryear") === "year") {
          firstaddonprice.textContent = `$+${addonprice[addoncontent[0]] * 10}/Yr`;
          totalcost += addonprice[addoncontent[0]] * 10;
        } else {
          firstaddonprice.textContent = `$+${addonprice[addoncontent[0]]}/Mo`;
          totalcost += addonprice[addoncontent[0]];
        }
      }

      if (secondaddon) {
        secondaddon.textContent = addoncontent[1] || '';
        if (sessionStorage.getItem("Monthoryear") === "year") {
          secondaddonprice.textContent = `$+${addonprice[addoncontent[1]] * 10}/Yr`;
          totalcost += addonprice[addoncontent[1]] * 10;
        } else {
          secondaddonprice.textContent = `$+${addonprice[addoncontent[1]]}/Mo`;
          totalcost += addonprice[addoncontent[1]];
        }
      }
    }

    const billingDisplay = billing === "year" ? "Yr" : "Mo";
    totalprice.textContent = `+$${totalcost}/${billingDisplay}`;
  }
  // code for html_4
});
