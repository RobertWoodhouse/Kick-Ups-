#pragma strict

static public var S : GameController;
static public var CANVAS : Canvas;

public var reloadDelay : float = 3.0f;
public var timer : float = 3.0f;
public var timerStop : boolean;

// GUI 
private var _mainTextGT : UI.Text;

function Awake ()
{
	S = this;
	CANVAS = GameObject.Find("Canvas") as Canvas;
}

function Start ()
{
	var mainTextGO : GameObject = GameObject.Find("MainText");

	_mainTextGT = mainTextGO.GetComponent.<UI.Text>();
	_mainTextGT.text = "3";
	timerStop = false;
}

function Update ()
{
	GameStart();
}

// Called when game is over
function GameOver(game : String)
{
	if (game == "Win") // Change to check for HighScore later...
	{
		_mainTextGT.text = "NEW HIGH SCORE";
	}
	if (game == "Lose")
	{
		_mainTextGT.text = "Game Over";
	}
	yield WaitForSeconds (reloadDelay);
	MainMenu.SceneSelect(01);
}

// Calls countdown to start game
function GameStart()
{
	timer -= Time.deltaTime;

	if (timer > 1)
	{
		// Freeze ball and player
		_mainTextGT.text = timer.ToString("F0");
		Player.S.enabled = false;
		Ball_Debug.S.GetComponent.<Rigidbody>().useGravity = false;
		Ball_Debug.S.GetComponent.<Rigidbody>().isKinematic = true;
		timerStop = true;
	}
	if (timer <= 0 && timerStop == true)
	{
		// Start Game
		_mainTextGT.text = "GO!";
		yield WaitForSeconds (1.0f);
		_mainTextGT.text = " ";
		Player.S.enabled = true;
		Ball_Debug.S.GetComponent.<Rigidbody>().useGravity = true;
		Ball_Debug.S.GetComponent.<Rigidbody>().isKinematic = false;
		timerStop = false;
	}
}



// // Test whether the game is over
// 	void CheckForGameOver()
// 	{
// 		// If the tableau is empty, the game is over
// 		if (tableau.Count == 0)
// 		{
// 			// Call GameOver() with a win
// 			GameOver(true);
// 			return;
// 		}
// 		// If there are still cards in the draw pile, the game's not over
// 		if (drawPile.Count > 0)
// 		{
// 			return;
// 		}
// 		// Check for remaining valid plays
// 		foreach (CardProspector cd in tableau)
// 		{
// 			if (AdjacentRank(cd, target))
// 			{
// 				// If there is a valid play, the game's not over
// 				return;
// 			}
// 		}
// 		// Since there are no valid plays, the game is over
// 		// Call GameOver with a loss
// 		GameOver(false);
// 	}
