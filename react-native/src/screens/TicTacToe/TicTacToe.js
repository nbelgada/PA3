import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { GlobalStyles } from '../../config/GlobalStyles';
import { styles } from './TicTacToeStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, isAndroid } from '../../config/variable';

const TicTacToe = ({ navigation }) => {

    
    // [  [{isActive:false, color:COLORS.red}, {isActive:false, color:COLORS.starYellowColor}, {isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}]];
    const createTableArray = (size=3)=>{
        let res = []
        for (let i = 0; i < size; i++) {
            let tmp = []
            for (let j = 0; j < size; j++) {
                tmp.push({isActive:false, color:null})
                
            }
            res.push(tmp)
            
        }

        return res;
    }


    const sizeTable = 5;

    const initalTableArray = createTableArray(sizeTable)


    const [tableArray, setTableArray] = useState(initalTableArray)
    const [player1, setPlayer1] = useState({id:1,color:COLORS.red, name:"Player 1", icon:"ios-close", score:0})
    const [player2, setPlayer2] = useState({id:2,color:COLORS.primaryGreen, name:"Player 2", icon:"ios-ellipse-outline", score:0})

    // {player1.score}

    // const player1 = {id:1,color:COLORS.red, name:"Player 1", icon:"ios-close"}
    // const player2 = {id:2,color:COLORS.starYellowColor, name:"Player 2", icon:"ios-ellipse-outline"}
    const [playerTurn, setPlayerTurn]      = useState(player1)  
    
    const updateTableArray = (target_i, target_j, player)=>{

        setTableArray(Object.entries(tableArray).map(([key, arr], index)=>
        { 
            return ( 
                    Object.entries(arr).map(([key2,element], index2)=>{return (index == target_i && index2 == target_j)? {...element, isActive:!element.isActive, color:player.color}:element})
                    )
        
        })
        )
    };

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
        return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{if(!isActive){updateTableArray(target_i, target_j, playerTurn);(playerTurn.id==1)?setPlayerTurn(player2):setPlayerTurn(player1);}}}>
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
                            {Object.entries(arr).map(([key2,element], index2)=>{return (<GetItem key={[index, index2]} id={[index, index2]} size={60-(2*sizeTable)} isActive={element.isActive} color={element.color}/>)})}
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
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>setTableArray(initalTableArray)}>
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