

function Die({value,isHeld,onClick,id}){
	const styles={backgroundColor: isHeld ? "#59E391" : "#ffffff"}
	return(
		<div style={styles} className="die-face">
			<h2 onClick={()=>onClick(id)}>{value}</h2>
		</div>
	)
}

export default Die

//continue this tenzies game
//codewars 
//net ninja react course
//the guys beefax recommended
//what can i build