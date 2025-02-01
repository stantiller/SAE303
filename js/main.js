function afficher(){
    // Function to count occurrences of a specific property

    document.querySelector('.données').innerHTML = `\
        <div class="graph1"></div>\
        <div class="graph2"><div class="gender"></div><div class="legende"><div class="graphiquePie"></div></div></div>\
        <div class="graph3"></div>\
        <div class="graph4"></div>\
        <div class="graph5"></div>\
        <div class="graph6"><div class="reasonText"></div><div class="barGraph"></div></div>\
        `;


    function countOccurrences(data, property) {
        var compte = {};
        data.forEach(e => {
            var value = e[property];
            if (compte[value]) {    
                compte[value]++;
            } else {
                compte[value] = 1;
            }
        });
        return compte;
    }

    // Properties to count
    var propertiesToCount = ["Age", "Gender", "student", "play_video_game", "favorite_game", "most_played_game", "reason_of_play_game"];


    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    console.log(`Counts for ${"Age"}:`);
    var compte = countOccurrences(data, "Age");

    compteTotal = 0;
    compteMoyenne = 0;

    for (const age in compte) {
        const count = compte[age];
        compteTotal += age * count;
        compteMoyenne += count;
    }
    console.log(compteMoyenne, compteTotal)
    const ageMoyen = compteTotal / compteMoyenne;
    const arrondiAge = ageMoyen.toFixed(0)
    document.querySelector('.graph1').innerHTML += `<div>L'âge des répondants est d'en moyenne <span>${arrondiAge} ans</span></div>`;


    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    console.log(`Counts for ${"Gender"}:`);
    var compte = countOccurrences(data, "Gender");
    console.log(`  Male: ${compte["Male"]} times`);
    console.log(`  Femal: ${compte["Femal"]} times`);
    var tailleMale = compte["Male"]*100/99;
    var tailleFemale = compte["Femal"]*100/99;
    var angleMale = compte["Male"]*360/99;
    var angleFemale = compte["Femal"]*360/99;
    var pourcentMale = tailleMale.toFixed(1)
    var pourcentFemale =tailleFemale.toFixed(1)
    console.log(tailleMale);
    
    document.querySelector('.graphiquePie').innerHTML += `Pourcentage d'hommes et de femmes ayant répondus au sondage`;
    // document.querySelector('.gender').style.background += ``;
    document.querySelector('.gender').style.setProperty('--angle', angleMale+'deg');
    document.querySelector('.legende').innerHTML += `\
        <div class="homme">\
            <div></div> = Homme (${pourcentMale}%)\
        </div>\
        <div class="femme">\
            <div></div> = Femme (${pourcentFemale}%)\
        </div>\
    `;


    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    console.log(`Counts for ${"student"}:`);
    var compte = countOccurrences(data, "student");
    var pourcentageStudent = compte["Yes"]*100/99;
    console.log(pourcentageStudent);
    pourcentageStudentArrondi = pourcentageStudent.toFixed(1);
    document.querySelector('.graph3').innerHTML += `<span>${pourcentageStudentArrondi}%</span> des personnes ayant répondu au sondage sont des étudiants`;


    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    console.log(`Counts for ${"favorite_game"}:`);
    var compte = countOccurrences(data, "favorite_game");

    var tri = Object.entries(compte).sort((a, b) => b[1] - a[1]);

    var top3 = tri.slice(0, 3);

    console.log("Top 3 des jeux préférés des répondants :");
    document.querySelector('.graph4').innerHTML += `<div>Top 3 des jeux préférés :</div>`;
    top3.forEach(([e, nbr], index) => {
        console.log(`${index + 1} - ${e} (${nbr} fois)`);
        document.querySelector('.graph4').innerHTML += `<div>${index + 1}. ${e} (${nbr} fois)</div>`;
    });


    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    console.log(`Counts for ${"most_played_game"}:`);
    var compte = countOccurrences(data, "most_played_game");

    var tri = Object.entries(compte).sort((a, b) => b[1] - a[1]);

    var top3 = tri.slice(0, 3);

    console.log("Top 3 des jeux les plus joués par les répondants :");
    document.querySelector('.graph5').innerHTML += `<div>Top 3 des jeux les plus joués :</div>`;
    top3.forEach(([e, nbr], index) => {
        console.log(`${index + 1} - ${e} (${nbr} fois)`);
        document.querySelector('.graph5').innerHTML += `<div>${index + 1}. ${e} (${nbr} fois)</div>`;
    });


    /* ------------------------------------------ */
    /* ------------------------------------------ */
    /* ------------------------------------------ */

    console.log(`Counts for ${"reason_of_play_game"}:`);
    var compte = countOccurrences(data, "reason_of_play_game");

    compteId = 0;
    compteIdStyle = 0;

    document.querySelector('.reasonText').innerHTML = 'Les répondants au sondage joue aux jeux pour ces raisons :'
    for (const element in compte) { 
        console.log(`  ${element}: ${compte[element]} times`);
        const tailleSvg = compte[element] * 10;
        compteId = compteId + 1;

        // Create the HTML structure for the graph bar
        const graphHTML = `
            <div class="graph">
                <svg width="30" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <rect id="age${compteId}" x="0" y="300" width="30" height="0" fill="white" stroke-width="5"></rect>
                </svg>
                <div><span>${element}</span></div>
            </div>
        `;

        // Append the new graph to the container
        
        document.querySelector('.barGraph').insertAdjacentHTML('beforeend', graphHTML);

        // Animate the rect element after it's added to the DOM
        const rect = document.querySelector(`#age${compteId}`);

        // Use a timeout to ensure the transition works
        setTimeout(() => {
            rect.setAttribute('height', tailleSvg);
            rect.setAttribute('y', 300 - tailleSvg);
        }, 50);
    }
}

document.querySelector('.afficher').addEventListener('click', afficher)