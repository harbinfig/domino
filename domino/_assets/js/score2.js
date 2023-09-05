window.onload = function() {
    const myModal = new bootstrap.Modal(document.getElementById('scoreMOdal'));

    const info = JSON.parse(localStorage.getItem('dataInfo'));
    const aPoints = document.getElementById('aPoints');
    const bPoints = document.getElementById('bPoints');
    const meta = document.getElementById('metaPts');

    if (!info) {
        openURL('../../index.html');
    } else {
        meta.innerHTML = info.Meta;

        const teamA = document.getElementsByClassName('teamA');
        const teamB = document.getElementsByClassName('teamB');

        for (let i = 0; i < teamA.length; i++) {
            teamA[i].innerHTML = info.scoreP.equipoA.name;
        }

        for (let e = 0; e < teamB.length; e++) {
            teamB[e].innerHTML = info.scoreP.equipoB.name;
        }

        document.getElementById('bonusScore').addEventListener('submit', function(e) {
            e.preventDefault();

            const bonus = parseInt(document.getElementById('bonoVal').value);
            const _a = info.scoreP.equipoA.name;
            const _b = info.scoreP.equipoB.name;
            let arr1 = info.scoreP.equipoA.score;
            let arr2 = info.scoreP.equipoB.score;

            if (document.getElementById('teamName1').checked) {
                arr1.push(bonus);
            } else {
                arr2.push(bonus);
            }

            const equipoA = { name: _a, score: arr1 };
            const equipoB = { name: _b, score: arr2 };

            const data = {
                "Meta": info.Meta,
                "scoreP": { equipoA, equipoB }
            };

            localStorage.setItem('dataInfo', JSON.stringify(data));
            myModal.hide();
            location.reload();
        });

        const tlistA = info.scoreP.equipoA.score;
        const tlistB = info.scoreP.equipoB.score;

        if (tlistA.length > 0 || tlistB.length > 0) {
            const tA = tlistA.map(aTeam => '<li class="list-group-item text-center">' + aTeam + '</li>').join('');
            const tB = tlistB.map(bTeam => '<li class="list-group-item text-center">' + bTeam + '</li>').join('');

            document.getElementById('scoreList').innerHTML = tA;
            document.getElementById('scoreList2').innerHTML = tB;

            const sum = tlistA.reduce((partialSum, a) => partialSum + a, 0);
            const sum2 = tlistB.reduce((partialSum, a) => partialSum + a, 0);

            aPoints.innerHTML = 'Total: ' + sum;
            bPoints.innerHTML = 'Total: ' + sum2;

            if (sum >= parseInt(info.Meta)) {
                alert('Juego Terminado, Ganador: ' + info.scoreP.equipoB.name);
                localStorage.clear();
                location.reload();
            } else if (sum2 >= parseInt(info.Meta)) {
                alert('Juego Terminado, Ganador: ' + info.scoreP.equipoA.name);
                localStorage.clear();
                location.reload();
            }
        } else {
            aPoints.innerHTML = 0;
            bPoints.innerHTML = 0;
        }
    }

    document.getElementById('clearData').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        location.reload();
    });

    function openURL(url) {
        window.location.href = url;
    }
};
