import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { GlobalStyles } from '../../config/GlobalStyles';
import { styles } from './DamesStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, isAndroid } from '../../config/variable';

const TicTacToe = ({ navigation }) => {

    
    const [player1, setPlayer1] = useState({id:1,color:COLORS.white, name:"Player 1", icon:"ios-close", score:0})
    const [player2, setPlayer2] = useState({id:2,color:COLORS.darkBlue, name:"Player 2", icon:"ios-ellipse-outline", score:0})

    
    // [  [{isActive:false, color:COLORS.red}, {isActive:false, color:COLORS.starYellowColor}, {isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}],
    //                             [{isActive:false, color:COLORS.red},{isActive:false, color:COLORS.starYellowColor},{isActive:false, color:COLORS.starYellowColor}]];
    const createTableArray = (size=3)=>{
        let res = []
        for (let i = 0; i < size; i++) {
            let tmp = []
            for (let j = 0; j < size; j++) {
                if(((i%2==0 && j%2==0) || (i%2==1 && j%2==1)) && (i < 2 || i >= size-2)){
                    if(i < 2){
                        tmp.push({isActive:true, color:player1.color})
                    }else if(i >= size-2){
                        tmp.push({isActive:true, color:player2.color})
                    }
                    
                }else{
                    tmp.push({isActive:false, color:null})
                }
                
                
            }
            res.push(tmp)
            
        }

        return res;
    }


    const sizeTable = 6;

    const initalTableArray = createTableArray(sizeTable)


    const [tableArray, setTableArray] = useState(initalTableArray)
    const [selectedItem, setSelectedItem] = useState(null)


    // {player1.score}

    // const player1 = {id:1,color:COLORS.red, name:"Player 1", icon:"ios-close"}
    // const player2 = {id:2,color:COLORS.starYellowColor, name:"Player 2", icon:"ios-ellipse-outline"}
    const [playerTurn, setPlayerTurn]      = useState(player1)  

    const isPossible = (target_i, target_j)=>{

        return true;

    }
    
    const updateTableArray = (target_i, target_j, player)=>{

        if(isPossible(target_i, target_j, player) == true){
            //then move it 
            //tableArray
            setTableArray(()=>{
                let items = [...tableArray];
                let curr_i = selectedItem[0]
                let curr_j = selectedItem[1]
                
                // 2. Make a shallow copy of the item you want to mutate
                let item = {...items[curr_i][curr_j]};
                // 3. Replace the property you're intested in
                item.isActive = false;
                item.color = null
                items[curr_i][curr_j] = item;

                
                // 2. Make a shallow copy of the item you want to mutate
                item = {...items[target_i][target_j]};
                // 3. Replace the property you're intested in
                item.isActive = true;
                item.color = player.color;
                // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
                items[target_i][target_j] = item;

                return items

            })

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
        y = {backgroundColor:((target_i%2==0 && target_j%2==0) || (target_i%2==1 && target_j%2==1))?COLORS.grayShadow:"#9e9e9e", borderRadius:5}

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
                    }
                }else{
                    if(player != null && player.id == playerTurn.id){
                        if(selectedItem != null && selectedItem[0] == target_i && selectedItem[1] == target_j){
                            //tap again on same item , cancels the selection
                            setSelectedItem(null)
                        }else{
                            setSelectedItem([target_i, target_j])
                        }
                    }
                }
            
            }}>
            <View style={{height:size, width:size, borderRadius:size/2,alignItems:"center", justifyContent:"center",textAlign:"center", ...x}}>
                {/* <Text style={{fontWeight:"300", color:"#fff"}}>{txt}</Text> */}
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
                        <Text style={{flex:4, marginHorizontal:20, paddingHorizontal:10, fontWeight:"600", fontSize:30, color:COLORS.white,textAlign:"center",paddingVertical:5, backgroundColor:COLORS.darkBlue, borderRadius:30}}>Dames</Text>
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