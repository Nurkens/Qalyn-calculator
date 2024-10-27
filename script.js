const btn = document.querySelector('.js-calculate-price');

const qalyn = {
    education: {
        undergraduate: { coeff: 1.5 },
        college: { coeff: 1.2 },
        highSchool: { coeff: 1.05 },
        middleSchool: { coeff: 0.9 }
    },
    netWorth: {
        upperClass: { coeff: 2 },
        middleClass: { coeff: 1.5 },
        lowerClass: { coeff: 1.2 } 
    },
    caste: {
        brahmin: { bonus: 100 },
        kshatriya: { bonus: 50 },
        vaishya: { bonus: 20 },
        shudra: { bonus: 10 },
        varna: { bonus: -50 }
    },
    skills: {
        musician: { bonus: 10 },
        cook: { bonus: 20 },
        easygoing: { bonus: 15 },
        singer: { bonus: 10 }
    },
    age: {
        youngAdult: { coeff: 1.5 },
        midAdult: { coeff: 1.2 },
        olderAdult: { coeff: 0.95 }
    },
    reputation: {
        gossipParents: { coeff: 0.85 },
        gossipCharacter: { coeff: 0.9 },
        generalGossip: { bonus: -20 }
    }
};

btn.addEventListener('click', () => {
    const startingPriceElement = document.querySelector('.starting-price');
    const startingPriceValue = parseFloat(startingPriceElement.value); 
    
    const name = document.querySelector('.name');
    const education = document.querySelector('#education');
    const networth = document.querySelector('#networth');
    const caste = document.querySelector('#caste');
    const age = document.querySelector('input[name="age"]:checked');
    const reputation = document.querySelectorAll('input[name="reputation"]:checked');

    const finalPrice = calculatePrice(startingPriceValue, education, networth, caste, age, reputation); 
    sendLetters(name, finalPrice); 
});

function calculatePrice(startingPrice, education, networth, caste, age, reputation) {
    let multiplier = 1; 
    let bonus = 0;  

    const selectedEducation = education.value;
    if (qalyn.education[selectedEducation]) {
        multiplier *= qalyn.education[selectedEducation].coeff; 
    }

    const selectedNetWorth = networth.value; 
    if (qalyn.netWorth[selectedNetWorth]) {
        multiplier *= qalyn.netWorth[selectedNetWorth].coeff; 
    }

    if (age && qalyn.age[age.value]) {
        multiplier *= qalyn.age[age.value].coeff;
    }

    reputation.forEach(rep => {
        if (rep.value === 'generalGossip') {
            bonus += qalyn.reputation.generalGossip.bonus; 
        } else if (qalyn.reputation[rep.value]) {
            multiplier *= qalyn.reputation[rep.value].coeff; 
        }
    });


    document.querySelectorAll('.skills input[type="checkbox"]').forEach(item => {
        if (item.checked) {
            bonus += qalyn.skills[item.id].bonus; 
        }
    });

    const selectedCaste = caste.value; 
    if (qalyn.caste[selectedCaste]) {
        bonus += qalyn.caste[selectedCaste].bonus; 
    }

    const finalPrice = (startingPrice * multiplier) + bonus;

    console.log("Starting Price:", startingPrice);
    console.log("Multiplier:", multiplier);
    console.log("Bonus:", bonus);
    console.log("Final Price:", finalPrice);
    return finalPrice;
}

function sendLetters(name, finalPrice) {
    if (name.value === '' || finalPrice === '') {
        alert('You need to write name and starting price');
        return; 
    }

    const loveLetter = document.querySelector('.love-letter');
    const output = document.querySelector('.output');

    output.innerHTML = `
        <div>Total Price for ${name.value}: $${finalPrice}</div>
        <div>Love Letter: ${loveLetter.value}</div>
    `;
    output.style.display = 'block';
    return output;
}
