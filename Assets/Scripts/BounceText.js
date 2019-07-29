#pragma strict

public var lifeTime : float = 2.5f;
public var fadeTime : float = 1.0f;
public var bounceTxt : TextMesh;
public var birthTime : float;

// public var ballGO : GameObject;
// public var ballPos : Vector3;

function Awake ()
{
	bounceTxt = GetComponent.<TextMesh>(); // Find TextMesh
	birthTime = Time.time;

	// ballGO = gameObject.Find("Ball");
}

// function BounceText ()
// {
// 	this.rigidbody.AddForce();
	
// 	//Test
// 	//bounceTxt.text = "Good...";
// }

function Update () 
{
	// ballPos = ballGO.transform.position;

	// Fade out the bounceTxt over time
	var u : float = (Time.time - (birthTime + lifeTime)) / fadeTime;

	if (u >= 1)
	{
		Destroy(this.gameObject);
		return;
	}

	// Use u to determine the alpha value of the bounceText
	if (u > 0)
	{
		var c : Color = bounceTxt.color;
		c.a = 1.0f - (u * 0.5f);
		bounceTxt.color = c;
	}
}