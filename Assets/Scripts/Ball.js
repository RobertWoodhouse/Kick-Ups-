#pragma strict

static public var S : Ball; // Singleton

// Ball Bounce
public var okAngle : float = 3f;
public var greatAngle : float = 2f;
public var perfectAngle : float = 1f;

public var okBounce : float = 15f;
public var greatBounce : float = 25f;
public var perfectBounce : float = 30f;
public var specialBounce : float = 40f;

// Triple Perfect Push
public var tppBool : boolean = false;
public var tppInt : int = 0;

// The Golden Ball (Special Bounce)
private var _specialCounter : int = 0;
private var _theGoldenBall : boolean = false;
private var _timer : float = 10.0f;

// Ball Material
public var matBall : Material;
public var matGoldBall : Material;

// GUI  
private var _scoreGT : UI.Text;
private var _goldenGT : UI.Text;
private var _rallyGT : UI.Text;
private var _ogpGT : UI.Image;

// Score
public var bounceTxtPrefab : GameObject;
public var score : int;
public var rally : int;

// Animation
private var kickHash : int = Animator.StringToHash("Kick");
private var slideHash : int = Animator.StringToHash("Slide");

public var stuntFHash : int = Animator.StringToHash("Stunt_F");
public var stuntSHash : int = Animator.StringToHash("Stunt_S");

// Button Press Timer
public var buttonTimer : float = 0.0f;
public var buttonDelay : float = 0.40f;

// OGP
public var ok : boolean = false;
public var great : boolean = false;
public var perfect : boolean = false;
public var slideL : boolean = false;
public var slideR : boolean = false;

// Double Tap
public var doubleTapFloat : float = 0.0f;
public var doubleTapBool : boolean = false;

function Awake () 
{
	S = this; // Set the Singleton
}

function Start ()
{
	var scoreGO : GameObject = GameObject.Find("Score"); // Find reference to Score GameObject
	var goldenGO : GameObject = GameObject.Find("Special"); // Find reference to Special GameObject
	var rallyGO : GameObject = GameObject.Find("Rally"); // Find reference to Rally GameObject
	var ogpGO : GameObject = GameObject.Find("OGP");

	_scoreGT = scoreGO.GetComponent.<UI.Text>(); // Get Text component of the that GameObject
	_goldenGT = goldenGO.GetComponent.<UI.Text>();
	_rallyGT = rallyGO.GetComponent.<UI.Text>();
	_ogpGT = ogpGO.GetComponent.<UI.Image>();
	_scoreGT.text = "0";
	_goldenGT.text = "Golden Ball Off";
	_rallyGT.text = "0";
	_ogpGT.color = Color.white;

	GetComponent.<ParticleSystem>().enableEmission = false;

	buttonTimer = 0.0f; // Set button timer to 0
}

function Update () 
{
	// Activates button timer counter
	if (buttonTimer > 0.0f)
	{
		buttonTimer -= Time.deltaTime;
	}

	// Activates The Golden Ball and starts the timer
	if (_theGoldenBall == true)
	{
		_timer -= Time.deltaTime; 
		_goldenGT.text = "Golden Ball ON! | Timer : " + _timer.ToString("F0"); // Round off to 2 decimals
	}
	if (_timer <= 0)
	{
		_theGoldenBall = false;
		_timer = 10.0f;
		_goldenGT.text = "Golden Ball Off";
		GetComponent.<Renderer>().material = matBall;
		GetComponent.<ParticleSystem>().enableEmission = false;
		Player.S.GetComponent.<AudioSource>().Pause();
	}
	if (_specialCounter >= 5) // TODO, ADUST TO 10
	{
		_goldenGT.text = "Golden Ball Charged | Double Tap";
	}

	GoldenBall();
	AirGame();
	OGPIndicator();
	Kick();
	TriplePerfectPush();
}

function OnTriggerEnter(coll : Collider)
{
	// OGP Indicator
	if (coll.tag == "Ok")
	{
		ok = true;
	}
	
	if (coll.tag == "Great")
	{
		great = true;
	}
	
	if (coll.tag == "Perfect")
	{
		perfect = true;
	}

	if (coll.tag == "Slide_L")
	{
		slideL = true;
	}

	if (coll.tag == "Slide_R")
	{
		slideL = true;
	}
}

function OnTriggerExit(coll : Collider)
{
	// OGP Indicator
	if (coll.tag == "Ok")
	{
		ok = false;
	}
	
	if (coll.tag == "Great")
	{
		great = false;
	}
	
	if (coll.tag == "Perfect")
	{
		perfect = false;
	}

	if (coll.tag == "Slide_L")
	{
		slideL = false;
	}

	if (coll.tag == "Slide_R")
	{
		slideL = false;
	}
}

