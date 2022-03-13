# coding=utf-8
import copy
import re
import json

maxAllPawns = 4
maxPawns = 2
N = 4

def findPredecessor(initialState,player):
    """
    Fonction qui étant donné un état d'un plateau initial et un joueur (1 ou 2) renverra tous les prédecesseurs possibles de ce graphe càd un mouvement en arrière du joueur précisé
    """
    if (initialState == initialBoard):
        return []
    predecessor = []
    if (player == 1):
        p2 = 2
        dame = 11
    else:
        p2 = 1
        dame = 22

    count = getNumberOfPawns(initialState, p2)
    # on boucle sur tous le plateau à la recherche des pions du player
    for i in range(N):
        for j in range(N):
            if initialState[i][j] == player:
                # pour chaque pion trouvé, on regarde quel joueur il est pour savoir de quel sens il viendrait ( 1 -> monte dans le tableau, 2 -> descend dans le tableau)
                # chaque pion d'un joueur peut donc être venu de 2 diagonales différentes, si la case est vide, on appelle une fonction pour trouver les différents mouvements possible venant de cete case
                if (player == 2):
                    if (i-1>=0 and j-1>=0):
                        if (initialState[i-1][j-1] == 0):
                            predList = getPredecessorForPawn(initialState, player, p2, i, j, -2, -2, -1, -1, count)
                            for t in range(len(predList)):
                                predecessor.append(predList[t])
                    if (i-1>=0 and j+1<=3):
                        if (initialState[i-1][j+1] == 0):
                            predList = getPredecessorForPawn(initialState, player, p2, i, j, -2, 2, -1, 1, count)
                            for t in range(len(predList)):
                                predecessor.append(predList[t])
                if (player == 1):
                    if (i+1<=3 and j-1>=0):
                        if (initialState[i+1][j-1] == 0):
                            predList = getPredecessorForPawn(initialState, player, p2, i, j, 2, -2, 1, -1, count)
                            for t in range(len(predList)):
                                predecessor.append(predList[t])
                    if (i+1<=3 and j+1<=3):
                        if (initialState[i+1][j+1] == 0):
                            predList = getPredecessorForPawn(initialState, player, p2, i, j, 2, 2, 1, 1, count)
                            for t in range(len(predList)):
                                predecessor.append(predList[t])
            # si le pion trouvé est une dame, le pattern de mouvement est différent, on appelle alors la fonction pour les dames qui peuvent aller dans toutes les directions
            if (initialState[i][j] == dame):
                predList = getPredecessorForDame(initialState, player, p2, i, j, count)
                for t in range(len(predList)):
                    predecessor.append(predList[t])
    return predecessor


def getTempInitiaized(board, player, x, y, i, j):
    tmp = copy.deepcopy(board)
    tmp[x+i][y+j] = tmp[x][y]
    tmp[x][y] = 0
    return tmp

def getNumberOfPawns(board, player):
    """
    Récupère simplement le nombre de pions du joueur rentré en paramètre
    """
    count = 0
    if (board != []):
        for i in range(N):
            for j in range(N):
                if (board[i][j] == player or board[i][j] == player*11):
                    count += 1
    return count

def getNumberOfAllPawns(board):
    """
    Récupère simplement le nombre de pions du joueur rentré en paramètre
    """
    countW = 0
    countB = 0
    for i in range(N):
        for j in range(N):
            if (board[i][j] == 1) or (board[i][j] == 11):
                countW += 1
            elif (board[i][j] == 2) or (board[i][j] == 22):
                countB += 1
    return (countW,countB)

def getPredecessorForPawn(board, player, p2, x, y, i, j, a, b, count):
    """
    Fonction pour récupérer dans un des sens de diagonale les prédecesseurs possibles
    board -> état du plateau
    player, p2 -> 1/2
    x, y -> pos du pion pour lequel on va chercher les prédecesseurs
    i, j -> le déplacement en diagonale à faire si le pion avait la possibilité d'avoir sauté au dessus d'un autre pion
    a, b -> le déplacement en diagonale de 1 pour un simple mouvement/ avoir la case d'un pion ayant été mangé
    count -> nombre de pion adverse
    """
    predecessors = []
    if ((0 <= x+i <= 3) and (0 <= y+j <= 3) and board[x+i][y+j] == 0):
        if (count < maxPawns):
            # si count 0 -> on doit rajouter un pion adverse / si count < N on peut rajouter un pion adverse dans les prédecesseurs
            predList = backEat(board, player, p2, x, y, i, j, a, b, count)
            for t in range(len(predList)):
                predecessors.append(predList[t])

    if (count>0):
        # si rajouter un pion n'était pas une obligation, on peut faire un simple mouvement sans prise de pion -> pas de rajout de pion
        predList = backMove(board, player, p2, x, y, a, b)
        for t in range(len(predList)):
            predecessors.append(predList[t])
    
    return predecessors

