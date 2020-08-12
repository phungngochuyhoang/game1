$(() => {

    // Tọa độ quay
    var numberTurn = [4050, 4140, 4230, 4320];

    var myPlayers = {
        player1: {
            id: 4320,
            hp: 100
        },
        player2: {
            id: 4050,
            hp: 100
        },
        player3: {
            id: 4140,
            hp: 100
        },
        player4: {
            id: 4230,
            hp: 100
        }
    }


    // bộ dụng cụ vật phẩm
    var kits =  {
        deadBook:{
            id: 0,
            name: 'Cuốn sổ tử Thần',
            attack: 100,
        },
        gun:{
            id: 1,
            name: 'súng lục',
            attack: 20,
        },
        sword:{
            id: 2,
            name: 'kiếm dài',
            attack: 10,
        },
        punch:{
            id: 3,
            name: 'đấm thẳng',
            attack: 5,
        }
    }
    //-----------------------------


    
    // random các vật phẩm 
    function randomCard(kits) {
        let random = Math.floor(Math.random() * Object.keys(kits).length);
        for(key in kits) {
            if(kits[key].id === random) {
                return kits[key].id;
            }
        }
    }
    //--------------------------


    // random người chơi 
    function randomPlayer(num) {
        let random = Math.floor(Math.random() * num.length);
        for(var i = 0; i <= num.length; i++) {
            if(i === random) {
                return num[i];
            }
        }
    }
    //--------------------------

   



    // nút quay
    function btnTurn() {
        $('.btn-turned').click(() => {
            if(checkTurnBefore() == 0) {
                alert('Bạn chưa nhập đủ tên người chơi!');
            }else {
                let id = randomCard(kits); 
                let item = '';
                let point;
                let namePlayer;
                let currentPoint = 0;
                let turn = randomPlayer(numberTurn); 
                var apoint =  Array.from(document.querySelectorAll('.player-point'));
                var aname = Array.from(document.querySelectorAll('.player-name'));

                for(key in kits) {
                   if(kits[key].id == id) {
                        item = kits[key].name;
                        point = kits[key].attack;
                   }
                }

                console.log("Deg: " + turn,"Kits: " + item,"Damage: " + point);

            
                for(key in myPlayers) {
                    if(myPlayers[key].id == 4320) {
                        myPlayers[key].name = aname[0].innerHTML;
                    }else if(myPlayers[key].id == 4050) {
                        myPlayers[key].name = aname[1].innerHTML;
                    }else if(myPlayers[key].id == 4140) {
                        myPlayers[key].name = aname[2].innerHTML;
                    }else {
                        myPlayers[key].name = aname[3].innerHTML;
                    }

                    if(myPlayers[key].id == turn) {
                        namePlayer = myPlayers[key].name;
                    }

                    if(myPlayers[key].id == turn) {
                        currentPoint += myPlayers[key].hp - point;
                        myPlayers[key].hp = currentPoint;
                    }
                }

                

                console.log("Point: " + currentPoint, "Name: " + namePlayer);

                
               setTimeout(() => {
                    if(turn == 4320) {
                        alert(`${namePlayer} Nhận được ${item}`);
                    apoint[0].innerHTML = currentPoint;
                    if(currentPoint <= 0) {
                            $('.container-house-player-1').hide();
                            delete myPlayers.player1;
                    }
                    }else if(turn == 4050) {
                        alert(`${namePlayer} Nhận được ${item}`); 
                        apoint[1].innerHTML = currentPoint;
                        if(currentPoint <= 0) {
                            $('.container-house-player-2').hide();
                            delete myPlayers.player2;
                        }
                    }else if(turn == 4140) {
                        alert(`${namePlayer} Nhận được ${item}`);
                        apoint[2].innerHTML = currentPoint;
                        if(currentPoint <= 0) {
                            $('.container-house-player-3').hide();
                            delete myPlayers.player3;
                        }
                    }else {
                        alert(`${namePlayer} Nhận được ${item}`);
                        apoint[3].innerHTML = currentPoint;
                        if(currentPoint <= 0) {
                            $('.container-house-player-4').hide();
                            delete myPlayers.player4;
                        }
                    }
               }, 1000)

                setTimeout(() => {
                    if(Object.keys(myPlayers).length == 1) {
                        alert('YOU WIN');
                        if(confirm("Bạn muốn chơi lại không") == true) {
                            location.reload();
                        }else {
                            window.close();
                        }
                    }
                }, 1800)

                

                

                $('.btn-turned').css({
                    transform: `rotate(${turn}deg)`,
                    transition: `ease-in-out 1s`
                })
                setTimeout(() => {
                    var btn = $('.btn-turned')[0];
                    btn.setAttribute('style', '');
                }, 1800);
            }
        })

        
    }
   //-------------------------------



   // set tên cho người chơi
   function setNamePlayer() {
        $('.house').click((item) => {
            var house = item.target;
            var name = prompt('Tên người chơi: ');
            house.children[0].innerHTML = name;
        })
    }
    //------------------------------

   

    // kiểm tra tên rỗng
    function checkTurnBefore() {
        var count = 0;
        var player = document.querySelectorAll('.player-name');
        for(value of player) {
            if(value.innerHTML.length == 0) {
                count++;
            }
        }
        if(count > 0) {
            return 0;
        }else {
            return 1;
        }
    }
    //-----------------------------------




   
    function alertGame() {
        alert('Chào mừng bạn đến với game Sống hay chết!');
        alert(
            `Đây là một trò chơi mang tựa tính may mắn và sống chết.Hay nói cách khách kẻ thắng sống kẻ thua chết!`
        );  
        alert(`Qui tắc game:
            - Số lượng người chơi là 4.
            - mỗi người được quay một lượt cứ thế cứ liên tiếp nhau đến người sống cuối cùng.
        `);
        alert('Phần thưởng: Chưa xác định');
        alert('Vui click vào các ô để nhập tên để tiếp tục');
    }



    function main() {
        alertGame();
        setNamePlayer();
        btnTurn();
    }  main();
   
   
   
    
    

})