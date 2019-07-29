#pragma strict

import UnityEngine.UI;

static  public var S : SlideTackle;

public var qteBtnGT : UI.Button[];
public var qteTxtGT : UI.Text;

public var canvas : GameObject;

public var qteBtnGO : GameObject;
public var qteTxtGO : GameObject;
// public var qteCount : int = 0;
static public var qteCount : int = 0; 

public var btnCounter : float = 3.0f;
public var btnCountBool : boolean = false;

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

function ButtonSpawn ()
{
	var i : int = Random.Range(0, 3);

	btnCounter = 3.0f;

	// Freeze player and ball during QTE
	Player.S.enabled = false;
	Ball.S.GetComponent.<Rigidbody>().useGravity = false; // Acts like outer space
	Ball.S.GetComponent.<Rigidbody>().isKinematic = true; // Stops actions altogether

	if (qteCount <= 4 && qteBtnGO == null) // Find button objects on scene
	{
		Debug.Log("Button Spawn");
		Instantiate(qteBtnGT[i]); // as UI.Button; // QTE Button
	
		qteBtnGO = GameObject.FindGameObjectWithTag("QTEButton"); // Find button on scene
		qteTxtGO = qteBtnGO.transform.GetChild(0).gameObject; // Find child object attached to button

		qteBtnGO.transform.SetParent(canvas.transform, false); // Attached instantiated object to Canvas
		
		// btnCounter -= Time.deltaTime;

		btnCountBool = true;

		qteTxtGT = qteTxtGO.GetComponent.<Text>();

		qteCount++; // Count how many times the qte button appears on screen
	}
}

function ButtonDestroy (countBool : boolean)
{
	GetComponent.<AudioSource>().Play();
	Debug.Log("Destroy Button");
	//Destroy(qteBtnGO);

	// CONTINUE FROM HERE
	btnCountBool = countBool; // Reset button counter
	// btnCounter = counter;

	//ButtonSpawn();

	if (qteCount > 4)
	{
		qteCount = 0;
	}

	Destroy(gameObject);
}

function ButtonCounterGUI ()
{
	if (btnCountBool == true)
	{
		btnCounter -= Time.deltaTime;
		
		// Button countdown GUI
		if (btnCounter > 1)
		{
			qteTxtGT.text = btnCounter.ToString("F0");
		}
		if (btnCounter <= 0)
		{
			qteTxtGT.text = "0";
			//Debug.Log("Ball dropped... Game Over");
			GameController.S.GameOver("Lose"); //TODO: Call GameOver function from GameController script
		}
	}
}