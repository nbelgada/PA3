import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { GlobalStyles } from '../../config/GlobalStyles';
import { styles } from './DamesStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";//crown-circle-outline //chess-queen
import { COLORS, isAndroid } from '../../config/variable';

import JsonDames from "../../config/JsonDames4x4.json";

const Dames = ({ navigation }) => {
    const JsonDamesPlayer1 = JsonDames['player1']

    
    const [player1, setPlayer1] = useState({id:1,color:COLORS.darkBlue, name:"Bot", icon:"ios-close", score:0})
    // const stateWinningList = JsonDamesPlayer1
    const [winner, setWinner] = useState(0)
    const [isBotThinking, setIsBotThinking] = useState(false)

    const [player2, setPlayer2] = useState({id:2,color:COLORS.white, name:"Human", icon:"ios-ellipse-outline", score:0})

    
    // [  [{isActive:false, color:COLORS.red}, {isActive:false, color:COLORS.starYellowColor}, {isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}]];
    const createTableArray = (size=3)=>{
        let res = []
        for (let i = 0; i < size; i++) {
            let tmp = []
            for (let j = 0; j < size; j++) {
                if(((i%2==0 && j%2==1) || (i%2==1 && j%2==0)) && (i < 1 || i >= size-1)){
                    if(i < 1){
                        tmp.push(1)//{isActive:true, color:player1.color}
                    }else if(i >= size-1){
                        tmp.push(2)//{isActive:true, color:player2.color}
                    }
                    
                }else{
                    tmp.push(0)//
                }
                
                
            }
            res.push(tmp)
            
        }

        return res;
    }
 
    const isEqualArrays = (a, b)=>
    {
        
      
      // If length is not equal
      if(a.length!=b.length){return false;}
      else
      {
       
      // Comparing each element of array
       for(var i=0;i<a.length;i++){
           for (let j = 0; j < a.length; j++) {
                if(a[i][j]!=b[i][j]){
                    return false
                }
           }
       }
        
        return true;
      }
    }


    const SIZE_BOARD = 4;

    const initalTableArray = createTableArray(SIZE_BOARD)


    const [tableArray, setTableArray] = useState(initalTableArray)
    const [selectedItem, setSelectedItem] = useState(null)
    const [possibleMoves, setPossibleMoves] = useState(null)
    
    const INACTIVE_PLAYER = {isActive:false, color:null}
    const ACTIVE_PLAYER_1 = {isActive:true, color:player1.color}
    const ACTIVE_PLAYER_2 = {isActive:true, color:player2.color}

    const PLAYER_LIST = [INACTIVE_PLAYER, ACTIVE_PLAYER_1, ACTIVE_PLAYER_2, ACTIVE_PLAYER_1, ACTIVE_PLAYER_2]
    const [playerTurn, setPlayerTurn]      = useState(player2)  

    
    const restartGame = ()=>{
        setTableArray(initalTableArray)
        setIsBotThinking(false)
        setPlayerTurn(player2)
        setSelectedItem(null)
        setPossibleMoves(null)
        setWinner(0)
    }

    useEffect(()=>{
        
        if(playerTurn.id == player1.id){
            setIsBotThinking(true)
            setTimeout(()=>{
                //JsonDamesPlayer1
                //tableArray
                let boardTmp = []
                let possible_moves = []
                let save_pion_to_move = []
                for (let index_i = 0; index_i < tableArray.length; index_i++) {
                    for (let index_j = 0; index_j < tableArray[index_i].length; index_j++) {
                        if(tableArray[index_i][index_j] == player1.id || tableArray[index_i][index_j] == (player1.id +2)){
                            setSelectedItem([index_i, index_j])
                            possible_moves = getPossibleMoves([index_i, index_j])

                            save_pion_to_move = [index_i, index_j]

                            // console.log("Possible move for ",save_pion_to_move, ' is : ',possible_moves)
                            for (let n_move = 0; n_move < possible_moves.length; n_move++) {
                                // console.log("possible select ! ", [index_i, index_j], selectedItem)
                                boardTmp = updateTableArray(possible_moves[n_move][0], possible_moves[n_move][1], player1, true, [index_i, index_j])
                                for (let win_n_board = 0; win_n_board < JsonDamesPlayer1.length; win_n_board++) {
                                    if(isEqualArrays(boardTmp, JsonDamesPlayer1[win_n_board] )){
                                        //winning state !
                                        console.log("winning state choosed ! ", boardTmp)
                                        updateTableArray(possible_moves[n_move][0], possible_moves[n_move][1], player1, false, [index_i, index_j])
                                        setSelectedItem(null)
                                        setPlayerTurn(player2)
                                        setIsBotThinking(false)
                                        return;
                                    }
                                    
                                }
                                

                            }
                            
                        }
                        
                    }
                    
                }

                
                if(possible_moves.length > 0){
                    let n_move = Math.floor(0 + Math.random() * ((possible_moves.length - 1) - 0));
                    console.log("Random choice ! ", n_move)
                    updateTableArray(possible_moves[n_move][0], possible_moves[n_move][1], player1, false, save_pion_to_move)
        
                    setSelectedItem(null)
                    setPlayerTurn(player2)
                }else{
                    //finished
                }

                if(possible_moves.length == 0 && winner == 0){
                    //match null
                    //    setWinner(-1)
                }

                setIsBotThinking(false)
            },
                2000
            )

            
            
            
        }
    }, [playerTurn])


    const getPossibleMoves = (selected=selectedItem)=>{
        if(selected==null){return []}
        let moves = []
        let inital_i = selected[0] 
        let inital_j = selected[1] 
        let pion_id_selected = tableArray[inital_i][inital_j] //0,1,2,(3,4) reines
        if(pion_id_selected == 1){
            //only one step allowed
            if(((inital_i+1)>=0 && (inital_i+1) < tableArray.length) && ((inital_j+1)>=0 && (inital_j+1) < tableArray[inital_i+1].length)){
                if( tableArray[inital_i+1][inital_j+1] == 2){
                    if(((inital_i+2)>=0 && (inital_i+2) < tableArray.length) && ((inital_j+2)>=0 && (inital_j+2) < tableArray[inital_i+2].length) && tableArray[inital_i+2][inital_j+2] == 0){
                        moves.push([inital_i+2, inital_j+2])
                    }
                    
                }else{
                    if(tableArray[inital_i+1][inital_j+1] == 0){
                        moves.push([inital_i+1, inital_j+1])
                    }
                    
                }
            }
            if(((inital_i+1)>=0 && (inital_i+1) < tableArray.length) && ((inital_j-1)>=0 && (inital_j-1) < tableArray[inital_i+1].length)){
                if( tableArray[inital_i+1][inital_j-1] == 2 ){
                    if(((inital_i+2)>=0 && (inital_i+2) < tableArray.length) && ((inital_j-2)>=0 && (inital_j-2) < tableArray[inital_i+2].length) && tableArray[inital_i+2][inital_j-2] == 0){
                        moves.push([inital_i+2, inital_j-2])
                    }
                    
                }else{
                    if(tableArray[inital_i+1][inital_j-1] == 0){
                        moves.push([inital_i+1, inital_j-1])
                    }
                    
                }
            }
            
            
        }else if(pion_id_selected == 2){
            //only one step allowed
            if(((inital_i-1)>=0 && (inital_i-1) < tableArray.length) && ((inital_j+1)>=0 && (inital_j+1) < tableArray[inital_i-1].length)){
                if( tableArray[inital_i-1][inital_j+1] == 1){
                    if(((inital_i-2)>=0 && (inital_i-2) < tableArray.length) && ((inital_j+2)>=0 && (inital_j+2) < tableArray[inital_i-2].length) && tableArray[inital_i-2][inital_j+2] == 0){
                        moves.push([inital_i-2, inital_j+2])
                    }
                    
                }else{
                    if(tableArray[inital_i-1][inital_j+1] == 0){
                        moves.push([inital_i-1, inital_j+1])
                    }
                    
                }
            }

            if(((inital_i-1)>=0 && (inital_i-1) < tableArray.length) && ((inital_j-1)>=0 && (inital_j-1) < tableArray[inital_i-1].length)){

                if(tableArray[inital_i-1][inital_j-1] == 1 ){
                
                    if( ((inital_i-2)>=0 && (inital_i-2) < tableArray.length) && ((inital_j-2)>=0 && (inital_j-2) < tableArray[inital_i-2].length) && tableArray[inital_i-2][inital_j-2] == 0){
                        moves.push([inital_i-2, inital_j-2])
                    }
                    
                }else{
                    if(tableArray[inital_i-1][inital_j-1] == 0){
                        moves.push([inital_i-1, inital_j-1])
                    }
                    
                }
            }
                //only one step allowed
            // moves.push([inital_i-1, inital_j+1])
            // moves.push([inital_i-1, inital_j-1])
        }else{
            
            //si c'est des reines ....

            let playerId = (pion_id_selected == player1.id || pion_id_selected == (player1.id+2))?player1.id:player2.id;
            let playerIdOther = 1+(playerId%2)
            let possibleFriendlyFire = false


            let ennemyFire_up_right = false
            let ennemyFire_up_left = false
            let ennemyFire_down_right = false
            let ennemyFire_down_left = false

            let up_right_stop = false
            let up_left_stop = false
            let down_right_stop = false
            let down_left_stop = false

            for (let steps = 1; steps < tableArray.length; steps++) {

                if(up_right_stop && up_left_stop && down_right_stop && down_left_stop){
                    break;
                }

                if(!down_right_stop && (inital_i+steps < tableArray.length && inital_j+steps < tableArray[inital_i+steps].length)){

                    if(down_right_stop || tableArray[inital_i+steps][inital_j+steps] == playerId || tableArray[inital_i+steps][inital_j+steps] == (playerId+2)){
                        down_right_stop = true
                        // return false
                    }else if(tableArray[inital_i+steps][inital_j+steps] ==playerIdOther || tableArray[inital_i+steps][inital_j+steps] == (playerIdOther+2)){
                        ennemyFire_down_right = true
                        // return false
                    }else if(ennemyFire_down_right){
                        moves.push([inital_i+steps, inital_j+steps])
                        ennemyFire_down_right = false
                        down_right_stop = true
    
                    }else{
                        moves.push([inital_i+steps, inital_j+steps])
                    }
                }


                if(!up_right_stop && ( (inital_i-steps)>=0 && inital_i-steps < tableArray.length && inital_j+steps < tableArray[inital_i-steps].length)){ 

                    if(up_right_stop || tableArray[inital_i-steps][inital_j+steps] == playerId || tableArray[inital_i-steps][inital_j+steps] == (playerId+2)){
                        up_right_stop = true
                        // return false
                    }else if(tableArray[inital_i-steps][inital_j+steps] ==playerIdOther || tableArray[inital_i-steps][inital_j+steps] == (playerIdOther+2)){
                        
                        ennemyFire_up_right = true
                        // return false
                    }else if(ennemyFire_up_right){
                        moves.push([inital_i-steps, inital_j+steps])
                        ennemyFire_up_right = false
                        up_right_stop = true

                    }else{
                        moves.push([inital_i-steps, inital_j+steps])
                    }
                }

                if(!up_left_stop && ( (inital_i-steps)>=0 && (inital_j-steps)>=0 && inital_i-steps < tableArray.length && inital_j-steps < tableArray[inital_i-steps].length)){ 

                    if(up_left_stop || tableArray[inital_i-steps][inital_j-steps] == playerId || tableArray[inital_i-steps][inital_j-steps] == (playerId+2)){
                        up_left_stop = true
                        // return false
                    }else if(tableArray[inital_i-steps][inital_j-steps] ==playerIdOther || tableArray[inital_i-steps][inital_j-steps] == (playerIdOther+2)){
                        
                        ennemyFire_up_left = true
                        // return false
                    }else if(ennemyFire_up_left){
                        moves.push([inital_i-steps, inital_j-steps])
                        ennemyFire_up_left = false
                        up_left_stop = true

                    }else{
                        moves.push([inital_i-steps, inital_j-steps])
                    }
                }

                if(!down_left_stop && ( (inital_j-steps)>=0 && inital_i+steps < tableArray.length && inital_j-steps < tableArray[inital_i+steps].length)){ 

                    if(down_left_stop || tableArray[inital_i+steps][inital_j-steps] == playerId || tableArray[inital_i+steps][inital_j-steps] == (playerId+2)){
                        down_left_stop = true
                        // return false
                    }else if(tableArray[inital_i+steps][inital_j-steps] ==playerIdOther || tableArray[inital_i+steps][inital_j-steps] == (playerIdOther+2)){
                        
                        ennemyFire_down_left = true
                        // return false
                    }else if(ennemyFire_down_left){
                        moves.push([inital_i+steps, inital_j-steps])
                        ennemyFire_down_left = false
                        down_left_stop = true

                    }else{
                        moves.push([inital_i+steps, inital_j-steps])
                    }
                }
                
            }

        }


        return moves

    }

    
    // useEffect(()=>{
    //     //let possible_moves = getPossibleMoves();

    // },[selectedItem])

    const isPossible = (target_i, target_j, player, selected=selectedItem)=>{
        
        if(selected==null){return false}
        let inital_i = selected[0] 
        let inital_j = selected[1] 
        let possible_moves = getPossibleMoves(selected)

        //player1 seulement vers le bas
        //player2 seulement vers le haut

        console.log(" - Possible moves : ", possible_moves)

        let step_size_i = Math.abs(inital_i-target_i)
        let step_size_j = Math.abs(inital_j-target_j)
        
        if(step_size_i != step_size_j){
            //console.log("IT IS NOT IN DIAGONAL")
            return false
        }else {
            //if( tableArray[inital_i][inital_j] < 3 )
            //sauf si il mange
            let isInsidePossibleMoves = false
            for (var k in possible_moves){
                if((possible_moves[k][0] == target_i && possible_moves[k][1] == target_j)){
                    isInsidePossibleMoves = true
                }
                
            }
            if(!(isInsidePossibleMoves)){
                // console.log("Not possible move (",[target_i, target_j],")")
                return false
            }else{
                // console.log("####### Possible move (",[target_i, target_j],")")
            }

        }
        // else if( tableArray[inital_i][inital_j] >= 3 ){
        //     //alors c'est une reine
        //     //et elle peut avancer de plusieurs case
        //     if(tableArray[target_i][target_j] > 0){
        //         return false
        //     }


        // }


        // console.log("@@@@@@@ Possible move (",[target_i, target_j],")")
        return true;

    }

    const canPlay = ()=>{
        //si ya un bot alors l' humain est le player 2 seulement
        if( playerTurn.id == 2){
            return true
        }
        return false
    }

    const check_won = (target_i, target_j, plyr, board=tableArray)=>{
        let player = plyr.id
        
        let countP1 = 0
        let countP2 = 0
        // let save_latest = []
        for (let index_i = 0; index_i < board.length; index_i++) {
            for (let index_j = 0; index_j < board[index_i].length; index_j++) {
                if(board[index_i][index_j] == 1 || board[index_i][index_j] == 3){
                    countP1 += 1
                    // save_latest = [index_i,index_j]
                }else if(board[index_i][index_j] > 0){
                    countP2 += 1
                }
                if(countP1 > 0 && countP2 >0){return false;}
                
            }
            
        }

        if(countP1 == 0 || countP2 ==0){
            return true
            // setWinner(player)
            //board[save_latest[0]][save_latest[1]]
        }



    }
    
    const updateTableArray = (target_i, target_j, player, isSimulation=false, selected=selectedItem)=>{
        
        if(isPossible(target_i, target_j, player, selected) == true){
            //then move it 
            //tableArray
            // let items = [...tableArray];
            let items = []
            if(isSimulation){
                items = JSON.parse(JSON.stringify((tableArray)))
            }else{
                items = [...tableArray];
            }
            
            let curr_i = selected[0]
            let curr_j = selected[1]
            let save_player_id = items[curr_i][curr_j] 
                
            let step_size_i = Math.abs(curr_i-target_i)
            let step_size_j = Math.abs(curr_j-target_j)


            if( step_size_i > 1 && step_size_j > 1){
                //il mange
                
                let gotEaten_i =target_i-(target_i-curr_i)/2
                let gotEaten_j = target_j-(target_j-curr_j)/2

                items[gotEaten_i][gotEaten_j] = 0;
                player.score += 1
            
            }
            
            items[curr_i][curr_j] = 0;
            
            let firstRowGoal = 0;
                
            if(player.id == 2){
                firstRowGoal = 0
            }else{
                firstRowGoal = items.length-1
            }
            if(firstRowGoal == target_i){
                items[target_i][target_j] = (save_player_id + 2);
            }else{
                items[target_i][target_j] = save_player_id;
            }
            
            
            if(isSimulation){
                // console.log("Is Simulation ! ")
                return items
            }else{
                setTableArray(items)
            }

            if(check_won(target_i, target_j, player, items) == true){
                setWinner(player.id)
                // setPlayerTurn(player1)
                console.log("The winner is Player ", player.id)
            }
            

            return true
        }else{
            return false
        }

        // @return false if not possible

    };

    const GetItem = ({size=60, isActive, color, id})=>{
        let x = {}
        let y = {}
        //console.log(id)
        let target_i = id[0]
        let target_j = id[1]
        let player = null;
        let txt = ""
        if(selectedItem != null && possibleMoves != null){
            player = (PLAYER_LIST[1].color == color)?player1:player2;
            if(isPossible(target_i, target_j, player)){
                y = {backgroundColor:((target_i%2==0 && target_j%2==0) || (target_i%2==1 && target_j%2==1))?"#8ac484":"#8ac484", borderRadius:5}
            }else{
                y = {backgroundColor:((target_i%2==0 && target_j%2==0) || (target_i%2==1 && target_j%2==1))?"#9e9e9e":COLORS.grayShadow, borderRadius:5}
            }

        }else{
            y = {backgroundColor:((target_i%2==0 && target_j%2==0) || (target_i%2==1 && target_j%2==1))?"#9e9e9e":COLORS.grayShadow, borderRadius:5}
        }
        

        if(!isActive){
            x = {borderColor:"#bebebe", borderWidth:0.5, opacity:0.5}
            //"#bebebe"
            
        }else{
            if(selectedItem != null && selectedItem[0] == target_i && selectedItem[1] == target_j){
                x = {backgroundColor:color, borderColor:COLORS.primaryGreen,opacity:0.5, borderWidth:2}
            }else{
                x = {backgroundColor:color, borderColor:color, borderWidth:2}
            }
            

            
            txt = "P"
            txt += (player1.color==color)?player1.id:player2.id;
            player = (player1.color==color)?player1:player2;
        }
        return (<TouchableOpacity activeOpacity={0.5} style={{...y}} onPress={()=>{
            
            
                if(!isActive){
                    if(selectedItem != null && updateTableArray(target_i, target_j, playerTurn) == true){
                        (playerTurn.id==1)?setPlayerTurn(player2):setPlayerTurn(player1);
                        setSelectedItem(null)
                        setPossibleMoves(null)
                    }
                }else{
                    if(player != null && player.id == playerTurn.id && canPlay()){
                        if(selectedItem != null && selectedItem[0] == target_i && selectedItem[1] == target_j){
                            //tap again on same item , cancels the selection
                            setSelectedItem(null)
                            setPossibleMoves(null)
                        }else{
                            
                            setSelectedItem([target_i, target_j])
                            console.log("From : ", [target_i, target_j])
                            setPossibleMoves(()=>getPossibleMoves())
                        }
                    }
                }
            
            }}>
            <View style={{height:size, width:size, borderRadius:size/2,alignItems:"center", justifyContent:"center",textAlign:"center", ...x}}>
                {tableArray[target_i][target_j] > 2 && <IconMaterialCommunity name='chess-queen' size={25} color={COLORS.lightYellow} />}
                
                {/* <Text style={{fontWeight:"300", color:"#fff"}}>{txt}</Text> */}
            </View>
        </TouchableOpacity>);
    }

    const GetTable = ()=>{
        
        return (<View style={{backgroundColor:"#abc",flex:1, flexDirection:"column", justifyContent:"center", maxHeight:"60%", borderRadius:15, paddingHorizontal:5 }}>
            {Object.entries(tableArray).map(([key, arr], index)=>{return (
                    <View key={index} style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center", }}>
                            {Object.entries(arr).map(([key2,element], index2)=>{return (<GetItem key={[index, index2]} id={[index, index2]} size={60-(2*SIZE_BOARD)} isActive={PLAYER_LIST[element].isActive} color={PLAYER_LIST[element].color}/>)})}
                    </View>);})}
            </View>
            )
    }
    

    return (
        < SafeAreaView style={GlobalStyles.safeAreaViewStyle} >
            
            <View style={{marginVertical:15, marginHorizontal:15, alignItems:"center", flexDirection:"row",justifyContent:"space-between"}}
                    >
                        <TouchableOpacity style={{flex:2,alignItems:"center", padding:5, borderWidth:1, borderColor:COLORS.primaryBlue, borderRadius:30, }} activeOpacity={0.5} onPress={()=>navigation.goBack()}>
                            <Icon name="caret-back" size={30} color={COLORS.primaryBlue}/>
                            
                        </TouchableOpacity>
                        <Text style={{flex:4, marginHorizontal:20, paddingHorizontal:10, fontWeight:"600", fontSize:30, color:COLORS.white,textAlign:"center",paddingVertical:5, backgroundColor:COLORS.darkBlue, borderRadius:30}}>Dames</Text>
                        <View style={{flex:2,}}></View>
            </View>
            <View style={[GlobalStyles.contentContainer,styles.mainContainer, {backgroundColor:"#eee", borderWidth:1, borderColor:COLORS.primaryGray, borderRadius:15}]}>
                
                {/* <Text style={{marginVertical:15, fontWeight:"500", fontSize:20, color:COLORS.primaryBlue}}>Player {playerTurn.id}'s turn</Text> */}
                <View style={{flex:1, flexDirection:"column", justifyContent:"center", backgroundColor:COLORS.primaryBlue, width:"95%",paddingHorizontal:15, marginTop:20, borderRadius:15}}>
                    
                {winner >0 && <Text style={{textAlign:"center", color:COLORS.white, fontSize:20, fontWeight:"700"}}>The winner is {(winner == 1)?player1.name:player2.name} !!</Text>}
                    {winner <0 && <Text style={{textAlign:"center", color:COLORS.white, fontSize:20, fontWeight:"700"}}>No winner , try again !!</Text>}
                    <ActivityIndicator animating={isBotThinking} />
                    <View style={{ flexDirection:"row", justifyContent:"space-around",marginVertical:10 }}>
                        <View style={{marginVertical:15,paddingBottom:5, fontWeight:"500", fontSize:20, borderBottomColor:(playerTurn.id==player1.id)?player1.color:COLORS.primaryBlue, borderBottomWidth:5,borderRadius:5}}>
                            <Text style={{color:COLORS.white}}>{player1.name} : ({player1.score} )</Text>
                        </View>
                        {/* color:(playerTurn.id==player2.id)?COLORS.white:COLORS.black, */}
                        <View style={{marginVertical:15,paddingBottom:5, fontWeight:"500", fontSize:20,  borderBottomColor:(playerTurn.id==player2.id)?player2.color:COLORS.primaryBlue, borderBottomWidth:5,borderRadius:5 }}>
                            <Text style={{color:COLORS.white}}>{player2.name} : ({player2.score})</Text>
                        </View>
                    </View>
                    
                    
                    <GetTable />

                    <View style={{ flexDirection:"row", justifyContent:"center",marginVertical:10 }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>restartGame()}>
                            <Text style={{paddingHorizontal:30, paddingVertical:15, backgroundColor:COLORS.darkBlue, color:COLORS.white, borderRadius:15}}>Restart</Text>
                        </TouchableOpacity>
                    </View>
{/*                     
                    <View style={{backgroundColor:"#abc",flex:1, flexDirection:"column", justifyContent:"center", maxHeight:"60%", borderRadius:15 }}>
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center" }}>
                            <GetItem size={60} isActive={true} color={COLORS.red}/>
                            <GetItem size={60} isActive={true} color={COLORS.red}/>
                            <GetItem size={60} isActive={false} color={COLORS.red}/>
                        </View>
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center" }}>
                            <GetItem size={60} isActive={false} color={COLORS.red}/>    
                            <GetItem size={60} isActive={false} color={COLORS.red}/>
                            <GetItem size={60} isActive={false} color={COLORS.red}/>
                        </View>
                        <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center" }}>
                            <GetItem size={60} isActive={false} color={COLORS.red}/>
                            <GetItem size={60} isActive={false} color={COLORS.red}/>
                            <GetItem size={60} isActive={false} color={COLORS.red}/>
                        </View>
                    </View> */}

                </View>


            </View>
            {/* </ScrollView> */}
        </SafeAreaView >
    )
}

export default Dames