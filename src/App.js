import React,{useEffect, useState} from 'react';
import Die from './Die'
import { nanoid } from 'nanoid'

// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
//=> "V1StGXR8_Z5jdHi6B-myT"

//root component
function App() {
  const [tenzies,setTenzies]= useState(false)
  const[diceNumbers,setDiceNumbers] =useState(allNewDice())

  const die= diceNumbers.map(dice=>(
     <Die  
     value={dice.rand} 
     key={dice.id} id={dice.id} 
     isHeld={dice.isHeld} 
     onClick={holdDice} />
  ))

  function holdDice(id){
    // console.log(id)
    //check each box clicked by mapping hrough the array
    setDiceNumbers(prev=>{
      return prev.map(dice=>{
        return dice.id===id? {
          ...dice,
          isHeld:!dice.isHeld
        }: dice
      })
    })
  }

  function allNewDice(){
    //use math.random
    //for loop
    //an array that returns 10 random numbers as elements
    let arr=[]
    for (let i=0;i<10;i++){
      let obj={}
      const randNum= Math.ceil(Math.random()*6)
      obj.rand=randNum
      obj.isHeld=false
      obj.id=nanoid()
      arr.push(obj)
    }
    return arr
  }

  
  function roll(){
    //cheeck through each dice to see if isHeld is true
    //if isHeld is true,
    setDiceNumbers(prev=>{
      return prev.map(dice=>{
        return dice.isHeld ? dice: {isHeld: false,rand:Math.ceil(Math.random()*6),id:nanoid()}
      })
    })

    if(tenzies){
      setDiceNumbers(prev=>{
        return prev.map(di=>{return{...di,rand:Math.ceil(Math.random()*6),isHeld:false,id:nanoid()}})
      })
      setTenzies(false)
    }
  }

  useEffect(()=>{
    const allHold= diceNumbers.every(die=>die.isHeld)
    const firstValue= diceNumbers[0].value
    const allSameValue=diceNumbers.every(die=>die.value===firstValue)
    if(allHold && allSameValue){
      setTenzies(true)
      console.log("You won!")
    }

  },[diceNumbers])
  

  return (
    <main>
      <h1 className='title'>Tenzies</h1>
      <p className='instruction'>Roll until all dices are the same. Click each die to flip it at 1st current value between rolls</p>
      <div className='dice-container'>
        {die}
      </div>
        <div className='btn'><button onClick={roll}>{tenzies?"NEW GAME":"ROLL"}</button></div>
      {tenzies&&<Confetti
    />}
    </main>
  );
}

export default App;

//the every method in javscript just checks if all elements of  the array object it is attached to pass that condition stated by the function
//how do you know if you have already won- tenzies will be set to true


