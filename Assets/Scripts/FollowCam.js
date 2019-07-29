#pragma strict

static public var S : FollowCam; // a FollowCam Singleton

// fields set in the Unity Inspector pane
public var easing : float = 0.05f;
public var minXY : Vector2;
public var _____________ : boolean;

// fields set dynamically
public var poi : GameObject; // The point of interest
public var camZ : float; // The desired Z pos of the camera

function Awake ()
{
	S = this;
	camZ = this.transform.position.z;
}

function FixedUpdate () 
{
	if (poi == null)
	{
		return; // return if there is no poi
	}

	// Get the position of the poi
	var destination : Vector3;
	// If there is no poi, return to P:[0,0,0]
	if (poi == null)
	{
		destination = Vector3.zero;
	}
	else
	{
		// Get the position of the poi
		destination = poi.transform.position;
		// If poi is a Ball, check to see if it's at rest
		if (poi.tag == "Ball")
		{
			// If it is sleeping (that is, not moving)
			if (poi.GetComponent.<Rigidbody>().IsSleeping())
			{
				// Retrun to default view
				poi = null;
				// in the next update
				return;
			}
		}
	}

	// Limit the X & Y to minimum value
	destination.x = Mathf.Max(minXY.x, destination.x);
	destination.y = Mathf.Max(minXY.y, destination.y);
	// Interpolate from the current Camera position toward destination
	destination = Vector3.Lerp(transform.position, destination, easing);
	// Retain a destination.z of camZ
	destination.z = camZ;
	// Set the camera to the destination
	transform.position = destination;
	// Set the orthograpicSize of the Camera to keep Ground in view
	this.GetComponent.<Camera>().orthographicSize = destination.y + 10;
}