function OnCollisionStay(coll : Collision)
{
	// Reset after Game Over
	if (coll.collider.tag == "Floor" && score > HighScore.Score)
	{
		GameController.S.GameOver("Win");
	}
	if (coll.collider.tag == "Floor" && score <= HighScore.Score)
	{
		GameController.S.GameOver("Lose");
	}
}


function BounceText(text : String)
{
	var clone : GameObject;
	var rb : Rigidbody;
	
	// clone = Instantiate(bounceTxtPrefab);
	clone = Instantiate(bounceTxtPrefab, new Vector3(5,7,0), Quaternion.identity);
	clone.GetComponent.<BounceText>().bounceTxt.text = text;
	rb = clone.GetComponent.<Rigidbody>();
	// rb.AddForce(Random.Range(-30, 30),200,1); // Bounce text angle and force
	rb.AddForce(1,180,1); // Bounce text angle and force

	if (text == "Ok")
	{
		clone.GetComponent.<BounceText>().bounceTxt.color = Color.green;
	}
	if (text == "Great")
	{
		clone.GetComponent.<BounceText>().bounceTxt.color = Color.magenta;
	}
	if (text == "Perfect")
	{
		clone.GetComponent.<BounceText>().bounceTxt.color = Color.cyan;
	}
	if (text == "GOLDEN")
	{
		clone.GetComponent.<BounceText>().bounceTxt.color = Color.yellow;
	}
}

// Bounce angle multiplier
function BounceAngle()
{
	Debug.Log("Bounce angle adjusted...");
	if (okAngle >= 10.0f)
	{
		return;
	}
	else
	{
		okAngle -= 0.25f;
	}

	if (greatAngle >= 7.5f)
	{
		return;
	}
	else
	{
		greatAngle -= 0.25f;
	}

	if (perfectAngle >= 1.0f)
	{
		return;
	}
	else
	{
		perfectAngle -= 0.25f;
	}
}

function GoldenBall ()
{
	for (var i : int = 0; i < Input.touchCount; ++i)
	{
		DoubleTap (i);

		if (_specialCounter >= 5 && doubleTapBool == true && 
			Input.GetTouch(0).phase == TouchPhase.Began)
		{
			_specialCounter = 0;
			_theGoldenBall = true;
			GetComponent.<Renderer>().material = matGoldBall;
			GetComponent.<ParticleSystem>().enableEmission = true;
			Player.S.GetComponent.<AudioSource>().Play();
			// Debug.Log("In the ZONE!!!");
		}
	}
}

function AirGame ()
{
	for (var i : int = 0; i < Input.touchCount; ++i)
	{
		if (Player.S.underBall == true && Player.S.grounded == true && 
			Input.GetTouch(i).phase == TouchPhase.Began)
		{
			Player.S.GetComponent.<Rigidbody>().AddForce(new Vector2(0, Player.S.jumpForce));
			Player.S.grounded = false;
			Debug.Log("Jump!");
		}
	}
}

function OGPIndicator ()
{
	if (ok == true || slideL == true || slideR == true)
	{
		_ogpGT.color = Color.green;
	}
	
	else
	{
		_ogpGT.color = Color.white;
	}

	if (great == true || (great == true && ok == true))
	{
		_ogpGT.color = Color.magenta;
	}
	
	if (perfect == true || (perfect == true && great == true))
	{
		_ogpGT.color = Color.cyan;
	}
}

