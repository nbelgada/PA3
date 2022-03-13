
//messages qui peuvent être affichés
message_1 = "joueur {0} > {1}";
message_2 = "commande invalide";
message_3 = "ce coup vient d'être joué";
message_4 = "cette case est déjà de votre couleur";
message_5 = "joueur {0} gagnant";

function afficher(plateau) {
  /*
  fonction qui affiche le plateau de jeu
  :param plateau: plateau de jeu
  :return: 0
  */

  console.clear();

  for(var k=0; k<6; k++) {
    for (var l=0; l<7; l++) {
      if (board[k][l] == 0) {process.stdout.write("_ ");}
      if (board[k][l] == 1) {process.stdout.write("O ");}
      if (board[k][l] == 2) {process.stdout.write("X ");}
    }
    console.log();
  }
  return 0;
}

function check_won(board, player){
  /*
  fonction qui vérifie si un des joueurs a gagné
  :param plateau: plateau de jeu
  :param player: vaut 1 ou 2 en fonction du joueur désigné
  :return: 0 si aucun des joueurs a gagné - 1 si un des joueurs a gagné
  */
  control = 0 //return initialisé à false

  for(var line=0; line<5; line++) {
    for(var col=0; col<6; col++) {

      if (line<2 && col<3) { //diagonales
        var count = 0;
        for (var i =0; i<4; i++) {
          if (board[line+i][col+i]==player) {count+=1;}
        }
        if (count == 4) {control=1; break;}
      }

      if (col<3) { //lignes
        var count = 0;
        for (var i =0; i<4; i++) {
          if (board[line][col+i]==player) {count+=1;}
        }
        if (count == 4) {control=1; break;}
      }

      if (line<2) { //colonnes
        var count = 0;
        for (var i =0; i<4; i++) {
          if (board[line+i][col]==player) {count+=1;}
        }
        if (count == 4) {control=1; break;}
      }

    }
    if (control==1) {break;}
  }
  return control
}

function put_in_board(column, board, player){
  /*
  fonction qui a 2 utilité :
      si control == 0 : retourne les indices correspondants à la case
      si control == 1 : retourne None et ajoute dans une case
  :param control: valeur qui vaut 0 ou 1
  :param coordonnees: case
  :param plateau: plateau de jeu ( inutilisé quand control vaut 0 )
  :param joueur: vaut 1 ou 2 en fonction du joueur désiré ( inutilisé quand control vaut 0 )
  :return: soit les indices correspondants à la case soit None
  */
  var res = 0;
  var line = 0
  while (line<6) {
    if (board[Math.abs(line-5)][column-1] == 0) {break;}
    line += 1;
  }

  if (line < 6) {board[Math.abs(line-5)][column-1]=player; res=1;}

  return res;
}


function verif_coordonnee(column){
  /*
  fonction qui vérifie si le joueur a entré une case valide
  :param coordonnees: case entrée par le joueur
  :return: True si case valide - False si case invalide
  */
  var val=1
  if (column<1 || column>7) {val=0;}
  return val
}

function filled(board) {
  var count=0;
  for (var i = 0; i<5; i++) {
    for (var j = 0; j<6; j++) {
      if (board[i][j]==1 && board[i][j]==2) {count++;}
    }
  }
  return count == 42
}


function control_error(board, player) {
  /*
  fonction qui redemande un nouvelle case tant qu'elle est invalide
  :param just_before: case jouée précédemment
  :param player: vaut 1 ou 2 en fonction du joueur désigné
  :return: la case valide
  */
  var res;

  ////INPUT////
  var play = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  play.question(`Enter a column !`, name => {
    console.log(`Hi ${name}!`)
    play.close()
  }) //demande une case au joueur
  ////INPUT////


  if (filled(board)) {res=0;}
  else {
    while (!verif_coordonnee(play)) { //tant qu'il y a au moins une erreur

        ////INPUT////
        play.question(`Enter a column !`, name => {
        console.log(`Hi ${name}!`)
        play.close()
        ////INPUT////


      }) //demande une case au joueur
    }
    res = play;
  }
  return res //retourne la case valide
}

function game_loop() {
    /*
    fonction qui fait jouer les joueurs tant qu'aucun des 2 n'a gagné
    :return: 0
    */

    //plateau de jeu
    board = [[0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0]];

    afficher(board);

    while ( (!check_won(board, 2)) && (!check_won(board, 1)) ) {//tant qu'aucun des 2 joueurs n'a gagné
        case_1 = control_error(board, 1) //récupère la case du premier joueur

        put_in_board(case_1, board, 1) //change la couleur dans la case
        afficher(board) //affiche le plateau

        if (check_won(board, 1)){ //si joueur 1 à gagné
            print(message_5.format("1")) //affiche message de victoire
        }else{ //sinon joueur 2 joue
            case_2 = control_error(prec_play, 2) //récupère la case du deuxième joueur

            put_in_board(1, case_2, board, 2) //change la couleur dans la case
            afficher(board) //affiche le plateau
            prec_play = case_2 //met à jour la case jouée précedemment

            if (check_won(board, 2)){//si joueur 1 à gagné
              print(message_5.format("2")) //affiche message de victoire
            } 
                
        }
    }
    return 0;
}

game_loop();

//cd Documents\bac3\pa3