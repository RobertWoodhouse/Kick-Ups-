#pragma strict

static public var S : MainMenu;

function Awake ()
{
	S = this;
}

// Select scenes e.g. Main Menu and Restart for GameOver
public static function SceneSelect (scene : int)
{
	if (scene == 00)
	{
		Application.LoadLevel("00_MainMenu");
	}

	if (scene == 01)
	{
		Application.LoadLevel("01_Marathon");
	}

	if (scene == 02)
	{
		return;
	}

	if (scene == 03)
	{
		return;
	}

	if (scene == 04)
	{
		return;
	}
}

// Wrapper for SceneSelect Static Method to allow it to be called as an OnClick() for buttons
public function SceneSelectWrapper (scene : int)
{
	SceneSelect(scene);
}
