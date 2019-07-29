#pragma strict

public var trickAngle : float = 1.0f;
public var trickBounce : float = 500.0f;

public var airTime : float;

function Update()
{
	airTime -= Time.deltaTime;

	if (airTime <= 0.0f)
	{
		GetComponent.<Rigidbody>().useGravity = true;
		GetComponent.<Rigidbody>().drag = 0;
	}

	if (Input.GetKeyDown(KeyCode.Z))
	{
		// Stunt
		if (Player.S.grounded == false && (Ball_Debug.S.ok == true || Ball_Debug.S.great == true || 
			Ball_Debug.S.perfect == true))
		{
			airTime = 1.0f;
			Player.S.anim.SetTrigger(Ball_Debug.S.stuntFHash); // Stunt Animaition
			Ball_Debug.S.score += 1200; // adds points for juggling
			Ball_Debug.S.GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-trickAngle, trickAngle), trickBounce));
			GetComponent.<Rigidbody>().useGravity = false;
			GetComponent.<Rigidbody>().drag = Mathf.Infinity;	
		}
	}

	if (Input.GetKeyDown(KeyCode.X))
	{
		// Stunt
		if (Player.S.grounded == false && (Ball_Debug.S.ok == true || Ball_Debug.S.great == true || 
			Ball_Debug.S.perfect == true))
		{
			airTime = 0.8f;
			Player.S.anim.SetTrigger(Ball_Debug.S.stuntSHash); // Stunt Animaition
			Ball_Debug.S.score += 1000; // adds points for juggling
			Ball_Debug.S.GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-trickAngle, trickAngle), trickBounce));
			GetComponent.<Rigidbody>().useGravity = false;
			GetComponent.<Rigidbody>().drag = Mathf.Infinity;
		}
	}
}