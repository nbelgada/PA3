import copy
import re
import json
"""
def main():
    save = []
    emptyBoard = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    #emptyBoard = [[0,0,0],[0,0,0],[0,0,0]]
    N = 5
    PLAYER = 1
    def testCombo(tab,x,y):
        if y+1<N and y-1>=0:
            if tab[y+1][x] == tab[y][x] and tab[y-1][x] == tab[y][x]:
                return tab[y][x]
        if x+1<N and x-1>=0:
            if tab[y][x+1] == tab[y][x] and tab[y][x-1] == tab[y][x]:
                return tab[y][x]
        if y+1<N and y-1>=0 and x+1<N and x-1>=0:
            if tab[y+1][x+1] == tab[y][x] and tab[y-1][x-1] == tab[y][x]:
                return tab[y][x]
            if tab[y-1][x+1] == tab[y][x] and tab[y+1][x-1] == tab[y][x]:
                return tab[y][x]
        return 0

    def isWin(tab):
        result = 0
        for i in range(N):
            for j in range(N):
                if tab[i][j] != 0:
                    tmp = testCombo(tab,j,i)
                    if tmp != 0:
                        result = tmp
                        return result
        return result

    def isWin(self,x):
        if(x != -1):
            y = self.findTop(x)
            if y != -1:
                for i in [-1,0,1]:
                    for j in [-1,0,1] :
                        if i != 0 or j != 0 :
                            if self.findWin(x,y+1,i,j) :
                                return True
        return False
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

    def createWinStates(current,player):
        print(current)
        input()
        if isWin(current) == PLAYER:
            
            save.append(copy.deepcopy(current))
        else:
            for i in range(N):
                for j in range(N):
                    if current[i][j] == 0 :
                        current[i][j] = player
                        createWinStates(current,3-player)
                        current[i][j] = 0
                
    createWinStates(emptyBoard,PLAYER)
    textfile = open("AllPuissance4.txt", "w")
    for elem in save:
        for enum in elem :
            tmpCount = 0
            for num in enum :
                if tmpCount == N-1 :
                    textfile.write(str(num)+"\n")
                else:
                    textfile.write(str(num)+" ")
                tmpCount += 1

    textfile.close() 
main()
"""
emptyBoard = [[0,0,0],[0,0,0],[0,0,0]]
N = 3
PLAYER = 1

def AdamPlay(controlablePrec, player, A):
    AdamPredecessors = set()
    for elem in controlablePrec:
        allInA = endInA(stringTolist(elem), A, player)
        if allInA :
            AdamPredecessors.add(elem)

    return AdamPredecessors

def endInA(tableau, A, player):
    save = set()
    for i in range(N):
        for j in range(N):
            if tableau[i][j] == 0:
                tableau[i][j] = player
                save.add(listToString(tableau))
                tableau[i][j] = 0
    if save.difference(A) == set() :
        return True
    return False


def findPredecessor(board, player) :
    result = []
    for i in range(N):
        for j in range(N):
            if board[i][j] == player:
                board[i][j] = 0
                result.append(copy.deepcopy(board))
                board[i][j] = player
    return result
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


A = set()
APrime = set()
finish = False
C = {}
C[1] = set()
C[2] = set()
with open("AllTicTacToeWin.txt", "r") as file:
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

#Ecrire en dans un fichier txt :
setToFile("TicTacToe3x3P1",C[1])
setToFile("TicTacToe3x3P2",C[2])

dict_Json = {"player1":[],"player2":[]}
for tableau in C[2] :
    dict_Json["player1"].append(stringTolist(tableau))
for tableau in C[1] :
    t = stringTolist(tableau)
    if(t[0][2] == 1 and t[1][2] == 1 and t[1][1] == 1 and t[2][0] == 2 and t[1][0] == 2) :
        print(tableau)
    dict_Json["player2"].append(stringTolist(tableau))



#Ecrire en dans un fichier txt en format Json :

with open('TicTacToe3x3.txt', 'w') as json_file:
  json.dump(dict_Json, json_file)
