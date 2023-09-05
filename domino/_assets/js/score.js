
window.onload = function() {   

    var myModal = new bootstrap.Modal(document.getElementById('scoreMOdal'));

    const info = JSON.parse(localStorage.getItem('dataInfo'));
    let aPoints = document.getElementById('aPoints');
    let bPoints = document.getElementById('bPoints');

    
    if(info == undefined) {
        openURL('/domino/index.html');

        function openURL(url) {
            window.location.href = url;
        }
  
    } else {
        
        const teamA = document.getElementsByClassName('teamA');
        const teamB = document.getElementsByClassName('teamB');
        const meta = document.getElementById('metaPts');

        meta.innerHTML = info.Meta;

        for (var i = 0; i < teamA.length; i++) {
            teamA[i].innerHTML= info.scoreP.equipoA.name;
        }

        for (var e = 0; e < teamB.length; e++) {
            teamB[e].innerHTML= info.scoreP.equipoB.name;
        } 
        
      document.getElementById('bonusScore').addEventListener('submit', function(e) {
        e.preventDefault();

        let bonus = parseInt(document.getElementById('bonoVal').value);
        let _a = info.scoreP.equipoA.name;
        let _b = info.scoreP.equipoB.name;
        let arr1 = info.scoreP.equipoA.score;
        let arr2 = info.scoreP.equipoB.score ;  

        function pushToArr(arr, element) {
            arr.push(element);
        }

        if (document.getElementById('teamName1').checked) {           

            pushToArr(arr1, bonus);
            pushToArr(arr2, 0);

            let equipoA = {name: _a, score: arr1};
            let equipoB = {name: _b, score: arr2};

            let data = {
                "Meta" : info.Meta,
                "scoreP": {equipoA, equipoB}
            };


            localStorage.setItem('dataInfo', JSON.stringify(data));
            myModal.hide();
            location.reload();


        } else {

            let arr1 = info.scoreP.equipoA.score;
            let arr2 = info.scoreP.equipoB.score ;

            pushToArr(arr1, 0);
            pushToArr(arr2, bonus);

            let equipoA = {name: _a, score: arr1};
            let equipoB = {name: _b, score: arr2};


            let data = {
                "Meta" : info.Meta,
                "scoreP": {equipoA, equipoB}
            };

            localStorage.setItem('dataInfo', JSON.stringify(data));
            myModal.hide();
            location.reload();
        }       
        
      });

      let tlistA = info.scoreP.equipoA.score;      
      let tlistB = info.scoreP.equipoB.score;

    if (tlistA != 0 || tlistB != 0){
        let tA = '';
        let tB = '';

      tlistA.forEach(function(aTeam) {
        tA += '<li class="list-group-item text-center">'+aTeam+'</li>';            
        
      });

      tlistB.forEach(function(bTeam) {
        tB += '<li class="list-group-item text-center">'+bTeam+'</li>';            

      });

        let lUno = document.getElementById('scoreList');
        let lDos = document.getElementById('scoreList2');
        lUno.innerHTML = tA;
        lDos.innerHTML = tB;

        const sum = info.scoreP.equipoA.score.reduce((partialSum, a) => partialSum + a, 0);
        const sum2 = info.scoreP.equipoB.score.reduce((partialSum, a) => partialSum + a, 0);
        
        aPoints.innerHTML = 'Total: ' + sum;
        bPoints.innerHTML = 'Total: ' + sum2;

        if(sum >= parseInt(info.Meta)){
            alert('Juego Terminado, Ganador: ' + info.scoreP.equipoB.name)
            localStorage.clear();
            location.reload();
    
            
        } else if (sum2 >= parseInt(info.Meta)){
            alert('Juego Terminado, Ganador: ' + info.scoreP.equipoA.name)
            localStorage.clear();
            location.reload();
    
        }

      } else {

        aPoints.innerHTML = 0;
        bPoints.innerHTML = 0;

      }    
    

    }

    document.getElementById('clearData').addEventListener('click', function(e){
        e.preventDefault;
        localStorage.clear();
        location.reload();
      })

}