def backEat(board, player, p2, x, y, i, j, a, b, count):
    predecessors = []
    if (0<=x+i<=3 and 0<=y+j<=3):
        tmp = getTempInitiaized(board, player, x, y, i, j)
        tmp[x+a][y+b] = p2  # cas où on rajoute pion normal
        predecessors.append(tmp)
        
        tmp2 = copy.deepcopy(tmp)
        tmp2[x+a][y+b] = 11*p2   # cas où on rajoute une reine
        predecessors.append(tmp2)
        
        # si le pion que l'on vient de bouger est une reine/dame et qu'il se trouve sur la position de départ d'un pion adverse -> la ligne à l'opposé du plateau
        if ((x == 0 and board[x][y] == 11) or (x == 3 and board[x][y] == 22)):
            tmp = copy.deepcopy(board)
            tmp[x+i][y+j] = player
            tmp[x+a][y+b] = p2
            tmp[x][y] = 0
            predecessors.append(tmp)
            
            tmp = copy.deepcopy(board)
            tmp[x+i][y+j] = player
            tmp[x+a][y+b] = p2*11
            tmp[x][y] = 0
            predecessors.append(tmp)
        
    return predecessors

def backMove(board, player, p2, x, y, a, b):
    predecessors = []
    tmp = getTempInitiaized(board, player, x, y, a, b)
    predecessors.append(tmp)
    if (player == 1 and x == 0 and board[x][y] == 11) or (player == 2 and x == N-1 and board[x][y] == 22):
        tmp = copy.deepcopy(tmp)
        tmp[x+a][y+b] = player
        predecessors.append(tmp)
    return predecessors

