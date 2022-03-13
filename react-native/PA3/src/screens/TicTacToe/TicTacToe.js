import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { GlobalStyles } from '../../config/GlobalStyles';
import { styles } from './TicTacToeStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, isAndroid } from '../../config/variable';

import JsonTicTacToe from "../../config/TicTacToe3x3.json";


const TicTacToe = ({ navigation }) => {

    
    // [  [{isActive:false, color:COLORS.red}, {isActive:false, color:COLORS.starYellowColor}, {isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}]];
    const createTableArray = (size_x=3, size_y=3)=>{
        
        let res = []
        for (let i = 0; i < size_y; i++) {
            let tmp = []
            for (let j = 0; j < size_x; j++) {
                tmp.push(0)//
                
            }
            res.push(tmp)
            
        }

        return res;
    }


    const SIZE_BOARD_X = 3;
    const SIZE_BOARD_Y = 3;

    const initalTableArray = createTableArray(SIZE_BOARD_X, SIZE_BOARD_Y)

    const [isBotThinking, setIsBotThinking] = useState(false)
    const [winner, setWinner] = useState(0)

    const [tableArray, setTableArray] = useState(initalTableArray)
    const [player1, setPlayer1] = useState({id:1,color:COLORS.red, name:"Bot", icon:"ios-close", score:0})
    const [player2, setPlayer2] = useState({id:2,color:COLORS.primaryGreen, name:"Human", icon:"ios-ellipse-outline", score:0})

    
    const INACTIVE_PLAYER = {isActive:false, color:null}
    const ACTIVE_PLAYER_1 = {isActive:true, color:player1.color}
    const ACTIVE_PLAYER_2 = {isActive:true, color:player2.color}

    const PLAYER_LIST = [INACTIVE_PLAYER, ACTIVE_PLAYER_1, ACTIVE_PLAYER_2]

    const [playerTurn, setPlayerTurn] = useState((Math.round(Math.random()*2)%2 ==1 )?player1:player2)


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

    const getPossibleMoves = ()=>{
        let res = []
        for (let i = 0; i < tableArray.length; i++) {
            
            for (let j = 0; j < tableArray[i].length; j++) {
                if(tableArray[i][j] == 0){
                    res.push([i,j])
                }
            }
            
        }
        return res
    }

    

    const canPlay = ()=>{
        //si ya un bot alors change la condition
        if( playerTurn.id == 2){
            return true
        }
        return false
    }

    const check_range = (index , toNotInc=tableArray.length, fromIncluded=0)=>{
        return ((index) < toNotInc && (index)>=fromIncluded)
    }

    const check_won = (target_i, target_j, plyr, board=tableArray)=>{

        
        let player = plyr.id
        
        // let board = tableArray
        

        //----test---

        let vertical_down = ( 
            check_range((target_i+1)) && 
            check_range((target_i+2)) && 
            board[target_i][target_j] == player && 
            board[target_i+1][target_j] == player && 
            board[target_i+2][target_j] == player)

        let vertical_up = ( 
            check_range((target_i-1)) && 
            check_range((target_i-2)) && 
            board[target_i][target_j] == player && 
            board[target_i-1][target_j] == player && 
            board[target_i-2][target_j] == player)

        let vertical_middle = ( 
            check_range((target_i-1)) && 
            check_range((target_i+1)) && 
            board[target_i][target_j] == player && 
            board[target_i-1][target_j] == player && 
            board[target_i+1][target_j] == player)

        let vertical_win = (vertical_down || vertical_up || vertical_middle)


        let horizontal_right = ( 
            check_range((target_j+1), board[target_i].length) && 
            check_range((target_j+2), board[target_i].length) && 
            board[target_i][target_j] == player && 
            board[target_i][target_j+1] == player && 
            board[target_i][target_j+2] == player)

        let horizontal_left = (
            check_range((target_j-1), board[target_i].length) && 
            check_range((target_j-2), board[target_i].length) && 
            board[target_i][target_j] == player && 
            board[target_i][target_j-1] == player && 
            board[target_i][target_j-2] == player)

        let horizontal_middle = (
            check_range((target_j-1), board[target_i].length) && 
            check_range((target_j+1), board[target_i].length) && 
            board[target_i][target_j] == player && 
            board[target_i][target_j-1] == player && 
            board[target_i][target_j+1] == player)

        let horizontal_win = (horizontal_right || horizontal_left || horizontal_middle)

        
        let diagonal_up_right = (
            check_range((target_i-1)) &&
            check_range((target_i-2)) &&
            check_range((target_j+1), board[target_i].length) && 
            check_range((target_j+2), board[target_i].length) && 
            board[target_i][target_j] == player && 
            board[target_i-1][target_j+1] == player && 
            board[target_i-2][target_j+2] == player)

        let diagonal_middle_right = (
            check_range((target_i-1)) &&
            check_range((target_i+1)) &&
            check_range((target_j+1), board[target_i].length) && 
            check_range((target_j-1), board[target_i].length) && 
            board[target_i][target_j] == player && 
            board[target_i-1][target_j+1] == player && 
            board[target_i+1][target_j-1] == player)

        let diagonal_down_right = (
            check_range((target_i+1)) &&
            check_range((target_i+2)) &&
            check_range((target_j-1), board[target_i].length) && 
            check_range((target_j-2), board[target_i].length) && 
            board[target_i][target_j] == player && 
            board[target_i+1][target_j-1] == player && 
            board[target_i+2][target_j-2] == player)

        let diagonal_right_win = (diagonal_up_right || diagonal_middle_right || diagonal_down_right)

        
        let diagonal_up_left = (
            check_range((target_i-1)) &&
            check_range((target_i-2)) &&
            check_range((target_j-1, board[target_i].length)) && 
            check_range((target_j-2, board[target_i].length)) && 
            board[target_i][target_j] == player && 
            board[target_i-1][target_j-1] == player && 
            board[target_i-2][target_j-2] == player) 
        

        let diagonal_middle_left = (
            check_range((target_i-1)) &&
            check_range((target_i+1)) &&
            check_range((target_j-1, board[target_i].length)) && 
            check_range((target_j+1, board[target_i].length)) && 
            board[target_i][target_j] == player && 
            board[target_i-1][target_j-1] == player && 
            board[target_i+1][target_j+1] == player)

        let diagonal_down_left = (
            check_range((target_i+1)) &&
            check_range((target_i+2)) &&
            check_range((target_j+1, board[target_i].length)) && 
            check_range((target_j+2, board[target_i].length)) && 
            board[target_i][target_j] == player && 
            board[target_i+1][target_j+1] == player && 
            board[target_i+2][target_j+2] == player)

        let diagonal_left_win = (diagonal_up_left || diagonal_middle_left || diagonal_down_left)

        let diagonal_win = (diagonal_left_win || diagonal_right_win)
        
        if(horizontal_win || vertical_win || diagonal_win){
            return true
        }else{
            return false
        }
        //-----------

        
    }
    
    const updateTableArray = (target_i, target_j, player, isSimulation=false)=>{

        let items_arr = JSON.parse(JSON.stringify((tableArray)))
        
        items_arr[target_i][target_j] = player.id
        

        if(isSimulation){
            
            return items_arr;
        }else{

            // console.log("IS not SIMULATION !")
            setTableArray(items_arr)
            
            
            if(check_won(target_i, target_j, player, items_arr) == true){
                setWinner(player.id)
                //setPlayerTurn(player)
                console.log("The winner is Player ", player.id)
                return true
            }
            return false
        }

    };

    const restartGame = ()=>{
        setTableArray(initalTableArray);
        setWinner(0);
        setPlayerTurn(player1)

    }


    
    useEffect(()=>{
        let possible_moves = []
            

        possible_moves = getPossibleMoves()
        
        if(playerTurn.id == player1.id && winner == 0){
            setIsBotThinking(true)
            setTimeout(()=>{
                //JsonTicTacToe
                //tableArray
                let boardTmp = []
                

                for (let n_move = 0; n_move < possible_moves.length; n_move++) {
                        
                    boardTmp = updateTableArray(possible_moves[n_move][0], possible_moves[n_move][1], player1, true)
                    
                    for (let win_n_board = 0; win_n_board < JsonTicTacToe['player1'].length; win_n_board++) {
                        if(isEqualArrays(boardTmp, JsonTicTacToe['player1'][win_n_board] )){
                            //winning state !
                            console.log("winning state choosed ! ", boardTmp)
                            updateTableArray(possible_moves[n_move][0], possible_moves[n_move][1], player1, false)
                            setPlayerTurn(player2)
                            setIsBotThinking(false)
                            return;
                        }
                        
                    }
                    

                }
                if(possible_moves.length > 0){
                    
                    if(tableArray[1][1] == 0){
                        console.log("Middle Choice")
                        updateTableArray(1, 1, player1, false)
                        setPlayerTurn(player2)
                    }else{
                        console.log("Random Choice")
                        let n_move = Math.floor(0 + Math.random() * ((possible_moves.length - 1) - 0));
                        updateTableArray(possible_moves[n_move][0], possible_moves[n_move][1], player1, false)
                        setPlayerTurn(player2)
                    }
                    setIsBotThinking(false)
                }else{
                    // finished
                }

            },2000);
            

        }

        if(possible_moves.length == 0 && winner == 0){
             //match null
            setWinner(-1)
        }


    }, [playerTurn]);


    const GetItem = ({size=60, isActive, color, id})=>{
        let x = {}
        //console.log(id)
        let target_i = id[0]
        let target_j = id[1]
        let txt = ""
        if(!isActive){
            x = {borderColor:COLORS.primaryBlue, borderWidth:2, opacity:0.5}
            
        }else{
            x = {backgroundColor:color, borderColor:color, borderWidth:2}
            txt = "P"
            txt += (player1.color==color)?player1.id:player2.id;
        }
        return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{if(!isActive && winner==0 && canPlay()){let res = updateTableArray(target_i, target_j, playerTurn);if(res == false){(playerTurn.id==1)?setPlayerTurn(player2):setPlayerTurn(player1);}}}}>
            <View style={{height:size, width:size, borderRadius:size/2,alignItems:"center",alignItems:"center", justifyContent:"center",textAlign:"center", ...x}}>
                {isActive && (player2.color==color) && <Icon name='ios-ellipse-outline' size={size-10} style={{alignSelf:"center", paddingLeft:2 }} />}

                 {isActive && (player1.color==color) &&  <Icon name='ios-close' size={size-5} style={{alignSelf:"center", }} />}
                
                {/* <Icon name='ios-close' size={size-5} style={{alignSelf:"center", }} /> */}
            </View>
        </TouchableOpacity>);
    }

    const GetTable = ()=>{
        
        return (<View style={{backgroundColor:"#abc",flex:1, flexDirection:"column", justifyContent:"center", maxHeight:"60%", borderRadius:15, paddingHorizontal:5 }}>
            {Object.entries(tableArray).map(([key, arr], index)=>{ return (
                    <View key={index} style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center", }}>
                            {Object.entries(arr).map(([key2,element], index2)=>{return (<GetItem key={[index, index2]} id={[index, index2]} size={60-(2*SIZE_BOARD_X)} isActive={PLAYER_LIST[element].isActive} color={PLAYER_LIST[element].color}/>)})}
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
                        <Text style={{flex:4, marginHorizontal:20, paddingHorizontal:10, fontWeight:"600", fontSize:30, color:COLORS.white,textAlign:"center", backgroundColor:COLORS.primaryGreen,paddingVertical:5, borderRadius:30}}>TicTacToe</Text>
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
                            <Text style={{color:COLORS.white}}>{player1.name} : ({player1.score})</Text>
                        </View>
                        {/* color:(playerTurn.id==player2.id)?COLORS.white:COLORS.black, */}
                        <View style={{marginVertical:15,paddingBottom:5, fontWeight:"500", fontSize:20,  borderBottomColor:(playerTurn.id==player2.id)?player2.color:COLORS.primaryBlue, borderBottomWidth:5,borderRadius:5 }}>
                            <Text style={{color:COLORS.white}}>{player2.name} : ({player2.score})</Text>
                        </View>
                    </View>
                    
                    
                    <GetTable />

                    <View style={{ flexDirection:"row", justifyContent:"center",marginVertical:10 }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{restartGame()}}>
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

export default TicTacToe