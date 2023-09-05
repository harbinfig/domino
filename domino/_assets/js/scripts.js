
window.onload = function() {   
    
      document.getElementById('domConfig').addEventListener('submit', function(e) {

        e.preventDefault();
        let maxScore = document.getElementById('maxScore').value;
        maxScore == ""? maxScore = 200 : maxScore;

        // let equipoA = document.getElementById('equipoA').value;
        // let equipoB = document.getElementById('equipoB').value;        

        let equipoA = {name: document.getElementById('equipoA').value, score:[]};
        if(equipoA.name == ""){
          equipoA = {name: "Equipo A", score:[]}
        }

        let equipoB = {name: document.getElementById('equipoB').value, score:[]};
        if(equipoB.name == ""){
          equipoB = {name: "Equipo B", score:[]}
        }

        let data = {
            "Meta" : maxScore,
            "scoreP": {equipoA, equipoB}
        };

        localStorage.setItem('dataInfo', JSON.stringify(data)); 
        openURL('/domino/score-table.html');

        function openURL(url) {
            window.location.href = url;
        }
        
      });     

  
  }