def getPredecessorForDame(board, player, p2, x, y, count):
    """
    Fonction pour prendre toutes les positions dans le board d'où pourrait venir la reine càd toutes les diagonales
    """
    predecessors = []
    predList = []
    predList2 = []
    predList3 = [] 
    k = -2
    l = -2
    i = -1
    j = -1
    stop = False
    # pour chaque diagonale, on boucle pour voir si la case est disponible, si oui, on appelle la fonction getPredecessorForPawn. Si on rencontre un pion sur une case, la boucle stop
    while (x+i >=0 and y+j >= 0 and stop == False):
        if (board[x+i][y+j] == 0):
            if (i == -1 and j == -1):
                if (count < maxPawns):
                    predList = backEat(board, player, p2, x, y, k, l, i, j, count)
                    for t in range(len(predList)):
                        predecessors.append(predList[t])
                    
                    o = k-1
                    p = l-1
                    while (0 <= o < N and 0 <= o < N and board[k][j] == 0):
                        predList = backEat(board, player, p2, x, y, o, p, i, j, count)
                        for t in range(len(predList)):
                            predecessors.append(predList[t])
                        o -=1
                        p -=1
                    
                if (count != 0):
                    predList2 = backMove(board, player, p2, x, y,i, j)
                    for t in range(len(predList2)):
                        predecessors.append(predList2[t])
            else:
                if (count > 0):
                    predList3 = backMove(board, player, p2, x, y, i, j)
                    for t in range(len(predList3)):
                        predecessors.append(predList3[t])
            k -= 1
            l -= 1
            i -= 1
            j -= 1

        else:
            stop = True
    k = -2
    l = 2
    i = -1
    j = 1
    stop = False
    while (x+i >=0 and y+j <= 3 and stop == False):
        if (board[x+i][y+j] == 0):
            if (i == -1 and j == 1):
                if (count< maxPawns):
                    predList = backEat(board, player, p2, x, y, k, l, i, j, count)
                    for t in range(len(predList)):
                        predecessors.append(predList[t])
                    o = k-1
                    p = l+1
                    while (0 <= o < N and 0 <= o < N and board[k][j] == 0):
                        predList = backEat(board, player, p2, x, y, o, p, i, j, count)
                        for t in range(len(predList)):
                            predecessors.append(predList[t])
                        o -=1
                        p +=1
                if (count != 0):
                    predList2 = backMove(board, player, p2, x, y,i, j)
                    for t in range(len(predList2)):
                        predecessors.append(predList2[t])
            else:
                if (count > 0):
                    predList3 = backMove(board, player, p2, x, y, i, j)
                    for t in range(len(predList3)):
                        predecessors.append(predList3[t])
            
            k -= 1
            l += 1
            i -= 1
            j += 1
        else:
            stop = True
    k = 2
    l = -2
    i = 1
    j = -1
    stop = False
    while (x+i <= 3) and (y+j >= 0) and (stop == False):
        if (board[x+i][y+j] == 0):
            if (i == 1 and j == -1):
                if (count < maxPawns):
                    predList = backEat(board, player, p2, x, y, k, l, i, j, count)
                    for t in range(len(predList)):
                        predecessors.append(predList[t])
                    o = k+1
                    p = l-1
                    while (0 <= o < N and 0 <= o < N and board[k][j] == 0):
                        predList = backEat(board, player, p2, x, y, o, p, i, j, count)
                        for t in range(len(predList)):
                            predecessors.append(predList[t])
                        o +=1
                        p -=1
                if (count != 0):
                    predList2 = backMove(board, player, p2, x, y, i, j)
                    for t in range(len(predList2)):
                        predecessors.append(predList2[t])
            else:
                if (count > 0):
                    predList3 = backMove(board, player, p2, x, y, i, j)
                    for t in range(len(predList3)):
                        predecessors.append(predList3[t])
            k += 1
            l -= 1
            i += 1
            j -= 1
        else:
            stop = True
    k = 2
    l = 2
    i = 1
    j = 1
    stop = False
    b = 0
    while (x+i <= 3 and y+j <= 3 and stop == False):
        if (board[x+i][y+j] == 0):
            if (i == 1 and j == 1):
                if (count < maxPawns):
                    predList = backEat(board, player, p2, x, y, k, l, i, j, count)
                    for t in range(len(predList)):
                        predecessors.append(predList[t])
                    o = k+1
                    p = l+1
                    while (0 <= o < N and 0 <= o < N and board[k][j] == 0):
                        predList = backEat(board, player, p2, x, y, o, p, i, j, count)
                        for t in range(len(predList)):
                            predecessors.append(predList[t])
                        o +=1
                        p +=1
                if (count != 0):
                    predList2 = backMove(board, player, p2, x, y, i, j)
                    for t in range(len(predList2)):
                        predecessors.append(predList2[t])
            else:
                if (count > 0):
                    predList3 = backMove(board, player, p2, x, y, i, j)
                    for t in range(len(predList3)):
                        predecessors.append(predList3[t])
            
            k += 1
            l += 1
            i += 1
            j += 1
        else:
            stop = True
    return predecessors

def delete10(board):
    for i in range(N):
        for j in range(N):
            if (board[i][j] == 10):
                board[i][j] = 0
    return board

def checkIfMovePossible(board, player):
    """
    fonction pour vérifier si pour un joueur, un mouvement est possible
    """
    stuck = True
    i = 0
    j = 0
    while (i<=3 and stuck == True):
        while (j<=3 and stuck == True):
            if (board[i][j] == player or board[i][j] == 11*player):
                if ((i-1>=0 and j-1>=0 and board[i-1][j-1] == 0) or (i-1>=0 and j+1>=0 and board[i-1][j+1] == 0) or (i+1>=0 and j-1>=0 and board[i+1][j-1] == 0) or (i+1>=0 and j+1>=0 and board[i+1][j+1] == 0)):
                    stuck = False
                j += 1
        i += 1
    x = 0
    return stuck

def findWinState(board, player, count, txt):
    tmp = board
    if (count < maxPawns):
        for i in range(N):
            for j in range(N):
                if (i%2 != 0 and j%2 == 0) or (i%2 == 0 and j%2 != 0):
                    if (tmp[i][j] == 0):
                        if ((i != 0 and player == 1) or (i != 3 and player == 2)):
                            tmp[i][j] = player
                            for enum in tmp :
                                tmpCount = 0
                                for num in enum:
                                    if tmpCount == 3 :
                                        txt.write(str(num)+"\n")
                                    else:
                                        txt.write(str(num)+" ")
                                    tmpCount += 1
                            findWinState(tmp, player,count+1, txt)
                        
                        tmp [i][j] = 11*player
                        for enum in tmp :
                            tmpCount = 0
                            for num in enum:
                                if tmpCount == 3 :
                                    txt.write(str(num)+"\n")
                                else:
                                    txt.write(str(num)+" ")
                                tmpCount += 1
                        findWinState(tmp, player, count+1, txt)
                        tmp[i][j] = 0

