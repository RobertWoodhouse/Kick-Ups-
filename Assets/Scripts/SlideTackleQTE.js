#pragma strict

import UnityEngine.UI;

static public var 	S : SlideTackleQTE;

public var 			qteBtnGT : UI.Button[];
public var 			qteTxtGT : UI.Text;

public var 			canvas : GameObject;

public var 			qteBtnGO : GameObject;
public var 			qteTxtGO : GameObject;

public var 			qteCount : int = 0; 

public var 			btnTimer : float = 3.0f;
public var 			btnCountBool : boolean = false;

private var 		j : int;


function Awake () 
{
	S = this;
}

function Start ()
{
	canvas = GameObject.Find("Canvas");
}

function Update ()
{
	ButtonCounterGUI();
}

public function ButtonOn ()
{
	var i : int = Random.Range(0, 3);
	j = i;

	// Freeze player and ball during QTE
	Player.S.enabled = false; // Stops Player
	Player.S.anim.speed = 0.0f; // Freeze Player Animation
	Ball_Debug.S.GetComponent.<Rigidbody>().useGravity = false; // Acts like outer space
	Ball_Debug.S.GetComponent.<Rigidbody>().isKinematic = true; // Stops actions altogether
	
	// Clear Game Objects to make room for new ones
	qteBtnGO = null;
	qteTxtGO = null;

	//if (qteCount < 4 && qteBtnGO == null) // Find button objects on scene
	if (qteCount < 4) // Find button objects on scene
	{
		Debug.Log("Button On");
		qteBtnGT[i].gameObject.SetActive(true); // QTE Button
	
		//qteBtnGO = GameObject.FindGameObjectWithTag("QTEButton"); // Find button on scene
		//qteTxtGO = qteBtnGO.transform.GetChild(0).gameObject; // Find child object attached to button

		qteBtnGO = qteBtnGT[i].gameObject;
		qteTxtGO = qteBtnGO.transform.GetChild(0).gameObject;

		btnCountBool = true;

		qteTxtGT = qteTxtGO.GetComponent.<Text>();

		qteCount++; // Count how many times the qte button appears on screen

		//btnTimer = 3.0f; // Button timer setter
	}
}

public function ButtonOff ()
{
	if (qteCount >= 4)
	{
		Debug.Log("QTE Success, Un-freeze Ball and Player");
		qteCount = 0;

		// Un-freeze player and ball
		Player.S.enabled = true;
		Player.S.anim.speed = 1.0f; // Un-Freeze Player Animation
		Ball_Debug.S.GetComponent.<Rigidbody>().useGravity = true; // Acts like outer space
		Ball_Debug.S.GetComponent.<Rigidbody>().isKinematic = false; // Stops actions altogether
		Ball_Debug.S.GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-Ball_Debug.S.okAngle, Ball_Debug.S.okAngle), Ball_Debug.S.okBounce)); // Add Force to Ball
		qteBtnGT[j].gameObject.SetActive(false);
	}
	else
	{
		Debug.Log("Button Off");
		qteBtnGT[j].gameObject.SetActive(false);
		btnTimer = 3.0f; // Button timer setter
		ButtonOn();
	}
}

public function ButtonClick (countBool : boolean)
{
	Debug.Log("Button Click");
	ButtonOff();
	btnCountBool = countBool;
}

public function ButtonCounterGUI ()
{
	if (btnCountBool == true)
	{
		Debug.Log("QTE Countdown activated");
		btnTimer -= Time.deltaTime;
		
		// Button countdown GUI
		if (btnTimer > 1)
		{
			qteTxtGT.text = btnTimer.ToString("F0");
		}
		if (btnTimer <= 0)
		{
			qteTxtGT.text = "0";
			//Debug.Log("Ball dropped... Game Over");
			GameController.S.GameOver("Lose");
		}
	}
}