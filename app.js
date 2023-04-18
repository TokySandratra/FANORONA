function get(elts){/*this function return method document.querySelector() */
    return document.querySelector(elts) 
}
const p1=get("#p1") 
const p2=get("#p2") 
const p3=get("#p3") 
const p4=get("#p4") 
const p5=get("#p5") 
const p6=get("#p6") 
const p7=get("#p7") 
const p8=get("#p8")
const p9=get("#p9")

let positions=[[p1,p2,p3],[p4,p5,p6],[p7,p8,p9]] /*array of positions <div id="p.."></div>*/
let pieces=[[0,0,0],[0,0,0],[0,0,0]] //array of pieces when position clicked
let piecesPlayer1=[]//array of player1's pieces
let piecesPlayer2=[]//array of player2's pieces

let selectPiece_id=undefined//variable which gets piece clicked
let selectPiece_IA=undefined
let targetPosition_id=undefined//variable which gets position clicked 
let targetPosition_IA=undefined // variable which gets position for IA
let player1=true //false for player 2
let iSelect=[]//get iteration variable [i][j] for piece selected
let iTarget=[]//get iteration variable [i][j] for position selected
let selectIA=[]
let targetIA=[]
let winner=get(".winner")
let gameTable=get(".gameTable")
let errorSound=get(".errorSound")
let winnerSound=get(".winnerSound")
let moveSound=get(".moveSound")
let slideSound=get(".slideSound")
let turn=get(".turn")
let win=get("#win")
let lunch=get(".lunch")
let welcome=get(".welcoming")
turn.classList.add("p1")
function GameStartMulti(){
    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
            let position=positions[i][j]
            position.addEventListener('click',(e)=>{
            
                if(CountPieces(piecesPlayer1)<3 || CountPieces(piecesPlayer2)<3){
                    if(!piecesPlayer1.includes(position.id) && !piecesPlayer2.includes(position.id)){
                        targetPosition_id=position.id
                        InitialiseMultiplayer(targetPosition_id,i,j)//put 6 pieces in the begining
                        if(CountPieces(piecesPlayer1)==3&&CountPieces(piecesPlayer2)==3){
                            targetPosition_id=undefined
                            console.log("initialisation ends!!!")
                        }
                    }
                    else{
                        console.log("Error!!!")
                        errorSound.play()
                    }
                }
                else{
                    if(piecesPlayer1.includes(position.id) || piecesPlayer2.includes(position.id)){
                        selectPiece_id=position.id
                        iSelect[0]=i
                        iSelect[1]=j
                    }
                    if(!piecesPlayer1.includes(position.id) && !piecesPlayer2.includes(position.id)){
                        targetPosition_id=position.id
                        iTarget[0]=i
                        iTarget[1]=j
                    }
                    if(selectPiece_id!=undefined && targetPosition_id!=undefined){
                        Action(selectPiece_id,targetPosition_id,iSelect,iTarget)
                        selectPiece_id=undefined
                        targetPosition_id=undefined
                    }
                }
            })
        }
    }
}
function ComputerChoice(){
    return Math.floor(Math.random()*3)
}
function GameStartOnePlayer(){
    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++) {
            let position=positions[i][j]
            position.addEventListener('click',(e)=>{
            
                if(CountPieces(piecesPlayer1)<3 || CountPieces(piecesPlayer2)<3){
                    if(!piecesPlayer1.includes(position.id)&&!piecesPlayer2.includes(position.id)){
                        targetPosition_id=position.id

                        let find=false
                        let a=ComputerChoice()
                        let b=ComputerChoice()
                        let positionIA=positions[a][b]
                        while(find==false){
                            if(position.id!=positionIA.id&&!piecesPlayer2.includes(positionIA.id)&&!piecesPlayer1.includes(positionIA.id)){
                                targetPosition_IA=positionIA.id
                                find=true
                                break
                            }
                            else{
                                find=false
                                a=ComputerChoice()
                                b=ComputerChoice()
                                positionIA=positions[a][b]
                            }
                        }
                        Initialise2(targetPosition_id, targetPosition_IA,i,j,a,b)//put 6 pieces in the begining
                        console.log(pieces)
                        if(CountPieces(piecesPlayer1)==3&&CountPieces(piecesPlayer2)==3){
                            targetPosition_id=undefined
                            targetPosition_IA=undefined
                            console.log("initialisation ends!!!")
                        }
                    }
                    else{
                        console.log("Error!!!")
                        errorSound.play()
                    }
                }
                else{
                    if(piecesPlayer1.includes(position.id)){
                        selectPiece_id=position.id
                        iSelect[0]=i
                        iSelect[1]=j
                    }
                    if(!piecesPlayer1.includes(position.id) && !piecesPlayer2.includes(position.id)){
                        targetPosition_id=position.id
                        iTarget[0]=i
                        iTarget[1]=j
                        console.log("iTarget")
                        console.log(iTarget)
                    }
                    let aSelect=ComputerChoice()
                    let bSelect=ComputerChoice()
                    let positionIA=positions[aSelect][bSelect]
                    while(find==false){
                        if(piecesPlayer2.includes(positionIA.id)&&!piecesPlayer1.includes(positionIA.id)){
                            selectPiece_IA=positionIA.id
                            // selectIA[0]=aSelect
                            // selectIA[1]=bSelect
                            find=true
                            break
                        }
                        else{
                            find=false
                            aSelect=ComputerChoice()
                            bSelect=ComputerChoice()
                            positionIA=positions[aSelect][bSelect]
                        }
                    }
                    console.log(aSelect,bSelect,selectPiece_IA)
                    find=false
                    positionIA=undefined
                    let aTarget=ComputerChoice()
                    let bTarget=ComputerChoice()
                    positionIA=positions[aTarget][bTarget]
                    console.log(positionIA.id)
                    while(find==false){
                        console.log("eto")
                        if(selectPiece_IA!=positionIA.id&&!piecesPlayer2.includes(positionIA.id)&&!piecesPlayer1.includes(positionIA.id)){
                            targetPosition_IA=positionIA.id
                            // targetIA[0]=aTarget
                            // targetIA[1]=bTarget
                            find=true
                            break
                        }
                        else{
                            aTarget=ComputerChoice()
                            bTarget=ComputerChoice()
                            positionIA=positions[aTarget][bTarget]
                        }
                    }
                    if(selectPiece_id!=undefined && targetPosition_id!=undefined){
                        Action2(selectPiece_id,targetPosition_id,selectPiece_IA,targetPosition_IA,iSelect,iTarget,aSelect,bSelect,aTarget,bTarget)
                        console.log(pieces)
                        selectPiece_id=undefined
                        targetPosition_id=undefined
                        selectPiece_IA=undefined
                        targetPosition_IA=undefined
                    }
                }
            })
        }
    }
}
function btn_startOnePlayer(){
    setTimeout(() => {
        welcome.style.display="none"
        lunch.style.display="block"
        GameStartOnePlayer()
    }, 300);
}
function btn_startMultiplayer(){
    setTimeout(() => {
        welcome.style.display="none"
        lunch.style.display="block"
        GameStartMulti()
    }, 300);
}
function CountPieces(array) {/* Count number of pieces in gameTable:=> 6 max */
    return array.length 
}
function InitialiseMultiplayer(target,a,b) {/** Initialise player1's pieces and player2's pieces step by step*/
    if(player1){
        piecesPlayer1.push(target)
        positions[a][b].classList.add("p1")
        pieces[a][b]=1
        moveSound.play()
        player1=false 
        turn.classList.remove("p1")
        turn.classList.add("p2")
        if(GameOver()){
            console.log("GameOver")
        }
    }
    else{
        piecesPlayer2.push(target) 
        positions[a][b].classList.add("p2")
        pieces[a][b]=2
        moveSound.play()
        player1=true 
        turn.classList.remove("p2")
        turn.classList.add("p1")
        if(GameOver()){
            console.log("GameOver")
        }
    }
}
function Initialise2(target1,target2,q,s,d,f) {/** Initialise player1's pieces and Computer's pieces step by step*/

        piecesPlayer1.push(target1)
        positions[q][s].classList.add("p1")
        pieces[q][s]=1
        moveSound.play()
        turn.classList.remove("p1")
        turn.classList.add("p2")
        if(GameOver()){
            console.log("GameOver")
        }
        setTimeout(() => {
            console.log(d,f)
            piecesPlayer2.push(target2) 
            positions[d][f].classList.add("p2")
            pieces[d][f]=2
            moveSound.play()
            turn.classList.remove("p2")
            turn.classList.add("p1")   
            if(GameOver()){
                console.log("GameOver")
            } 
        }, 500);
       
}
function MatchMove(a,b){/**get correct move for each pieces */
    if(a=="p1"){
        if((b=="p2")||(b=="p4")||(b=="p5")){
            return true
        }
    }
    if(a=="p2"){
        if(b=="p1"||b=="p3"||b=="p5"){
            return true
        }
    }
    if(a=="p3"){
        if(b=="p2"||b=="p6"||b=="p5"){
            return true
        }
    }
    if(a=="p4"){
        if(b=="p1"||b=="p7"||b=="p5"){
            return true
        }
    }
    if(a=="p5"){
        if(b=="p1"||b=="p2"||b=="p3"||b=="p4"||b=="p6"||b=="p7"||b=="p8"||b=="p9"){
            return true
        }
    }
    if(a=="p6"){
        if(b=="p3"||b=="p9"||b=="p5"){
            return true
        }
    }
    if(a=="p7"){
        if(b=="p4"||b=="p8"||b=="p5"){
            return true
        }
    }
    if(a=="p8"){
        if(b=="p7"||b=="p9"||b=="p5"){
            return true
        }
    }
    if(a=="p9"){
        if(b=="p8"||b=="p6"||b=="p5"){
            return true
        }
    }
    return false
}
function Action(x,y,array1,array2) {/**Alternatif action between players and gameover() however */
    if(player1){
        if(piecesPlayer1.includes(x)&& MatchMove(x,y)){
            for(let i=0 ; i<3 ;i++){
                if(piecesPlayer1[i]==x){
                    piecesPlayer1[i]=y
                }
            }
            pieces[array1[0]][array1[1]]=0
            positions[array1[0]][array1[1]].classList.remove("p1")
            pieces[array2[0]][array2[1]]=1
            slideSound.play()
            positions[array2[0]][array2[1]].classList.add("p1")
            player1=false
            turn.classList.remove("p1")
            turn.classList.add("p2")
        }
        else{
            errorSound.play()
        }
        if(GameOver()){
            console.log("GameOver")
        }
    }
    else{
        if(piecesPlayer2.includes(x)&& MatchMove(x,y)){
            for(let i=0 ; i<3 ;i++){
                if(piecesPlayer2[i]==x){
                    piecesPlayer2[i]=y
                }
            }
            pieces[array1[0]][array1[1]]=0
            positions[array1[0]][array1[1]].classList.remove("p2")
            pieces[array2[0]][array2[1]]=2
            slideSound.play()
            positions[array2[0]][array2[1]].classList.add("p2")
            player1=true
            turn.classList.remove("p2")
            turn.classList.add("p1")
        }
        else{
            errorSound.play()
        }
        if(GameOver()){
            console.log("GameOver")
        }
    }
    
}
function Action2(w,x,y,z,array1,array2,a,b,c,d) {/**Alternatif action between players and gameover() however */
        if(piecesPlayer1.includes(w)&& MatchMove(w,x)){
            for(let i=0 ; i<3 ;i++){
                if(piecesPlayer1[i]==w){
                    piecesPlayer1[i]=x
                }
            }
            pieces[array1[0]][array1[1]]=0
            pieces[array2[0]][array2[1]]=1
            slideSound.play() 
            positions[array1[0]][array1[1]].classList.remove("p1")
            positions[array2[0]][array2[1]].classList.add("p1")
            turn.classList.remove("p1")
            turn.classList.add("p2")
            player1=false
        }
        else{
            errorSound.play()
            player1=true
        }
        if(GameOver()){
            console.log("GameOver")
        }
    
    
        setTimeout(() => {
            for(let i=0 ; i<3 ;i++){
                if(piecesPlayer2[i]==y){
                    piecesPlayer2[i]=z
                }
            }
            pieces[a][b]=0
            positions[a][b].classList.remove("p2")
            pieces[c][d]=2
            slideSound.play()
            positions[c][d].classList.add("p2")
            turn.classList.remove("p2")
            turn.classList.add("p1")
        }, 300);
       
        if(GameOver()){
            console.log("GameOver")
        }   
   
    
    
}
function Diagonal(array){/*test diagonal mate */
   if((array[0][0]==array[1][1] && array[0][0]==array[2][2])&& (array[0][0]!=0)){
        return true
   }
   if (array[0][2]==array[1][1]&&array[0][2]==array[2][0]&&array[0][2]!=0) {
        return true
   }
    return false
   
}
function Horizontal(array){/**test horizontal mate */
    if((array[0][0]==array[0][1] && array[0][0]==array[0][2])&& (array[0][0]!=0)){
        return true
   }
   if (array[1][0]==array[1][1]&&array[1][0]==array[1][2]&&array[1][0]!=0) {
        return true
   }
      if((array[2][0]==array[2][1] && array[2][0]==array[2][2])&& (array[2][0]!=0)){
        return true
   }
   return false
   
}
function Vertical(array){/**test vertical mate */
    if((array[0][0]==array[1][0] && array[0][0]==array[2][0])&& (array[0][0]!=0)){
        return true
   }
   if (array[0][1]==array[1][1]&&array[0][1]==array[2][1]&&array[0][1]!=0) {
        return true
   }
      if((array[0][2]==array[1][2] && array[0][2]==array[2][2])&& (array[0][2]!=0)){
        return true
   }
   return false
   

}
function GameOver(){/**return and stop game */
    if(Diagonal(pieces)||Vertical(pieces)||Horizontal(pieces)){
        winner.style.display="block"
        turn.style.background="transparent"
        winnerSound.play()
        gameTable.classList.add("winner_Game")
      return true
    }
    else{
        return false
    }
}

function refresh(){/**load window and refresh it */
    click_btn() 
    setTimeout(() => {
        window.location.reload() 
    },500) 
}
function click_btn(){
    let btn=get(".btn") 
    //btn.Play() 
}