def findWinStateDeep(board, player, count):
    tmp = copy.deepcopy(board)
    if (count < maxPawns):
        for i in range(N):
            for j in range(N):
                if (i%2 != 0 and j%2 == 0) or (i%2 == 0 and j%2 != 0):
                    if (tmp[i][j] == 0):
                        if ((i != 0 and player == 1) or (i != 3 and player == 2)):
                            tmp[i][j] = player
                            if not (tmp in winStates):
                                winStates.append(tmp)
                            findWinStateDeep(tmp, player,count+1)
                        
                        tmp = copy.deepcopy(board)
                        tmp [i][j] = 11*player
                        if not (tmp in winStates):
                            winStates.append(tmp)
                        findWinStateDeep(tmp, player, count+1)
                        
                        tmp = copy.deepcopy(board)

def listToString(tab):
    string = ""
    for line in tab:
        count = 0
        for col in line:
            count +=1
            if count < N :
                string += str(col)+" "
            else :
                string += str(col)+"\n"
    return string

def stringTolist(string):
    tempListe = re.split(" |\n",string)
    liste = []
    for i in range(N) :
        temp = []
        for j in range(N):
            temp.append(int(tempListe[(N*i)+j]))
        liste.append(copy.deepcopy(temp))
    return liste


def cp(player,A,APrime, predC):
    allPredecessors = set()
    tempSet = set()
    for element in APrime:
        board = stringTolist(element)
        predList = findPredecessor(board, player)
        for tab in predList:
            tempSet.add(listToString(tab))
        if player == 2:
            tempSet = AdamPlay(tempSet,player,predC)
        allPredecessors = tempSet.union(allPredecessors)
        tempSet = set()
    return allPredecessors

def attractor(player,A,APrime,predC):
    newFound = True
    count = 0
    while newFound:
        C[3-player] = APrime.union(C[3-player])
        print(len(APrime))
        APrime = cp(player,A,APrime,predC[3-player])
        APrime = APrime.difference(C[player])
        A = APrime.union(A)
        if APrime == set() :
            newFound = False
        player = 3-player
    return A,C

def setToFile(FileName,States):
    namefile = FileName+".txt"
    textfile = open(namefile, "w")
    for elem in States:
        textfile.write(elem)          
    textfile.close()


def AdamPlay(controlablePrec, player, predC):
    AdamPredecessors = set()
    for elem in controlablePrec:
        allInA = endInA(stringTolist(elem), predC, player)
        if allInA :
            AdamPredecessors.add(elem)
    return AdamPredecessors


def endInA(board, predC, player):
    if (player == 1):
        player2 = 2
    else:
        player2 = 1
    i = 0
    j = 0
    InA = set()
    #print(board)
    for i in range(N):
        for j in range(N):
            if (board[i][j] == player):
                InA = checkIfMoveInA(board, predC, player, player2, i, j)
                #print(InA.difference(predC))
                #input()
                if (InA.difference(predC) != set()):
                    return False
            elif board[i][j] == player*11:
                InA = checkIfDameMoveInA(board, predC, player, player2, i, j)
                #print(InA.difference(predC))
                #input()
                if (InA.difference(predC) != set()):
                    return False
                
    return True

def checkIfMoveInA(board, predC, player, player2, x, y):
    if (player == 1):
        movesLeftDiag = getMoves(board, player, player2, x, y, -2, -2, -1, -1)
        movesRightDiag = getMoves(board, player, player2, x, y, -2, 2, -1, 1)
    if (player == 2) :
        movesLeftDiag = getMoves(board, player, player2, x, y, 2, -2, 1, -1)
        movesRightDiag = getMoves(board, player, player2, x, y, 2, 2, 1, 1)
        
    return movesLeftDiag.union(movesRightDiag)

