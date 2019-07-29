#pragma strict

public var minSwipeDistY : float;
public var minSwipeDistX : float;

public var trickAngle : float = 1.0f;
public var trickBounce : float = 500.0f;

private var _startPos : Vector2;

public var airTime : float;

function Update()
{
	airTime -= Time.deltaTime;

	if (airTime <= 0.0f)
	{
		GetComponent.<Rigidbody>().useGravity = true;
		GetComponent.<Rigidbody>().drag = 0;
	}

	if (Input.touchCount > 0)
	{
		var touch : Touch = Input.touches[0];

		switch (touch.phase)
		{
			case TouchPhase.Began:
				_startPos = touch.position;
				break;

			case TouchPhase.Ended:
				var swipeDistVertical : float = (new Vector3(0, touch.position.y, 0) -
					new Vector3(0, _startPos.y, 0)).magnitude;

				if (swipeDistVertical > minSwipeDistY)
				{
					var swipeValueY : float = Mathf.Sign(touch.position.y - _startPos.y);

					if (swipeValueY > 0) // Up Swipe
					{
						// Stunt
						if (Player.S.grounded == false &&
							(Ball.S.ok == true || Ball.S.great == true || Ball.S.perfect == true))
						{
							airTime = 1.0f;
							Player.S.anim.SetTrigger(Ball_Debug.S.stuntFHash); // Stunt Animaition
							Ball_Debug.S.score += 1200; // adds points for juggling
							Ball_Debug.S.GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-trickAngle, trickAngle), trickBounce));
							GetComponent.<Rigidbody>().useGravity = false;
							GetComponent.<Rigidbody>().drag = Mathf.Infinity;
						}
					}
					else if (swipeValueY < 0) // Down Swipe
					{
						// Stunt
						if (Player.S.grounded == false &&
							(Ball.S.ok == true || Ball.S.great == true || Ball.S.perfect == true))
						{
							airTime = 1.0f;
							Player.S.anim.SetTrigger(Ball_Debug.S.stuntFHash); // Stunt Animaition
							Ball_Debug.S.score += 1200; // adds points for juggling
							Ball_Debug.S.GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-trickAngle, trickAngle), trickBounce));
							GetComponent.<Rigidbody>().useGravity = false;
							GetComponent.<Rigidbody>().drag = Mathf.Infinity;
						}
					}
				}

				var swipeDistHorizontal : float = (new Vector3(touch.position.x, 0, 0) -
					new Vector3(_startPos.x, 0, 0)).magnitude;

				if (swipeDistHorizontal > minSwipeDistX)
				{
					var swipeValueX : float = Mathf.Sign(touch.position.x - _startPos.x);

					if (swipeValueX > 0) // Right Swipe
					{
						// Stunt
						if (Player.S.grounded == false && 
							(Ball.S.ok == true || Ball.S.great == true || Ball.S.perfect == true))
						{
							airTime = 0.8f;
							Player.S.anim.SetTrigger(Ball_Debug.S.stuntSHash); // Stunt Animaition
							Ball_Debug.S.score += 1000; // adds points for juggling
							Ball_Debug.S.GetComponent.<Rigidbody>().AddForce(new Vector2(Random.Range(-trickAngle, trickAngle), trickBounce));
							GetComponent.<Rigidbody>().useGravity = false;
							GetComponent.<Rigidbody>().drag = Mathf.Infinity;
						}
					}
					else if (swipeValueX < 0) // Left Swipe
					{
						// Stunt
						if (Player.S.grounded == false && 
							(Ball.S.ok == true || Ball.S.great == true || Ball.S.perfect == true))
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
				break;
		}
	}
}