function Kick ()
{
	// Mulitple bounce lockout
	if (GetComponent.<Rigidbody>().velocity.y >= 0.00001)
	{
		Debug.Log("Bounce Lockout test");
		return;
	}

	for (var i : int = 0; i < Input.touchCount; ++i) // Touch Counter, deactivate for debug mode
	{	
		// Triple Perfect Push
		if (tppBool == true && Input.GetTouch(i).phase == TouchPhase.Began && 
			(perfect == true || great == true || ok == true) && 
			buttonTimer <= 0.0f && Player.S.grounded == true)
		{
			GetComponent.<Rigidbody>().AddForce(new Vector2(0, specialBounce));
			score += 777; // adds points for juggling

			BounceText("Triple P Push!");

			Player.S.anim.SetTrigger(kickHash); // Kick Animaition

			GetComponent.<AudioSource>().Play();

			buttonTimer = 0.50f; // Set button timer counter
			tppBool = false;
			Debug.Log("TTP Deactivated");
		}

		// Special Bounce
		if (_theGoldenBall == true && Input.GetTouch(i).phase == TouchPhase.Began && 
			(perfect == true || great == true || ok == true) && 
			buttonTimer <= 0.0f && Player.S.grounded == true)
		{
			GetComponent.<Rigidbody>().AddForce(new Vector2(0, specialBounce));
			score += 777; // adds points for juggling
			Debug.Log("SPECIAL BOUNCE!!!");

			BounceText("GOLDEN");

			Player.S.anim.SetTrigger(kickHash); // Kick Animaition

			GetComponent.<AudioSource>().Play();

			buttonTimer = 0.50f; // Set button timer counter
			rally += 1; // Adds points to rally
		}

		BallJuggle (i);

		// Floor Game
		if (slideL == true && Player.S.grounded == true &&
			Input.GetTouch(i).phase == TouchPhase.Began && buttonTimer <= 0.0f)
		{
			Player.S.GetComponent.<Rigidbody>().AddForce(new Vector2(-Player.S.slideForce, 0));
			// Debug.Log("Slide!");

			// CHANGE LATER
			GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-okAngle, okAngle), okBounce));

			Player.S.anim.SetTrigger(slideHash); // Slide Animation

			buttonTimer = buttonDelay; // Set button timer counter

			// Stops the force added from the slide tackle
			yield WaitForSeconds (1);

			Player.S.GetComponent.<Rigidbody>().velocity = Vector2.zero;
	    	Player.S.GetComponent.<Rigidbody>().angularVelocity = Vector2.zero;

			rally++; // Adds points to rally 

			tppInt = 0; // tpp reset
		}

		if (slideR == true && Player.S.grounded == true && 
			Input.GetTouch(i).phase == TouchPhase.Began && buttonTimer <= 0.0f)
		{
			Player.S.GetComponent.<Rigidbody>().AddForce(new Vector2(Player.S.slideForce, 0));
			// Debug.Log("Slide!");

			// CHANGE LATER
			GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-okAngle, okAngle), okBounce));

			Player.S.anim.SetTrigger(slideHash); // Slide Animation

			buttonTimer = buttonDelay; // Set button timer counter

			// Stops the force added from the slide tackle
			yield WaitForSeconds (1);

			Player.S.GetComponent.<Rigidbody>().velocity = Vector2.zero;
	    	Player.S.GetComponent.<Rigidbody>().angularVelocity = Vector2.zero; 

			rally++; // Adds points to rally

			tppInt = 0; // tpp reset
		}
	}

	_scoreGT.text = score.ToString(); // Convert the score back to a string and display it
	_rallyGT.text = rally.ToString();

	if (score > HighScore.Score) // Track the high score
	{
		HighScore.Score = score;
	}
}

function DoubleTap (i : int)
{
	if (Input.GetTouch(i).phase == TouchPhase.Began)
	{
		doubleTapFloat = 0.3f;
		doubleTapFloat -= Time.deltaTime;
	}
	if (Input.GetTouch(i).phase == TouchPhase.Began && doubleTapFloat > 0.0f)
	{
		doubleTapBool = true;
	}
	if (doubleTapFloat <= 0.0f)
	{
		doubleTapBool = false;
	}
}

function TriplePerfectPush ()
{
	if (tppInt >= 3)
	{
		tppBool = true;
		tppInt = 0;
		Debug.Log("TPP Activated");
	}
}

// Bounce height and angle
function BallJuggle (i : int)
{
	// Perfect
	if (perfect == true && Player.S.grounded == true && 
		Input.GetTouch(i).phase == TouchPhase.Began && buttonTimer <= 0.0f)
	{
		GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-perfectAngle, perfectAngle), perfectBounce));
		score += 300; // adds points for juggling
		Debug.Log("Perfect Kick");

		BounceText("Perfect");

		Player.S.anim.SetTrigger(kickHash); // Kick Animaition

		_specialCounter++; // Adds to the special counter

		buttonTimer = buttonDelay; // Set button timer counter

		GetComponent.<AudioSource>().Play();
		rally ++; // Adds points to rally

		BounceAngle();

		tppInt++; // tpp counter
	}

	// Great
	else if (great == true && Player.S.grounded == true && 
		Input.GetTouch(i).phase == TouchPhase.Began && buttonTimer <= 0.0f)
	{
		GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-greatAngle, greatAngle), greatBounce));
		score += 150; // adds points for juggling
		Debug.Log("Great Kick");

		BounceText("Great");

		Player.S.anim.SetTrigger(kickHash); // Kick Animaition

		buttonTimer = buttonDelay; // Set button timer counter

		GetComponent.<AudioSource>().Play();
		rally ++; // Adds points to rally

		tppInt = 0; // tpp reset
	}

	// OK
	else if (ok == true && Player.S.grounded == true && 
		Input.GetTouch(i).phase == TouchPhase.Began && buttonTimer <= 0.0f)
	{
		GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-okAngle, okAngle), okBounce));
		score += 100; // adds points for juggling
		Debug.Log("Ok Kick");

		BounceText("Ok");

		// Bounce angle multiplier	
		okAngle += 0.5f;
		greatAngle += 0.5f;
		perfectAngle += 0.5f;

		Player.S.anim.SetTrigger(kickHash); // Kick Animaition

		buttonTimer = buttonDelay; // Set button timer counter

		GetComponent.<AudioSource>().Play();
		rally ++; // Adds points to rally

		tppInt = 0; // tpp reset
	}
}