def checkIfDameMoveInA(board, predC, player, player2, x, y):
    possibleBoard = set()
    i = -2
    j = -2
    k = -1
    l = -1
    stop = False
    while (0<=x+k<N and 0<=y+l<N and not stop):
        possibleBoard = possibleBoard.union(getMoves(board, player, player2, x, y, i, j, k, l))
        if board[x+k][y+l] != 0:
            stop = True
        i -= 1
        j -= 1
        k -= 1
        l -= 1

    i = -2
    j = 2
    k = -1
    l = 1
    stop = False
    while (0<=x+k<N and 0<=y+l<N and not stop):
        possibleBoard = possibleBoard.union(getMoves(board, player, player2, x, y, i, j, k, l))
        if board[x+k][y+l] != 0:
            stop = True
        i -= 1
        j += 1
        k -= 1
        l += 1

    i = 2
    j = -2
    k = 1
    l = -1
    stop = False
    while (0<=x+k<N and 0<=y+l<N and not stop):
        possibleBoard = possibleBoard.union(getMoves(board, player, player2, x, y, i, j, k, l))
        if board[x+k][y+l] != 0:
            stop = True
        i += 1
        j -= 1
        k += 1
        l -= 1

    i = 2
    j = 2
    k = 1
    l = 1
    stop = False
    while (0<=x+k<N and 0<=y+l<N and not stop):
        if board[x+k][y+l] != 0:
            stop = True
        possibleBoard = possibleBoard.union(getMoves(board, player, player2, x, y, i, j, k, l))
        i += 1
        j += 1
        k += 1
        l += 1
    return possibleBoard


def getMoves(board, player, player2, x, y, i, j, k, l):
    possibleBoard = set()
    if (0<=x+k<N and 0<=y+l<N and board[x+k][y+l] == 0):
        tmp = copy.deepcopy(board)
        if (x+k == N-1):
            tmp[x+k][y+l] = player*11
        else:
            tmp[x+k][y+l] = tmp[x][y]
        tmp[x][y] = 0
        possibleBoard.add(listToString(tmp))
    
    if (0<=x+i<N and 0<=y+j<N and (board[x+k][y+l] == player2 or board[x+k][y+l] == player2*11) and board[x+i][y+j] == 0):
        tmp = copy.deepcopy(board)
        if (x+k == N-1):
            tmp[x+i][y+j] = player*11
        else:
            tmp[x+i][y+j] = tmp[x][y]
        tmp[x][y] = 0
        tmp[x+k][y+l] = 0
        possibleBoard.add(listToString(tmp))
    return possibleBoard

"""
emptyBoard = [[0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0],
             [0,0,0,0,0]]

initialBoard = [[0,2,0,2,0],
                [2,0,2,0,2],
                [0,0,0,0,0],
                [1,0,1,0,1],
                [0,1,0,1,0]]
"""
emptyBoard = [[0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]]

initialBoard = [[0,2,0,2],
                [0,0,0,0],
                [0,0,0,0],
                [1,0,1,0]]


"""
winStates = []
findWinStateDeep(emptyBoard, 1, 0)
print("end win state")
textfile = open("AllDamesWin4.txt", "w")
for elem in winStates:
    for enum in elem :
        tmpCount = 0
        for num in enum :
            if tmpCount == 3 :
                textfile.write(str(num)+"\n")
            else:
                textfile.write(str(num)+" ")
            tmpCount += 1

textfile.close()    

"""
A = set()
APrime = set()
finish = False
C = {}
C[1] = set()
C[2] = set()
with open("AllDamesWin4.txt", "r") as file:
    while not finish:
        count = N
        Tab = ""

        while count > 0:
            line = file.readline()

            if line != "":
                temp = line.split()
                Tab += line
                count -= 1
            else :
                finish = True
                count = 0 
        if not finish:
            A.add(Tab)
APrime = copy.deepcopy(A)
A,C = attractor(1,A,APrime,C)
print(len(A))
print(len(C[1]),len(C[2]))

nm = "Dames"+str(N)+"x"+str(N)
p1 =nm+"P1"
p2 = nm+"P2"

#Ecrire en dans un fichier txt :
setToFile(p1,C[1])
setToFile(p2,C[2])

dict_Json = {"player1":[],"player2":[]}
for tableau in C[2] :
    dict_Json["player1"].append(stringTolist(tableau))
for tableau in C[1] :
    dict_Json["player2"].append(stringTolist(tableau))



#Ecrire en dans un fichier txt en format Json :
nm = "Json"+nm+".txt"
with open(nm, 'w') as json_file:
  json.dump(dict_Json, json_file)
