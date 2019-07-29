#pragma strict

public enum Outfit
{
	head,
	r_arm,
	l_arm,
	r_forearm,
	l_forearm,
	r_thigh,
	l_thigh,
	r_calf,
	l_calf
}

static public var S : Player; // Singleton for Player

private var _ball : Vector3;
private var _ballDirection : Vector2;
private var _xDif : float;
private var _yDif : float;
private var _distance : float;

// Speed and Force
public var speed : float = 10.0f;
public var slideForce : float = 60.0f;
public var jumpForce : float = 70.0f;
public var stopRun : float = 0.3f;
public var grounded : boolean = true;

// Ball Position
public var ballXAxis : float = 0.5f;
public var ballYAxis : float = 1.0f;
public var underBall : boolean = false;

private var _relativePoint : Vector3;

public var anim : Animator;

function Awake () 
{
	S = this;
	anim = GetComponentInChildren(Animator);
}

function FixedUpdate () 
{
	Movement ();
}

// Player movement by Vector manipulation
function Movement ()
{
	_ball = GameObject.Find("Ball").transform.position;

	// Distance between Player and Ball

	// _relativePoint = transform.InverseTransformPoint(ball.transform.position);
	_relativePoint = transform.InverseTransformPoint(_ball);

	if (_relativePoint.x < -ballXAxis) // Ball to the left
	{
		transform.position += Vector2(-1, 0) * Time.deltaTime * speed;
		anim.SetBool("Run_L", true);
		anim.SetBool("Run_R", false);
	}
	if (_relativePoint.x > ballXAxis) // Ball to the right
	{
		transform.position += Vector3(1, 0) * Time.deltaTime * speed;
		anim.SetBool("Run_R", true);
		anim.SetBool("Run_L", false);
	}
	if (_relativePoint.x < stopRun && _relativePoint.x > -stopRun) // Positioned on ball
	{
		anim.SetBool("Run_R", false);
		anim.SetBool("Run_L", false);

		if (_relativePoint.y > ballYAxis) // Ball in the air
		{
			anim.SetBool("Idle_Up", true);
			underBall = true;
		}
		else
		{
			anim.SetBool("Idle_Up", false);
			underBall = false;
		}
	}	
}

function OnCollisionEnter(coll : Collision)
{
	// Prevents player from double jumping
	if (coll.collider.tag == "Floor")
	{
		grounded = true;
	}
}