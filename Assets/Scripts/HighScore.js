#pragma strict

static public var Score : int = 0;

function Awake ()
{
	if (PlayerPrefs.HasKey("KickUpsHighScore")) // If the KickUpsHighScore aleady exists, read it
	{
		Score = PlayerPrefs.GetInt("KickUpsHighScore");
	}
	PlayerPrefs.SetInt("KickUpsHighScore", Score); // Assign the high score to KickUpsHighScore
}

function Update () 
{
	var gt : UI.Text = this.GetComponent.<UI.Text>();
	gt.text = "High Score: " + Score;

	if (Score > PlayerPrefs.GetInt("KickUpsHighScore"))// Update KickUpsHighScore in PlayerPrefs if necessary
	{
		PlayerPrefs.SetInt("KickUpsHighScore", Score);
	}
}